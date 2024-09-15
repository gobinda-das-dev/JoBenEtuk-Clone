import { ScrollScene, UseCanvas } from "@14islands/r3f-scroll-rig"
import { useRef } from "react"
import WebGLVideo from "./WebGLVideo"

function Video({ src, className }) {
   const el = useRef(null)

   return (
      <>
         <video
            ref={el}
            className={"sm:opacity-0 " + className}
            src={src}
            crossOrigin="anonymous"
            autoPlay
            playsInline
            loop
            muted
         />
         <UseCanvas>
            <ScrollScene track={el}>
               {(props) => (
                  <WebGLVideo videoRef={el} {...props} />
               )}
            </ScrollScene>
         </UseCanvas>
      </>
   )
}



export default Video