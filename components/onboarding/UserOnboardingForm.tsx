"use client";

import { Loader2, User } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { handleOnboardingSubmit } from "@/lib/server/actions";

const UserOnboardingForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    await handleOnboardingSubmit(formData);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="mt-2 mb-4">
        <div className="flex justify-center items-center border rounded-full w-20 h-20">
          <User className="w-10 h-10 " />
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-4 mb-4">
        <Input
          type="text"
          name="firstName"
          aria-label="first name"
          required={true}
          placeholder="Enter your first name"
          className="border rounded-full p-4 flex-grow"
        />
        <Input
          type="text"
          name="lastName"
          aria-label="last name"
          required={true}
          placeholder="Enter your last name"
          className="border rounded-full p-4 flex-grow"
        />
      </div>
      <Input
        type="username"
        name="username"
        aria-label="username"
        required={true}
        placeholder="Username"
        className="border rounded-full p-4 flex-grow mb-8"
      />

      <div className="flex justify-end w-full">
        <Button
          type="submit"
          className="mt-4 bg-default hover:bg-default-hover text-sm rounded-full text-default-foreground font-bold py-2 px-4"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <div className="flex items-center justify-center">
              <span>Continue</span>
            </div>
          )}
        </Button>
      </div>
    </form>
  );
};

export default UserOnboardingForm;
