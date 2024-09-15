"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { kSuccessfulMessage } from "@/utils/constants";
import { auth } from "@/utils/firebase";
import {
  checkIfUserIsCreatedAlready,
  updateUserDetails,
} from "@/utils/realtimeDb";
import { Person, Photo } from "@mui/icons-material";
import { Loader2, User, XIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { reduxUserType } from "@/types/userType";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const userDetail = useSelector((state: reduxUserType) => state.user.user);

  //   useEffect(() => {
  //   const user = auth.currentUser;
  //   if (user) {
  //     setEmail(user.email || "");
  //   }
  // }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);

    const fullName = formData.get("fullName");

    try {
      const checkUser: any = await checkIfUserIsCreatedAlready(
        auth?.currentUser?.uid || ""
      );

      if (checkUser.length > 0) {
        const userResult = await updateUserDetails({
          userDetail: userDetail,
          databaseId: checkUser[0].databaseId,
          displayName: fullName as string,
        });
        if (userResult === kSuccessfulMessage) {
          router.push("/pro");
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <form
        className="flex flex-col p-8 space-y-4 md:min-w-96"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center">
          <label className="mt-2 cursor-pointer">
            {/* <input
              type="file"
              className="hidden"
              aria-label="Upload profile picture"
            />
            <Photo /> */}
            <div className="flex justify-center items-center border rounded-full w-20 h-20">
              <User className="w-10 h-10 " />
            </div>
          </label>
          <h2 className="mt-2 text-lg font-semibold">
            Please enter your details
          </h2>
        </div>
        <div className="flex gap-4">
          <Input
            type="text"
            name="fullName"
            aria-label="full name"
            required={true}
            placeholder="Enter your full name"
            className="border rounded-md p-2 flex-grow"
          />
          {/* <Input
            type="text"
            aria-label="Doctor's last name"
            placeholder="Last name"
            className="border rounded-md p-2 flex-grow"
          /> */}
        </div>
        {/* <Input
          type="text"
          aria-label="Doctor's title"
          placeholder="Doctor's title"
          className="border rounded-md p-2"
        /> */}

        <Button
          type="submit"
          disabled={isLoading}
          className="mt-4 bg-default hover:bg-default-hover text-default-foreground font-bold py-2 px-4"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Continue"
          )}
        </Button>
      </form>
    </div>
  );
};

export default page;
