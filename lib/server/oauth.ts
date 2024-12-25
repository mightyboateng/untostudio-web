// "use server";

// import { appWriteCreateAdminClient } from "@/lib/server/app-write";
// import { appRoutes } from "@/utils/constants";
// import { redirect } from "next/navigation";
// import { OAuthProvider } from "node-appwrite";

// export async function signInWithGoogle() {
//   console.log("hello");
//   const { account } = await appWriteCreateAdminClient();

//   const redirectUrl = await account.createOAuth2Token(
//     OAuthProvider.Google,
//     `${window.location.origin}/api/oauth/success`,
//     `${window.location.origin}/${appRoutes.login}`
//   );

//   return redirect(redirectUrl);
// }

"use server";

import { appWriteCreateAdminClient } from "@/lib/server/app-write";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";
import { appRoutes } from "@/utils/constants";

export async function signUpWithGoogle() {

  const { account } = await appWriteCreateAdminClient();

  const origin = (await headers()).get("origin");

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${origin}/api/appwrite/oauth/success`,
    `${origin}/${appRoutes.login}`
  );

  return redirect(redirectUrl);
}
