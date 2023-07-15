import React from "react";
import { FiInfo } from "react-icons/fi";

const InfoBox = ({ display }) => {
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.2)] backdrop-blur flex justify-center items-center"
      style={{ zIndex: 9999 }}
    >
      <div className="md:w-1/3 rounded-2xl mx-auto bg-white px-8 py-5">
        <h3 className="text-xl uppercase flex items-center gap-1 text-left w-full">
          <FiInfo /> Info
        </h3>
        <h4 className="text-xl mt-2">
        The optional prompt feature allows you to provide specific context and guidance for ChatGPT to generate more accurate responses. Adding personalized prompts to your requests enables you to tailor the generated information to your unique requirements and obtain more relevant insights. This feature empowers you to get the most out of NoteGenie by customizing your interactions and receiving information that directly addresses your professional needs. As an example, if the NoteGenie results aren't quite what you need, you can go to the additional prompt section and ask it to make necessary modifications (i.e., "make the note no more than two paragraphs," "make the note into a bullet format," etc.)
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
