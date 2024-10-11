import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const { email, amount, userId, userDatabaseId } = payload;

  const params = {
    email: email,
    amount: amount * 100,
    currency: "GHS",
    callback_url: `http://${process.env.NEXT_BASE_URL}/upgrade/successful`,
    metadata: {
      // add any thing you want to add to metadata here. To be use in the webhook
      userId: userId,
      userDatabaseId: userDatabaseId,
    },
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
