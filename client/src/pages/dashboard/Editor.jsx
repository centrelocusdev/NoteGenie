import React, { useEffect, useState } from "react";
import { FiSave, FiClipboard } from "react-icons/fi";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import ButtonPrimary from "../../components/ButtonPrimary";
import { predefinedTemplates } from "../../data";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { getUserByToken } from "../../api";
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

  const { id } = useParams();
  const [raw, setRaw] = useState("");
  const [template, setTemplate] = useState();
  const [input, setInput] = useState();
  const [output, setOutput] = useState("");
  const [profession, setProfession] = useState("");
  const [showEditor, setShowEditor] = useState(false);

  const [editorState, setEditorState] = useState();

  useEffect(() => {
    const runIt = async () => {
      const user = await getUserByToken();
      setProfession(user.profession);
    };

    runIt();
    setTemplate(() => {
      return predefinedTemplates(profession).filter((t) => t.id == id)[0];
    });
  }, [profession]);

  useEffect(() => {
    const initialContent = template?.description || "";
    const contentState = ContentState.createFromText(initialContent);
    const initialEditorState = EditorState.createWithContent(contentState);
    setEditorState(initialEditorState);
  }, [template]);

  const handleEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const convertContentToRawText = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const rawText = rawContentState.blocks
      .map((block) => block.text)
      .join("\n");
    setRaw(rawText); // You can now send the `rawText` to your server or perform any required operations
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
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
                loading ? "Generating PDF..." : <button className="mt-1 font-semibold border border rounded-full px-3 py-1 flex items-center gap-2 hover:bg-theme-primary hover:border-transparent">
                <FiSave /> Save Note
              </button>
              }
            </PDFDownloadLink>     
          </div>
          <div className="bg-white rounded-3xl justify-between mt-3 h-[100%]">
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorStateChange}
              toolbarClassName="bg-primary-light"
              editorClassName="md:min-h-[16rem] min-h-[10rem] rounded-3xl px-8"
            />
          </div>
        </div>
        <div className="md:flex gap-2 items-center h-[10%] justify-between">
          <input
            type="text"
            className="rounded-lg px-6 py-3  bg-[#ECECEC] md:w-[73%] w-full focus:outline-none"
            autoFocus
            placeholder="Add additional prompt..."
            value={input}
            onChange={handleInputChange}
          />
          <button className="rounded-lg py-3 px-6 bg-theme-primary font-semibold md:w-fit w-full md:mt-0 mt-3">
            Refine Document
          </button>
        </div>
      </div>
      <div className="md:w-1/2 md:p-0 p-8 min-h-screen bg-primary-light">
        <div className="bg-theme-primary md:rounded-l-3xl rounded h-full px-5 md:pb-0 pb-5">
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
          <div className="md:h-[85%] min-h-[10rem] bg-white w-full md:rounded-3xl rounded md:p-8 p-4">
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
