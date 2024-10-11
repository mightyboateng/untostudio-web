"use client";

import { boilerAuth } from "@/boiler-plate-controllers/auth-controls";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/utils/firebase";
import {
  addNewUserToRealTimeDb,
  checkIfUserIsCreatedAlready,
} from "@/utils/realtimeDb";
import { toast } from "@/hooks/use-toast";
import {
  kErrorMessage,
  kSuccessfulMessage,
  kUserCreatedAlready,
} from "@/utils/constants";
import { FirebaseError } from "firebase/app";
import { store } from "@/redux/store";
import { setUserDetail } from "@/redux/slides/userSlice";
import Link from "next/link";

const EmailPassword = ({
  login,
  signup,
}: {
  login: boolean;
  signup: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setIsLoading(true);
    if (login) {
      handleLogin({ email, password });
    } else {
      handleSignUp({ email, password });
    }
  };

  // This is for login user
  const handleLogin = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        const userDetails: any = await checkIfUserIsCreatedAlready(user.uid);

        if (userDetails.length > 0) {
          store.dispatch(setUserDetail(userDetails[0]));
        }
      })
      .catch((error: FirebaseError) => {
        switch (error.code) {
          case "auth/invalid-email":
            toast({
              title: "Email is invalid",
              variant: "destructive",
              description: "Please enter a valid email",
            });
            break;
          case "auth/user-not-found":
            toast({
              title: "User can't be found",
              variant: "destructive",
              description: "Please enter a valid email",
            });
            break;
          case "auth/wrong-password":
            toast({
              title: "Enter a valid password",
              variant: "destructive",
              description: "Please enter a valid password",
            });
            break;
          default:
            toast({
              title: "Error error error",
              variant: "destructive",
              description: "error from logging in ",
            });
            break;
        }
      });
  };

  // This is for signup user
  const handleSignUp = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;

        const createdUser: string = await addNewUserToRealTimeDb(user);

        if (createdUser === kSuccessfulMessage) {
          await sendEmailVerification(user);
          toast({
            title: "Verification email sent",
            description: "Please check your inbox and follow the instructions.",
          });
        } else if (createdUser === kErrorMessage) {
          toast({
            title: "Error error error",
            description: "error from logging in ",
          });
          setIsLoading(false);
        } else if (createdUser === kUserCreatedAlready) {
          toast({
            title: "User is already created",
            description: "Please login",
          });
          setIsLoading(false);
        }
      })
      .catch((error: FirebaseError) => {
        switch (error.code) {
          case "auth/invalid-email":
            toast({
              title: "Email is invalid",
              variant: "destructive",
              description: "Please enter a valid email",
            });
            break;
          case "auth/email-already-in-use":
            toast({
              title: "Email already exist",
              variant: "destructive",
              description: "Please enter a valid email",
            });
            break;
          case "auth/wrong-password":
            toast({
              title: "Enter a valid password",
              variant: "destructive",
              description: "Please enter a valid password",
            });
            break;
          case "auth/user-not-found":
            toast({
              title: "User can't be found",
              variant: "destructive",
              description: "Please enter a valid email",
            });
            break;
          case "auth/internal-error":
            toast({
              title: "Check internet connection",
              variant: "destructive",
              description: "Please check your internet connection",
            });
            break;

          default:
            toast({
              title: "Error error error",
              variant: "destructive",
              description: "error from logging in ",
            });
            break;
        }
      });
  };

  return (
    boilerAuth.email_password && (
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
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required={true}
            placeholder="**********"
          />
        </div>
        {login && (
          <div>
            <Link
              href="/forgot-password"
              className="text-sm text-default-hover"
            >
              Forgot password?
            </Link>
          </div>
        )}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-teal-600 text-white hover:bg-teal-900"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : signup ? (
            "Sign up"
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    )
  );
};

export default EmailPassword;
