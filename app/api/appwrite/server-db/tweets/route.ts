import { createSessionClient } from "@/lib/server/app-write";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = (await cookies()).get("session");

  if (!session) {
    return NextResponse.json({ error: "Access Denied" }, { status: 403 });
  }

  try {
    const { databases } = await createSessionClient(session.value);
    const { documents: tweets, total } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE!,
      process.env.NEXT_PUBLIC_TWEETS_COLLECTION!
    );

    return NextResponse.json({ tweets, total });
  } catch (error) {
    console.log("error from server-db order page", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
