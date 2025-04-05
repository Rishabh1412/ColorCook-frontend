"use client";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";

const FontPreviewArea = ({ currentFont, bgColor, setBgColor }) => {
  const dragAreaRef = useRef(null);
  const [editing, setEditing] = useState(false);

  return (
    <div
      className="rounded-2xl w-full relative border max-h-80 min-h-80 overflow-hidden border-gray-200 col-span-2 flex items-center justify-center"
      style={{ backgroundColor: bgColor }}
      ref={dragAreaRef}
    >
      <div className="absolute top-0 right-0 z-10 rounded-md bg-white/70 px-3 gap-2 overflow-auto flex max-w-32">
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
        animate={{ rotate: parseInt(currentFont.rotate || 0) }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          fontFamily: currentFont.fontFamily,
          fontWeight: currentFont.styles.bold ? "bold" : currentFont.weight,
          fontSize: currentFont.size,
          color: currentFont.color,
          fontStyle: currentFont.styles.italic ? "italic" : "normal",
          opacity: currentFont.opacity,
          textDecoration: currentFont.styles.underline ? "underline" : "none",
        }}
        className="absolute hover:cursor-grabbing hover:border-2 hover:border-blue-400 px-2 py-1"
      >
        Text Preview
      </motion.div>
    </div>
  );
};

export default FontPreviewArea;
