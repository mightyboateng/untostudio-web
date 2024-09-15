"use client";

import { boilerAuth } from "@/boiler-plate-controllers/auth-controls";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Google } from "@mui/icons-material";
import { auth, googleProvider } from "@/utils/firebase";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { addNewUserToRealTimeDb } from "@/utils/realtimeDb";
import { useDispatch } from "react-redux";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  kSuccessfulMessage,
  kErrorMessage,
  kUserCreatedAlready,
} from "@/utils/constants";

const GoogleButton = () => {
  const [btnIsLoading, setBtnIsLoading] = useState(false);
  const dispatch = useDispatch();

  const googleHandler = () => {
    setBtnIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const createdUser: string = await addNewUserToRealTimeDb(
          result.user,
        );

        if (createdUser === kSuccessfulMessage) {
          toast({
            title: "User created successfully",
            description: "You have been successfully created",
          });
        } else if (createdUser === kErrorMessage) {
          toast({
            title: "Error error error",
            description: "error from logging in ",
          });
          setBtnIsLoading(false);
        } else if (createdUser === kUserCreatedAlready) {
          toast({
            title: "Successfully",
            description: "Your login was successful",
          });
          setBtnIsLoading(false);
        }
      })
      .catch((error) => {
        // Handle Errors here.
        //  setBtnIsLoading(false);
        const errorMessage = error;
        setBtnIsLoading(false);
        toast({
          title: "Google error",
          description: "there is an error from google",
        });
        alert(`Error Google Sign in ${errorMessage}`);
      });
  };
  return (
    boilerAuth.google && (
      <Button
        variant="outline"
        onClick={googleHandler}
        disabled={btnIsLoading}
        className="w-full border-teal-600"
      >
        {btnIsLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <Google className="mr-2 h-4 w-4" />
            Google
          </>
        )}
      </Button>
    )
  );
};

export default GoogleButton;
