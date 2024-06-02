import axios from 'axios'
const BASEURL = axios.getUri()
export const sendOffer = async (
  camera_name: string,
  offer: RTCSessionDescriptionInit,
  admin_name: string
) => {
  const data = await fetch(BASEURL + 'webrtc_signal/send_offer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      admin_name,
      offer,
      camera_name: camera_name
    })
  })

  return data.json
}

export const sendIceCandeates = async (
  from_user: String,
  icecandedate: RTCIceCandidate,
  to_user: string
) => {
  const data = await fetch(BASEURL + 'webrtc_signal/send_ice_candidates', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from_user,
      icecandedate,
      to_user
    })
  })
  return data.json
}
