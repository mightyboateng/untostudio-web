import SideNavBar from "@/components/SideNavBar";
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

      if (usersCollection.total === 0) {
        redirect(appRoutes.onboarding);
      } 

    }
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "No session") {
      redirect(appRoutes.login);
    } else {
      throw error;
    }
  }

  return (
    <div className="flex h-screen w-full md:flex-row flex-col overflow-hidden">
      <SideNavBar />
      <div className="flex-1 md:p-6 p-3 overflow-y-scroll">{children}</div>
    </div>
  );
};

export default layout;
