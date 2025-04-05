"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { use } from "react";

const Nav = () => {
    const pathname = usePathname();
  return (
    <div className="w-full bg-white flex shadow-2xs items-center py-3 px-5">
      {/* Added p-4 to the parent for padding */}
      <div className="flex items-center w-full justify-between gap-10">
        <Link href="/">
          <h1 className="text-2xl font-bold">
            <span className="font-extrabold bg-gradient-to-r from-sea-left to-sea-right bg-clip-text text-transparent">
              Colour
            </span>
            Cook
          </h1>
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/feature/playground" className={`text-md transition-all ease-fluid duration-300 ${pathname=== "/feature/playground" ? "font-medium border-1 text-black border-sea-left bg-sea-left/10 rounded-md px-3 py-1 hover:px-5 hover:text-black" : "hover:bg-gray-200 py-1 px-3 rounded-md "}`}>
            Playground
          </Link>
          <Link href="/feature/moodboard" className={`text-md transition-all ease-fluid duration-300 ${pathname=== "/feature/moodboard" ? "font-medium border-1 text-black border-sea-left bg-sea-left/10 rounded-md px-3 py-1 hover:px-5 hover:text-black" : "hover:bg-gray-200 py-1 px-3 rounded-md"}`}>
            Moodboard
          </Link>
        </div>
        {/* Fixed small dot to make it visible */}
        <div className="w-6 h-6 bg-black rounded-full"></div>
      </div>
    </div>
  );
};

export default Nav;
