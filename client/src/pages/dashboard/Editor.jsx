import React, { useEffect, useState } from "react";
import { FiSave, FiClipboard } from "react-icons/fi";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import ButtonPrimary from "../../components/ButtonPrimary";
import { predefinedTemplates } from "../../data";
import { EditorState, convertToRaw, ContentState  } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { getUserByToken } from "../../api";

const TextEditor = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [raw, setRaw] = useState("");
  const [template, setTemplate] = useState();
  const [input, setInput] = useState();
  const [output, setOutput] = useState("");
  const [profession, setProfession] = useState('')

  const [editorState, setEditorState] = useState();

  useEffect(() => {
    const runIt = async () => {
      const user = await getUserByToken()
      setProfession(user.profession)
    }

    runIt()
    setTemplate(() => {
      return predefinedTemplates(profession).filter((t) => t.id == id)[0];
    })
    
  }, []);

  useEffect(() => {
    const initialContent = template?.description || ''
    const contentState = ContentState.createFromText(initialContent)
    const initialEditorState  = EditorState.createWithContent(contentState)
    setEditorState(initialEditorState)
  }, [template])

  const handleEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const convertContentToRawText = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const rawText = rawContentState.blocks
      .map((block) => block.text)
      .join("\n");
    setRaw(rawText);    // You can now send the `rawText` to your server or perform any required operations
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex gap-6">
      <div className="md:w-2/3 p-8 flex flex-col justify-between gap-5">
        <div className="">
          <button
            onClick={(e) => navigate("/dashboard")}
            title="Back"
            className="text-2xl hover:text-gray-600"
          >
            <BsArrowLeftCircle />
          </button>

          <div className="flex justify-between">
            <h2 className="text-primary-dark text-xl font-medium uppercase">
              {id == 'new' ? 'new template' : template?.name}
            </h2>
            <button className="mt-1 font-semibold border border rounded-full px-3 flex items-center gap-2 hover:bg-theme-primary hover:border-transparent">
              <FiSave /> Save as PDF
            </button>
          </div>
          <div className="bg-white rounded-3xl justify-between mt-3 h-[100%]">
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorStateChange}
              toolbarClassName="bg-primary-light"
              editorClassName="min-h-[20rem] rounded-3xl px-8"
            />
          </div>
        </div>
        <div className="flex gap-2 items-center h-[10%] justify-between">
          <input
            type="text"
            className="rounded-lg px-6 py-3  bg-[#ECECEC] w-[73%] focus:outline-none"
            autoFocus
            placeholder="Add additional prompt..."
            value={input}
            onChange={handleInputChange}
          />
          <button className="rounded-lg py-3 px-6 bg-theme-primary font-semibold">
            Refine Document
          </button>
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
            {!output && (
              <span className="text-gray-400 text-lg">
                Your refined document will appear here...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
