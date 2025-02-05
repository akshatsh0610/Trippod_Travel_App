import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import React, { useEffect, useRef, useState } from "react";
import "react-google-places-autocomplete/dist/index.min.css";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGoogleLogin } from "@react-oauth/google";

import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate, useNavigation } from "react-router-dom";
import Footor from "@/components/custom/Footer";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";

function CreateTrip() {
  const [formData, setFormData] = useState({
    address: "",
    noOfDays: "",
    budget: "",
    people: "",
  });
  const inputRef = useRef();

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces(); // Extract the first place
    if (place) {
      // Update the formData with the selected address
      setFormData((prevData) => ({
        ...prevData,
        address: place.formatted_address,
      }));
    }
  };
  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    if (name === "noOfDays" && value > 5) {
      toast.error("Please enter Trip Days less than or equal to 5.");
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log("Current formData:", formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.error("Login Error:", error),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    const { address, noOfDays, budget, people } = formData;
    setLoading(true);
    if (!address || !noOfDays || !budget || !people) {
      toast.error("Please fill all the details!");
      setLoading(false);
      return;
    }

    const Final_Prompt = AI_PROMPT.replace("{address}", address)
      .replace("{noOfDays}", noOfDays)
      .replace("{budget}", budget)
      .replace("{people}", people)
      .replace("{TotalDays}", noOfDays);

    const result = await chatSession.sendMessage(Final_Prompt);

    try {
      const result = await chatSession.sendMessage(Final_Prompt);
      console.log("Chat Response:", result?.response?.text());
      SaveAiTrip(result.response.text());

      setLoading(false);
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("An error occurred while generating your trip.");
    }
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AiTrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });

    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log("User Profile:", resp.data);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
      });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen py-10 px-5">
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 bg-white shadow-lg rounded-lg py-8">
        <h2 className="font-bold text-4xl text-blue-700 text-center">
          Plan Your Dream Trip
        </h2>
        <p className="mt-3 text-gray-600 text-lg text-center">
          Fill in your preferences, and let us craft the perfect itinerary for
          you.
        </p>

        <div className="flex flex-wrap items-start gap-4">
          {/* Destination Section */}
          <div className="w-full md:w-1/2">
            <h2 className="text-lg md:text-xl my-3 font-medium text-blue-600">
              Where do you want to go?
            </h2>
            <LoadScript
              googleMapsApiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              libraries={["places"]} // Ensure this is an array
            >
              <StandaloneSearchBox
                onLoad={(ref) => (inputRef.current = ref)}
                onPlacesChanged={handlePlaceChanged}
              >
                <input
                  type="text"
                  placeholder="Search for your destination..."
                  className="p-2 rounded-md shadow border-gray-500 focus:ring-blue-500 focus:border-blue-500 w-full"
                />
              </StandaloneSearchBox>
            </LoadScript>
          </div>

          {/* Trip Duration Section */}
          <div className="w-full md:w-1/2">
            <h2 className="text-lg md:text-xl my-3 font-medium text-blue-600">
              Days are you planning to travel?
            </h2>
            <Input
              placeholder="Ex. 3"
              type="number"
              value={formData.noOfDays}
              min={1}
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
              className="p-2 rounded-md shadow border-gray-300 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
          </div>

          {/* Budget Section */}
          <div className="mt-10">
            <h2 className="text-xl my-3 font-medium text-blue-600">
              What's your budget?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
              {SelectBudgetOptions.map((item) => (
                <div
                  className={`p-5 border rounded-lg hover:shadow-lg ${
                    formData.budget === item.title &&
                    "shadow-md border-blue-600"
                  } cursor-pointer transition-all bg-white`}
                  key={item.id}
                  onClick={() => handleInputChange("budget", item.title)}
                >
                  <h2 className="text-4xl text-blue-700">{item.icon}</h2>
                  <h3 className="font-bold text-lg mt-3 text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Travel Companions Section */}
          <div className="mt-10">
            <h2 className="text-xl my-3 font-medium text-blue-600">
              Who are you traveling with?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
              {SelectTravelList.map((item) => (
                <div
                  className={`p-5 border rounded-lg hover:shadow-lg ${
                    formData.people === item.people &&
                    "shadow-md border-blue-600"
                  } cursor-pointer transition-all bg-white`}
                  key={item.id}
                  onClick={() => handleInputChange("people", item.people)}
                >
                  <h2 className="text-4xl text-blue-700">{item.icon}</h2>
                  <h3 className="font-bold text-lg mt-3 text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="my-10 justify-center flex">
          <button
            disabled={loading}
            onClick={OnGenerateTrip}
            className="bg-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-800 transition"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </button>
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="./logo.png" alt="Logo" />
                <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
                <p>Sign in to the App with Google authentication securely!</p>
                <button
                  disabled={loading}
                  onClick={login}
                  className="text-white w-full mt-5 flex gap-4 items-center justify-center"
                >
                  <FcGoogle className="h-7 w-7" />
                  Sign In With Google
                </button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTrip;
