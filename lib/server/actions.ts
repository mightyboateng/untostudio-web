"use server";

import { ID, Query } from "node-appwrite";
import {
  appWriteServer,
  appWriteCreateAdminServer,
} from "@/lib/server/app-write";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSessionServer } from "@/lib/server/app-write";
import { appDetails, appRoutes } from "../constants";

export async function handleLoginFormSubmit(formData: FormData) {
  const email = formData.get("email") as string;

  const { account } = await appWriteServer();

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

  const { account } = await appWriteCreateAdminServer();

  const userInfo = await account.createEmailToken(ID.unique(), email, false);

  (await cookies()).set(
    appDetails.loginDetailForOtp,
    JSON.stringify({ userId: userInfo.userId, email })
  );

  redirect(appRoutes.verifyEmail);
}

export async function handleVerifyEmailTokenSubmit(secret: string) {
  const userLoginDetail = (await cookies()).get(appDetails.loginDetailForOtp)
    ? JSON.parse(
        (await cookies()).get(appDetails.loginDetailForOtp)?.value || "{}"
      )
    : null;

  const { account } = await appWriteCreateAdminServer();

  const session = await account.createSession(userLoginDetail.userId, secret);

  (await cookies()).set("session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  if (session) {
    try {
      const { account } = await createSessionServer();
      const { databases } = await createSessionServer();

      const user = await account.get();

      if (user) {
        const usersCollection = await databases.listDocuments(
          process.env.NEXT_PUBLIC_DATABASE!,
          process.env.NEXT_PUBLIC_USERS_COLLECTION!,
          [Query.equal("uid", user.$id)]
        );

        if (usersCollection.total === 0) {
          redirect(appRoutes.onboarding);
        } else {
          (await cookies()).set(
            "user",
            JSON.stringify({
              username: usersCollection.documents[0].username,
              firstName: usersCollection.documents[0].firstName,
              lastName: usersCollection.documents[0].lastName,
              userType: usersCollection.documents[0].userType,
              uid: usersCollection.documents[0].uid,
              // uid: usersCollection.documents[0].uid,
              isAdmin: usersCollection.documents[0].isAdmin,
              photoUrl: usersCollection.documents[0].photoUrl,
              email: user.email,
            })
          );
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "No session") {
        redirect(appRoutes.login);
      } else {
        throw error;
      }
    }
  }
}

export async function handleOnboardingSubmit(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const username = formData.get("username") as string;

  const { databases } = await createSessionServer();

  const { account } = await createSessionServer();

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
      userType: "free",
      isAdmin: false,
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

    redirect(appRoutes.dashboard);
  }
}
