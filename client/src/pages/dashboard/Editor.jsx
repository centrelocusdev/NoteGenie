import React, { useEffect, useState } from "react";
import { FiSave, FiClipboard } from "react-icons/fi";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import { predefinedTemplates } from "../../data";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { getTemplate, getUserByToken, sendPrompt } from "../../api";
import { PDFDownloadLink, Page, Text, Document, StyleSheet } from "@react-pdf/renderer";
import { toast } from "react-toastify";

const styles = StyleSheet.create({
  page: {
    padding: 20, // Add padding to the page
  },
  text: {
    fontSize: 12, // Reduce the font size
  },
});

const TextEditor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const type = queryParams.get('type')

  const [template, setTemplate] = useState();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [profession, setProfession] = useState("");
  const [editorState, setEditorState] = useState();
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const runIt = async () => {
      const user = await getUserByToken();
      setProfession(user.profession);

      if(type == 'predefined') {
        const t = predefinedTemplates(profession).filter((t) => t._id == id)[0]
        setTemplate(t)
      } else if (type == 'custom') {
        const t = await getTemplate(id)
        setTemplate(t)
      }
    };

    runIt();
    setTemplate(() => {
      if(type == 'predefined') {
        return predefinedTemplates(profession).filter((t) => t.id == id)[0];
      } else {
        return predefinedTemplates(profession).filter((t) => t.id == id)[0];
      }
    });
  }, [profession]);

  useEffect(() => {
    const initialContent = "";
    const contentState = ContentState.createFromText(initialContent);
    const initialEditorState = EditorState.createWithContent(contentState);
    setEditorState(initialEditorState);
  }, [template]);

  const handleEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleRefineDocClick = async () => {
    setIsLoading(true)
    setOutput('')
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const rawText = rawContentState.blocks
      .map((block) => block.text)
      .join("\n");
    
    const prompt = `${template.description}\n${rawText}\n${input}`
    setInput('')
    setEditorState('')
    const res = await sendPrompt({prompt})
    res && setIsLoading(false)
    !res.err && setOutput(res)
  };

  const handleCopyRes = () => {
    navigator.clipboard.writeText(output)
    toast.success('Copied to clipboard')
  }

  return (
    <div className="md:flex gap-6">
      <div className="md:w-2/3 p-8 flex flex-col justify-between gap-8">
        <div className="mb-5">
          <button
            onClick={(e) => navigate("/dashboard")}
            title="Back"
            className="text-2xl hover:text-gray-600"
          >
            <BsArrowLeftCircle />
          </button>

          <div className="md:flex justify-between items-center">
            <h2 className="text-primary-dark text-xl  font-medium uppercase">
              {id == "new" ? "new template" : template?.name}
            </h2>
            <PDFDownloadLink
              document={
                <Document>
                  <Page style={styles.page}>
                    <Text cstyle={styles.text}>{template?.description}</Text>
                  </Page>
                </Document>
              }
              fileName="NoteGenieNote.pdf"
            >
              {({loading }) =>
                loading ? "Generating PDF..." : <button className="mt-1 font-semibold border rounded-full px-3 py-1 flex items-center gap-2 hover:bg-theme-primary hover:border-transparent">
                <FiSave /> Save Note
              </button>
              }
            </PDFDownloadLink>     
          </div>
          <div className="bg-white rounded-3xl justify-between mt-3">
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorStateChange}
              toolbarClassName="bg-primary-light"
              editorClassName="md:min-h-[275px] md:max-h-[15rem] min-h-[10rem] rounded-3xl px-8"
              placeholder="Please enter your notes here..."
            />
          </div>
        </div>
        <div className="md:flex gap-2 items-end h-[10%] justify-between">
          <div className="md:w-[73%] w-full flex flex-col gap-1">
          <label htmlFor="input" className="w-full font-semibold text-gray-500">Enter Additional Prompt (optional)</label>
          <input
            type="text"
            className="rounded-lg px-6 py-3  bg-[#ECECEC] w-full focus:outline-none"
            name="input"
            autoFocus
            placeholder="Add additional prompt..."
            value={input}
            onChange={handleInputChange}
          />
          </div>
          <button onClick={handleRefineDocClick} className="rounded-lg py-3 px-6 bg-theme-primary font-semibold md:w-fit w-full md:mt-0 mt-3">
            Refine Document
          </button>
        </div>
      </div>
      <div className="md:w-1/2 md:p-0 p-8 min-h-screen bg-primary-light">
        <div className="bg-theme-primary md:rounded-l-3xl rounded h-full px-5 md:pb-0 pb-5 max-h-screen">
          <div className="md:flex justify-between items-center md:px-8 py-4">
            <h4 className="text-primary-dark text-xl font-medium bg-dark">
              NoteGenie Suggestions
            </h4>
           {
            output &&  <div className="flex md:items-center w-fit ">
            <PDFDownloadLink
              document={
                <Document>
                  <Page style={styles.page}>
                    <Text cstyle={styles.text}>{output}</Text>
                  </Page>
                </Document>
              }
              fileName="NoteGenieNote.pdf"
            >
              {({loading }) =>
                loading ? "Generating PDF..." : <button className="font-semibold rounded-full px-3 py-1 flex items-center gap-2 hover:bg-primary-light">
                <FiSave /> Save as PDF
              </button>
              }
            </PDFDownloadLink>
              <button onClick={handleCopyRes} title="copy">
                <FiClipboard />
              </button>
            </div>
           }
          </div>
          <div className="md:max-h-[85%] md:min-h-[85%] overflow-y-scroll  min-h-[10rem] bg-white w-full md:rounded-3xl rounded md:p-8 p-4 text-gray-400 text-lg">
            {!output ? (
              <span>{isLoading ? 'Magic Note in Progress...' : 'Your refined document will appear here...'}</span>
            ) : <p><pre className="whitespace-pre-line font-sans text-justify">{output}</pre></p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
