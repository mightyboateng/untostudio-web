"use server";

import { ID } from "node-appwrite";
import { appWriteClient } from "@/lib/server/app-write";
import { appRoutes } from "@/lib/constants";

export async function handleLoginFormSubmit(formData: FormData) {
  const email = formData.get("email") as string;

  const { account } = await appWriteClient();

  const result = await account.createMagicURLToken(
    ID.unique(),
    email,
    `${process.env.NEXT_BASE_URL}/${appRoutes.verifyEmail}`
  );

  return result;
}
