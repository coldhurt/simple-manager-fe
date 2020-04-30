import React, { useEffect, createRef } from 'react'
import { HeaderBar } from '../../../components'
import getSocket from '../socket'
import { useParams } from 'react-router-dom'

const VideoConnect = () => {
  const myVideo = createRef<HTMLVideoElement>()
  const friendVideo = createRef<HTMLVideoElement>()
  const socket = getSocket()
  const params = useParams<{ id: string }>()
  useEffect(() => {
    if (myVideo.current && friendVideo.current && params.id && socket)
      socket.startVideo(params.id, myVideo.current, friendVideo.current)
    return socket.closeVideo
  }, [myVideo, friendVideo, params.id, socket])
  return (
    <div>
      <HeaderBar showBack={true} title='视频' />
      <video ref={myVideo} height={400} width={window.screen.width} autoPlay />
      <video
        ref={friendVideo}
        height={400}
        width={window.screen.width}
        autoPlay
      />
    </div>
  )
}

export default {
  view: VideoConnect,
}
