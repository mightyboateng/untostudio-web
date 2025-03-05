

import React from "react";
import { Unplug } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import XIcon from "@mui/icons-material/X";
import { Facebook, YouTube, Instagram } from "@mui/icons-material";
import Image from "next/image";
import SocialConnectButton from "./SocialConnectButton";



const ConnectAccountDropdown = ({
  isCollapsed,
}: {
  isCollapsed: boolean;
}) => {
  // const session = await auth();


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <span
          className={`
      flex items-center gap-3 rounded-md px-3 py-2 w-full
      transition-colors hover:dark:bg-default-hover/15 hover:bg-default
      ${isCollapsed ? "justify-center" : ""}
    `}
        >
          <Unplug className="h-5 w-5" />
          {!isCollapsed && <span className="text-sm font-medium">Connect</span>}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 md:ml-6">
        <DropdownMenuLabel>Connect your accounts</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* <DropdownMenuItem>
          <GitHub
            style={{ width: "1rem", height: "1rem", marginRight: "0.5rem" }}
          />
          <span>GitHub</span>
          <UnConnectedButton provider="github" />
        </DropdownMenuItem> */}

        <DropdownMenuItem>
          <Facebook
            style={{ width: "1rem", height: "1rem", marginRight: "0.5rem" }}
          />
          <span>Facebook</span>
          <SocialConnectButton platform="facebook" />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <YouTube
            style={{ width: "1rem", height: "1rem", marginRight: "0.5rem" }}
          />
          <span>Youtube</span>
          <SocialConnectButton platform="youtube" />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <XIcon
            style={{ width: "1rem", height: "1rem", marginRight: "0.5rem" }}
          />
          <span>Twitter</span>
          <DropdownMenuShortcut className="text-xs border dark:border-white rounded-full px-3 py-1 cursor-pointer">
            Connect
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Instagram
            style={{ width: "1rem", height: "1rem", marginRight: "0.5rem" }}
          />
          <span>Instagram</span>
          <DropdownMenuShortcut className="text-xs border dark:border-white rounded-full px-3 py-1 cursor-pointer">
            Connect
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Image
            src="/icon-logo/tiktok-icon.svg"
            width={16}
            height={16}
            className="mr-2 filter grayscale dark:filter-none"
            alt="tiktok"
          />
          <span>Tiktok</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ConnectAccountDropdown;
