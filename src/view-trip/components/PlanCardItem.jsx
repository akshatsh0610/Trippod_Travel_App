import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PlanCardItem({ place, destination }) {
  const [photoUrls, setPhotoUrls] = useState({}); // Store photo URLs for each place
  console.log(photoUrls)

  useEffect(() => {
    if (place?.Places) {
      fetchPhotosForPlaces(place.Places);
    }
  }, [place]);

  const fetchPhotosForPlaces = async (places) => {
    const urls = {};
    for (const placeDetails of places) {
      try {
        const data = { textQuery: placeDetails?.PlaceName };
        const result = await GetPlaceDetails(data);
        const photoUrl = PHOTO_REF_URL.replace(
          "{NAME}",
          result.data.places[0]?.photos?.[3]?.name || "default"
        );
        urls[placeDetails.PlaceName] = photoUrl;
      } catch (error) {
        console.error(
          `Failed to fetch photo for ${placeDetails.PlaceName}:`,
          error
        );
        urls[placeDetails.PlaceName] = "/travel.jpg"; // Default image on failure
      }
    }
    setPhotoUrls(urls);
  };

  return (

      <div className="mb-10 bg-white rounded-xl shadow-md p-5">
        {/* Day Header */}
        <h3 className="text-xl font-semibold text-blue-600 mb-4">
          {place.Day}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {place.Places.map((placeDetails, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              {/* Place Image */}
              <img
                src={photoUrls[placeDetails.PlaceName] || "/travel.jpg"}
                alt={placeDetails.PlaceName}
                className="h-48 w-full object-cover"
              />

              {/* Place Details */}
              <div className="p-4">
                <h4 className="text-lg font-bold text-gray-800 truncate">
                  {placeDetails?.PlaceName}
                </h4>
                <p className="text-sm text-gray-500 mb-2">
                  {placeDetails?.PlaceDetails}
                </p>

                <ul className="text-sm text-gray-700 space-y-1">
                  <li>
                    💰 <b>Ticket Pricing:</b> {placeDetails?.TicketPricing}
                  </li>
                  <li>
                    ⏳ <b>Time Required:</b> {placeDetails?.TimeTravel}
                  </li>
                  <li>
                    ⏰ <b>Best Time to Visit:</b>{" "}
                    {placeDetails?.BestTimeToVisit}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}

export default PlanCardItem;
