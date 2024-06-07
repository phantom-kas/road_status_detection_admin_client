import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

function parseJwt(token: string) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}

function isObjEmpty(obj: {}) {
  return Object.keys(obj).length === 0
}

export const useUserStore = defineStore('user', () => {
  const user = ref(
    useLocalStorage('user', {
      access_token: '',
      refresh_token: '',
      userInfo: {
        username: '',
        fname: '',
        role: 0,
        lname: ''
      },
      Permissions: {}
    })
  )

  const countries = ref(useLocalStorage('countries', []))
  const profileImgDir = ref(useLocalStorage('profileImgDir', ''))

  const getRToken = ref(useLocalStorage('rtoken', ''))
  const getAToken = ref(useLocalStorage('atoken', ''))
  const removeAtkn = () => {
    getAToken.value = ''
  }
  const prem = ref<any>(useLocalStorage('prem', {}))
  const profile_vertion = ref(useLocalStorage('profile_vertion', 0))

  const profile_img_url = ref(useLocalStorage('profile_img_url', ''))
  const userProgInfo = ref<{ [key: string]: [value: string] }>(useLocalStorage('userProgInfo', {}))
  const getProfileimg_url = computed(() => profile_img_url.value)

  const setProfileImg = (url: string) => {
    profile_img_url.value = url
  }

  const updateProfileImg = (url: string) => {
    const v = ++profile_vertion.value
    if (v > 1000000) {
      profile_vertion.value = 0
    }
    profile_img_url.value = url + '?v=' + v
  }

  const userInfo = ref<any>(useLocalStorage('userInfo', {}))

  const isAmin = computed(() => {
    return userInfo.value.role == 6
  })
  const isAdmin = computed(() => {
    return userInfo.value.role == 6
  })
  const isPatient = computed(() => {
    return userInfo.value.role == 1
  })

  const isDoctor = computed(() => {
    return userInfo.value.role == 2
  })
  const isSpecialist = computed(() => {
    return userInfo.value.role == 3
  })
  const isAccountant = computed(() => {
    return userInfo.value.role == 4
  })
  const isReceptionist = computed(() => userInfo.value.role == 5)

  //const getRToken = computed(() => user.value.refresh_token)

  //const getAToken = computed(() => user.value.access_token)

  const getUserInfo = computed(() => userInfo.value)

  const getUserName = computed(() => user.value.userInfo.username)

  const getUserFullName = computed(
    () => `${user.value.userInfo.fname} ${user.value.userInfo.lname}`
  )

  const getDecodeAtoken = computed(() => parseJwt(user.value.access_token))
  const getDecodeRtoken = computed(() => {
    if (user.value.refresh_token) {
      return parseJwt(user.value.refresh_token)
    }
    return null
  })

  const getInfoByKey = computed(() => (key: string | number) => userInfo.value[key])

  const SetTokens = (Rtoken: string, AToken: string | null) => {
    user.value.refresh_token = Rtoken
    if (AToken) user.value.access_token = AToken
    getRToken.value = Rtoken

    if (AToken) getAToken.value = AToken
  }

  const setRtoken = (Rtoken: string) => {
    user.value.refresh_token = Rtoken

    getRToken.value = Rtoken
  }

  const setUserInfo = (dt: {
    [x: string]: any
    profile_img_url?: any
    fname?: any
    lname?: any
  }) => {
    if (dt.profile_img_url) {
      setProfileImg(dt.profile_img_url)
    }

    userInfo.value.fullNmae = `${dt.fname} ${dt.lname}`
    Object.keys(dt).map((v) => (userInfo.value[v] = dt[v]))
  }

  const setUserPrem = (dt: { [x: string]: any }) => {
    if (!isObjEmpty(dt)) {
      Object.keys(dt).map((v) => (prem.value[v] = dt[v]))
      return
    }
    prem.value = {}
  }

  //const isAdmin = computed(() =>!isObjEmpty(prem.value))
  const isStu = computed(() => !isObjEmpty(userProgInfo.value))

  // userInfo.value.userInfo = userInfo.value.userInfo.userInfo

  const lastCheckPDate = ref(useLocalStorage('lastCheckPDate', ''))
  const updateProgInfo = (pid: any) => {
    axios.post('user/get_user_proginfo', { pid: pid }).then((res) => {
      if (res.data.data.lenght > 0) {
        userProgInfo.value = res.data.data
      }
    })
  }

  const isAflt = computed(() => {
    if (userInfo.value.aflt == 1) {
      return true
    }
    return false
  })

  const router = useRouter()

  const logOut = () => {
    axios.post('user/log_out').then((res) => {
      if (res.data.status == 'success') {
        // window.alert("successfully logged out")
        axios.defaults.headers.common['Authorization'] = ''
        removeAtkn()
        router.push({ name: 'signin' })
      }
    })
  }

  const profile_img_url_root = ref(useLocalStorage('profile_img_url_root', ''))
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  return {
    capitalizeFirstLetter,
    profile_img_url_root,

    logOut,
    isAflt,
    updateProgInfo,
    lastCheckPDate,
    user,
    prem,
    isAdmin,
    isStu,
    setUserPrem,
    userProgInfo,

    SetTokens,
    userInfo,
    getAToken,
    getUserInfo,
    getDecodeAtoken,
    getDecodeRtoken,
    getRToken,
    setUserInfo,
    getUserName,
    getUserFullName,
    getInfoByKey,
    setRtoken,
    profile_img_url,
    setProfileImg,
    getProfileimg_url,
    profile_vertion,
    updateProfileImg,
    isAmin,

    isPatient,
    isDoctor,
    isSpecialist,
    isAccountant,
    isReceptionist,
    profileImgDir
  }
})
