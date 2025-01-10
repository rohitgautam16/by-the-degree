import React, { useEffect, useState } from "react";
import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";
import { motion } from "framer-motion";

const TodaysPrediction = () => {
  const [degreeData, setDegreeData] = useState([]);
  const [loading, setLoading] = useState(true);

  const mod360 = (angle) => angle % 360;

  const dms2real = (d, m, s) => d + m / 60 + s / 3600;

  const calcZodiac = (degree) => {
    const zodiacs = [
      "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
      "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
    ];
    return zodiacs[Math.floor(degree / 30)];
  };

  const calculateJulianDate = (date, time) => {
    const dateTime = new Date(`${date}T${time}`);
    return dateTime.getTime() / 86400000.0 + 2440587.5;
  };

  const calculateAyanamsa = (julianDate) => 23.452294 - 0.00001387 * (julianDate - 2451545);

  const calculatePlanetaryRA = (julianDate) => ({
    Sun: (julianDate * 0.98565) % 360,
    Moon: (julianDate * 13.176396) % 360,
    Mars: (julianDate * 0.524021) % 360,
    Mercury: (julianDate * 1.60214) % 360,
    Jupiter: (julianDate * 0.08309) % 360,
    Venus: (julianDate * 1.17434) % 360,
    Saturn: (julianDate * 0.03339) % 360,
    Rahu: mod360(180 + ((julianDate * 0.98565) % 360)),
    Ketu: mod360(((julianDate * 0.98565) % 360) - 180),
  });

  useEffect(() => {
    const fetchTodayPrediction = async () => {
      try {
        const currentDate = new Date();
        const date = currentDate.toISOString().split("T")[0]; 
        const time = currentDate.toTimeString().split(" ")[0]; 

        const latInput = "49N28";
        const lonInput = "123W12";
        const latDir = latInput.includes("N") ? 1 : -1;
        const lonDir = lonInput.includes("E") ? 1 : -1;

        const latitude = latDir * dms2real(
          parseInt(latInput.slice(0, 2)),
          parseInt(latInput.slice(2, 4)),
          0
        );
        const longitude = lonDir * dms2real(
          parseInt(lonInput.slice(0, 3)),
          parseInt(lonInput.slice(3, 5)),
          0
        );

        const julianDate = calculateJulianDate(date, time);
        const ayanamsa = calculateAyanamsa(julianDate);

        const raPositions = calculatePlanetaryRA(julianDate);

        const celestialBodies = Object.entries(raPositions).map(([name, ra]) => {
          const raCorrected = mod360(ra - ayanamsa);
          const degree = Math.ceil(raCorrected % 30);
          const zodiac = calcZodiac(raCorrected);
          return { name, degree, zodiac, ra: raCorrected.toFixed(2) };
        });

        const degreeTable = await Promise.all(
          celestialBodies.map(async (body) => {
            try {
              const response = await axios.post("http://localhost:3000/prediction", {
                zodiac: body.zodiac,
                degree: body.degree,
              });
              return { ...body, prediction: response.data.prediction };
            } catch (error) {
              return { ...body, prediction: "Error fetching prediction" };
            }
          })
        );

        setDegreeData(degreeTable);
      } catch (error) {
        console.error("Error fetching today's predictions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayPrediction();
  }, []);

  const cardStyle = {
    width: '20rem',
    height: 'auto',
    padding: '1.5rem',
    borderRadius: '15px',
    backgroundColor: '#fff',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 5px 15px -3px rgba(0, 0, 0, 0.05)',
    backdropFilter: 'blur(20px)',
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
    transition: 'transform 0.3s ease'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b bg-[#f5f8f3] flex flex-col items-center py-8 px-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl raleway-font text-[#4a4a4a] text-center mb-12 font-bold"
      >
        Current {" "}
        <span className="italic text-[#965a3e] no-underline">
          Degree's
        </span>
      </motion.h1>

      {loading ? (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="animate-pulse bg-white/50 rounded-[15px] w-[350px] h-[400px]"
            />
          ))}
        </div>
      ) : (
        <div className="w-full max-w-6xl">
          <Splide
            options={{
              type: "loop",
              perPage: 3,
              perMove: 1,
              autoScroll: {
                pauseOnHover: true,
                pauseOnFocus: true,
                speed: 0.8,
              },
              arrows: true,
              pagination: true,
              gap: "30px",
              breakpoints: {
                1024: {
                  perPage: 2,
                },
                768: {
                  perPage: 1,
                },
              },
              classes: {
                arrows: 'splide__arrows custom-arrows',
                arrow: 'splide__arrow custom-arrow',
                pagination: 'splide__pagination custom-pagination',
              },
            }}
            extensions={{ AutoScroll }}
          >
            {degreeData.map((body, index) => (
              <SplideSlide key={index}>
                <motion.div
                  whileHover={{ 
                    scale: 1.02,
                    rotateY: 5,
                    rotateX: 5,
                    transition: { duration: 0.2 }
                  }}
                  style={cardStyle}
                  className="relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[rgba(150,90,62,0.03)] group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative z-10"
                  >
                    <h2 className="text-3xl raleway-font font-bold text-[#4a4a4a] mb-6">
                      {body.name}
                    </h2>
                    <div className="space-y-4">
                      <p className="text-xl text-gray-700">
                        <span className="font-medium">Zodiac:</span>{" "}
                        <span className="text-[#965a3e]">{body.zodiac}</span>
                      </p>
                      <p className="text-xl text-gray-700">
                        <span className="font-medium">Degree:</span>{" "}
                        <span className="text-[#965a3e]">{body.degree}°</span>
                      </p>
                      <div className="mt-1 pt-4 border-t border-gray-100">
                        <p className="text-lg text-gray-700 leading-relaxed">
                          {body.prediction}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      )}
    </div>
  );
};

export default TodaysPrediction;
