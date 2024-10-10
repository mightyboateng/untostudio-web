"use client";

import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

const StripeSubscribeButtonComponents = ({
  btnText,
  priceId,
}: {
  btnText: string;
  priceId: string;
}) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
    );

    if (!stripe) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "/api/stripe/checkout_subscribe_session",
        {
          priceId: priceId,
        }
      );
      const data = response.data;
      if (!data.ok) throw new Error("Something went wrong");
      await stripe.redirectToCheckout({
        sessionId: data.result.id,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error from stripe", error);
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

export default StripeSubscribeButtonComponents;
