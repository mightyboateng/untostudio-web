"use client";

import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import {
  getAdditionalUserInfo,
  isSignInWithEmailLink,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth";
import { auth } from "@/utils/firebase";
import { toast } from "@/hooks/use-toast";
import { FirebaseError } from "firebase/app";
import { boilerAuth } from "@/boiler-plate-controllers/auth-controls";

const EmailLinkSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation");
      }
      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(auth, email!, window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");
          // You can access the new user by importing getAdditionalUserInfo
          // and calling it with result:
          const userInfo = getAdditionalUserInfo(result);
          console.log("userInfo", userInfo);
          // You can access the user's profile via:
          // getAdditionalUserInfo(result)?.profile
          // You can check if the user is new or existing:
          // getAdditionalUserInfo(result)?.isNewUser
        })
        .catch((error) => {
          console.log("Something went wrong", error);
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;

    setIsLoading(true);

    const actionCodeSettings = {
      url: window.location.href,
      handleCodeInApp: true,
    };

    // if (isSignInWithEmailLink(auth, window.location.href) && !!email) {
    //   signInWithEmailLink(auth, email, window.location.href)
    //     .then((result) => {
    //       // Clear email from storage.
    //       window.localStorage.removeItem("emailForSignIn");
    //     })
    //     .catch((error) => {
    //       console.log("Something went wrong", error);
    //     });
    // } else {
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
        toast({
          title: "Sign-in link sent",
          description: "Please check your email to complete sign-in",
          variant: "default",
        });
      })
      .catch((error: FirebaseError) => {
        switch (error.code) {
          case "auth/invalid-email":
            toast({
              title: "Invalid email",
              description: "Please enter a valid email address",
              variant: "destructive",
            });
            break;
          case "auth/missing-android-pkg-name":
          case "auth/missing-continue-uri":
          case "auth/missing-ios-bundle-id":
          case "auth/invalid-continue-uri":
          case "auth/unauthorized-continue-uri":
            toast({
              title: "Configuration error",
              description:
                "There's an issue with the app configuration. Please contact support.",
              variant: "destructive",
            });
            break;
          default:
            console.log('error', error.message)
            toast({
              title: "Error",
              description:
                "An unexpected error occurred. Please try again later.",
              variant: "destructive",
            });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
    // }
  };

  return (
    boilerAuth.email_link_sign_in && (
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required={true}
            placeholder="name@example.com"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-teal-600 text-white hover:bg-teal-900"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Continue"}
        </Button>
      </form>
    )
  );
};

export default EmailLinkSignIn;
