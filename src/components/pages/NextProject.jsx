import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)
const NextProject = () => {
   const nextLink = useRef(null)

   useGSAP(() => {
      const letters = nextLink.current.textContent.split('');

      nextLink.current.innerHTML = '';
      letters.forEach(letter => {
         nextLink.current.innerHTML += `
            <span class="inline-block">${letter}</span>
         `;
      })


      gsap.from('span', {
         yPercent: 100,
         opacity: 0,
         stagger: 0.05,
         delay: 0.5,
         ease: 'expo.out',
         duration: 1,
         scrollTrigger: {
            start: 'top 80%',
            trigger: nextLink.current
         }
      })
   }, {scope: nextLink})

   return (
      <div className='text-center flex flex-col items-center pt-[10vh] pb-[15vh]'>
         <p className='uppercase font-bold text-sm'>next project</p>
         <a ref={nextLink} href="" className='cursor-pointer text-[10vw] uppercase font-extrabold leading-none flex overflow-hidden'>adbc</a>
      </div>
   )
}

export default NextProject
