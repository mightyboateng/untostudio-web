"use client";

import { Close } from "@mui/icons-material";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  HomeIcon,
  TrendingUpIcon,
  ShoppingCartIcon,
  LibraryIcon,
  CalendarIcon,
  MenuIcon,
} from "lucide-react";
import { YouTube } from "@mui/icons-material";
import UserDropDown from "./UserDropDown";
import { useSelector } from "react-redux";
import { reduxUserType } from "@/types/userType";

const SideNavBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const userDetail = useSelector((state: reduxUserType) => state.user.user);

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
      <div className="w-fit h-fit my-4 mx-3 md:hidden">
        {isCollapsed && (
          <MenuIcon onClick={toggleSidebar} className="h-6 w-6" />
        )}
      </div>
      <aside
        className={`
          flex flex-col items-start justify-between bg-secondary 
          ${
            isMobile
              ? `fixed top-0 left-0 h-full z-40 bg-background
               ${isCollapsed ? "-translate-x-full" : "translate-x-0"}`
              : `relative ${isCollapsed ? "w-16" : "w-[270px]"}`
          }
          px-2 border-r py-6
          transition-all duration-300
        
        `}
      >
        <div className="flex flex-col items-start gap-6 w-full">
          <div className="flex justify-between items-center gap-2 w-full border-b px-2 pb-4">
            {!isCollapsed && (
              <Link href="#" prefetch={false}>
                <YouTube className="h-6 w-6" />
              </Link>
            )}

            {!isMobile && isCollapsed && (
              <MenuIcon className="cursor-pointer" onClick={toggleSidebar} />
            )}

            {!isCollapsed && (
              <Close className="cursor-pointer" onClick={toggleSidebar} />
            )}
          </div>
          <nav className="flex flex-col items-start gap-2 w-full ">
            <NavLink
              href="#"
              icon={<HomeIcon className="h-5 w-5" />}
              text="Home"
              isCollapsed={isCollapsed}
            />
            <NavLink
              href="#"
              icon={<TrendingUpIcon className="h-5 w-5" />}
              text="Trending"
              isCollapsed={isCollapsed}
            />
            <NavLink
              href="#"
              icon={<ShoppingCartIcon className="h-5 w-5" />}
              text="Subscriptions"
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
              text="History"
              isCollapsed={isCollapsed}
            />
          </nav>
        </div>

        <UserDropDown
          username={userDetail?.displayName}
          isCollapsed={isCollapsed}
        />
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
      transition-colors hover:bg-default-hover/15 
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
