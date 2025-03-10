// import { appWriteAccount } from "@/lib/server/app-write";

import { appRoutes } from "@/lib/constants";
import { createSessionServer } from "@/lib/server/app-write";
// import { AppwriteException } from "appwrite";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  try {
    const { account } = await createSessionServer();

    const user = await account.get();

    if (user) {
      redirect(appRoutes.dashboard);
    }
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "No session") {
      // redirect(appRoutes.login);
    } else {
      throw error;
    }
  }
  return <div>{children}</div>;
};

export default layout;
