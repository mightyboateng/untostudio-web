'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Models } from "node-appwrite";
import { getCurrentUser } from "@/lib/server/cookies-action";
import { currentUserType } from "@/types/userType";
import {
  appWriteRawDatabase,
  getSessionClientUser,
} from "@/lib/appwrite-client";
import { Loader2 } from "lucide-react";

const ConnectedSocialIcon = () => {
  const [youtube, setYoutube] = useState<Models.Document | null>(null);
  const [instagram, setInstagram] = useState<Models.Document | null>(null);
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

        const [youtubeResult, instagramResult] = await Promise.allSettled([
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
        ]);

        if (youtubeResult.status === "fulfilled") {
          setYoutube(youtubeResult.value);
        }
        if (instagramResult.status === "fulfilled") {
          setInstagram(instagramResult.value);
        }
      } catch (error) {
        console.error("Error fetching social connections:", error);
      } finally {
        setIsLoading(false);
      }
    };

    handleGetCurrentUser();
  }, []);

  const connectedIcons = [
    youtube && {
      name: "youtube",
      icon: "/socials/youtube.png",
    },
    instagram && {
      name: "instagram",
      icon: "/socials/instagram.png",
    },
  ].filter(Boolean);

  if (isLoading) {
    return (
      <div className="relative flex items-center justify-center w-full bg-secondary p-2 rounded">
        <Loader2 className="w-4 h-4 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center gap-4 w-full p-2 rounded">
      {connectedIcons.map((icon, index) => (
        <div key={index}>
          <Image src={icon!.icon} alt={icon!.name} width="15" height="15" />
        </div>
      ))}
    </div>
  );
};

export default ConnectedSocialIcon;
