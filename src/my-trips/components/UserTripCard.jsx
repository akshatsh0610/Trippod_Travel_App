import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserTripCard({ trip }) {
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
  return (
    <Link to={'/view-trip/'+trip?.id}>
      <div className="hover:scale-105 transition-all ">
        <img
          className="h-[200px] w-full object-cover rounded-xl mb-1 shadow-sm"
          src={photoUrl ? photoUrl : "/travel.jpg"}
        />

        <div>
          <h2 className="font-bold text-lg text-black">
            {trip?.tripData?.TripPlan?.Destination}
          </h2>
          <h2 className="text-sm text-grey-500 text-black">
            {trip?.tripData?.TripPlan?.TripDuration} Trip with{" "}
            {trip?.tripData?.TripPlan?.Budget} Cost
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCard;
