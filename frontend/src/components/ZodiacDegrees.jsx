import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RotatingGraphicSVG from "./rotatingGraphic"; 


gsap.registerPlugin(ScrollTrigger);

const ZodiacalDegrees = () => {
  const svgRef = useRef(null); 
  const animationRef = useRef(null); 

  useEffect(() => {
   
    animationRef.current = gsap.to(svgRef.current, {
      rotation: 360, 
      duration: 60,  
      repeat: -1,    
      ease: "linear", 
      transformOrigin: "center center", 
      paused: true, 
    });

   
    const trigger = ScrollTrigger.create({
      trigger: svgRef.current, 
      start: "top center",     
      end: "bottom center",    
      onEnter: () => animationRef.current.play(),
      onLeave: () => animationRef.current.pause(),
      onEnterBack: () => animationRef.current.play(),
      onLeaveBack: () => animationRef.current.pause(),
    });

   
    return () => {
      if (animationRef.current) {
        animationRef.current.kill(); 
      }
      trigger.kill();
    };
  }, []);

  return (
    <div className="bg-gradient-to-b bg-[#f5f8f3] py-20 px-8">
      <div className="max-w-7xl mx-auto">
     
        <h1 className="text-6xl raleway-font font-semibold text-[#844c22] text-center mb-16">
          Discover the Mystical Zodiacal Degrees
        </h1>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
  
          <div className="relative flex justify-center items-center">
            <div
              ref={svgRef}
              className="w-80 h-80 md:w-96 md:h-96 drop-shadow-2xl"
              style={{ willChange: "transform", transform: "translateZ(0)" }}
            >
              <RotatingGraphicSVG className="w-full h-full" />
            </div>
          </div>


          <div className="space-y-6 text-[#4a4a4a] transform transition duration-500 ease-in-out opacity-0 translate-y-5 animate-fadeIn">
            <h2 className="text-3xl md:text-5xl lg:text-5xl raleway-font leading-tight">
              Unlock the Power of{" "}
              <span className="italic text-[#965a3e]">Zodiacal Degrees</span>
            </h2>
            <p className="mt-6 text-base raleway-font md:text-lg text-gray-700">
              Zodiacal degrees are an ancient astrological tool, each holding a
              unique vibration and message. These degrees signify pivotal
              energies in our lives, helping us connect with universal truths,
              understand our purpose, and navigate life with greater clarity.
            </p>
            <p className="mt-6 text-base raleway-font md:text-lg text-gray-700">
              By understanding these cosmic markers, we can harness their power
              to overcome challenges, embrace opportunities, and align our
              decisions with our highest potential. They offer a roadmap to
              self-discovery and spiritual growth, guiding us to uncover the
              hidden layers of our personality and destiny.
            </p>
            <p className="mt-6 text-base raleway-font md:text-lg text-gray-700">
              Whether it's gaining deeper insights into relationships, careers,
              or life transitions, the wisdom of zodiacal degrees can empower
              us to lead more fulfilling and meaningful lives.
            </p>

            <button className="mt-8 px-6 py-3 bg-[#965a3e] raleway-font text-white rounded-full hover:bg-[#7d4a33] transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZodiacalDegrees;
