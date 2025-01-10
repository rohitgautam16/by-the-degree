import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import aries from "../assets/aries.jpeg";
import Taurus from "../assets/Tauras.jpg";
import Gemini from "../assets/gemini.jpg";
import cancer from "../assets/cancer.jpg";
import leo from "../assets/leo.jpg";
import virgo from "../assets/virgo.jpg";
import libra from "../assets/libra.jpg";
import scorpio from "../assets/scorpio.jpg";
import Sagittarius from "../assets/sagitaurius.jpg";
import Capricorn from "../assets/capricorn.jpg";
import Aquarius from "../assets/aquarius.jpg";
import Pisces from "../assets/pisces.jpg";

const sunSignLogos = {
  Aries: aries,
  Taurus: Taurus,
  Gemini: Gemini,
  Cancer: cancer,
  Leo: leo,
  Virgo: virgo,
  Libra: libra,
  Scorpio: scorpio,
  Sagittarius: Sagittarius,
  Capricorn: Capricorn,
  Aquarius: Aquarius,
  Pisces: Pisces,
};

const FetchedPredictions = () => {
  const location = useLocation();
  console.log("Location state:", location.state);

  const { degreeData } = location.state || { degreeData: [] };
  const [predictions, setPredictions] = useState([]);

  const fetchPrediction = async (zodiac, degree) => {
    console.log("Fetching prediction for:", { zodiac, degree }); 

    if (!zodiac || degree === undefined || degree === null) {
      console.error("Missing zodiac or degree:", { zodiac, degree });
      return "Invalid input: Zodiac and degree are required.";
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BY_THE_DEGREE_BACKEND_BASEURL}/prediction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ zodiac, degree }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to fetch prediction:", errorData);
        return "Error: Unable to fetch prediction.";
      }

      const data = await response.json();
      return data.prediction || "No prediction available";
    } catch (error) {
      console.error("Error fetching prediction:", error);
      return "Error: Unable to fetch prediction.";
    }
  };

  useEffect(() => {
    if (degreeData && Array.isArray(degreeData)) {
      console.log("degreeData inside useEffect:", degreeData);

      const fetchPredictions = async () => {
        const predictionsWithNormDegrees = await Promise.all(
          degreeData.map(async (body) => {
            const normDegree = Math.floor(parseFloat(body.normDegree)); 
            const zodiac = body.name; 
            console.log("Processing body:", { zodiac, normDegree });

            const prediction = await fetchPrediction(zodiac, normDegree); 
            return { ...body, normDegree, prediction };
          })
        );

        setPredictions(predictionsWithNormDegrees);
      };

      fetchPredictions();
    } else {
      console.error("No valid degreeData received.");
    }
  }, [degreeData]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex items-center justify-center py-16 px-6 bg-[#f5f8f3]">
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl raleway-font text-[#4a4a4a] text-center mb-8">
            Your <span className="italic text-[#965a3e]">Predictions</span>
          </h1>

          {predictions.length === 0 ? (
            <p className="text-center text-lg">No predictions available.</p>
          ) : (
            <table
              className="w-full border-collapse bg-white shadow-md rounded-lg"
              style={{ tableLayout: "auto" }}
            >
              <thead>
                <tr className="bg-[#4a4a4a] raleway-font text-white">
                  <th className="py-3 px-4 border border-black text-left">Sign</th>
                  <th className="py-3 px-4 border border-black text-left">Degree</th>
                  <th className="py-3 px-4 border border-black text-left">Prediction</th>
                </tr>
              </thead>
              <tbody>
                {predictions.map((body, idx) => (
                  <tr key={idx} className="raleway-font text-gray-800">
                    <td className="py-2 px-8 border border-black flex flex-row items-center break-words">
                      <img
                        src={sunSignLogos[body.name]}
                        alt={body.name}
                        className="w-8 h-8 rounded-full mr-1"
                      />
                      {body.name}
                    </td>
                    <td className="py-2 px-4 border border-black">{body.normDegree}</td>
                    <td className="py-2 px-4 border border-black break-words">
                      {body.prediction || "No prediction available"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FetchedPredictions;
