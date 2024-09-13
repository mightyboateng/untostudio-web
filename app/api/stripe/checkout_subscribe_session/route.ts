import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string);
export async function POST(request: NextRequest) {
  try {
    // you can implement some basic check here like, is user valid or not
    const data = await request.json();
    const priceId = data.priceId;

    console.log("priceId", priceId);

    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${process.env.NEXT_BASE_URL}/upgrade/successful`,
        cancel_url: `${process.env.NEXT_BASE_URL}/upgrade/failed`,
        metadata: {
          userId: "loggedUser.id",
          priceId,
        },
      });
    return NextResponse.json({ result: checkoutSession, ok: true });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server", { status: 500 });
  }
}
