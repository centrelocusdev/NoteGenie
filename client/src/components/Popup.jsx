import React, { useEffect, useState } from "react";
import ButtonPrimary from "./ButtonPrimary";
import InputPrimary from "./InputPrimary";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { getUserByToken, createTemplate } from "../api";

const Popup = ({display}) => {
  const [userId, setUserId] = useState()
  const [name, setName] = useState();
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const runIt = async () => {
      const user = await getUserByToken()
      setUserId(user._id)
    }

    runIt()
  }, [])

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true)
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const rawText = rawContentState.blocks
      .map((block) => block.text)
      .join("\n");

    const res = await createTemplate({name, description: rawText, userId, type: 'custom'})
    display()
    res && setName('')
    res && setIsLoading(false)
  };

  return (
    <div className="w-screen min-h-screen bg-[rgba(0,0,0,0.2)] backdrop-blur flex justify-center items-center fixed p-8 md:p-0">
      <div className="md:w-1/3 rounded-2xl mx-auto bg-white p-8 ">
        <h4 className="text-4xl text-theme-primary text-center">
          Custom Template
        </h4>

        <div>
          <InputPrimary name={'name'} placeholer={'Enter a name for your template'} onChange={handleNameChange} />
          <div className="mt-3">
          <p className="text-lg mb-1 font-semibold text-gray-600  ">Template <span className="text-gray">(Enter Format)</span></p>
          <div className="bg-white rounded-3xl justify-between mt-3 h-[100%]">
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorStateChange}
              toolbarClassName="bg-primary-light"
              editorClassName="min-h-[7rem] rounded px-5 bg-gray-100"
            />
          </div>
          <ButtonPrimary text={isLoading ? 'saving...' : 'save template'} width={'full'} handleClick={handleSubmit} />
          <button onClick={display} className="text-gray text-center w-full hover:underline">Close</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
