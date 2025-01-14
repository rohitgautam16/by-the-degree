import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";

const FetchedPredictions = () => {
  const location = useLocation();
  console.log("Location state:", location.state);

  const { degreeData } = location.state || { degreeData: [] };
  const [predictions, setPredictions] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const predictionRefs = useRef({});

  const fetchPrediction = async (zodiacSignName, degree) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BY_THE_DEGREE_BACKEND_BASEURL}/prediction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ zodiac: zodiacSignName, degree }),
      });

      if (!response.ok) {
        return "Error: Unable to fetch prediction.";
      }

      const data = await response.json();
      return data.prediction || "No prediction available";
    } catch (error) {
      return "Error: Unable to fetch prediction.";
    }
  };

  useEffect(() => {
    if (degreeData && Array.isArray(degreeData)) {
      const fetchPredictions = async () => {
        const predictionsWithNormDegrees = await Promise.all(
          degreeData.map(async (body) => {
            const normDegree = Math.floor(parseFloat(body.normDegree));
            const zodiacSignName = body.zodiacSignName;

            const prediction = await fetchPrediction(zodiacSignName, normDegree);
            return { ...body, normDegree, prediction, zodiacSignName };
          })
        );

        setPredictions(predictionsWithNormDegrees);
        setActiveTab(predictionsWithNormDegrees[0]?.name || null);
      };

      fetchPredictions();
    }
  }, [degreeData]);

  const handleTabClick = (name) => {
    setActiveTab(name);
    if (predictionRefs.current[name]) {
      predictionRefs.current[name].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow py-16 px-6 bg-[#f5f8f3]">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl raleway-font text-[#4a4a4a] text-center mb-8">
            Your <span className="italic text-[#965a3e]">Predictions</span>
          </h1>

          <div className="flex justify-center gap-4 flex-wrap mb-8">
            {predictions.map((pred) => (
              <button
                key={pred.name}
                className={`px-4 py-2 rounded-lg shadow-md text-sm raleway-font transition-transform transform hover:scale-105 ${
                  activeTab === pred.name
                    ? "bg-[#965a3e] text-white"
                    : "bg-white text-[#4a4a4a] border border-gray-300"
                }`}
                onClick={() => handleTabClick(pred.name)}
              >
                {pred.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {predictions.map((prediction) => (
              <div
                key={prediction.name}
                ref={(el) => (predictionRefs.current[prediction.name] = el)}
                className={`rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 bg-gradient-to-r hover:border-[#965a3e] hover:border-2 from-[#f5f5f5] to-[#eaeaea] hover:from-[#dccdc9a2] hover:to-[#dccdc9a2] hover:text-white ${
                  activeTab === prediction.name ? "border-2 border-[#965a3e]" : "border border-gray-200"
                }`}
              >
                <h2 className="text-xl font-semibold text-[#4a4a4a] mb-4">
                  {prediction.name}
                </h2>
                <h3 className="text-lg text-gray-700 mb-2">
                  Zodiac: <span className="font-medium">{prediction.zodiacSignName}</span>
                </h3>
                <h3 className="text-lg text-gray-700 mb-2">
                  Degree: <span className="font-medium">{prediction.normDegree}</span>
                </h3>
                <p className="text-gray-600">
                  <span className="text-lg text-gray-700">Prediction:</span> {prediction.prediction}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FetchedPredictions;
