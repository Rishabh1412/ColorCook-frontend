"use client";
import React from "react";

const FontControls = ({ googleFontLink, currentFont }) => {
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

  const handleDownloadFontFile = async () => {
    try {
      const response = await fetch(googleFontLink);
      const cssContent = await response.text();
      const regex = /url\((https?:\/\/[^)]+?\.(ttf|otf))\)/i;
      const match = cssContent.match(regex);

      if (match && match[1]) {
        const fontFileUrl = match[1].replace(/['"]/g, "");
        const fontResponse = await fetch(fontFileUrl);
        const fontBlob = await fontResponse.blob();
        const downloadUrl = URL.createObjectURL(fontBlob);
        const a = document.createElement("a");
        a.href = downloadUrl;
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
    <div className="mt-4 flex items-center">
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
  );
};

export default FontControls;
