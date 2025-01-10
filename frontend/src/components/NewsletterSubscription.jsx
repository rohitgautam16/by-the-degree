import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const NewsletterSubscription = () => {
  const sectionRef = useRef();
  const headingRef = useRef();
  const textRef = useRef();
  const formRef = useRef();
  const footerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 1, ease: "power2.out" },
      });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0 }
      )
        .fromTo(
          textRef.current,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0 },
          "-=0.5"
        )
        .fromTo(
          formRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1 },
          "-=0.5"
        )
        .fromTo(
          footerRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0 },
          "-=0.5"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="bg-gradient-to-b bg-[#f5f8f3] py-32 px-8"
    >
      <div className="max-w-5xl mx-auto text-center space-y-16">
        <h2
          ref={headingRef}
          className="text-6xl raleway-font font-semibold text-[#844c22] leading-tight"
        >
          Join Our Mystical Journey
        </h2>
        <p
          ref={textRef}
          className="text-2xl raleway-font text-gray-700 max-w-3xl mx-auto leading-relaxed"
        >
          Unlock the secrets of the universe. Subscribe to receive cosmic
          insights, astrological updates, and exclusive content, tailored for
          you.
        </p>

        <form
          ref={formRef}
          className="flex flex-col md:flex-row items-center gap-8 justify-center"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full md:w-2/3 lg:w-1/2 px-4 py-3 text-lg raleway-font text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#965a3e] transition-all duration-300 shadow-lg"
          />
          <button
            type="submit"
            className="px-7 py-3 bg-[#965a3e] text-white raleway-font text-lg rounded-lg hover:bg-[#7d4a33] transition-all duration-300 shadow-lg"
          >
            Subscribe
          </button>
        </form>

   
        <div className="w-full h-[1px] bg-gray-300 mx-auto"></div>

 
        <div
          ref={footerRef}
          className="text-center text-sm raleway-font text-gray-600 mt-10"
        >
          <p>We respect your privacy and will never spam you. Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscription;
