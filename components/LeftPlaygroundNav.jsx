import React from "react";
import PlaygroundNavBtn from "./PlaygroundNavBtn";
import { usePathname } from "next/navigation";

const LeftPlaygroundNav = ({ scrollToSection }) => {
  const pathname = usePathname();

  return (
    <div className="pt-18 bg-white h-screen min-h-max shadow-xs px-4 w-44 flex flex-col gap-2">
      {pathname === "/feature/playground" && (
        <>
          <h5 className="text-gray-300 tracking-widest text-xs font-semibold">Playground</h5>
          <PlaygroundNavBtn text="Fonts" onClick={() => scrollToSection("fonts")} />
          <PlaygroundNavBtn text="Colors" onClick={() => scrollToSection("colors")} />
          <PlaygroundNavBtn text="Gradients" onClick={() => scrollToSection("gradients")} />
          <PlaygroundNavBtn text="Layouts" onClick={() => scrollToSection("layouts")} />
        </>
      )}
    </div>
  );
};

export default LeftPlaygroundNav;
