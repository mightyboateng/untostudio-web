"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { boilerAuth } from "@/boiler-plate-controllers/auth-controls";
import { handleLoginEmailOTPSubmit } from "../../lib/server/actions";
import { toast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const EmailOTPSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    await handleLoginEmailOTPSubmit(formData);

    toast({
      title: "Email sent",
      description: "Please check your email for a link to sign in",
    });

    setIsLoading(false);
  }

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
          className="w-full text-white bg-default hover:bg-default/85"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Continue"}
        </Button>
      </form>
    )
  );
};

export default EmailOTPSignIn;
