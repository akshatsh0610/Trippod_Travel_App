import React from "react";
import { Link } from "react-router-dom";

function Middle() {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-12">
      <h2 className="font-bold text-3xl md:text-4xl text-center mb-4">
        Ready to Plan Your Next Journey?
      </h2>
      <p className="text-md md:text-lg text-center max-w-2xl mb-6">
        Whether you're starting fresh or revisiting your past adventures, we're here to make your travel planning effortless and fun.
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <Link to="/create-trip">
          <button className="px-6 py-3 bg-yellow-300 text-blue-800 font-semibold rounded-lg shadow-lg hover:bg-yellow-400 transition">
            Create New Trip
          </button>
        </Link>
        <Link to="/my-trips">
          <button className="px-6 py-3 bg-blue-800 text-yellow-300 font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition">
            See All Trips
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Middle;