import React from "react";
import { Link } from "react-router-dom";
import HotelCard from "./HotelCard";

function Hotels({ trip }) {
  return (
    <div className="p-5 bg-white rounded-xl shadow-md mt-4">
      <h2 className="font-bold text-2xl text-gray-800 mb-5">
        Hotels Recommendation
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {trip?.tripData?.TripPlan?.HotelOptions?.map((hotel, index) => (
          <HotelCard key={hotel.id || index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
