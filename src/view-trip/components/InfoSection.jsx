import { GetPlaceDetails } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1200&maxWidthPx=1200&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.tripData?.TripPlan?.Destination,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      console.log(resp.data.places[0].photos[3].name);

      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      console.log(PhotoUrl);
      setPhotoUrl(PhotoUrl);
    });
  };

  {
    /* Add this function in the same component */
  }
  const handleShare = () => {
    const url = window.location.href; // Get the current URL
    const shareData = {
      title: "Check this out!",
      text: "I found this amazing page for you:",
      url: url,
    };

    if (navigator.share) {
      // Use Web Share API if available
      navigator
        .share(shareData)
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing", error));
    } else {
      // Fallback for unsupported browsers
      navigator.clipboard.writeText(url).then(() => {
        alert("URL copied to clipboard!");
      });
    }
  };

  return (
    <div className="p-5 bg-white rounded-xl shadow-md">
      <img
        src={photoUrl ? photoUrl : "/travel.jpg"}
        alt="Travel"
        className="h-[340px] w-full object-cover rounded-xl mb-4 shadow-sm"
      />

      <div className="flex justify-between items-center">
        {/* Left Section */}
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-2xl text-gray-800">
            {trip?.tripData?.TripPlan?.Destination}
          </h2>
          <div className="flex flex-wrap gap-4">
            <span className="p-2 px-4 bg-gray-100 rounded-full text-gray-600 text-sm font-medium shadow-sm">
              📆 {trip?.userSelection?.noOfDays} Days
            </span>
            <span className="p-2 px-4 bg-gray-100 rounded-full text-gray-600 text-sm font-medium shadow-sm">
              💸 {trip?.tripData?.TripPlan?.Budget}
            </span>
            <span className="p-2 px-4 bg-gray-100 rounded-full text-gray-600 text-sm font-medium shadow-sm">
              🧑 No. of Traveller: {trip?.userSelection?.people}
            </span>
          </div>
        </div>

        <button
          className="p-3 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-all"
          onClick={() => handleShare()}
        >
          <IoIosSend className="text-white text-xl" />
        </button>
      </div>
    </div>
  );
}

export default InfoSection;
