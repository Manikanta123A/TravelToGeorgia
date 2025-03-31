import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Pic from "./pic";
import axios from 'axios';
import MovingPlane from "@/trip";

const Show = () => {
  const bgRef = useRef(null);
  const tref = useRef<HTMLHeadingElement>(null)
  const tref2 = useRef<HTMLHeadingElement>(null)
  const scrollContainerref = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollContainerref2 = useRef<HTMLDivElement>(null)
  const scrollRef2 = useRef<HTMLDivElement>(null)
  const scrollContainerref3 = useRef<HTMLDivElement>(null)
  const scrollRef3 = useRef<HTMLDivElement>(null)
  const scrollContainerref4 = useRef<HTMLDivElement>(null)
  const scrollRef4 = useRef<HTMLDivElement>(null)
  
  const [day1,setDay1] = useState<any>([])
  const [day2,setDay2] = useState<any>([])
  const [day3,setDay3]= useState<any>([])
  const [day4,setDay4] = useState<any>([])

  useEffect(() => {
      const fetchData = async () => {
        gsap.to(bgRef.current, {
          backgroundPosition: "200% 0",
          duration: 10,
          repeat: -1,
          ease: "linear",
        });
        let r1 = await axios.post('https://backendplaces-9uzl.onrender.com/location/day', { number: 1 });
        console.log(r1)
        setDay1(r1.data.places)

        let r2 = await axios.post('https://backendplaces-9uzl.onrender.com/location/day', { number: 2 });
        setDay2(r2.data.places)

        let r3 = await axios.post('https://backendplaces-9uzl.onrender.com/location/day', { number: 3 });
        setDay3(r3.data.places)

        let r4= await axios.post('https://backendplaces-9uzl.onrender.com/location/day', { number: 4});
        setDay4(r4.data.places)

       
      };
      fetchData();
    }, []);
  useGSAP(()=>{
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: bgRef.current,
      start: "top top", // Starts when tref reaches 50% of viewport
      end: "bottom top", // Ends at 10% of viewport
      scrub: 1,
      markers:false,
      pin: true, 
    },
  });

  // Step 1: Zoom tref
  tl.to(tref.current, {
    scale: 3,
    duration: 1,
    ease: "power2.out",
  });

  // Step 2: Fade out tref (after zoom finishes)
  tl.to(tref.current, {
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  // Step 3: Fade in tref2 (only after tref fully fades out)
  tl.to(
    tref2.current,
    {
      opacity: 1,
      scale: 1,
      duration: 1,
      display:"flex",
      ease: "power2.out",
    },
    "+=0.5" // Add delay so tref2 appears after tref disappears
  );


//   gsap.to(scrollRef.current, {
//     x: () => scrollContainerref.current ? -scrollContainerref.current.scrollWidth + window.innerWidth : 0,
//     ease: "none",
//     scrollTrigger: {
//       trigger: scrollContainerref.current,
//       start: "top top",
//       end: () => scrollContainerref.current ? `+=${scrollContainerref.current.scrollWidth}` : "+=0",
//       scrub: 1,
//       pin: true,
//       anticipatePin: 1,
//     },
//   });
//   gsap.to(scrollRef2.current, {
//     x: () => scrollContainerref2.current ? -scrollContainerref2.current.scrollWidth + window.innerWidth : 0,
//     ease: "none",
//     scrollTrigger: {
//       trigger: scrollContainerref2.current,
//       start: "top top",
//       end: () => scrollContainerref2.current ? `+=${scrollContainerref2.current.scrollWidth}` : "+=0",
//       scrub: 1,
//       pin: true,
//       anticipatePin: 1,
//     },
//   });
}, []);
  return (
    <>
    <div
      ref={bgRef}
      className="h-screen w-full flex justify-center items-center text-white text-2xl md:text-5xl font-bold"
      style={{
        background: "linear-gradient(270deg, #ff7eb3, #ff758c, #ff5f6d, #ffc371)",
        backgroundSize: "400% 400%",
      }}
    >
       <h1 className="text-5xl" ref={tref}> 6 </h1>
       <h1 className="trip" style={{ fontFamily: "'Poppins', sans-serif" }} ref={tref2}> Day Trip </h1>
    </div>

    <MovingPlane/>
    { day1!==null? 
    <div className="flex justify-center items-center">
      <h1 className="text-red-600">It might take few second to load data</h1>
    </div> : <>
    <div ref={scrollContainerref} className=" relative w-full overflow-x-scroll min-h-screen  flex justify-center items-center whitespace-nowrap scrollbar-hide bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 ">
        <div ref={scrollRef} className="min-w-screen w-full rounded-full flex flex-row flex-nowrap gap-4 p-4">
        <style>
        {`
          @keyframes bgAnimation {
            0% { transform: translateX(-50%) translateY(-50%); }
            50% { transform: translateX(50%) translateY(50%); }
            100% { transform: translateX(-50%) translateY(-50%); }
          }
          .animate-bg {
            animation: bgAnimation 10s infinite alternate ease-in-out;
          }
        `}
      </style>
          {day1.map((place:any, index:number) => {
            return (
              <Pic place={place} key={index}/>
            )
})}
        </div>
    </div>
    <div ref={scrollContainerref2} className="w-full overflow-x-scroll min-h-screen flex justify-center items-center whitespace-nowrap scrollbar-hide bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 ">
        <div ref={scrollRef2} className="min-w-screen flex flex-row flex-nowrap gap-4 p-4">
        <style>
        {`
          @keyframes bgAnimation {
            0% { transform: translateX(-50%) translateY(-50%); }
            50% { transform: translateX(50%) translateY(50%); }
            100% { transform: translateX(-50%) translateY(-50%); }
          }
          .animate-bg {
            animation: bgAnimation 10s infinite alternate ease-in-out;
          }
        `}
      </style>
        {day2.map((place:any, index:number) => (
            <Pic place={place} key={index}/>
          ))}
        </div>
    </div>
    <div ref={scrollContainerref3} className="w-full overflow-x-scroll min-h-screen flex justify-center items-center whitespace-nowrap scrollbar-hide bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
    <style>
        {`
          @keyframes bgAnimation {
            0% { transform: translateX(-50%) translateY(-50%); }
            50% { transform: translateX(50%) translateY(50%); }
            100% { transform: translateX(-50%) translateY(-50%); }
          }
          .animate-bg {
            animation: bgAnimation 10s infinite alternate ease-in-out;
          }
        `}
      </style>
        <div ref={scrollRef3} className="min-w-screen flex flex-row flex-nowrap gap-4 p-4">
        {day3.map((place:any, index:number) => (
            <Pic place={place} key={index}/>
          ))}
        </div>
    </div>
    <div ref={scrollContainerref4} className="w-full overflow-x-scroll min-h-screen flex justify-center items-center whitespace-nowrap scrollbar-hide  bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
        <div ref={scrollRef4} className="min-w-screen flex flex-row flex-nowrap gap-4 p-4">
        <style>
        {`
          @keyframes bgAnimation {
            0% { transform: translateX(-50%) translateY(-50%); }
            50% { transform: translateX(50%) translateY(50%); }
            100% { transform: translateX(-50%) translateY(-50%); }
          }
          .animate-bg {
            animation: bgAnimation 10s infinite alternate ease-in-out;
          }
        `}
      </style>
        {day4.map((place:any, index:number) => (
            <Pic place={place} key={index}/>
          ))}
        </div>
    </div>
  </>
}
    {/* <div ref={scrollContainerref5} className="w-full overflow-x-scroll min-h-screen flex justify-center items-center whitespace-nowrap scrollbar-hide">
        <div ref={scrollRef5} className="min-w-screen flex flex-row flex-nowrap gap-4 p-4">
        {day5.map((place:any, index:number) => (
            <Pic place={place} key={index}/>
          ))}
        </div>
    </div> */}
   
    </>
  );
};

export default Show;
