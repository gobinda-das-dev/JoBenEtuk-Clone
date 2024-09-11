import { useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import vertex from '../../shaders/bending/vertex.glsl';
import fragment from '../../shaders/bending/fragment.glsl';
import { Vector2, VideoTexture } from 'three';
import { useScrollbar } from '@14islands/r3f-scroll-rig';

function WebGLVideo({ videoRef, scrollState, dir, ...props }) {
   const lenis = useScrollbar();

   const ref = useRef();
   const texture = new VideoTexture(videoRef.current);

   const uniforms = useMemo(() => ({
      uTexture: { value: texture },
      uTextureSize: { value: new Vector2(texture.image.width, texture.image.height) },
      uQuadSize: { value: new Vector2(props.scale[0], props.scale[1]) },
      uScrollVelocity: { value: 0 }
   }), [texture, props.scale]);


   lenis.onScroll((p) => {
      uniforms.uScrollVelocity.value = p.velocity;
   })

   useEffect(() => {
      videoRef.current.play();
   }, []);
   
   useFrame(() => texture.needsUpdate = true)



   return (
      <>
         <mesh ref={ref} {...props}>
            <planeGeometry args={[1, 1, 32, 32]} />
            <shaderMaterial
               vertexShader={vertex}
               fragmentShader={fragment}
               uniforms={uniforms}
               transparent
            />
         </mesh>
      </>
   );
}

export default WebGLVideo;