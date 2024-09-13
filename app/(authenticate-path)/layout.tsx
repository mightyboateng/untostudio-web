import SideNavBar from "@/components/SideNavBar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-full bg-[#181818] text-white">
      <SideNavBar />
      <div className="flex-1 bg-red-500">{children}</div>
    </div>
  );
};

export default layout;
