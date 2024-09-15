import { ScrollScene, styles, UseCanvas } from "@14islands/r3f-scroll-rig"
import { useRef } from "react"
import WebGLImage from "./WebGLImage"
import Loader from "./Loader"
import Lenis from "@studio-freight/lenis/types"

function Image({ src, className }) {
   const el = useRef(null)

   return (
      <>
         <img ref={el} className={"sm:opacity-0 " + className} src={src} />
         <UseCanvas>
            <ScrollScene track={el}>
               {(props) => (
                     <WebGLImage imgRef={el} {...props} />
               )}
            </ScrollScene>
         </UseCanvas>
      </>
   )
}



export default Image