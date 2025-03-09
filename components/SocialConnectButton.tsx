import React from "react";
import { DropdownMenuShortcut } from "./ui/dropdown-menu";
import { SocialPlatform } from "@/types/socialType";
// import { Provider } from "next-auth/providers/index";
// import { signIn } from "@/lib/auth";
import { handleSocialConnectSubmit } from "@/lib/server/social-action";


const SocialConnectButton = ({ platform }: { platform: SocialPlatform }) => {
  // const [user, setUser] = useState<currentUserType | null>(null);
 
  const handleConnect = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await handleSocialConnectSubmit(platform);
  };

  return (
    <DropdownMenuShortcut className="text-xs border dark:border-white rounded-full px-3 py-1 cursor-pointer">
      <form onSubmit={handleConnect}>
        <button type="submit" className={`connect-btn ${platform}`}>
          Connect
        </button>
      </form>
    </DropdownMenuShortcut>
  );
};

export default SocialConnectButton;
