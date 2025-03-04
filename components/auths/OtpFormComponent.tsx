"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { handleVerifyEmailTokenSubmit } from "../../lib/server/actions";
import { Loader2 } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const OtpFormComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [value, setValue] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    await handleVerifyEmailTokenSubmit(value);

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <input
        type="number"
        name="otp"
        placeholder="Enter OTP"
        className="w-full p-2 border border-default rounded-md"
      /> */}
      <InputOTP
        maxLength={6}
        className="text-2xl"
        pattern={REGEXP_ONLY_DIGITS}
        value={value}
        onChange={(value) => setValue(value)}
        required
      >
        <InputOTPGroup>
          <InputOTPSlot
            index={0}
            autoFocus={true}
            className="w-12 h-12 text-center"
          />
          <InputOTPSlot index={1} className="w-12 h-12 text-center" />
          <InputOTPSlot index={2} className="w-12 h-12 text-center" />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} className="w-12 h-12 text-center" />
          <InputOTPSlot index={4} className="w-12 h-12 text-center" />
          <InputOTPSlot index={5} className="w-12 h-12 text-center" />
        </InputOTPGroup>
      </InputOTP>
      <Button type="submit" className="w-full text-white mt-5">
        {isLoading ? <Loader2 className="animate-spin" /> : "Continue"}
      </Button>
    </form>
  );
};

export default OtpFormComponent;
