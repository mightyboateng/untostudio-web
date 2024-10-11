"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { toast } from "@/hooks/use-toast";
import { FirebaseError } from "firebase/app";

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;

    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast({
          title: "Password reset email sent",
          description: "Please check your email to reset your password",
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
          case "auth/user-not-found":
            toast({
              title: "User not found",
              description: "No user found with this email address",
              variant: "destructive",
            });
            break;
          default:
            toast({
              title: "Error",
              description: "An error occurred. Please try again later.",
              variant: "destructive",
            });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
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
        {isLoading ? <Loader2 className="animate-spin" /> : "Send reset link"}
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
