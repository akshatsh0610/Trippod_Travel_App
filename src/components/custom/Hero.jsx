import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-16">
      <h1 className="font-extrabold text-5xl md:text-6xl text-center mb-6">
        <span className="text-yellow-300">Explore Your Next Adventure:</span>{" "}
        AI-Powered Travel Itineraries
      </h1>
      <p className="text-lg md:text-xl text-center max-w-3xl">
        Plan your perfect trip with ease! Our personalized travel planner
        curates unique itineraries tailored to your interests, preferences, and
        budget. Let’s make every journey unforgettable.
      </p>
      <Link to={"/create-trip"}>
        <button className="mt-8 px-6 py-3 bg-yellow-300 text-blue-800 font-semibold rounded-lg shadow-lg hover:bg-yellow-400 transition">
          Get's Started, It's Free!
        </button>
      </Link>
    </div>
  );
}

export default Hero;
