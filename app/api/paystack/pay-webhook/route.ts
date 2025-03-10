import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  console.log("payload", payload);
  return NextResponse.json({ message: "Webhook received" });
}
