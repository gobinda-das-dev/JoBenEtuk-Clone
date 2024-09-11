import React, { useRef } from 'react'
import Image from '../reusable/Image'
import Video from '../reusable/Video'
import Infos from './Infos';
import NextProject from './NextProject';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Page1 = () => {
   const enter = useRef(null)
   const main = useRef(null)
   
   const textures = [
      {
         "src": "https://images.ctfassets.net/oygmu41f0lwe/3RZBbm25mTOh9w8X2I43Jx/b58289ab3e8fed29dfa2edbdebe9b1a2/Moniverse.png?fm=avif&q=100&w=1464&h=1632",
         "type": "Asset"
      },
      {
         "src": "https://videos.ctfassets.net/oygmu41f0lwe/1SkQl4ibu3kuVgha2Kc2xG/3e60caaf881e433428c887f1f132735b/Hero.mp4",
         "type": "Video"
      },
      {
         "src": "https://images.ctfassets.net/oygmu41f0lwe/jYdT6wZ4C7cJ1glcL3GDM/0918bcac0b6d65c35895a1e3456a5109/Frame_1000008070.jpg?fm=avif&q=100&w=1964&h=1312",
         "type": "Image"
      },
      {
         "src": "https://videos.ctfassets.net/oygmu41f0lwe/53byNb53idZa0L9byGc3CP/d9cca17beafa279562890fe7c9c7b87c/Section_2.mp4",
         "type": "Video"
      },
      {
         "src": "https://images.ctfassets.net/oygmu41f0lwe/57YjgTP1gy96LnVV7rwO3i/94a44dae4e8d1235408961528e32b3ad/Frame_1000008071.jpg?fm=avif&q=100&w=1964&h=1312",
         "type": "Image"
      },
      {
         "src": "https://videos.ctfassets.net/oygmu41f0lwe/6jk6NsvhkbfCi5K6aU6XgE/c14dd50afb854b3047375e113be916dd/Section_3.mp4",
         "type": "Video"
      },
      {
         "src": "https://images.ctfassets.net/oygmu41f0lwe/2YV5rhpx8IMY1JfeSCXIc3/98f563326d44ac7e02b97acac0901246/Frame_1000008072.jpg?fm=avif&q=100&w=1964&h=1312",
         "type": "Image"
      },
      {
         "src": "https://images.ctfassets.net/oygmu41f0lwe/75ElMJYMjg73p5Uo5bSsSV/9583c18c1914f39fa0544113b2c29802/Frame_1000008073.jpg?fm=avif&q=100&w=1964&h=1312",
         "type": "Image"
      },
      {
         "src": "https://videos.ctfassets.net/oygmu41f0lwe/1id9uQ19K87mpH8mDRpjoJ/2d23936e0410089d26e0a9d16e391da7/FInal_Section.mp4",
         "type": "Video"
      }
   ];

   useGSAP(() => {
      gsap.set(enter.current, {
         yPercent: 100,
         scale: 0.8
      })
      gsap.set('canvas', {opacity: 0})
      
      gsap.delayedCall(4, () => {
         gsap.timeline()
         .to(enter.current, {
            duration: 1,
            ease: 'expo',
            yPercent: 0,
         })
         .to(enter.current, {
            scale: 1,
            duration: 1,
            ease: 'expo.inOut',
         }, '-=0.5')
         .to(enter.current, {opacity: 0, ease: 'power1.in'})
         .to([main.current, 'canvas'], {opacity: 1, stagger: 1.6}, '<')
         .set(enter.current, {display: 'none'})
      })
   }, [])


   return (
      <>
         <div ref={enter} className='w-full h-screen bg-[#1a1b22] fixed top-0 left-0'></div>
         <main ref={main} className='w-full bg-[#1a1b22] opacity-0 px-[15vw] py-[5vh]'>
            <Infos />



            {textures.map(texture => {
               if (texture.type !== 'Video') {
                  return (
                     <Image src={texture.src} key={texture.src} className='w-full my-[2vw] cursor-pointer' />
                  )
               } else {
                  return (
                     <Video src={texture.src} key={texture.src} className='w-full my-[2vw] cursor-pointer' />
                  )
               }
            })}

            <NextProject />
         </main>
      </>
   )
}

export default Page1
