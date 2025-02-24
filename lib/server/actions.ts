"use server";

import { ID } from "node-appwrite";
import {
  appWriteClient,
  appWriteCreateAdminClient,
} from "@/lib/server/app-write";
import { appDetails, appRoutes } from "@/lib/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSessionClient } from "@/lib/server/app-write";

export async function handleLoginFormSubmit(formData: FormData) {
  const email = formData.get("email") as string;

  const { account } = await appWriteClient();

  //   console.log("window.location.origin", window.location.origin);

  const result = await account.createMagicURLToken(
    ID.unique(),
    email,
    `${process.env.NEXT_BASE_URL}/${appRoutes.verifyEmail}`
  );

  //   console.log("result", result);
  return result;
}

export async function handleLoginEmailOTPSubmit(formData: FormData) {
  const email = formData.get("email") as string;

  const { account } = await appWriteCreateAdminClient();

  const userInfo = await account.createEmailToken(ID.unique(), email, false);

  (await cookies()).set(
    appDetails.loginDetailForOtp,
    JSON.stringify({ userId: userInfo.userId, email })
  );

  redirect(appRoutes.verifyEmail);
}

export async function handleVerifyEmailTokenSubmit(formData: FormData) {
  const userLoginDetail = (await cookies()).get(appDetails.loginDetailForOtp)
    ? JSON.parse(
        (await cookies()).get(appDetails.loginDetailForOtp)?.value || "{}"
      )
    : null;

  const secret = formData.get("otp") as string;

  const { account } = await appWriteCreateAdminClient();

  const session = await account.createSession(userLoginDetail.userId, secret);

  (await cookies()).set("session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  if (session) {
    redirect(appRoutes.home);
  }
}

export async function handleOnboardingSubmit(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const username = formData.get("username") as string;

  const { databases } = await createSessionClient();

  const { account } = await createSessionClient();

  const user = await account.get();

  const response = await databases.createDocument(
    process.env.NEXT_PUBLIC_DATABASE!,
    process.env.NEXT_PUBLIC_USERS_COLLECTION!,
    ID.unique(),
    {
      username,
      firstName,
      lastName,
      uid: user.$id,
      email: user.email,
      createdAt: user.$createdAt,
    }
  );

  if (response) {
    (await cookies()).set(
      "user",
      JSON.stringify({
        username,
        firstName,
        lastName,
        uid: user.$id,
        email: user.email,
      })
    );

    redirect(appRoutes.home);
  }
}
