import React from "react";
import Link from "next/link";
import { LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUserDetail } from "@/redux/slides/userSlice";
import { auth } from "@/utils/firebase";

const UserDropDown = ({
  username,
  isCollapsed,
}: {
  username: string;
  isCollapsed: boolean;
}) => {
  const dispatch = useDispatch();

  const signUserLog = async () => {
    signOut(auth).then(() => {
      dispatch(setUserDetail(null));
    });
  };

  return (
    <div className="flex items-center gap-2 w-full ">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center focus:outline-none border rounded p-2 w-full">
          <User />
          {!isCollapsed && (
            <span className="ml-2 text-sm font-medium line-clamp-1 overflow-hidden">
              {username}
            </span>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel className="text-center py-2">
            <span className="text-sm font-medium line-clamp-1 overflow-hidden">
              {username}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/profile/adams-michael">
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <User className="w-4 h-4" /> Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <Settings className="w-4 h-4" /> Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-2 text-red-500 cursor-pointer"
            onClick={signUserLog}
          >
            <LogOut className="w-4 h-4" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDropDown;
