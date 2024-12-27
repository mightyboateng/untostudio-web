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
import { Button } from "@/components/ui/button";
// import { cookies } from "next/headers";
// import { useDispatch } from "react-redux";
// import { setUserDetail } from "@/redux/slides/userSlice";

const UserDropDown = ({
  // username,
  isCollapsed,
}: {
  // username: string;
  isCollapsed: boolean;
}) => {
  // const dispatch = useDispatch();
  // const user = (await cookies()).get("user")
  //   ? JSON.parse((await cookies()).get("user")?.value || "{}")
  //   : null;

  // const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch("/auth/sign-out", {
  //       method: "POST",
  //     });
  //     if (response.ok) {
  //       store.dispatch(setUser(null));
  //       window.location.href = "/";
  //     } else {
  //       console.error("Sign out failed:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Sign out error:", error);
  //   }
  // };

  return (
    <div className="flex items-center gap-2 w-full ">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center focus:outline-none border rounded p-2 w-full">
          <User />
          {!isCollapsed && (
            <span className="ml-2 text-sm font-medium line-clamp-1 overflow-hidden">
              {"user?.username"}
            </span>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel className="text-center py-2">
            <span className="text-sm font-medium line-clamp-1 overflow-hidden">
              {"user?.username"}
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
          <form action="/api/signout" method="POST">
            <DropdownMenuItem
              className="focus:bg-transparent"
              // onClick={signUserLog}
            >
              <Button type="submit" className="w-full bg-red-500 hover:bg-red-700">
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </Button>
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDropDown;
