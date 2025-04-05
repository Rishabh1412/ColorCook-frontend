"use client";
import React, { useState, useEffect, useRef } from "react";
import ChooseMode from "@/components/ChooseMode";
import FontConfig from "./FontConfig";
import { fetchFonts, generateFontLink } from "../utils/googleFontsUtils.js";
import { motion } from "motion/react";

const FontPair = () => {
  const dragAreaRef = useRef(null);

  const [fontFeatureType, setFontFeatureType] = useState("Manual");
  const [currentFont, setCurrentFont] = useState({
    fontFamily: "Inter",
    weight: "400",
    size: "16px",
    color: "#000000",
    opacity:1,
    rotate: 0,
    styles: { bold: false, italic: false, underline: false },
  });
  const [availableFonts, setAvailableFonts] = useState([]);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [editing, setEditing] = useState(false);

  // Fetch available fonts from Google Fonts API on mount
  useEffect(() => {
    async function loadFonts() {
      const fontsData = await fetchFonts();
      // Map the fontsData to a structure with family and weights (variants)
      const mappedFonts = fontsData.map((font) => ({
        family: font.family,
        weights: font.variants,
      }));
      setAvailableFonts(mappedFonts);
    }
    loadFonts();
  }, []);

  // Generate the Google Fonts URL using the current font selection.
  const googleFontLink = generateFontLink(currentFont.fontFamily, [
    currentFont.weight,
  ]);

  // Dynamically inject/update the Google Fonts link in the document head.
  useEffect(() => {
    const id = "google-font-link";
    let linkTag = document.getElementById(id);
    if (!linkTag) {
      linkTag = document.createElement("link");
      linkTag.id = id;
      linkTag.rel = "stylesheet";
      document.head.appendChild(linkTag);
    }
    linkTag.href = googleFontLink;
  }, [googleFontLink]);

  // Download handler: fetches the CSS file and triggers download of the CSS.
  const handleDownload = async () => {
    try {
      const response = await fetch(googleFontLink);
      const cssContent = await response.text();
      const blob = new Blob([cssContent], { type: "text/css" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${currentFont.fontFamily.replace(/\s+/g, "-")}.css`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading font CSS:", error);
    }
  };

  const handleEditing = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const handleBgColorChange = (e) => {
    const color = e.target.value;
    setBgColor(color);
  };

  // New Download handler for TTF/OTF: searches for a TTF/OTF URL in the CSS and downloads it.
  const handleDownloadFontFile = async () => {
    try {
      const response = await fetch(googleFontLink);
      const cssContent = await response.text();

      // Regular expression to find a URL ending with .ttf or .otf.
      const regex = /url\((https?:\/\/[^)]+?\.(ttf|otf))\)/i;
      const match = cssContent.match(regex);

      if (match && match[1]) {
        const fontFileUrl = match[1].replace(/['"]/g, "");
        const fontResponse = await fetch(fontFileUrl);
        const fontBlob = await fontResponse.blob();
        const downloadUrl = URL.createObjectURL(fontBlob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        // match[2] is the extension (ttf or otf)
        a.download = `${currentFont.fontFamily.replace(/\s+/g, "-")}.${
          match[2]
        }`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl);
      } else {
        console.error("No TTF/OTF file found in the CSS.");
      }
    } catch (error) {
      console.error("Error downloading TTF/OTF font file:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col leading-0">
          <h2 className="text-2xl font-bold mb-4">Font Fusion</h2>
          <p className="-translate-y-5 text-sm text-neutral-300">
            Explore different font pairings and styles.
          </p>
        </div>
        <ChooseMode
          options={["Manual", "Generate"]}
          onSelect={setFontFeatureType}
        />
      </div>

      {fontFeatureType === "Manual" ? (
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
          {/* Left Pane: Font Preview */}
          <div
            className="rounded-2xl w-full relative border max-h-80 min-h-80 overflow-hidden border-gray-100 col-span-2 flex items-center justify-center"
            style={{ backgroundColor: bgColor }}
            ref={dragAreaRef}
          >
            <div className="absolute top-0 right-0 z-10 rounded-md bg-white/70 px-3 gap-2 overflow-auto flex max-w-32">
              <input
                type="color"
                value={bgColor}
                onChange={handleBgColorChange}
                className="text-black border-none h-8 w-8 cursor-pointer"
              />
              <input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                onBlur={handleBgColorChange}
                className="w-3/4 text-neutral-800 poppins border-none cursor-pointer outline-0"
              />
            </div>

            <motion.div
              contentEditable={editing}
              onDoubleClick={handleEditing}
              onBlur={handleBlur}
              suppressContentEditableWarning={true}
              drag
              dragConstraints={dragAreaRef}
              dragElastic={0.2} // control how “stretchy” the drag is (0 to 1)
              dragMomentum={false} // disables slide-after-release motion
              whileDrag={{ scale: 1.05 }} // subtle zoom while dragging
              animate={{ rotate: parseInt(currentFont.rotate || 0) }} // Animate rotation
              transition={{ type: "spring", stiffness: 300, damping: 20 }} // smoother release motion
              style={{
                fontFamily: currentFont.fontFamily,
                fontWeight: currentFont.styles.bold
                  ? "bold"
                  : currentFont.weight,
                fontSize: currentFont.size,
                color: currentFont.color,
                fontStyle: currentFont.styles.italic ? "italic" : "normal",
                opacity: currentFont.opacity,
                textDecoration: currentFont.styles.underline
                  ? "underline"
                  : "none",
              }}
              className="absolute hover:cursor-grabbing hover:border-2 hover:border-blue-400 px-2 py-1"
            >
              Text Preview
            </motion.div>
          </div>

          {/* Right Pane: Font Configuration */}
          <div className="bg-white rounded-2xl w-full border border-gray-100 p-4">
            {availableFonts.length > 0 ? (
              <FontConfig
                fonts={availableFonts}
                onFontChange={setCurrentFont}
              />
            ) : (
              <p>Loading fonts...</p>
            )}
          </div>
        </div>
      ) : (
        <div>Generate Mode: Auto-generated font pairings</div>
      )}

      {/* Download Link and Buttons */}
      <div className="mt-4 flex items-center  ">
        <a
          title="View Google fonts link"
          href={googleFontLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-600 bg-[#f5f5f5] p-1 rounded-full underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
          </svg>
        </a>
        <button
          onClick={handleDownload}
          className="ml-4 bg-sea-left text-white font-semibold text-sm rounded-md px-3 py-1"
        >
          Download Font CSS
        </button>
        <button
          onClick={handleDownloadFontFile}
          className="ml-4 bg-[#f5f5f5] text-sm rounded-md px-3 py-1"
        >
          Download TTF/OTF
        </button>
      </div>
    </div>
  );
};

export default FontPair;
