import React from 'react'
import Link from 'next/link'
import { ThemeSwitcher } from "./theme/ThemeSwitcher";
import { LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const UserDropDown = ({username, isCollapsed}: {username: string, isCollapsed: boolean}) => {
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center focus:outline-none border rounded p-2">
          <User />
          {!isCollapsed && (
            <span className="text-sm font-medium line-clamp-1 overflow-hidden">
              {username}
            </span>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel className="text-center py-2">
            Michael Adams
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
          <DropdownMenuItem className="flex items-center gap-2 text-red-500">
            <LogOut className="w-4 h-4" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserDropDown
