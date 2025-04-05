"use client";
import React from "react";
import FontConfig from "./FontConfig"; // Assuming you already have this

const FontConfigPanel = ({ fonts, currentFont, setCurrentFont }) => {
  return (
    <div className="bg-white rounded-2xl w-full border border-gray-200 p-4">
      {fonts.length > 0 ? (
        <FontConfig fonts={fonts} onFontChange={setCurrentFont} />
      ) : (
        <p>Loading fonts...</p>
      )}
    </div>
  );
};

export default FontConfigPanel;
