import React, { useEffect, useState } from "react";
import { FiSave, FiClipboard } from "react-icons/fi";
import { BiChevronLeftCircle } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import ButtonPrimary from "../../components/ButtonPrimary";
import { templates } from "../../data";
import {
  EditorState,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = () => {
  const navigate = useNavigate()

  const { id } = useParams();
  const [raw, setRaw] = useState("");
  const [template, setTemplate] = useState();
  const [input, setInput] = useState();
  const [output, setOutput] = useState('')

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

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
  const tags = [
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
  ];

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
    console.log(rawText);
    // You can now send the `rawText` to your server or perform any required operations
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  console.log(input);

  return (
    <div className="flex gap-6">
      <div className="md:w-2/3 p-8">
        <button onClick={(e) => navigate('/dashboard')} title="Back" className="text-2xl hover:text-gray-600">
            <BiChevronLeftCircle />
          </button>

        <div className="flex justify-between">
        <h2 className="text-primary-dark text-2xl font-medium uppercase">
            {template?.title}
          </h2>
          <button className="mt-1 font-semibold border border rounded-full px-3 flex items-center gap-2 hover:bg-theme-primary hover:border-transparent">
            <FiSave /> Save as PDF
          </button>
        </div>
        <div className="bg-white rounded-3xl justify-between mt-3">
          <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorStateChange}
            toolbarClassName="bg-primary-light"
            editorClassName="min-h-[19rem] rounded-3xl px-8"
          />
        </div>

        <div className="py-3 w-full mt-3">
          <div className="flex flex-wrap gap-1">
            {tags.map(({ tag, desc }, index) => (
              <button
                key={index}
                onClick={(e) => setInput(desc)}
                className={`${
                  tagColors[index % tagColors.length]
                } text-primary-dark px-3 py-1 rounded-full text-[12px] font-medium uppercase`}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="flex gap-2 items-center justify-between mt-3">
            <input
              type="text"
              className="rounded-lg px-6 py-3  bg-[#ECECEC] w-[73%] focus:outline-none"
              autoFocus
              placeholder="Add additional prompt..."
              value={input}
              onChange={handleInputChange}
            />
            <button className="rounded-lg py-3 px-6 bg-theme-primary font-semibold">Refine Document</button>
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
            {!output && <span className="text-gray-400 text-lg">Your refined document will appear here...</span> }
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
