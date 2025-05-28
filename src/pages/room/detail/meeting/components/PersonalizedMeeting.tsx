import React, { useEffect, useRef } from "react"


// declare global {
//   interface Window {
//     JitsiMeetExternalAPI: any
//   }
// }

interface PersonalizedMeeting {
  appId: string
  roomName: string
  jwt: string
  configOverwrite?: object
  interfaceConfigOverwrite?: object
  spinner?: JSX.Element
  onApiReady?: (api: any) => void
}

export function PersonalizedMeeting({
  appId,
  roomName,
  jwt,
  configOverwrite = {},
  interfaceConfigOverwrite = {},
  spinner,
  onApiReady,
}: PersonalizedMeeting) {
  const jitsiContainerRef = useRef(null)

  useEffect(() => {
    const loadJitsiScript = () => {
      const existingScript = document.getElementById("jitsi-script")
      if (!existingScript) {
        const script = document.createElement("script")
        script.src = "https://8x8.vc/external_api.js"
        script.id = "jitsi-script"
        document.body.appendChild(script)
        script.onload = () => {
          initializeJitsi()
        }
      } else {
        initializeJitsi()
      }
    }

    const initializeJitsi = () => {
      if (window.JitsiMeetExternalAPI) {
        const domain = "8x8.vc"
        const options = {
          roomName,
          parentNode: jitsiContainerRef.current,
          configOverwrite,
          interfaceConfigOverwrite,
          jwt,
        }
        const api = new window.JitsiMeetExternalAPI(domain, options)
        if (onApiReady) {
          onApiReady(api)
        }
      } else {
        console.error("JitsiMeetExternalAPI not loaded")
      }
    }

    loadJitsiScript()

    return () => {
      if (jitsiContainerRef.current) {
        jitsiContainerRef.current.innerHTML = ""
      }
    }
  }, [roomName, jwt, configOverwrite, interfaceConfigOverwrite, onApiReady])

  return (
    <div>
      {spinner}
      <div ref={jitsiContainerRef} style={{ height: "600px" }} />
    </div>
  )
}