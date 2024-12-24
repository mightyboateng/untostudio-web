import { appWriteAccount } from "@/utils/app-write";
import { appRoutes } from "@/utils/constants";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  try {
    const user = await appWriteAccount().get();

    if (user) {
      redirect(appRoutes.pro);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // throw error;
  }
  return <div>{children}</div>;
};

export default layout;
