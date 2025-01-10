import React from "react";
import heroImg from "../assets/heroImg.png";

const Hero = () => {
  return (
    <section className="bg-[#f5f8f3] min-h-[90vh] flex items-center justify-center py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto lg:flex items-center gap-16">
       
        <div
          className="lg:w-1/2 text-[#4a4a4a] transform transition duration-500 ease-in-out opacity-0 translate-y-5 animate-fadeIn"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl raleway-font leading-tight">
          Unlock the Secrets of Your <span className="italic text-[#965a3e]">Future</span>
          </h1>
          <p className="mt-6 text-base raleway-font md:text-lg text-gray-700">
          Uncover your future with personalized astrology predictions based on your birth details. 
          Our platform blends ancient wisdom and modern technology to explore your zodiac, planetary 
          positions, and unique life path with unmatched accuracy
          </p>
          <button className="mt-8 px-6 py-3 bg-[#965a3e] raleway-font text-white rounded-full hover:bg-[#7d4a33] transition-all duration-300">
            About us
          </button>
        </div>

      
        <div
          className="lg:w-1/2 mt-12 lg:mt-0 relative transform transition duration-500 ease-in-out opacity-0 translate-y-5 animate-fadeIn"
        >
          <div className="overflow-hidden rounded-br-[150px] rounded-tl-[400px] shadow-lg">
            <img
              src={heroImg}
              alt="Celestial Image"
              className="object-cover w-full h-auto transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
