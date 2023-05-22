import React, { useState } from "react";
import ButtonPrimary from "./ButtonPrimary";
import InputPrimary from "./InputPrimary";
import JoditEditor from 'jodit-react';

const Popup = ({display}) => {
  const [content, setContent] = useState('');

  return (
    <div className="w-screen min-h-screen bg-[rgba(0,0,0,0.2)] backdrop-blur flex justify-center items-center fixed">
      <div className="md:w-1/3 rounded-2xl mx-auto bg-white p-8">
        <h4 className="text-4xl text-theme-primary text-center">
          Custom Template
        </h4>

        <form>
          <InputPrimary name={'template_name'} placeholer={'Enter a name for your template'} />
          <InputPrimary name={'tags'} placeholer={'Enter tags'} />
          <div className="mt-3">
          <p className="text-lg mb-1">Template <span className="text-gray">(Enter Format)</span></p>
          <JoditEditor
            value={content}
            config={{
              readonly: false,
              placeholder: "Start typing...",
            }}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
            onChange={(newContent) => {}}
          />
          <ButtonPrimary text={'continue'} width={'full'} />
          <button onClick={display} className="text-gray text-center w-full hover:underline">Close</button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
