import AllFeatures from "@/components/AllFeatures";
import React from "react";

const Page = () => {
  return (
    <div className="flex-col w-full min-h-screen items-center justify-center flex">
      <h1 className="text-8xl font-medium h-screen w-full bg-gradient-to-b from-teal-50 to-[#f5f5f5]  items-center justify-center flex">
        <span className="font-extrabold bg-gradient-to-r from-sea-left to-sea-right bg-clip-text text-transparent">
          Colour
        </span>
        Cook
      </h1>
      <AllFeatures/>
    </div>
  );
};

export default Page;
