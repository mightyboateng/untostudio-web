"use client";

import { Close, } from "@mui/icons-material";
import Link from "next/link";
import React, { useState, useEffect } from "react";
// import { Button } from "./ui/button";
import {
  HomeIcon,
  
  LibraryIcon,
  MenuIcon,
  // Unplug,
  Lightbulb,
  MessageCircle,
  // ChartColumn,
  BotMessageSquare,
  Settings,
  CalendarIcon,
  // Hammer,
} from "lucide-react";
// import { YouTube } from "@mui/icons-material";
import UserDropDown from "./UserDropDown";
import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { ToolsDropdownComponent } from "./tools/ToolsDropdownComponent";
// import { useQuery } from "@tanstack/react-query";
// import { getCurrentUser } from "@/lib/server-actions/users";

import ConnectAccountDropdown from "./ConnectAccountDropdown";
import { appDetails } from "@/lib/constants";


const SideNavBar = () => {
  // const query = useQuery({ queryKey: ["user"], queryFn: getCurrentUser });

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // const pathName = usePathname();
  // const pageName =
  //   pathName.split("/")[1].charAt(0).toUpperCase() +
  //   pathName.split("/")[1].slice(1).toLowerCase();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div className="w-fit h-fit my-4 mx-3 md:hidden flex items-center gap-4">
        {isCollapsed && (
          <MenuIcon onClick={toggleSidebar} className="h-6 w-6" />
        )}
        {/* {query.data?.username ? (
          <h3 className="md:text-xl text-xs">
            {pageName === kUrls.homePath
              ? `Hello, ${query.data?.username}`
              : pageName}
          </h3>
        ) : (
          <h3 className="md:text-xl text-xs">Hello,</h3>
        )} */}
      </div>
      <aside
        className={`
          flex flex-col items-start justify-between md:bg-transparent bg-secondary 
          ${
            isMobile
              ? `fixed top-0 left-0 h-full z-40 bg-background
               ${isCollapsed ? "-translate-x-full" : "translate-x-0"}`
              : `relative ${isCollapsed ? "w-16" : "w-[270px]"}`
          }
          px-2 md:border-0 border-r py-4
          transition-all duration-300
        
        `}
      >
        <div className="flex flex-col items-start  justify-between gap-6 w-full">
          <div className="flex justify-between items-center gap-2 w-full lg:border-0 border-b px-2 pb-4">
            {!isCollapsed && (
              <Link href="#" prefetch={false}>
                <Image
                  src={appDetails.logo}
                  alt={appDetails.name}
                  width={30}
                  height={30}
                />
              </Link>
            )}

            {!isMobile && isCollapsed && (
              <Link href="#" prefetch={false}>
                <Image
                  src={appDetails.logo}
                  alt={appDetails.name}
                  width={30}
                  height={30}
                />
              </Link>
            )}

            {!isCollapsed && (
              <Close className="cursor-pointer" onClick={toggleSidebar} />
            )}
          </div>
          <nav className="flex flex-col items-start gap-2 w-full ">
            <NavLink
              href="/home"
              icon={<HomeIcon className="h-5 w-5" />}
              text="Home"
              isCollapsed={isCollapsed}
            />
            <ConnectAccountDropdown isCollapsed={isCollapsed} />
          </nav>
        </div>

        {/* ///////////////////////////////////////////
        --------- Features tabs
        ////////////////////////////////////////// */}
        <nav className="flex flex-col items-start gap-2 w-full ">
          {/* <ToolsDropdownComponent isCollapsed={isCollapsed} /> */}

          <NavLink
            href="/ideas"
            icon={<Lightbulb className="h-5 w-5" />}
            text="Ideas"
            isCollapsed={isCollapsed}
          />

          <NavLink
            href="/comments"
            icon={<MessageCircle className="h-5 w-5" />}
            text="Comments"
            isCollapsed={isCollapsed}
          />
          <NavLink
            href="#"
            icon={<BotMessageSquare className="h-5 w-5" />}
            text="Bot"
            isCollapsed={isCollapsed}
          />
          <NavLink
            href="#"
            icon={<LibraryIcon className="h-5 w-5" />}
            text="Library"
            isCollapsed={isCollapsed}
          />
          <NavLink
            href="#"
            icon={<CalendarIcon className="h-5 w-5" />}
            text="Calendar"
            isCollapsed={isCollapsed}
          />
        </nav>

        <div className="w-full flex flex-col items-start gap-2">
          <NavLink
            href="#"
            icon={<Settings className="h-5 w-5" />}
            text="Settings"
            isCollapsed={isCollapsed}
          />
          <UserDropDown isCollapsed={isCollapsed} />
        </div>
      </aside>
    </>
  );
};

const NavLink = ({
  href,
  icon,
  text,
  isCollapsed,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
  isCollapsed: boolean;
}) => (
  <Link
    href={href}
    className={`
      flex items-center gap-3 rounded-md px-3 py-2 w-full
      transition-colors hover:dark:bg-default-hover/15 hover:bg-default
      ${isCollapsed ? "justify-center" : ""}
    `}
    aria-label={text}
    prefetch={false}
  >
    {icon}
    {!isCollapsed && <span className="text-sm font-medium">{text}</span>}
  </Link>
);

export default SideNavBar;
