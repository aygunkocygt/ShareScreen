"use client";

import { usePathname } from "next/navigation";
import { User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "./logo2.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"; // Shadcn UI Dropdown Menu bileşenleri

export default function Navbar({ session }: any) {
  const user = session?.user;

  if (user == undefined) return null;

  return (
    <nav className="flex items-center justify-between p-4 bg-[#000000] border-b border-[#202121] shadow-lg">
      {/* Left side: Headings */}
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-sm font-semibold relative group hover:text-white">
          Home
          <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-300"></span>
        </Link>
        <Link href="/CreateRoom" className="text-sm font-semibold relative group hover:text-white">
          Create Room
          <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-300"></span>
        </Link>
      </div>

      {/* Center: Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Image
          src={Logo}
          width={60}
          priority={true}
          alt="Logo"
          className="mb-2"
        />
      </div>

      {/* Right side: User Icon or Avatar with Dropdown Menu */}
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer">
              {user?.image ? (
                <Avatar>
                  <AvatarImage src={user.image} alt="User Avatar" />
                  <AvatarFallback>
                    <User className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
              ) : (
                <User className="w-5 h-5 hover:text-white" />
              )}
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-[#282828] border-transparent w-32">
     

            {/* Profile */}
            <DropdownMenuItem className="hover:bg-[#3E3D3E]"  asChild>
              <Link href="/profile" className="text-xs text-[#DFDFDF] block">
                Profile
              </Link>
            </DropdownMenuItem>

            {/* Delete Account */}
            <DropdownMenuItem className="hover:bg-[#3E3D3E]">
              <Link href={""} className="text-xs text-red-500 block ">
                Delete Account
              </Link>
            </DropdownMenuItem>

            {/* Line separator */}
            <DropdownMenuSeparator  className="bg-[#524D4F]" />

            {/* Log Out */}
            <DropdownMenuItem className="hover:bg-[#3E3D3E]"> 
            <Link href="/profile" className="text-xs text-[#DFDFDF] block">
                Log Out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
