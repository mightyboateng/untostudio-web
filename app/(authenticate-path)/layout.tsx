import SideNavBar from "@/components/SideNavBar";
import { appWriteAccount } from "@/lib/server/app-write";
import { appRoutes } from "@/utils/constants";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  // try {
  //   const user = await appWriteAccount().getSession('current');
  //   console.log("user session", user);

  //   // if (!user) {
  //   //   redirect(appRoutes.pro);
  //   // }
  // } catch (error) {
  //   redirect(appRoutes.login);
  //   throw error;
  // }

  return (
    <div className="flex h-screen w-full md:flex-row flex-col overflow-hidden">
      <SideNavBar />
      <div className="flex-1 md:p-6 p-3 overflow-y-scroll">{children}</div>
    </div>
  );
};

export default layout;
