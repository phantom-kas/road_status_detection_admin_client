import { sendIceCandeates, sendOffer } from './handle_signaling'
//import { videoElement } from '../main'
export const answerEl = document.querySelector('#answer')

let count_test = 0

export const increasCount = (): Number => {
  count_test = count_test + 1
  return count_test
}

export const userName = 'Rob-' + Math.floor(Math.random() * 100000)
export type peerObjType = {
  camera_name: string | null
  peerConnection: RTCPeerConnection | null
  dataChannel: RTCDataChannel | null
  user_name: String | null
}

export const peerConnections: peerObjType[] = []

const peerConfiguration = {
  iceServers: [
    {
      urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302']
    }
  ]
}

export const whichPeerConnection = (camera_name: String) => {
  let i: boolean | number = false

  for (let index = 0; index < peerConnections.length; index++) {
    if (peerConnections[index]?.camera_name === camera_name) {
      i = index
      break
    }
  }
  return i
}

export const call = async (index: number, camera_name: string) => {
  peerConnections[index] = {
    camera_name: camera_name,
    peerConnection: null,
    dataChannel: null,
    user_name: null
  }
  await createPeerConnection(index, camera_name)

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
  videoElement: { src: string } | undefined
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
    peerConnections[index].dataChannel = <RTCDataChannel>(
      peerConnections[index].peerConnection?.createDataChannel('chat', { negotiated: true, id: 0 })
    )
    if (peerConnections[index] != null && peerConnections[index].dataChannel != null)
      //if(peerConnections[index].dataChannel)
      peerConnections[index].dataChannel.onopen = (event: any) => {
        if (peerConnections[index].dataChannel)
          peerConnections[index].dataChannel.send('Hi!>lnkyutgghkvjhbutyrtwqtexc')
      }
    peerConnections[index].dataChannel.onmessage = (event: { data: any }) => {
      console.log(event.data)
      // if(logger)
      //   logger.innerHTML+= `<div>data channel msg -- ${event.data}</div>`
      if (videoElement) {
        videoElement.src = 'data:image/jpeg;base64,' + event.data
      }
    }
    resolve()
  })
}

export const addAnswer = async (index: number, offerObj: { answer: RTCSessionDescriptionInit }) => {
  if (peerConnections[index])
    if (peerConnections[index].peerConnection)
      await peerConnections[index].peerConnection?.setRemoteDescription(offerObj.answer)
}

export const addNewIceCandidate = (
  index: number,
  iceCandidate: RTCIceCandidateInit | undefined
) => {
  if (peerConnections[index]) peerConnections[index].peerConnection?.addIceCandidate(iceCandidate)
  console.log('======Added Ice Candidate======')
}
