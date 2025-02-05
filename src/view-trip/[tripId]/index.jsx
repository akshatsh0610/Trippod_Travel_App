import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import DailyPlan from "../components/DailyPlan";
import Footor from "../../components/custom/Footer";

function index() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripId && GetTripdata();
  }, [tripId]);
  // Get Trip data from firebase
  const GetTripdata = async () => {
    const docRef = doc(db, "AiTrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document : ", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No Such Data");
      toast.error("No trip Found");
    }
  };
  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Information Section */}
      <InfoSection trip={trip} />

      {/* Recommended Hotels */}
      <Hotels trip={trip} />

      {/* Daily Plan */}
      <DailyPlan trip={trip} />
    </div>
  );
}

export default index;
