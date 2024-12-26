// import { appWriteClient } from "@/lib/server/app-write";
import { appWriteCreateAdminClient } from "@/lib/server/app-write";
import { appRoutes } from "@/lib/constants";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const userId = searchParams.get("userId");

  const { account } = await appWriteCreateAdminClient();

  try {
    const session = await account.createSession(userId!, secret!);

    (await cookies()).set("session", session.secret, {
      // use the session secret as the cookie value
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(session.expire),

      path: appRoutes.home,
    });

    console.log("cookies ----", (await cookies()).get("session"));

    // if (user) {
    //   return NextResponse.redirect("/app");
    // }
    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.log("error", error);
    return NextResponse.redirect(appRoutes.login);
  }
}
