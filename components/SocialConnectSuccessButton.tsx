import React from "react";
import { DropdownMenuShortcut } from "./ui/dropdown-menu";
import { SocialPlatform } from "@/types/socialType";
import { Link } from "lucide-react";

const SocialConnectSuccessButton = ({
  platform,
}: {
  platform: SocialPlatform;
}) => {
  const handleDisconnect = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(platform);
  };

  return (
    <DropdownMenuShortcut className="text-xs dark:text-green-400 text-green-800">
      <form onSubmit={handleDisconnect}>
        <button type="submit" className="flex items-center">
          <Link className="h-3 w-3 mr-1" /> Connected
        </button>
      </form>
    </DropdownMenuShortcut>
  );
};

export default SocialConnectSuccessButton;
