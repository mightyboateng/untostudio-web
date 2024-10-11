"use client";

import { Button } from "@/components/ui/button";
import { reduxUserType } from "@/types/userType";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const PaystackRedirectPaymentButton = ({
  btnText,
  amount,
}: {
  btnText: string;
  amount: number;
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const user = useSelector((state:reduxUserType) => state.user.user)

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await axios.post("/api/paystack/pay-redirect", {
        email: user.email,
        amount: amount,
        userId:user.uid,
        userDatabaseId:user.databaseId
      });
      const data = response.data;
      if (!data.ok) throw new Error("Something went wrong");
      router.push(data.result.authorization_url);
      //       setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error from paystack", error);
    }
  };
  return (
    <Button
      className="bg-teal-600 text-white hover:bg-teal-600 font-bold"
      onClick={handleSubmit}
    >
      {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : btnText}
    </Button>
  );
};

export default PaystackRedirectPaymentButton;
