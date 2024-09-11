import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";


const Loader = () => {
   const loader = useRef(null);
   const overlayPath = useRef(null);
   const progressCon = useRef(null);
   const progressMonitor = useRef(null);
   const progressMonitorContainer = useRef(null);
   

   const paths = {
      step1: {
         unfilled: 'M 0 100 V 100 Q 50 100 100 100 V 100 z',
         inBetween: {
            curve1: 'M 0 100 V 50 Q 50 0 100 50 V 100 z',
            curve2: 'M 0 100 V 50 Q 50 100 100 50 V 100 z'
         },
         filled: 'M 0 100 V 0 Q 50 0 100 0 V 100 z',
      },
      step2: {
         filled: 'M 0 0 V 100 Q 50 100 100 100 V 0 z',
         inBetween: {
            curve1: 'M 0 0 V 50 Q 50 0 100 50 V 0 z',
            curve2: 'M 0 0 V 50 Q 50 100 100 50 V 0 z'
         },
         unfilled: 'M 0 0 V 0 Q 50 0 100 0 V 0 z',
      }
   };

   useGSAP(() => {
      const pathTw = gsap.to(progressCon.current, {
         strokeDashoffset: 0,
         duration: 2,
         delay: 1,
         ease: 'expo.inOut',
         onUpdate() {
            let progress = pathTw.progress()
            progress = gsap.utils.clamp(0, 100, progress * 200)
            progressMonitor.current.textContent = Math.round(progress) + "%";
         }
      }, 0)

      
      const tl = gsap.timeline({
         onComplete: () => loader.current.remove()
      })
         .to('body', {opacity: 1})
         .add(pathTw)
         .to(progressMonitorContainer.current, { opacity: 0 })

         .set(overlayPath.current, {
            attr: { d: paths.step1.unfilled }
         })

         .set(overlayPath.current, {
            attr: { d: paths.step2.filled }
         })

         .to(overlayPath.current, {
            duration: 0.2,
            ease: 'sine.in',
            attr: { d: paths.step2.inBetween.curve1 }
         })
         .to(overlayPath.current, {
            duration: 1,
            ease: 'power4',
            attr: { d: paths.step2.unfilled }
         });
   }, [])



   return (
      <div ref={loader} className="h-screen w-full fixed top-0 left-0 z-10">
         <svg
            className="pointer-events-none h-full sm:w-full w-[200%] max-sm:-translate-x-1/4"
            // width="100%"
            // height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
         >
            <path
               ref={overlayPath}
               className="overlay__path pointer-events-auto"
               vectorEffect="non-scaling-stroke"
               d="M 0 100 V 0 Q 50 0 100 0 V 100 z"
               fill="#edeffa"
            />
         </svg>

         <div ref={progressMonitorContainer} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center">
            <svg className="overflow-visible -rotate-90" width="280" height="280">
               <circle cx="140" cy="140" r="139.5" className="fill-transparent stroke-[#1a1b22]/20"></circle>
               <circle cx="140" cy="140" r="139.5" className="fill-transparent stroke-[#1a1b22] stroke-2 progress" ref={progressCon} style={{ strokeDashoffset: 880, strokeDasharray: 880 }}></circle>
            </svg>

            <div className="absolute text-7xl font-medium progress-monitor text-[#1a1b22] font-safiro" ref={progressMonitor}>0%</div>
         </div>
      </div>
   )
}

export default Loader
