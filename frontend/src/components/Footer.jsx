import React, { useEffect } from "react";
import gsap from "gsap";

const Footer = () => {
  useEffect(() => {
    
    const timeline = gsap.timeline({ delay: 0.2 });
    timeline
      .from(".footer-logo", {
        opacity: 0,
        y: 20,
        duration: 1.2,
        ease: "power3.out",
      })
      .from(
        ".footer-items",
        {
          opacity: 0,
          y: 20,
          duration: 1.2,
          stagger: 0.3,
          ease: "power3.out",
        },
        "-=0.8" 
      )
      .to(".footer-logo", { opacity: 1, duration: 0.3 }) 
      .to(".footer-items", { opacity: 1, duration: 0.3 }); 
  }, []);

  return (
    <footer className="bg-[#f5f8f3] text-[#46574a] py-16 px-8 border-t border-gray-500">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-col sm:flex-row">
    
        <div className="footer-logo text-left mb-12 flex flex-col items-start">
          <h1 className="text-4xl font-bold text-[#46574a] tracking-wide raleway-font">By the Degree</h1>
          <p className="italic text-sm text-gray-600 mt-2 raleway-font">"Unlock the power of your business."</p>
        </div>

  
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 footer-items text-center raleway-font sm:text-left">

          <div>
            <h3 className="text-lg font-semibold text-[#46574a] mb-4">About Us</h3>
            <ul className="space-y-2 text-sm">
              <li>Our Mission</li>
              <li>Leadership Team</li>
              <li>Careers</li>
            </ul>
          </div>


          <div>
            <h3 className="text-lg font-semibold text-[#46574a] mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>Consulting</li>
              <li>Product Development</li>
              <li>Customer Support</li>
            </ul>
          </div>


          <div>
            <h3 className="text-lg font-semibold text-[#46574a] mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>Blog</li>
              <li>Case Studies</li>
              <li>Help Center</li>
            </ul>
          </div>


          <div>
            <h3 className="text-lg font-semibold text-[#46574a] mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>info@bythedegree.com</li>
              <li>+1 (555) 555-5555</li>
              <li>Los Angeles, CA 12345</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center mt-12 text-sm text-gray-600 w-full py-6">
        <p>&copy; {new Date().getFullYear()} By the Degree. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
