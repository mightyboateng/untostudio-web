import React, { useEffect, useState } from "react";
import { Loader2, Unplug } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import XIcon from "@mui/icons-material/X";
import { Facebook, YouTube, Instagram } from "@mui/icons-material";
import Image from "next/image";
import SocialConnectButton from "./SocialConnectButton";
import { getCurrentUser } from "@/lib/server/cookies-action";
import { currentUserType } from "@/types/userType";
// import { createSessionServer } from "@/lib/server/app-write";
import {  Models } from "node-appwrite";
import SocialConnectSuccessButton from "./SocialConnectSuccessButton";
import {
  appWriteRawDatabase,
  getSessionClientUser,
} from "@/lib/appwrite-client";

const ConnectAccountDropdown = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const [youtube, setYoutube] = useState<Models.Document | null>(null);
  const [instagram, setInstagram] = useState<Models.Document | null>(null);
  const [tiktok, setTiktok] = useState<Models.Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleGetCurrentUser = async () => {
      try {
        setIsLoading(true);
        const userDetail = await getCurrentUser();
        const user = userDetail
          ? (JSON.parse(
              JSON.stringify(JSON.parse(userDetail))
            ) as currentUserType)
          : null;

        const sessionUser = await getSessionClientUser();

        if (!sessionUser || !user) {
          setIsLoading(false);
          return;
        }

        // Use Promise.allSettled to handle both requests simultaneously
        const [youtubeResult, instagramResult, tiktokResult] =
          await Promise.allSettled([
            appWriteRawDatabase.getDocument(
              process.env.NEXT_PUBLIC_DATABASE!,
              process.env.NEXT_PUBLIC_YOUTUBE_COLLECTION!,
              user?.uid
            ),
            appWriteRawDatabase.getDocument(
              process.env.NEXT_PUBLIC_DATABASE!,
              process.env.NEXT_PUBLIC_INSTAGRAM_COLLECTION!,
              user?.uid
            ),
            appWriteRawDatabase.getDocument(
              process.env.NEXT_PUBLIC_DATABASE!,
              process.env.NEXT_PUBLIC_INSTAGRAM_COLLECTION!,
              user?.uid
            ),
          ]);

        // Handle YouTube result
        if (youtubeResult.status === "fulfilled") {
          setYoutube(youtubeResult.value);
        } else if (youtubeResult.reason?.code === 404) {
          setYoutube(null);
        }

        // Handle Instagram result
        if (instagramResult.status === "fulfilled") {
          setInstagram(instagramResult.value);
        } else if (instagramResult.reason?.code === 404) {
          setInstagram(null);
        }

        // Handle Tiktok result
        if (tiktokResult.status === "fulfilled") {
          setTiktok(tiktokResult.value);
        } else if (tiktokResult.reason?.code === 404) {
          setTiktok(null);
        }
      } catch (error) {
        console.error("Error fetching social connections:", error);
        setYoutube(null);
        setInstagram(null);
        setTiktok(null);
      } finally {
        setIsLoading(false);
      }
    };

    handleGetCurrentUser();
  }, []);

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
          {isLoading ? (
            <div className="flex justify-end w-full">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div> // Add your loading component
          ) : youtube ? (
            <SocialConnectSuccessButton platform="youtube" />
          ) : (
            <SocialConnectButton platform="youtube" />
          )}
        </DropdownMenuItem>
        {/* <DropdownMenuItem>
          <XIcon
            style={{ width: "1rem", height: "1rem", marginRight: "0.5rem" }}
          />
          <span>Twitter</span>
          <DropdownMenuShortcut className="text-xs border dark:border-white rounded-full px-3 py-1 cursor-pointer">
            Connect
          </DropdownMenuShortcut>
        </DropdownMenuItem> */}
        <DropdownMenuItem>
          <Instagram
            style={{ width: "1rem", height: "1rem", marginRight: "0.5rem" }}
          />
          <span>Instagram</span>
          {isLoading ? (
            <div className="flex justify-end w-full">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div> // Add your loading component
          ) : instagram ? (
            <SocialConnectSuccessButton platform="instagram" />
          ) : (
            <SocialConnectButton platform="instagram" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Image
            src="/icon-logo/tiktok-icon.svg"
            width={16}
            height={16}
            className="mr-2 filter grayscale dark:filter-none"
            alt="TikTok"
          />
          <span>TikTok</span>
          {isLoading ? (
            <div className="flex justify-end w-full">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div> // Add your loading component
          ) : tiktok ? (
            <SocialConnectSuccessButton platform="tiktok" />
          ) : (
            <SocialConnectButton platform="tiktok" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ConnectAccountDropdown;
