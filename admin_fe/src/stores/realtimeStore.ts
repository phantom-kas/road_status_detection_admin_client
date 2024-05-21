import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useUserStore } from './user'
import { usePushertore } from './pusherStore'

export const useRealtimetStore = defineStore('msgs', () => {
  const pusherStore = usePushertore()
  const { getProfileimg_url, userInfo, getDecodeRtoken } = useUserStore()
  const getSecs = () => {
    const ms = Date.now()
    const sec = Math.round(ms / 1000)
    return sec
  }
  const msgs = ref(useLocalStorage('msgs', []))
  const msgs2 = ref(useLocalStorage('msgs2', []))
  const support_Msgs = ref(useLocalStorage('support_Msgs', []))
  const pageMsg = ref(useLocalStorage('page_Msgs', []))
  const last_id = ref(0)
  const users = ref([])
  const imgUrl = ref('')
  const supportPageMsgs = ref([])

  const addHelpResponseMsgs = (data) => {
    supportPageMsgs.value = data.reverse().concat(supportPageMsgs.value)
  }
  // const alerts_id = ref(useLocalStorage("alerts_id",0))

  const getMsgs = computed(() => msgs.value)
  const getMsgs2 = computed(() => msgs2.value)
  const getSupportMsgs = computed(() => msgs.value)
  const getPageMsg = computed(() => pageMsg.value)

  const fetchUsers = (params = {}, url = 'msg/get_message_users') => {
    axios
      .get(url, {
        params
      })
      .then((res) => {
        users.value = res.data.data
        imgUrl.value = res.data.profile_img_url
        // window.alert(imgUrl.value+'ss')
      })
  }

  const getmsgs = async (
    params = {
      type: 'support',
      lim: 10
    },
    url = 'msg/get_msgs'
  ) => {
    // if(q){
    //   params.last_id = q.value
    // }
    let loadMore = false
    if (last_id.value != 0) {
      params.last_id = last_id.value
    }
    loadMore = await axios
      .get(url, { params })
      .then((res) => {
        pageMsg.value = res.data.data.reverse().concat(pageMsg.value)
        // window.alert('s1')
        return res
      })
      .then((res) => {
        if (last_id.value == 0) {
          const element = document.querySelector('.msgc')
          if (element) element.scrollTop = element.scrollHeight
        } else {
          // window.alert(last_id.value + 's')
          document.getElementById('msg_' + last_id.value)?.scrollIntoView()
        }
        // window.alert('s2')
        return res
      })
      .then((res) => {
        console.log(res.data.data)
        if (res.data.data.length < 1) {
          loadMore = false
        } else {
          loadMore = true
        }

        if (pageMsg.value.length > 0) {
          last_id.value = pageMsg.value[0].msg_id
        }

        //  window.alert(last_id.value)

        return loadMore
      })

    return loadMore
  }

  const addMsgs = (msg) => {
    msgs.value.unshift(msg)
  }
  const addMsgs2 = (msg) => {
    msgs2.value.unshift(msg)
  }
  const addSupportMsgs = (msg) => {
    support_Msgs.value.unshift(msg)
  }
  const addPageMsg = (msg) => {
    pageMsg.value.push(msg)
    // window.alert('added')
  }

  const clearPageMsg = () => {
    pageMsg.value = []
  }
  const fetchPageMsg = async (url, data) => {
    axios.get(url, { params: { data } }).then((res) => {
      pageMsg.value = res.data.data.reverse().concat(pageMsg.value)

      return res.data.data
    })
  }

  const removeMsg = (index) => {
    msgs.value.splice(index, 1)
  }
  const removeMsg2 = (index) => {
    msgs2.value.splice(index, 1)
  }
  const removeSupportMsg = (index) => {
    msgs.value.splice(index, 1)
  }

  const handelSned = (msg, to_uid) => {
    if (msg == '') {
      return
    }
    //window.alert(pusherStore.getsocket_id)
    //window.alert(pusherStore.getsocket_id)
    //return
    axios
      .post('msg/send_msg', {
        socket_id: pusherStore.getsocket_id,
        msg: msg,
        img_url: getProfileimg_url,
        user_name: userInfo.fname + ' ' + userInfo.lname,
        to_uid
      })
      .then((res) => {
        if (res.data.status == 'success') {
          pageMsg.value.push({
            from_uid: getDecodeRtoken.userId,
            msg_id: getSecs(),
            fname: userInfo.fname,
            lname: userInfo.lname,
            msg: msg,
            type: 'support',
            img_filename: userInfo.img_filename
          })
        }
      })
      .then(() => {
        const element = document.querySelector('.msgc')
        element.scrollTop = element.scrollHeight
        msg = ''
      })
  }

  const getLastHelpMsgsId = () => {
    return supportPageMsgs.value[0].msg_id
  }

  const restHelpsMsgs = () => {
    supportPageMsgs.value = []
  }

  const addSupportMsg = ({ from_uid, msg_id, fname, lname, msg, type, img_filename }) => {
    supportPageMsgs.value.push({
      from_uid,
      msg_id,
      fname,
      lname,
      msg,
      type,
      img_filename
    })
    window.alert('D')
  }
  return {
    msgs,
    removeMsg,
    getMsgs,
    addMsgs,
    msgs2,
    getMsgs2,
    addMsgs2,
    removeMsg2,
    getPageMsg,
    pageMsg,
    addPageMsg,
    fetchPageMsg,
    last_id,
    clearPageMsg,
    fetchUsers,
    users,
    imgUrl,
    getmsgs,
    handelSned,
    support_Msgs,
    getSupportMsgs,
    addSupportMsgs,
    removeSupportMsg,
    supportPageMsgs,
    addHelpResponseMsgs,
    getLastHelpMsgsId,
    restHelpsMsgs,
    addSupportMsg
  }
})
