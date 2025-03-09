"use server";

import { signIn } from "../../auth";

export async function handleSocialConnectSubmit(provider: string) {
  await signIn(provider);
}
