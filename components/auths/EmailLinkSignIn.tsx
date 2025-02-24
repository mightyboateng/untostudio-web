"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { boilerAuth } from "@/boiler-plate-controllers/auth-controls";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { localStateType } from "@/types/localType";
import { setDisableOtherLoginOptions } from "@/redux/slides/localState";
import { handleLoginFormSubmit } from "../../lib/server/actions";

const EmailLinkSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const disableOtherLoginOptions = useSelector(
    (state: localStateType) => state.localState.disableOtherLoginOptions
  );

  const dispatch = useDispatch();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    dispatch(setDisableOtherLoginOptions(true));

    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const result = await handleLoginFormSubmit(formData);

    // const result = await appWriteAccount().createMagicURLToken(
    //   ID.unique(),
    //   email,
    //   `${window.location.origin}/connect/verifying-user-email`
    // );

    console.log(result);

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
          disabled={disableOtherLoginOptions}
          className="w-full bg-teal-600 text-white hover:bg-teal-900"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Continue"}
        </Button>
      </form>
    )
  );
};

export default EmailLinkSignIn;
