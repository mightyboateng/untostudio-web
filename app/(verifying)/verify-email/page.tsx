"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/utils/firebase";
import { sendEmailVerification } from "firebase/auth";
import { toast } from "@/hooks/use-toast";

const VerifyEmailPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email || "");
    }
  }, []);

  const handleResendVerification = async () => {
    setIsLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        toast({
          title: "Verification email sent",
          description: "Please check your inbox and follow the instructions.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send verification email. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleAlreadyVerified = () => {
    router.push("/pro");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Verify Your Email
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <Mail className="w-24 h-24 mx-auto mb-4 text-default" />
          <p className="mb-4">We've sent a verification email to:</p>
          <p className="font-semibold mb-6">{email}</p>
          <div className="space-y-4">
            <Button
              onClick={handleResendVerification}
              disabled={isLoading}
              className="bg-default hover:bg-default-hover text-default-foreground w-full"
            >
              {isLoading ? "Sending..." : "Resend Verification Email"}
            </Button>
            <Button
              variant="outline"
              onClick={handleAlreadyVerified}
              className="w-full"
            >
              I've Already Verified
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;
