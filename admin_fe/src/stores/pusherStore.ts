// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Pusher from 'pusher-js'
//import { useLocalStorage } from '@vueuse/core'
import { ref } from 'vue'
import { usePushertore } from './usePuserStore'
import { dashboardStore } from './dashboardStore'
import { useRoute } from 'vue-router'
import { pageFiller } from '../stores/pageFillerStore'
import { sendIceCandeates, sendOffer } from '../composables/handle_signaling'
import type { peerObjType } from '../types'
import { useUserStore } from './user'

export const pusherStore = defineStore('pusherStore', () => {
  const peerConnections: peerObjType[] = []
  const user = useUserStore()
  const userName = 'user_' + user.userInfo.id
  const peerConfiguration = {
    iceServers: [
      {
        urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302']
      }
    ]
  }

  const whichPeerConnection = (camera_name: String) => {
    let i: boolean | number = false

    for (let index = 0; index < peerConnections.length; index++) {
      if (peerConnections[index]?.camera_name === camera_name) {
        i = index
        break
      }
    }
    return i
  }

  const call = async (index: number, camera_name: string, videoEl: HTMLImageElement) => {
    peerConnections[index] = {
      camera_name: camera_name,
      peerConnection: null,
      dataChannel: null,
      user_name: null
    }
    await createPeerConnection(index, camera_name, videoEl)

    try {
      console.log('Creating offer...')
      let offer
      if (peerConnections[index].peerConnection) {
        offer = await peerConnections[index].peerConnection?.createOffer()
        console.log(offer)
        peerConnections[index].peerConnection?.setLocalDescription(offer)
      }

      if (offer) sendOffer(<string>peerConnections[index].camera_name, offer, userName)
    } catch (err) {
      console.log(err)
    }
  }

  const createPeerConnection = (
    index: number,
    camera_name: string,
    videoElement: HTMLImageElement
  ) => {
    return new Promise<void>(async (resolve, reject) => {
      peerConnections[index].peerConnection = await new RTCPeerConnection(peerConfiguration)
      peerConnections[index].camera_name = camera_name
      peerConnections[index].user_name = userName

      peerConnections[index].peerConnection?.addEventListener(
        'signalingstatechange',
        (event: any) => {
          console.log(event)
          if (peerConnections[index].peerConnection)
            console.log(peerConnections[index].peerConnection?.signalingState)
        }
      )
      peerConnections[index].peerConnection?.addEventListener(
        'icecandidate',
        (e: { candidate: any }) => {
          console.log('........Ice candidate found!......')
          console.log(e)
          if (e.candidate) {
            sendIceCandeates(userName, e.candidate, <string>peerConnections[index].camera_name)
          }
        }
      )
      peerConnections[index].dataChannel = <RTCDataChannel>peerConnections[
        index
      ].peerConnection?.createDataChannel('chat', {
        negotiated: true,
        id: 0
      })
      if (peerConnections[index] != null && peerConnections[index].dataChannel != null)
        //if(peerConnections[index].dataChannel)
        peerConnections[index].dataChannel.onopen = (event: any) => {
          if (peerConnections[index].dataChannel)
            peerConnections[index].dataChannel.send('Hi!>lnkyutgghkvjhbutyrtwqtexc')
        }
      peerConnections[index].dataChannel.onmessage = (event: { data: any }) => {
        //console.log(event.data)
        console.log('msg')
        // if(logger)
        //   logger.innerHTML+= `<div>data channel msg -- ${event.data}</div>`
        if (videoElement) {
          videoElement.src = 'data:image/jpeg;base64,' + event.data
        } else {
          console.log('no video')
        }
      }
      resolve()
    })
  }

  const addAnswer = async (index: number, offerObj: { answer: RTCSessionDescriptionInit }) => {
    if (peerConnections[index])
      if (peerConnections[index].peerConnection)
        await peerConnections[index].peerConnection?.setRemoteDescription(offerObj.answer)
  }

  const addNewIceCandidate = (index: number, iceCandidate: RTCIceCandidateInit | undefined) => {
    if (peerConnections[index]) peerConnections[index].peerConnection?.addIceCandidate(iceCandidate)
    console.log('======Added Ice Candidate======')
  }

  const dash = dashboardStore()
  const route = useRoute()
  const pageContent = pageFiller()
  const pusherStore = usePushertore()
  const pusher = new Pusher('c00790363bec04452136', {
    cluster: 'us3'
  })

  const connectPusher = () => {
    const channel = pusher.subscribe('new_updates')

    const userChannel = pusher.subscribe(userName + '_channel')

    userChannel.bind('answerResponse', function (data: any) {
      addAnswer(0, data)
    })

    userChannel.bind('recieve_ice_candidate', function (data: any) {
      addNewIceCandidate(0, data.icecandedate)
    })

    channel.bind('pusher:subscription_succeeded', () => {
      console.log('subscription succeeded')
      pusherStore.setScokrt_id(pusher.connection.socket_id)
      console.log('subscription succeeded')
    })

    channel.bind('msg', (msg: any) => {
      console.log(msg)
      console.log(route.name)
      if (route.name == 'all__logs' || route.name == 'all_logs') {
        pageContent.add(msg)
        console.log('---------------------------------------------------')
      }
      dash.updateDashboard(msg)
      dash.key = dash.key + 1
    })
  }

  const disconnetPusher = () => {
    pusher.unsubscribe('new_updates')
  }
  return {
    connectPusher,
    disconnetPusher,
    call
  }
})
