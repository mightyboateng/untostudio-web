"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import {
  getAdditionalUserInfo,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { auth } from "@/utils/firebase";
import { addNewUserToRealTimeDb } from "@/utils/realtimeDb";
import {
  kErrorMessage,
  kSuccessfulMessage,
  kUserCreatedAlready,
} from "@/utils/constants";
import { toast } from "@/hooks/use-toast";

const page = () => {
  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }

      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(auth, email!, window.location.href)
        .then(async (result) => {
          window.localStorage.removeItem("emailForSignIn");

          const userInfo = getAdditionalUserInfo(result);

          if (userInfo?.isNewUser) {
            const createdUser: string = await addNewUserToRealTimeDb(
              result.user
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
            } else if (createdUser === kUserCreatedAlready) {
              toast({
                title: "Successfully",
                description: "Your login was successful",
              });
            }
          }
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image
        className="mb-4"
        src="/logo.png"
        alt="logo"
        width={50}
        height={50}
        priority={true}
      />
      <p className="text-sm text-muted">Checking your email...</p>
      <Loader2 className="w-6 h-6 animate-spin" />
    </div>
  );
};

export default page;
