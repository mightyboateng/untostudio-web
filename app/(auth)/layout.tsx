import { appWriteAccount } from "@/lib/server/app-write";
import { appRoutes } from "@/utils/constants";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  // try {
  //   const user = await appWriteAccount().getSession("current");

  //   if (user) {
  //     redirect(appRoutes.pro);
  //   }

  // } catch (error) {
  //   console.log('error from auth layout', error);
  //   // throw error;
  // }
  return <div>{children}</div>;
};

export default layout;
