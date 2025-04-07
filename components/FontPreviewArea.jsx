"use client";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";

const FontPreviewArea = ({ currentMainFont,currentSubFont, bgColor, setBgColor }) => {
  const dragAreaRef = useRef(null);
  const previewRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [editingSub, setEditingSub] = useState(false);
  const [canDownload, setCanDownload] = useState(false);

  const handleCanDownload=()=>{
    setCanDownload(!canDownload);
  }
  const handleExport = async (type = "png") => {
    if (!previewRef.current) return;
  
    const node = previewRef.current;
  
    const scale = 2.5; // Increase for better quality (2.5 = 250% resolution)
    const style = getComputedStyle(node);
    const width = parseInt(style.width, 10);
    const height = parseInt(style.height, 10);
  
    try {
      let dataUrl;
      const exportOptions = {
        width: width * scale,
        height: height * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${width}px`,
          height: `${height}px`,
        },
        pixelRatio: scale,
      };
  
      if (type === "jpeg" || type === "jpg") {
        dataUrl = await htmlToImage.toJpeg(node, {
          quality: 0.95,
          ...exportOptions,
        });
      } else {
        dataUrl = await htmlToImage.toPng(node, exportOptions);
      }
  
      download(dataUrl, `font-preview.${type}`);
    } catch (error) {
      console.error("High-quality image export failed", error);
    }
  };

  
  const textStyles = {
    fontFamily: currentMainFont.fontFamily,
    fontWeight: currentMainFont?.styles?.bold
      ? "bold"
      : currentMainFont?.weight || "400",
    fontSize: currentMainFont?.size || "16px",
    color: currentMainFont?.color || "#000000",
    fontStyle: currentMainFont?.styles?.italic ? "italic" : "normal",
    opacity: currentMainFont?.opacity ?? 1,
    textDecoration: currentMainFont?.styles?.underline ? "underline" : "none",
  };
  const textStylesSub = {
    fontFamily: currentSubFont.fontFamily,
    fontWeight: currentSubFont?.styles?.bold
      ? "bold"
      : currentSubFont?.weight || "400",
    fontSize: currentSubFont?.size || "16px",
    color: currentSubFont?.color || "#000000",
    fontStyle: currentSubFont?.styles?.italic ? "italic" : "normal",
    opacity: currentSubFont?.opacity ?? 1,
    textDecoration: currentSubFont?.styles?.underline ? "underline" : "none",
  };

  return (
    <div
      className="rounded-2xl w-full relative border h-full overflow-hidden border-gray-200 col-span-2 flex items-center justify-center"
      style={{ backgroundColor: bgColor }}
      ref={dragAreaRef}
    >
      {/* Background color picker */}
      <div className="absolute top-0 right-0 z-10 rounded-md bg-white/70 px-2 gap-2 overflow-auto flex max-w-32">
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          className="text-black border-none h-8 w-8 cursor-pointer"
        />
        <input
          type="text"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          onBlur={(e) => setBgColor(e.target.value)}
          className="w-3/4 text-neutral-800 poppins border-none cursor-pointer outline-0"
        />
      </div>

      {/* Export buttons */}
      <div onClick={()=>handleCanDownload()} className={`absolute bottom-1 right-1 z-10 flex gap-2 opacity-50 transition-all duration-200 ease-fluid hover:opacity-100 ${canDownload ? "bg-white opacity-100" : "bg-white/70"} p-2 rounded-xl shadow-md`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
          />
        </svg>
      </div>
      <div className={`absolute bottom-1 right-12 z-10 bg-white pt-2 px-1 rounded-lg shadow-md ${canDownload ? "block" : "hidden"}`}>
        <p className="text-xs text-neutral-800 font-semibold px-1">Export as:</p>
        <div className="flex flex-col gap-0 py-1">
          <button
            className="text-xs bg hover:bg-neutral-200 active:bg-neutral-300 text-neutral-800 px-2 py-2 rounded"
            onClick={() => handleExport("png")}
          >
            Export PNG
          </button>
          <button
            className="text-xs bg hover:bg-neutral-200 active:bg-neutral-300 text-neutral-800 px-2 py-2 rounded"
            onClick={() => handleExport("jpeg")}
          >
            Export JPG
          </button>
        </div>
      </div>
      {/* Text preview area to be exported */}
      <div
        ref={previewRef}
        className="w-full h-full flex items-center justify-center relative"
        style={{ backgroundColor: bgColor }}
      >
        <motion.div
          contentEditable={editing}
          onDoubleClick={() => setEditing(true)}
          onBlur={() => setEditing(false)}
          suppressContentEditableWarning={true}
          drag
          dragConstraints={dragAreaRef}
          dragElastic={0.2}
          dragMomentum={false}
          whileDrag={{ scale: 1.05 }}
          animate={{ rotate: parseInt(currentMainFont.rotate || 0) }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute hover:cursor-grabbing hover:border-2 z-10 hover:border-blue-400 px-2 py-1"
          style={textStyles}
        >
          Text Preview
        </motion.div>
        <motion.div
          contentEditable={editingSub}
          onDoubleClick={() => setEditingSub(true)}
          onBlur={() => setEditingSub(false)}
          suppressContentEditableWarning={true}
          drag
          dragConstraints={dragAreaRef}
          dragElastic={0.2}
          dragMomentum={false}
          whileDrag={{ scale: 1.05 }}
          animate={{ rotate: parseInt(currentSubFont.rotate || 0) }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute hover:cursor-grabbing hover:border-2 hover:border-blue-400 px-2 py-1"
          style={textStylesSub}
        >
          Text Sub Preview
        </motion.div>
      </div>
    </div>
  );
};

export default FontPreviewArea;
