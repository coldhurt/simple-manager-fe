import React, { useEffect, createRef } from 'react'
import { toast } from '../../../utils'
import { HeaderBar } from '../../../components'

const VideoConnect = () => {
  const ref = createRef<HTMLVideoElement>()
  useEffect(() => {
    if (ref)
      navigator.getUserMedia(
        { video: true, audio: false },
        (stream) => {
          if (ref.current) {
            try {
              ref.current.src = window.URL.createObjectURL(stream)
            } catch (e) {
              ref.current.srcObject = stream
            }
          }
        },
        (err) => {
          toast.error(err.message)
        }
      )
  }, [ref])
  return (
    <div>
      <HeaderBar showBack={true} title='视频' />
      <video ref={ref} height={400} width={window.screen.width} autoPlay />
    </div>
  )
}

export default {
  view: VideoConnect,
}
