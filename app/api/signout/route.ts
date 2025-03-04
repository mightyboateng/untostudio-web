import { appWriteCreateAdminClient } from "@/lib/server/app-write";
import { NextResponse } from "next/server";

export async function POST() {
  const { account } = await appWriteCreateAdminClient();

  try {
    // Sign out the user
    await account.deleteSession("current");

    // Clear all cookies
    // const response = NextResponse.json({});

    // return response;
    // Redirect to login page
    
    return NextResponse.redirect("/login");
  } catch (error) {
    console.log('error', error);
    // NextResponse.json({ error: error.message })
    
  }
}
