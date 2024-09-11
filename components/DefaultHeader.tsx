"use client";

import { Close, Menu } from "@mui/icons-material";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { ThemeSwitcher } from "./theme/ThemeSwitcher";
import { User } from "lucide-react";

const DefaultHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-background  py-4 md:py-6 top-0 z-10 w-full">
      <div className="flex justify-between items-center">
        <Link href="#" className="text-lg font-bold" prefetch={false}>
          Mighty Boateng
        </Link>

        <div className="flex items-center gap-4">
          {/* <div className="md:hidden">
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none"
            >
              {isMenuOpen ? (
                <Close className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div> */}
          <div
            className={`md:flex md:gap-6 ${
              isMenuOpen
                ? "flex flex-col absolute top-full left-0 right-0 bg-gray-100 p-4"
                : "hidden"
            }`}
          >
            <Link
              href="#pricing"
              className="text-sm font-medium hover:underline underline-offset-4 py-2 md:py-0"
              prefetch={false}
            >
              Pricing
            </Link>
           
          </div>
          <ThemeSwitcher />
          <Button>
            <User />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default DefaultHeader;
