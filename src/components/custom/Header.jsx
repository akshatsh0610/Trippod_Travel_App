import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Link } from "react-router-dom";

function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    console.log(user);
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.error("Login Error:", error),
  });

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
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
      });
  };

  const OpenDialog = () => {
    if (!user) {
      setOpenDialog(true);
      return;
    }
  };

  return (
    <div className=" shadow-md bg-gradient-to-r p-2 from-blue-600 to-purple-700 flex justify-between items-center text-white">
      <a href="/">
        <img src="/logo.png" alt="Logo" className="h-20" />
     </a>
      <div>
        {user ? (
          <div className="flex items-center">
            <Popover className="bg-transparent">
              <PopoverTrigger className="bg-transparent border-[#7B23CE]">
                <img
                  src={user?.picture}
                  className="h-[45px] w-[45px] rounded-full "
                />
              </PopoverTrigger>
              <PopoverContent className="cursor-pointer">
                <h2
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <button
            onClick={OpenDialog} // Proper function reference
            className="bg-yellow-300 text-blue-800 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-yellow-400 transition"
          >
            Sign In
          </button>
        )}
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="./logo.png" alt="Logo" />
              <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
              <p>Sign in to the App with Google authentication securely!</p>
              <button
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
  );
}

export default Header;
