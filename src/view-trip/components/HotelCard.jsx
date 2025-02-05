import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelCard({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.HotelName,
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
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        hotel?.HotelName
      )},${encodeURIComponent(hotel?.HotelAddress)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      {/* Hotel Image */}
      <img
        src={photoUrl ? photoUrl : "/travel.jpg"}
        alt={`${hotel?.HotelName}`}
        className="rounded-t-xl h-[180px] w-full object-cover"
      />

      {/* Hotel Details */}
      <div className="p-4">
        <h2 className="font-semibold text-lg text-gray-800 truncate">
          {hotel.HotelName}
        </h2>
        <p className="text-sm text-gray-500 mt-1 truncate">
          📍 {hotel.HotelAddress}
        </p>
        <p className="text-sm text-gray-800 mt-2">
          💰 <b>{hotel?.Price}</b>
        </p>
        <p className="text-sm text-gray-800">
          ⭐ <b>{hotel?.Rating} star</b>
        </p>
      </div>
    </Link>
  );
}

export default HotelCard;
