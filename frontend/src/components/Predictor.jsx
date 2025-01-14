import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const Predictor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    place: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const places = [
    { value: "28.6139,77.2090", label: "Delhi, India" },
    { value: "19.0760,72.8777", label: "Mumbai, India" },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceChange = (selectedOption) => {
    setFormData({ ...formData, place: selectedOption.value });
  };

  const storeUserData = async (userData) => {
    try {
      await axios.post(`${process.env.REACT_APP_BY_THE_DEGREE_BACKEND_BASEURL}/users`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("User data saved successfully.");
    } catch (error) {
      console.error("Error saving user data:", error.response?.data || error.message);
    }
  };

  const calculateBirthInfo = async () => {
    const { name, email, date, time, place } = formData;
  
    if (!name || !email || !date || !time || !place) {
      alert("Please fill out all the fields.");
      return;
    }
  
    setLoading(true);
  
    try {
      const [lat, lon] = place.split(",");
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lon);
  
      const [year, month, day] = date.split("-");
      const [hour, minute] = time.split(":");
  
      const requestData = {
        year: parseInt(year),
        month: parseInt(month),
        date: parseInt(day),
        hours: parseInt(hour),
        minutes: parseInt(minute),
        seconds: 0,
        latitude: latitude,
        longitude: longitude,
        timezone: 5.5,
        observation_point: "topocentric", 
        ayanamsha: "lahiri", 
        language: "en", 
      };
  
      const response = await axios.post(
        "https://json.freeastrologyapi.com/planets/extended",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "xDDMMOj5cQaRJL0Epfxbg8nhbookNmox8vbmIsEY",
          },
        }
      );
  
      
      const outputData = response.data?.output;
  
      if (!outputData) {
        alert("Invalid API response. Please try again.");
        return;
      }
  
      
      const degreeData = Object.keys(outputData).map((planet) => {
        const planetData = outputData[planet];
        return {
          name: planet,
          normDegree: planetData.normDegree,
          fullDegree: planetData.fullDegree,
          currentSign: planetData.current_sign,
          zodiacSignName: planetData.zodiac_sign_name, 
        };
      }).filter(item => item.normDegree && item.fullDegree && item.currentSign && item.zodiacSignName); 
  
      if (!degreeData.length) {
        alert("No planetary degree data available. Please try again.");
        return;
      }
  
      const userData = { name, email, date, time, place };
      await storeUserData(userData);
  
      navigate("/fetchedPredictions", { state: { degreeData } });
    } catch (error) {
      console.error("Error fetching planetary data:", error.response?.data || error.message);
      alert("An error occurred while fetching planetary data. Please check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };
  
  
  

  useEffect(() => {
    gsap.fromTo(
      ".left-section",
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1 }
    );
    gsap.fromTo(
      ".right-section",
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1 }
    );
  }, []);

  return (
    <div className="h-4/6 bg-[#f5f8f3] flex raleway-font items-center justify-center px-2 py-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 mr-6">
        <div className="left-section raleway-font flex flex-col justify-center space-y-4">
          <h1 className="text-4xl md:text-5xl text-[#4a4a4a] leading-snug">
            Discover Your <span className="text-[#965a3e] italic">Celestial Journey</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 raleway-font leading-relaxed">
            Unearth the secrets of the stars and uncover how celestial bodies influence your life. Try our cutting-edge
            predictor to gain personalized astrological insights tailored just for you.
          </p>
        </div>
        <div className="right-section bg-white shadow-lg raleway-font rounded-lg py-4 px-6">
          <h2 className="text-2xl font-semibold text-center text-[#4a4a4a] mb-4">Fill Your Details</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#965a3e] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#965a3e] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#965a3e] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                Time of Birth
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#965a3e] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="place" className="block text-sm font-medium text-gray-700">
                Place of Birth
              </label>
              <Select
                options={places}
                onChange={handlePlaceChange}
                placeholder="Select your place"
                className="mt-1"
              />
            </div>
            <button
              onClick={calculateBirthInfo}
              className={`w-full ${
                loading
                  ? "bg-[#965a3e] text-white rounded-lg py-3 text-lg hover:bg-[#7d4a3e] transition duration-300 cursor-not-allowed"
                  : "bg-[#965a3e] text-white rounded-lg py-3 text-lg hover:bg-[#7d4a3e] transition duration-300"
              }`}
              disabled={loading}
            >
              {loading ? "Calculating..." : "Calculate Birth Info"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predictor;
