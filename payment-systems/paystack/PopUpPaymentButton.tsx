"use client";

import React, { useEffect, useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { Button } from "@/components/ui/button";
import { HookConfig } from "react-paystack/dist/types";
import { reduxUserType } from "@/types/userType";
import { useSelector } from "react-redux";
import { handleConvertCurrency } from "./convertCurrency";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PopUpPaymentButton = ({
  amount,
  btnText,
}: {
  amount: number;
  btnText: string;
}) => {
  const [convertedPrice, setConvertedPrice] = useState(0);
  const user = useSelector((state: reduxUserType) => state.user.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const convertCurrency = async () => {
      const price = await handleConvertCurrency({ price: amount });
      setConvertedPrice(price);
    };
    convertCurrency();
  });


  const config = {
    reference: new Date().getTime().toString(),
    email: user.email,
    currency: "GHS",
    amount: convertedPrice * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
  };

  // After a successful transaction with paystack
  const onSuccess = async (reference: unknown) => {
    try {
      setLoading(false);
      console.log("reference", reference);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      toast({
        title: "Error",
        description: "there is an error updating user credits",
      });
    }
  };

  // After user cancel payment processing
  const onClose = () => {
    setLoading(false);
  };


  const initializePayment = usePaystackPayment(config as HookConfig);

  const makeOtherPaymentAction = async () => {
    setLoading(true);

    try {
      initializePayment({ onSuccess, onClose });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: `There was an error processing your payment ${{error}}`,
      });
    }
  };

  return (
    <Button
      className="bg-teal-600 text-white hover:bg-teal-600 font-bold"
      onClick={makeOtherPaymentAction}
    >
      {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : btnText}
    </Button>
  );
};

export default PopUpPaymentButton;
