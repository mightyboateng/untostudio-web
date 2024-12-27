import { appRoutes } from "@/lib/constants";
import { createSessionClient } from "@/lib/server/app-write";
import { redirect } from "next/navigation";
import { Query } from "node-appwrite";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  try {
    const { account } = await createSessionClient();
    const { databases } = await createSessionClient();

    const user = await account.get();

    if (user) {
      const usersCollection = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE!,
        process.env.NEXT_PUBLIC_USERS_COLLECTION!,
        [Query.equal("uid", user.$id)]
      );

      if (usersCollection.total < 0) {
        redirect(appRoutes.home);
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "No session") {
      redirect(appRoutes.login);
    } else {
      throw error;
    }
  }
  return <div>{children}</div>;
};

export default layout;
