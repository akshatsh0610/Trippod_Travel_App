import React from "react";
import PlanCardItem from "./PlanCardItem";

function DailyPlan({ trip }) {
  return (
    <div className="p-1 bg-white rounded-xl mt-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Places to Visit</h2>

      <div>
        {trip?.tripData?.TripPlan?.Itinerary?.map((place, index) => (
          <PlanCardItem
            key={place.id || index}
            place={place}
            destination={trip?.tripData?.TripPlan?.Destination}
          />
        ))}
      </div>
    </div>
  );
}

export default DailyPlan;
