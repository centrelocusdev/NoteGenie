import React, { useEffect, useRef, useState } from "react";
import { FiSave, FiClipboard } from "react-icons/fi";
import { useParams } from "react-router-dom";
import ButtonPrimary from "../../components/ButtonPrimary";
import { templates } from "../../data";

import { EditorState, convertToRaw, ContentState, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = () => {
  const { id } = useParams();
  const [raw, setRaw] = useState("");
  const [template, setTemplate] = useState();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const convertContentToRawText = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const rawText = rawContentState.blocks
      .map((block) => block.text)
      .join("\n");
    setRaw(rawText);
    // You can now send the `rawText` to your server or perform any required operations
  };

  useEffect(() => {
    setTemplate(() => {
      return templates.filter((t) => t.id == id)[0];
    });
  }, []);


  const tagColors = [
    "bg-[#FCD47C]",
    "bg-[#7CFC89]",
    "bg-[#7CCEFC]",
    "bg-[#967CFC]",
    "bg-[#FCEF7C]",
  ];
  const data = {
    ttile: "sbar",
    tags: [
      {
        tag: "soap",
        desc: "Simple Object Access Protocol",
      },
      {
        tag: "sbar",
        desc: "Situation, Background, Assessment, Recommendation",
      },
      {
        tag: "brip",
        desc: "Berg River Improvement Plan",
      },
    ],
  };

  return (
    <div className="flex gap-6">
      <div className="md:w-2/3 p-8">
        <h2 className="text-primary-dark text-3xl font-medium uppercase">
          {template?.title}
        </h2>

        <div className="bg-white rounded-3xl justify-between mt-3">
          <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorStateChange}
            toolbarClassName="bg-primary-light"
            editorClassName="min-h-[20rem] rounded-3xl px-8"
          />
        </div>

        <div className="py-3 absolute bottom-0">
          <div className="flex flex-wrap gap-1">
            {data.tags.map(({ tag, desc }, index) => (
              <button
                key={index}
                className={`${
                  tagColors[index % tagColors.length]
                } text-primary-dark px-3 py-1 rounded-full text-sm uppercase`}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              className="rounded-full px-6 py-2 my-2 bg-[#ECECEC]"
              placeholder="Additional prompt instructions"
            />
            <ButtonPrimary text={"refine document"} handleClick={convertContentToRawText} />
          </div>
        </div>
      </div>
      <div className="md:w-1/2 min-h-screen bg-primary-light">
        <div className="bg-theme-primary rounded-l-3xl h-full px-5">
          <div className="flex justify-between items-center px-8">
            <h4 className=" text-primary-dark text-xl font-medium bg-dark">
              NoteGenie Suggestions
            </h4>
            <div className="flex items-center">
              <ButtonPrimary text={"save as refined PDF"} icon={<FiSave />} />
              <button className="mt-3">
                <FiClipboard />
              </button>
            </div>
          </div>
          <div className="h-[85%] bg-white w-full rounded-3xl p-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
            eligendi magnam qui doloremque, illo assumenda autem consectetur!
            Libero sint animi ab beatae! Nulla veritatis temporibus minus
            eligendi! Rerum, labore et?
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
