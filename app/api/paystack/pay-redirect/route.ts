import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  console.log("payload", payload);

  const params = {
    email: "customer@email.com",
    amount: 20000,
    currency: "GHS",
    callback_url: "http://localhost:3000/upgrade/successful",
  };

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  };

  try {
    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      options
    );
    const data = await response.json();

    return NextResponse.json({ result: data.data, ok: true });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server", { status: 500 });
  }
}
