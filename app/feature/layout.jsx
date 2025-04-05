"use client";

import { useRef } from "react";
import LeftPlaygroundNav from "@/components/LeftPlaygroundNav";
import Nav from "@/components/Nav";
import Playground from "./playground/page";
import { usePathname } from "next/navigation";

export default function Layout() {
  // Create section refs
  const path = usePathname();
  const fontsRef = useRef(null);
  const colorsRef = useRef(null);
  const shadowsRef = useRef(null);
  const gradientsRef = useRef(null);
  const layoutsRef = useRef(null);

  const scrollToSection = (section) => {
    const refs = {
      fonts: fontsRef,
      colors: colorsRef,
      shadows: shadowsRef,
      gradients: gradientsRef,
      layouts: layoutsRef,
    };

    if (refs[section]?.current) {
      refs[section].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="flex flex-col h-screen relative bg-white">
      {/* Navbar */}
      <div className="top-0 left-0 right-0 z-10 w-full bg-white">
        <Nav />
      </div>

      {/* Sidebar */}
      <div className="top-0 left-0 fixed z-8">
        <LeftPlaygroundNav scrollToSection={scrollToSection} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pt-0 px-4 ml-36">
        {`${path}` === "/feature/playground" && (
          <Playground
            fontsRef={fontsRef}
            colorsRef={colorsRef}
            shadowsRef={shadowsRef}
            gradientsRef={gradientsRef}
            layoutsRef={layoutsRef}
          />
        )}
      </div>
    </div>
  );
}
