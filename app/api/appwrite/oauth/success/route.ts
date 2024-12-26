// src/app/oauth/route.js

import { appWriteCreateAdminClient } from "@/lib/server/app-write";
import { appRoutes } from "@/lib/constants";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId") ?? "";
  const secret = request.nextUrl.searchParams.get("secret") ?? "";

  const { account } = await appWriteCreateAdminClient();
  const session = await account.createSession(userId, secret);

  (await cookies()).set("session", session.secret, {
    path: appRoutes.home,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    expires: new Date(session.expire),
  });

  return NextResponse.redirect(`${request.nextUrl.origin}/${appRoutes.home}`);
}
