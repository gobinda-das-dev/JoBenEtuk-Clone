import { useImageAsTexture, useScrollbar } from '@14islands/r3f-scroll-rig';
import { useRef, useMemo } from 'react';
import vertex from '../../shaders/bending/vertex.glsl';
import fragment from '../../shaders/bending/fragment.glsl';
import { Vector2 } from 'three';

function WebGLImage({ imgRef, scrollState, dir, ...props }) {
   const lenis = useScrollbar();

   const ref = useRef(null);
   const texture = useImageAsTexture(imgRef);

   const uniforms = useMemo(() => ({
      uTexture: { value: texture },
      uTextureSize: { value: new Vector2(texture.image.width, texture.image.height) },
      uQuadSize: { value: new Vector2(props.scale[0], props.scale[1]) },
      uScrollVelocity: { value: 0 },
   }), [texture, props.scale]);

   lenis.onScroll((p) => {
      uniforms.uScrollVelocity.value = p.velocity;
   });

   return (
      <mesh
         ref={ref}
         {...props}
      >
         <planeGeometry args={[1, 1, 32, 32]} />
         <shaderMaterial
            vertexShader={vertex}
            fragmentShader={fragment}
            uniforms={uniforms}
            transparent
         />
      </mesh>
   );
}

export default WebGLImage;
