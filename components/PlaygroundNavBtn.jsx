import React from "react";

const PlaygroundNavBtn = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className="text-gray-600 text-md text-start hover:bg-teal-100 active:bg-teal-300 active:text-black active:font-medium hover:text-gray-900 py-2 px-4 rounded-3xl transition-all ease-snappy duration-700">
      {text}
    </button>
  );
};

export default PlaygroundNavBtn;
