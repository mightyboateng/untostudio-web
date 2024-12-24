"use client";

import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
// import { Loader2 } from "lucide-react";

const ForgotPasswordForm = () => {



  return (
    <form className="grid gap-4">
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
        className="w-full bg-teal-600 text-white hover:bg-teal-900"
      >
        {/* {isLoading ? <Loader2 className="animate-spin" /> : "Send reset link"} */}
        Send reset link
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
