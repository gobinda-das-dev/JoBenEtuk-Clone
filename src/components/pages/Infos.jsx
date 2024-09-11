import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const Infos = () => {
   const blurDiv = useRef(null)
   const fakeBlurDiv = useRef(null)
   const homeTitle = useRef(null)
   const link = useRef(null)
   const storeLenis = useRef(null)

   useGSAP(() => {
      gsap.to(blurDiv.current, {
         scale: 0.5,
         opacity: 0,
         filter: 'blur(5px)',
         ease: 'power1.inOut',
         scrollTrigger: {
            scroller: 'body',
            trigger: fakeBlurDiv.current,
            scrub: true,
            // markers: true,
            start: 'top -20%',
            end: 'bottom -20%'
         }
      })
   }, [])

   useEffect(() => {
      fakeBlurDiv.current.style.height = blurDiv.current.getBoundingClientRect().height + 'px';
   }, []);
   
   useGSAP(() => {
      
      const title = new SplitType(homeTitle.current);
      const staggers = new SplitType('.space-y-1 span, .space-y-1 .para');

      staggers.lines.forEach((line) => {
         const wrapperDiv = document.createElement('div');
         wrapperDiv.style.overflow = 'hidden';
   
         line.parentNode.insertBefore(wrapperDiv, line);
         wrapperDiv.appendChild(line);
      });

      gsap.delayedCall(4, () => {
         window.scrollTo(0, 0)
         const loaderTl = gsap.timeline();

         loaderTl
            .from(title.chars, {
               yPercent: 100,
               opacity: 0,
               stagger: 0.05,
               delay: 1.6,
               ease: 'expo',
               duration: 1,
            })
            .from(staggers.lines, {
               yPercent: 100,
               stagger: 0.05
            }, '<0.05')
            .from(link.current, {opacity: 0})
            .to('main', {height: ''})
      })
   }, [])


   return (
      <section className="pb-[5vh]">
         <div ref={blurDiv} className='flex flex-col gap-5 sm:w-[50vw] w-[70vw] fixed left-1/2 -translate-x-1/2'>
            <h1 ref={homeTitle} className='text-[7vw] uppercase font-extrabold overflow-hidden flex'>Monieverse</h1>

            <div className='space-y-1'>
               <span className='bold-dark'>year</span>
               <p className='para'>2024</p>
            </div>
            <div className='space-y-1'>
               <span className='bold-dark'>about</span>
               <p className='para'>Monieverse, a registered financial institution, is dedicated to offering trade settlement services
                  to African businesses within a secure and dependable environment, ensuring safety and
                  reliability in transactions.</p>
            </div>
            <div className='space-y-1'>
               <span className='bold-dark'>role</span>
               <p className='para'>Creative Development, Product Engineering</p>
            </div>
            <div className='space-y-1'>
               <span className='bold-dark'>Stack</span>
               <p className='para'>Next JS, GSAP</p>
            </div>
            <div className='space-y-1'>
               <span className='bold-dark'>Collaborators</span>
               <p className='para'>Onoriode Aluya</p>
            </div>

            <a ref={link} href="" className='uppercase text-sm font-semibold text-blue-500 underline'>visit website</a>
         </div>

         <div ref={fakeBlurDiv}></div>
      </section>
   )
}

export default Infos
