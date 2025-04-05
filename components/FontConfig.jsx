"use client";
import React, { useState, useEffect } from "react";

// A helper function to convert variants to numeric weight values
const convertVariant = (variant) => {
  if (variant === "regular") return "400";
  // If the variant ends with "italic", remove that part and return the number.
  if (variant.endsWith("italic")) {
    return variant.replace("italic", "") || "400";
  }
  return variant;
};

const FontConfig = ({ fonts, currentFont, onFontChange }) => {
  const [selectedFont, setSelectedFont] = useState("Inter");
  const [availableWeights, setAvailableWeights] = useState(["400"]);
  const [selectedWeight, setSelectedWeight] = useState("400");
  const [fontSize, setFontSize] = useState(32); // number for input type=number
  const [color, setColor] = useState("#000000");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [rotate, setRotate] = useState(0); // number for input type=number
  const [opacity, setOpacity] = useState(100);

  // Update available weights when selectedFont or fonts change
  useEffect(() => {
    if (fonts.length > 0) {
      const fontData = fonts.find((font) => font.family === selectedFont);
      // Map the variants to numeric weights (e.g., "regular" -> "400")
      const weights = fontData
        ? fontData.weights.map((w) => convertVariant(w))
        : ["400"];
      setAvailableWeights(weights);
      if (!weights.includes(selectedWeight)) {
        setSelectedWeight(weights[0]);
      }
    }
  }, [selectedFont, fonts, selectedWeight]);

  
  // Propagate the current configuration to the parent
  useEffect(() => {
    if (onFontChange) {
      onFontChange({
        fontFamily: selectedFont,
        weight: selectedWeight,
        size: `${fontSize}px`,
        color,
        styles: {
          bold: isBold,
          italic: isItalic,
          underline: isUnderline,
        },
        rotate:rotate,
        opacity: opacity / 100,
      });
    }
  }, [
    selectedFont,
    selectedWeight,
    fontSize,
    color,
    isBold,
    isItalic,
    isUnderline,
    rotate,
    opacity,
    onFontChange,
  ]);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        {/* Font Family Selection */}
        <div className="gap-2 flex">
          <div className="flex flex-col w-1/2">
            <label className="text-xs font-semibold text-neutral-800">
              Font Family
            </label>
            <select
              className="bg-[#f5f5f5] rounded-md text-sm w-full py-1.5 px-1"
              value={selectedFont}
              style={{ fontFamily: selectedFont }}
              onChange={(e) => setSelectedFont(e.target.value)}
            >
              {fonts.map((font) => (
                <option
                  key={font.family}
                  style={{ fontFamily: font.family }}
                  value={font.family}
                >
                  {font.family}
                </option>
              ))}
            </select>
          </div>

          {/* Font Weight Selection */}
          <div className="flex flex-col w-1/2">
            <label className="text-xs font-semibold text-neutral-800">
              Font Weight
            </label>
            <select
              className="bg-[#f5f5f5] poppins rounded-md normWeight text-sm w-full py-1.5 px-1"
              value={selectedWeight}
              onChange={(e) => setSelectedWeight(e.target.value)}
            >
              {availableWeights.map((weight, index) => (
                <option
                  className="poppins normWeight"
                  key={index}
                  value={weight}
                >
                  {weight}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Font Size & Color Inputs */}
        <div className="flex gap-2 w-full">
          <div className="flex flex-col w-1/3">
            <label className="text-xs font-semibold text-neutral-800">
              Font Size (px)
            </label>
            <input
              type="number"
              value={fontSize}
              onChange={(e) => {
                let val = e.target.value.replace(/^0+/, "") || "0";
                let num = parseInt(val, 10);

                if (isNaN(num)) {
                  setFontSize("0");
                } else if (num > 100) {
                  setFontSize("100");
                } else {
                  setFontSize(val);
                }
              }}
              className="bg-[#f5f5f5] poppins normWeight rounded-md px-2 py-1 text-sm"
            />
          </div>
          <div className="flex flex-col w-2/3">
            <label className="text-xs font-semibold text-neutral-800">
              Font Color
            </label>
            <div className="gap-2 w-full flex">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="bg-[#f5f5f5] w-1/3 rounded-md px-1 py-0"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="bg-[#f5f5f5] w-2/3 rounded-md px-2 py-1 text-sm"
              />
            </div>
          </div>
        </div>
        <hr className="text-neutral-300 my-1" />
        {/* Text Style Buttons */}
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setIsBold(!isBold)}
            className={`p-2 rounded-md ${
              isBold ? "bg-gray-300" : "bg-[#f5f5f5]"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M4 3a1 1 0 0 1 1-1h6a4.5 4.5 0 0 1 3.274 7.587A4.75 4.75 0 0 1 11.25 18H5a1 1 0 0 1-1-1V3Zm2.5 5.5v-4H11a2 2 0 1 1 0 4H6.5Zm0 2.5v4.5h4.75a2.25 2.25 0 0 0 0-4.5H6.5Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={() => setIsItalic(!isItalic)}
            className={`p-2 rounded-md ${
              isItalic ? "bg-gray-300" : "bg-[#f5f5f5]"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M8 2.75A.75.75 0 0 1 8.75 2h7.5a.75.75 0 0 1 0 1.5h-3.215l-4.483 13h2.698a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3.215l4.483-13H8.75A.75.75 0 0 1 8 2.75Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={() => setIsUnderline(!isUnderline)}
            className={`p-2 rounded-md ${
              isUnderline ? "bg-gray-300" : "bg-[#f5f5f5]"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M4.75 2a.75.75 0 0 1 .75.75V9a4.5 4.5 0 1 0 9 0V2.75a.75.75 0 0 1 1.5 0V9A6 6 0 0 1 4 9V2.75A.75.75 0 0 1 4.75 2ZM2 17.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <hr className="text-neutral-300 my-1" />
        <div className="w-full flex gap-2">
          <div className="flex flex-col w-1/2">
            <label className="text-xs font-semibold text-neutral-800">
              Rotate (deg)
            </label>
            <input
              type="number"
              value={rotate}
              onChange={(e) => {
                let val = e.target.value.replace(/^0+/, "") || "0";
                let num = parseInt(val, 10);

                if (isNaN(num)) {
                  setRotate("0");
                } else {
                  setRotate(val);
                }
              }}
              className="bg-[#f5f5f5] poppins normWeight rounded-md px-2 py-1 text-sm"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="text-xs font-semibold text-neutral-800">
              Opacity (%)
            </label>
            <input
              type="number"
              value={opacity}
              onChange={(e) => {
                let val = e.target.value.replace(/^0+/, "") || "0";
                let num = parseInt(val, 10);

                if (isNaN(num)) {
                  setOpacity("0");
                } else if (num > 100) {
                  setOpacity("100");
                } else {
                  setOpacity(val);
                }
              }}
              className="bg-[#f5f5f5] poppins normWeight rounded-md px-2 py-1 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FontConfig;
