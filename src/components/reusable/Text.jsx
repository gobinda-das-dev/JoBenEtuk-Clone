import { ScrollScene, UseCanvas, useScrollRig, styles } from '@14islands/r3f-scroll-rig'
import { WebGLText } from '@14islands/r3f-scroll-rig/powerups'
import { MeshDistortMaterial } from '@react-three/drei'
import { useRef } from 'react'

function Text({ children, className, font, as: Tag = 'span' }) {
   const el = useRef()
   return (
      <>
         <span ref={el} className={styles.transparentColorWhenSmooth + " " + className}>
            {children}
         </span>

         <UseCanvas>
            <ScrollScene track={el}>
               {(props) => (
                  <WebGLText
                     el={el}
                     font={font}
                     glyphGeometryDetail={16}
                     {...props}
                  >
                     {/* <MeshDistortMaterial  speed={1} distort={0.14} /> */}
                     {children}
                  </WebGLText>
               )}
            </ScrollScene>
         </UseCanvas>
      </>
   )
}

export default Text