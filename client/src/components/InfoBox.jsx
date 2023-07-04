import React from "react";
import { FiInfo } from "react-icons/fi";

const InfoBox = ({ display }) => {
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.2)] backdrop-blur flex justify-center items-center"
      style={{ zIndex: 9999 }} // Set a higher z-index to make sure it's rendered on top of other components
    >
      <div className="md:w-1/3 rounded-2xl mx-auto bg-white px-8 py-5">
        <h3 className="text-xl uppercase flex items-center gap-1 text-left w-full">
          <FiInfo /> Info
        </h3>
        <h4 className="text-xl mt-2">
          Please enter any additional prompt, that you would want NoteGenie to consider for your notes
        </h4>
        <button
          onClick={() => display()}
          className="bg-theme-primary px-3 py-1 rounded mt-4 float-right font-medium"
        >
          Okay!
        </button>
        <div className="flex justify-center gap-4 mt-5 text-lg"></div>
      </div>
    </div>
  );
};

export default InfoBox;
