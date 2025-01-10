import React, { useState } from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { HiMenuAlt4 } from "react-icons/hi";
import { Link } from 'react-router-dom'; 

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-[#f5f8f3] text-[#46574a] raleway-font shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <div 
          className="text-2xl cursor-pointer hover:text-gray-500 transition duration-300" 
          onClick={toggleMenu}
        >
          <HiMenuAlt4 />
        </div>

        <Link to="/" className="pl-24 text-3xl font-normal text-[#46574a]"> 
          BY THE DEGREE
        </Link> 

        <div className="flex items-center space-x-6">
          <FaInstagram className="cursor-pointer hover:text-gray-500" size={24} />
          <FiX className="cursor-pointer hover:text-gray-500" size={24} />
          <FaFacebookF className="cursor-pointer hover:text-gray-500" size={24} />
        </div>
      </div>

      <hr className="h-px bg-gray-500 mt-3" />

      <div 
        className={`fixed inset-0 bg-[#46574a] bg-opacity-95 z-50 flex flex-col transition-transform duration-500 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        <button 
          className="absolute top-6 right-6 text-2xl text-gray-300 hover:text-white transition duration-300" 
          onClick={toggleMenu}
        >
          <FiX />
        </button>

        <div className="flex flex-col items-start pl-12 pt-24 space-y-8 text-white">
          <Link to="/" className="text-6xl font-medium drop-shadow-lg hover:text-gray-300 transition-all duration-300"> 
            Home
          </Link> 
          <a href="#about" className="text-6xl font-medium hover:text-gray-300 transition-all duration-300"> 
            About
          </a> 
          <a href="#resources" className="text-6xl font-medium hover:text-gray-300 transition-all duration-300"> 
            Resources
          </a> 
          <a href="#contact" className="text-6xl font-medium hover:text-gray-300 transition-all duration-300"> 
            Contact
          </a> 
        </div>
      </div>
    </header>
  );
};

export default Header;