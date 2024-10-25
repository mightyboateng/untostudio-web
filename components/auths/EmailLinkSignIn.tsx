"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { toast } from "@/hooks/use-toast";
import { FirebaseError } from "firebase/app";
import { boilerAuth } from "@/boiler-plate-controllers/auth-controls";

const EmailLinkSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;

    setIsLoading(true);

    const actionCodeSettings = {
      url: `${window.location.origin}/connect/verifying-user-email`,
      handleCodeInApp: true,
    };
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
