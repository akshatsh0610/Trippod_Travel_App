import { db } from "@/service/firebaseConfig";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCard from "./components/UserTripCard";

function MyTrips() {
  const navigate = useNavigate(); // useNavigate instead of useNavigation
  const [userTrips, setUserTrips] = useState([]); // Initialize as an empty array

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/"); // Redirect to home if user is not found
      return;
    }

    setUserTrips([]); // Clear trips before fetching

    try {
      const q = query(
        collection(db, "AiTrips"),
        where("userEmail", "==", user.email)
      );

      const querySnapshot = await getDocs(q);
      const trips = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        trips.push(doc.data()); // Collect trips into an array
      });
      setUserTrips(trips); // Update state with collected trips
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 bg-white py-8">
      <h2 className="font-bold text-3xl">My Trips</h2>

      <div className="grid grid-cols-2 mt-10 md:grid-cols-4 gap-5 ">
        {userTrips?.length > 0
          ? userTrips.map((trip, index) => (
              <UserTripCard key={index} trip={trip} /> // Ensure return and add key
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
              <div key={index} className="h-[300px] w-full bg-slate-400 animate-pulse rounded-xl"></div>;
            })}
      </div>
    </div>
  );
}

export default MyTrips;
