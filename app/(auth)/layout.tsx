// import { appWriteAccount } from "@/lib/server/app-write";
import { appRoutes } from "@/lib/constants";
import { redirect } from "next/navigation";
import React from "react";
import auth from "@/lib/auth";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await auth.getUser()

  if(user){
    redirect(appRoutes.home);
  }
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
