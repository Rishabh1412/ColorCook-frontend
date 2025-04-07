"use client";
import React, { useState } from "react";
import FontConfig from "./FontConfig"; // Assuming you already have this
import ChooseMode from "./ChooseMode";

const FontConfigPanel = ({ fonts, setCurrentMainFont, setCurrentSubFont }) => {
  const [fontType, setFontType] = useState("main");
  return (
    <div className="bg-white rounded-2xl w-full border border-gray-200 p-4">
      <div className="pb-4">
        <ChooseMode
          options={["Main font", "Sub font"]}
          onSelect={setFontType}
        />
      </div>

      {fonts.length > 0 ? (
        fontType === "main" ? (
          <FontConfig fonts={fonts} onFontChange={setCurrentMainFont} />
        ) : (
          <FontConfig fonts={fonts} onFontChange={setCurrentSubFont} />
        )
      ) : (
        <p>Loading fonts...</p>
      )}
    </div>
  );
};

export default FontConfigPanel;
