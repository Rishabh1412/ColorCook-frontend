"use client";

import { useState } from "react";

const ChooseMode = ({ options, onSelect }) => {
  const [selected, setSelected] = useState(options.length > 0 ? options[0] : "");

  const handleSelect = (option) => {
    setSelected(option);
    onSelect(option);
  };

  return (
    <div className="flex items-center border-2 border-sea-left rounded-lg">
      {options.map((option, index) => (
        <button
          key={index}
          className={`py-2 px-4 w-full transition-all ${
            selected === option ? "bg-gradient-to-r from-teal-400 to-sea-left text-white rounded-md" : ""
          }`}
          onClick={() => handleSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ChooseMode;
