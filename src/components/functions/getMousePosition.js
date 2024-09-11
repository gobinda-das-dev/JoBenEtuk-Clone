import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";

const getMousePosition = (lerpAmount = 0.1) => {
  const mouse = { x: 0, y: 0 };
  const smoothMouse = { x: 0, y: 0 };
  const deltaMouse = { x: 0, y: 0 };
  const {viewport} = useThree();
  const lerp = (x, y, a) => x * (1 - a) + y * a;
  

  window.addEventListener('mousemove', ({ x, y }) => {
    mouse.x = gsap.utils.mapRange(0, innerWidth, 0, 1, x);
    mouse.y = gsap.utils.mapRange(0, innerHeight, 0, 1, y);
  });


  useFrame(() => {
    smoothMouse.x = lerp(smoothMouse.x, mouse.x, lerpAmount);
    smoothMouse.y = lerp(smoothMouse.y, mouse.y, lerpAmount);

    deltaMouse.x = mouse.x - smoothMouse.x;
    deltaMouse.y = mouse.y - smoothMouse.y;
  });

  return {
    mouse,
    smoothMouse,
    deltaMouse
  };
}

export default getMousePosition
