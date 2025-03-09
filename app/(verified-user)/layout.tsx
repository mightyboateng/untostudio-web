import { auth } from "@/auth";
import SideNavBar from "@/components/SideNavBar";
import { appRoutes } from "@/lib/constants";
import { createSessionServer } from "@/lib/server/app-write";
import { redirect } from "next/navigation";
import { Query } from "node-appwrite";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const session = await auth();

        // if(session){
        //   console.log("session from layout", session);
        // }
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
      <div className="md:w-[1200px] w-full mx-auto overflow-y-scroll">
        <div className="flex-1 md:p-6 p-3 ">{children}</div>
      </div>
    </div>
  );
};

export default layout;
