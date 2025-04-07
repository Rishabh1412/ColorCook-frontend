"use client";
import React, { useState, useEffect, useRef } from "react";
import ChooseMode from "@/components/ChooseMode";
import FontPreviewArea from "@/components/FontPreviewArea";
import FontConfigPanel from "@/components/FontConfigPanel";
import FontControls from "@/components/FontControls";
import { fetchFonts, generateFontLink } from "../utils/googleFontsUtils";

const FontPairContainer = () => {
  const [fontFeatureType, setFontFeatureType] = useState("Manual");
  const [currentMainFont, setCurrentMainFont] = useState({
    fontFamily: "Inter",
    weight: "400",
    size: "32px",
    color: "#ffffff",
    opacity: 1,
    rotate: 0,
    styles: { bold: false, italic: false, underline: false },
  });
  const [currentSubFont, setCurrentSubFont] = useState({
    fontFamily: "Robot",
    weight: "400",
    size: "24px",
    color: "#cccccc",
    opacity: 1,
    rotate: 0,
    styles: { bold: false, italic: false, underline: false },
  });
  const [availableFonts, setAvailableFonts] = useState([]);
  const [bgColor, setBgColor] = useState("#000000");

  const mainFontLink = generateFontLink(currentMainFont.fontFamily, [
    currentMainFont.weight,
  ]);
  const subFontLink = generateFontLink(currentSubFont.fontFamily, [
    currentSubFont.weight,
  ]);
  
  useEffect(() => {
    async function loadFonts() {
      const fontsData = await fetchFonts();
      const mappedFonts = fontsData.map((font) => ({
        family: font.family,
        weights: font.variants,
      }));
      setAvailableFonts(mappedFonts);
    }
    loadFonts();
  }, []);
  

  useEffect(() => {
    const ensureFontLink = (id, href) => {
      let linkTag = document.getElementById(id);
      if (!linkTag) {
        linkTag = document.createElement("link");
        linkTag.id = id;
        linkTag.rel = "stylesheet";
        document.head.appendChild(linkTag);
      }
      linkTag.href = href;
    };
  
    ensureFontLink("google-font-link-main", mainFontLink);
    ensureFontLink("google-font-link-sub", subFontLink);
  }, [mainFontLink, subFontLink]);
  

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
          <FontPreviewArea
            currentMainFont={currentMainFont}
            currentSubFont={currentSubFont}
            bgColor={bgColor}
            setBgColor={setBgColor}
          />
          <FontConfigPanel
            fonts={availableFonts}
            currentMainFont={currentMainFont}
            setCurrentMainFont={setCurrentMainFont}
            currentSubFont={currentSubFont}
            setCurrentSubFont={setCurrentSubFont}
          />
        </div>
      ) : (
        <div>Generate Mode: Auto-generated font pairings</div>
      )}
      <FontControls googleFontLink={mainFontLink} currentFont={currentMainFont} />
    </div>
  );
};

export default FontPairContainer;
