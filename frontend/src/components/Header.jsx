import React, { useState, useEffect, useRef } from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { HiMenuAlt4 } from "react-icons/hi";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      const timeline = gsap.timeline();

      // Animation for the fullscreen menu
      timeline.fromTo(
        menuRef.current,
        { x: "-100%" },
        { x: "0%", duration: 0.6, ease: "power1.out" } // Smooth fade for fullscreen menu
      );

      // Animation for the menu items
      timeline.fromTo(
        menuItemsRef.current,
        { x: "-100%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          duration: 0.8,
          ease: "power1.out"// Stagger for individual menu items
        },
        "-=0.4" // Overlap with menu animation
      );
    } else {
      // Close animation for the menu
      gsap.to(menuRef.current, { x: "-100%", duration: 0.6, ease: "power1.in" });
    }
  }, [menuOpen]);

  return (
    <header className="bg-[#f5f8f3] text-[#46574a] raleway-font shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Menu toggle button */}
        <div
          className="text-2xl cursor-pointer hover:text-gray-500 transition duration-300"
          onClick={toggleMenu}
        >
          <HiMenuAlt4 />
        </div>

        {/* Logo */}
        <Link to="/" className="pl-24 text-3xl font-normal text-[#46574a]">
          BY THE DEGREE
        </Link>

        {/* Social icons */}
        <div className="flex items-center space-x-6">
          <FaInstagram className="cursor-pointer hover:text-gray-500" size={24} />
          <FiX className="cursor-pointer hover:text-gray-500" size={24} />
          <FaFacebookF className="cursor-pointer hover:text-gray-500" size={24} />
        </div>
      </div>

      <hr className="h-px bg-gray-500 mt-3" />

      {/* Fullscreen menu */}
      <div
        ref={menuRef}
        className={`fixed inset-0 bg-[#46574a] bg-opacity-95 z-50 flex flex-col items-center justify-center`}
      >
        {/* Close button */}
        <button
          className="absolute top-6 right-6 text-2xl text-gray-300 hover:text-white transition duration-300"
          onClick={toggleMenu}
        >
          <FiX />
        </button>

        {/* Menu items */}
        <div className="flex flex-col items-center space-y-8 text-white">
          {[
            { label: "Home", link: "/" },
            { label: "About", link: "#about" },
            { label: "Resources", link: "#resources" },
            { label: "Contact", link: "#contact" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="text-6xl font-medium drop-shadow-lg hover:text-gray-300 transition-all duration-300"
              ref={(el) => (menuItemsRef.current[index] = el)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
