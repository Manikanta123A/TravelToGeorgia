import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react"; 
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calculator, ForkKnife, Map, Plane, TimerIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);
const Second = ()=>{
   const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const textRef2 = useRef<HTMLHeadingElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null)
  useGSAP(() => {
        gsap.to(textRef2.current, {
            x:"300px", 
            y:"-200px",// Moves right
            opacity: 0.5,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
              pin: false
            },
          });
          gsap.fromTo(
            toolsRef.current,
            { opacity: 0, x: "-100%" }, // Initially off-screen to the left
            {
              opacity: 1,
              x: "0%",
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "bottom 30%", // Triggers when scrolling is finished
                toggleActions: "play reverse play reverse",
               
              },
            }
          );
          gsap.to(textRef.current, {
            transform: "translateX(-250%)", // Moves text to the left
            opacity: 0.5,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
              pin:true
            },
          });

    },[]);
    const navigate = useNavigate();
    const handleClick = (e:React.MouseEvent<HTMLElement>)=>{
        const id:string = (e.target as HTMLElement).id;
        (e.target as HTMLElement).classList.add("fall");
        setTimeout(()=>{
            (e.target as HTMLElement).classList.remove("fall");
        },3000)
        setTimeout(()=>{
            if(id == "L"){navigate("/map")}
            else if(id == "T") {navigate("/show")}
            else if (id == "F") {navigate("/food")}
            else {navigate("/cal")}
        },3002)
    }
    return(
        <>
        <div ref={containerRef} className=" relative h-screen bg-gradient-to-r p-2 from-blue-500 via-purple-500 to-pink-500 animate-gradient flex justify-center items-center">
        <h1  ref={textRef2} >
        <Plane className="md:w-20 md:h-20 w-10 h-10 text-yellow-400"/>
        </h1>
        <h1 ref={textRef} className="md:text-6xl text-3xl font-extrabold text-white text-center">
            Travel to Georgia
        </h1>


        <div ref={toolsRef} className=" absolute top-1/2 left-1/2 mt-10  -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center gap-10 items-center opacity-0">
            <div className="gravity-btn hover:shadow-2xl flex justify-center items-center hover:border-4  md:text-5xl  hover:cursor-grab relative text-center mt-2 mb-2 md:w-100 h-15 w-50 border text-red-900 " onClick={handleClick} id="c" >Caluculator <Calculator className="absolute inset-y-4 right-5 font-bold text-5xl"/> </div>
            <div className="gravity-btn hover:shadow-2xl flex justify-center items-center hover:border-4 md:text-5xl text-center mt-2 mb-2 h-15 w-50 md:w-100 hover:cursor-grab border text-red-900 relative"  onClick={handleClick}  id="T">TimeLine<TimerIcon className="absolute inset-y-4 right-5 font-bold text-5xl"/> </div>
            <div className="gravity-btn hover:shadow-2xl flex justify-center items-center hover:border-4 md:text-5xl text-center mt-2 mb-2 h-15 w-50 md:w-100 border hover:cursor-grab text-red-950 relative" onClick={handleClick} id="L">Location <Map className="absolute inset-y-4 right-5 font-bold text-5xl"/> </div>
            <div className="gravity-btn hover:shadow-2xl flex justify-center items-center hover:border-4 md:text-5xl text-center mt-2 mb-2 h-15 w-50 md:w-100 border hover:cursor-grab text-red-950 relative" onClick={handleClick} id="F">Famous Food <ForkKnife className="absolute inset-y-4 right-5 font-bold text-5xl"/> </div>
            {/* <div className="gravity-btn hover:shadow-2xl flex justify-center items-center hover:border-4 md:text-5xl text-center mt-2 mb-2 h-15 w-50 md:w-100 border hover:cursor-grab text-red-950 relative" onClick={handleClick} id="L">Group Chat <MessageCircleIcon className="absolute inset-y-4 right-5 font-bold text-5xl"/> </div>*/}
        </div> 
        </div>
        </>
    )
}

export default Second;

