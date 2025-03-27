import Pic from "@/Timeline/pic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const Day = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!scrollContainerRef.current || !scrollRef.current) return;

    const scrollWidth =
      (scrollContainerRef.current?.scrollWidth || 0) - window.innerWidth;

    gsap.to(scrollRef.current, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: "top top",
        end: `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true, // Recalculate values on resize
      },
    });
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="w-full overflow-x-scroll min-h-screen flex justify-center items-center whitespace-nowrap scrollbar-hide"
    >
      <div ref={scrollRef} className="min-w-screen flex flex-row flex-nowrap gap-4 p-4">
        <Pic />
        <Pic />
        <Pic />
        <Pic />
        <Pic />
      </div>
    </div>
  );
};

export default Day;
