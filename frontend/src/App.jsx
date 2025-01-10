import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Predictor from "./components/Predictor";
import FetchedPredictions from "./components/FetchedPredictions";
import TodaysPrediction from "./components/TodaysPrediction";
import ZodiacDegrees from "./components/ZodiacDegrees";
import NewsletterSubscription from "./components/NewsletterSubscription";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>

      <Header />

      <Routes>

        <Route
          path="/"
          element={
            <>
              <Predictor />
              <Hero />
              <TodaysPrediction />
              <ZodiacDegrees />
              <NewsletterSubscription />
              <Footer />
            </>
          }
        />


        <Route path="/fetchedPredictions" element={<FetchedPredictions />} />
      </Routes>
    </Router>
  );
};

export default App;
