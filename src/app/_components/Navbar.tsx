"use client";

import { User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"; // Shadcn UI Dropdown Menu bileşenleri
import { usePathname, useRouter } from "next/navigation"; // usePathname ve useRouter hook'ları

export default function Navbar({ session }: any) {
  const user = session?.user;
  const pathname = usePathname(); // Geçerli path'i almak için
  const router = useRouter(); // Yönlendirme yapmak için useRouter hook'u

  // Eğer path /login ise Navbar'ı gösterme
  if (pathname === "/login") return null;

  console.log("user:", user);

  // Kullanıcının e-posta adresi yoksa logine yönlendir
  const handleDropdownClick = () => {
    if (!user?.email) {
      router.push("/login");
    }
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-[#000000] border-b border-[#202121] shadow-lg">
      {/* Left side: Headings */}
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-sm font-semibold relative group hover:text-white">
          Home
          <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-300"></span>
        </Link>
        {user?.email && (
          <Link href="/CreateRoom" className="text-sm font-semibold relative group hover:text-white">
            Create Room
            <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-300"></span>
          </Link>
        )}
      </div>

      {/* Center: Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Image
          src="/logo.png"
          width={60}
          height={60}
          priority={true}
          alt="Logo"
          className="mb-2"
        />
      </div>

      {/* Right side: User Icon or Avatar with Dropdown Menu */}
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer" onClick={handleDropdownClick}>
              {user?.image ? (
                <Avatar className="w-6 h-6">
                  <AvatarImage src={user.image} alt="User Avatar" />
                </Avatar>
              ) : (
                <User className="w-5 h-5 hover:text-white" />
              )}
            </div>
          </DropdownMenuTrigger>

          {/* Eğer kullanıcı email'e sahipse dropdown menüyü göster */}
          {user?.email && (
            <DropdownMenuContent className="bg-[#282828] border-transparent w-32">
              {/* Profile */}
              <DropdownMenuItem className="hover:bg-[#3E3D3E]" asChild>
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
              <DropdownMenuSeparator className="bg-[#524D4F]" />

              {/* Log Out */}
              <DropdownMenuItem className="hover:bg-[#3E3D3E]">
                <Link href="/profile" className="text-xs text-[#DFDFDF] block">
                  Log Out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>
    </nav>
  );
}
