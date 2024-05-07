import axios from 'axios'
import { useUserStore } from '../stores/user.ts'
// import { useRouter } from "vue-router";
import router from '../router/index'
import { useAlertStore } from '../stores/alerts'
import { useLoaderStore } from '../stores/loader.ts'
// import { useDateStore } from "../stores/useDateStore"

//axios.defaults.headers.common["Accept"] ="*/*";

axios.defaults.baseURL = 'http://localhost/road_monitoring/'
//axios.defaults.baseURL = "https://bothospital.cityprimepropertiesgh.com/api/v1/";
const axiosApiInstance = axios.create()

axios.interceptors.request.use((req) => {
  const user = useUserStore()
  if (user.getAToken != undefined) {
    req.headers.Authorization = 'Bearer ' + user.getAToken
  }
  if (req._load !== undefined) {
    if (req._load) {
      console.log('begin loading')
      const loader = useLoaderStore()
      loader.start()
    }
  }
  return req
})

let refresh = false
let c = 0
axios.interceptors.response.use(
  (response) => {
    // Do something before response is sent
    if (response.data) {
      if (Object.hasOwn(response.data, 'alerts')) {
        const alerts = useAlertStore()

        response.data.alerts.forEach((a: { message: string; status: string }) => {
          alerts.addAlert(a.message, a.status, 's')
        })
      }
    }

    // check if its is loading and stop it on successfull response
    if (response.config._load != undefined) {
      if (response.config._load) {
        console.log('loadend on success')
        const loader = useLoaderStore()
        loader.stop()
      }
    }
    return response
  },
  async function (error) {
    // check if its is loading and stop it on error response
    if (error.config._load != undefined) {
      if (error.config._load) {
        console.log('loadend on error')
        const loader = useLoaderStore()
        loader.stop()
      }
    }

    const originalRequest = error.config
    const user = useUserStore()
    const router1 = router
    const alerts = useAlertStore()

    if (router.currentRoute.value.name == 'login') {
      alerts.addAlert(error.response.data.message, error.response.data.status, 's')
      throw error
    } else if (error.response.status === 401 && !refresh) {
      // window.alert(c + ' ' + refresh);
      originalRequest._retry = true

      c = c + 1

      refresh = true

      return (
        axios({
          url: 'user/getNewToken',
          method: 'POST',
          data: {
            refresh_token: user.getRToken
          }
        })
          .finally(() => {
            // window.alert('1')
          })
          .then(function (res) {
            // window.alert('2'+ res.request.responseURL)
            // alerts.addAlert('New token generated ' + c,'info' ,'s')

            return res
          })
          .then((res) => {
            user.SetTokens(res.data.refreshToken, res.data.accessToken)
            // window.alert(res.data.accessToken)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.accessToken
            originalRequest.headers.Authorization = axios.defaults.headers.common['Authorization']
            refresh = false
            return res
          })
          //.then((res)=>{
          // if(res.status == 200 && !user.isAdmin){

          //   const { getDateTime} = useDateStore();

          //   if(!user.lastCheckPDate || user.lastCheckPDate != getDateTime() && !user.isAdmin){
          //   return  axios.post('payments/check_all_overdue')
          //     .then(res => {
          //   //    window.alert('asda')
          //       if(res.data.status == 'success'){user.lastCheckPDate = getDateTime()}
          //       return
          //       }

          //     );
          //   }
          //   return res
          //   }
          //  })
          .then(() => {
            //   window.alert('d' + originalRequest.headers.Authorization)
            return axiosApiInstance(originalRequest)
          })
          .catch((error) => {
            router1.push({ name: 'login' })
            ///   console.log(error)
            //  window.alert(error.request.responseURL)
            alerts.addAlert(error.response.data.message + c, error.response.data.status, 's')
            return
          })
      )
    } else if (error.response.status === 401 && refresh) {
      refresh = false
      console.log(error.response.request.responseURL)
      // window.alert('sr' + refresh +' '+ error.response.request.responseURL)
      const alerts = useAlertStore()
      const router1 = router
      router1.push({ name: 'login' })
      alerts.addAlert(error.response.data.message + c, error.response.data.status, 's')
      return
    } else if (error.response.status == 403) {
      const router1 = router
      const alerts = useAlertStore()
      alerts.addAlert(error.response.data.message, error.response.data.status, 's')
      router1.push({ name: 'dashboard' })
      return
    }
    // else if(error.response.status == 402 ){
    //   const router1 = router;
    //   const alerts = useAlertStore()
    //   alerts.addAlert(error.response.data.message,error.response.data.status,'s');
    //   router1.push({path:"/active_payments"})
    //   return
    // }
    else if (error.response.status === 400) {
      alerts.addAlert(error.response.data.message, error.response.data.status, 's')
    }
    // else {
    //   const alerts = useAlertStore()
    //   alerts.addAlert(error.response.data.message,error.response.data.status,'s');
    //   return error.response
    // }

    c = 0

    return Promise.reject(error)
  }
)
