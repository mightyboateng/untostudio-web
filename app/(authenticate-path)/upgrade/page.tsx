import { Button } from "@/components/ui/button";
import GooglePay from "@/payment-systems/GooglePay";
import PopUpPaymentButton from "@/payment-systems/paystack/PopUpPaymentButton";
import PaystackRedirectPaymentButton from "@/payment-systems/paystack/RedirectPaymentButton";
import StripeSubscribeButtonComponents from "@/payment-systems/stripe/components/SubscribeButtonComponents";
import { ArrowBack } from "@mui/icons-material";
import { CircleCheck } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div>
      <nav className="py-4 px-6 mb-8">
        <Button variant="ghost" size="icon" className="w-10 h-10 border">
          <ArrowBack />
        </Button>
      </nav>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-150px)] gap-4">
        <h1 className="md:text-6xl text-4xl font-bold mb-2">
          Choose your plan
        </h1>
        <p className="text-lg">Select the plan that best fits your needs.</p>

        <div className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto py-12 px-4 md:px-0">
            <div className="flex flex-col justify-between gap-8 border rounded px-6 py-10 hover:bg-teal-950 transition-all duration-300 cursor-pointer">
              <div className="">
                <h3 className="text-3xl">Pro</h3>
                <p className=" font-bold">
                  USD 20 <span className="text-sm text-gray-500">/ month</span>{" "}
                </p>
              </div>

              <div className="">
                <div className="flex items-center gap-2">
                  <CircleCheck className="w-4 h-4" />
                  <p>Unlimited access to all features.</p>
                </div>
              </div>

              <Button className="bg-teal-600 text-white hover:bg-teal-600 ">
                Subscribe to pro
              </Button>
            </div>

            <div className="flex flex-col justify-between gap-8 border rounded px-6 py-10 hover:bg-teal-950 transition-all duration-300 cursor-pointer">
              <div className="">
                <h3 className="text-3xl">Pro</h3>
                <p className=" font-bold">
                  USD 30 <span className="text-sm text-gray-500">/ month</span>{" "}
                </p>
              </div>

              <div className=" flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <CircleCheck className="w-4 h-4" />
                  <p>Unlimited access to all features.</p>
                </div>
                <div className="flex items-center gap-2">
                  <CircleCheck className="w-4 h-4" />
                  <p>Unlimited access to all features.</p>
                </div>
              </div>
              <PaystackRedirectPaymentButton
                amount={200}
                btnText="Paystack Subscribe to pro"
              />

              <PopUpPaymentButton
                amount={300}
                btnText="Paystack on time payment"
              />

              <StripeSubscribeButtonComponents
                btnText="Stripe Subscribe to pro"
                priceId={
                  process.env
                    .NEXT_PUBLIC_STRIPE_SUBSCRIPTION_PRICE_ID_STARTER as string
                }
              />
              <GooglePay price="300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
