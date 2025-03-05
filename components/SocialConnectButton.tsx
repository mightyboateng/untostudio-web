import React from "react";
import { DropdownMenuShortcut } from "./ui/dropdown-menu";
import { SocialPlatform } from "@/types/socialType";

const SocialConnectButton = ({ platform }: { platform: SocialPlatform }) => {
  return (
    <DropdownMenuShortcut className="text-xs border dark:border-white rounded-full px-3 py-1 cursor-pointer">
      <button className={`connect-btn ${platform}`}>Connect</button>
    </DropdownMenuShortcut>
  );
};

export default SocialConnectButton;

// const ConnectedButton = () => {
//   return (
//     <DropdownMenuShortcut className="text-xs dark:text-green-400 text-green-800">
//       <form>
//         <button type="submit" className="flex items-center">
//           <Link className="h-3 w-3 mr-1" /> Connected
//         </button>
//       </form>
//     </DropdownMenuShortcut>
//   );
// };

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const UnConnectedButton = ({ provider }: { provider: string }) => {
//   return (
//     <DropdownMenuShortcut className="text-xs border dark:border-white rounded-full px-3 py-1 cursor-pointer">
//       <form>
//         <button type="submit">Connect</button>
//       </form>
//     </DropdownMenuShortcut>
//   );
// };
