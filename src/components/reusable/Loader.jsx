import { useImageAsTexture } from '@14islands/r3f-scroll-rig';
import { useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import { useControls } from 'leva';
import vertex from '../../shaders/bending/vertex.glsl';
import fragment from '../../shaders/bending/fragment.glsl';
import { Vector2, Vector3 } from 'three';
import gsap from 'gsap';

function Loader({ imgRef, scrollState, dir, ...props }) {
   const {clamp, mapRange} = gsap.utils;
   const shift = distanceFromCentreOfImage(props);

   const ref = useRef();
   const texture = useImageAsTexture(imgRef);
   const visibleRange = 0;
   const min = 0.5 - visibleRange / 2;
   const max = 0.5 + visibleRange / 2;
   let shouldFlip = false;

   const uniforms = useMemo(() => ({
      uTexture: { value: texture },
      uTextureSize: { value: new Vector2(texture.image.width, texture.image.height) },
      uQuadSize: { value: new Vector2(props.scale[0], props.scale[1]) },
      uSize: {value: 2},
      uProgress: { value: 0.0 },
      uFlip: { value: true },
      uShift: { value: shift }
   }), [texture, props.scale]);

   useFrame(() => {
      const p = scrollState.progress;
      
      let progress = 0;

      let progress1 = clamp(0, min, p);
      progress1 = mapRange(0, min, 1, 0, progress1);

      let progress2 = clamp(max, 1, p);
      progress2 = mapRange(max, 1, 0, 1, progress2);



      shouldFlip = (p < min) ? false : true;
      progress = (p < min) ? progress1 : progress2;
      ref.current.material.uniforms.uFlip.value = shouldFlip;
      ref.current.material.uniforms.uProgress.value = progress;
   });

   return (
      <mesh ref={ref} {...props}>
         <planeGeometry args={[1, 1, 100, 100]} />
         <shaderMaterial
            wireframe
            vertexShader={vertex}
            fragmentShader={fragment}
            uniforms={uniforms}
            transparent
            side={2}
         />
      </mesh>
   );
}

export default Loader;


function distanceFromCentreOfImage(props) {
   const img = props.track.current;
   const {width, left} = img.getBoundingClientRect();

   const leftDistance = left + width / 2;
   const percent = 1 - (leftDistance / window.innerWidth);
   const myNeed = (percent - 0.5);

   return myNeed;
}