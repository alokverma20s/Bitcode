import React, { useDebugValue, useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { MdLightMode, MdDarkMode, MdCancel } from "react-icons/md";
import { VscDebugRestart } from "react-icons/vsc";

import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from "./constants";
import OutputBox from "./OutputBox";
import InputArea from "./InputArea";
import ProblemDescription from "./ProblemDescription";
import { Button, Toast } from "@chakra-ui/react";
import { executeCode } from "./api";
import { runCodeOnServer, submitCodeOnServer } from "../../services/operations/submissionAPI";
import { useNavigate, useParams } from "react-router-dom";


import { getProblemById, getProblemById2 } from "../../services/operations/ProblemAPI";
import OutputModal from "./OutputModal";
import { useDispatch } from "react-redux";

const EditorComponent = ({setLightTheme, lightTheme}) => {
  const [question, setQuestion] = useState({});//[question, setQuestion] = useState({})
  const editorRef = useRef(null);
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState(localStorage.getItem("language") || "cpp");
  const [stdin, setStdin] = useState("");
  const [loading, setLoading] = useState(true);
  const [editorTheme, setEditorTheme] = useState("light");
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState({})
  const [modalOpen, setModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("userInfo")).id;
  const params = useParams()
  const contest = params.constestId;
  const problem = params.problemId;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(!user) navigate("/auth");
    localStorage.getItem("code") && dispatch(getProblemById2(setLoading, setQuestion, problem)) && setValue(localStorage.getItem("code"));
    !(localStorage.getItem("code")) && dispatch(getProblemById(setLoading, setQuestion, setValue, problem));
  }, []);


  const onMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    localStorage.setItem("language", language);
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      dispatch(runCodeOnServer(setIsLoading, {user, problem, contest, language,version: LANGUAGE_VERSIONS[language], sourceCode, stdin}, setOutput));
      setModalOpen(true);
    } catch (error) {
      console.log(error);
      Toast({
        title: "An error occurred.",
        description: error.message || "Unable to run the code",
        status: "error",
        duration: 6000,
      });
    }
  };
  const submitCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      dispatch(submitCodeOnServer(setIsLoading, {user, problem, contest, language,version: LANGUAGE_VERSIONS[language], sourceCode, stdin}, setOutput))
      setModalOpen(true)
    } catch (error) {
      console.log(error);
      Toast({
        title: "An error occurred.",
        description: error.message || "Unable to Submit the code",
        status: "error",
        duration: 6000,
      });
    }
  };
    

  return (
    <div>
      <div className={`flex lg:space-x-4 flex-col lg:flex-row ${lightTheme ? "": "text-white"}`}>
        <div className="w-full lg:w-1/2 overflow-scroll h-[81vh] border p-3 border-gray-600 rounded-md">
          <ProblemDescription question={question} loading={loading} lightTheme={lightTheme} />
        </div>
          <div className="text-2xl w-full lg:w-1/2">
            <div className=" flex justify-between items-end">
              <LanguageSelector language={language} onSelect={onSelect} lightTheme= {lightTheme} />
              <Button
              variant={"outline"}
                colorScheme="green"
                mb={4}
                onClick={runCode}
                isLoading={isLoading}
              >
                Run Code
              </Button>
              <Button
              variant={"outline"}
                colorScheme="green"
                mb={4}
                onClick={submitCode}
                isLoading={isLoading}
              >
                Submit
              </Button>
              <div className="p-3 mb-3 border border-gray-500 rounded-lg cursor-pointer" onClick={()=>{
                setEditorTheme(editorTheme === 'vs-dark'? 'light': 'vs-dark');
                setLightTheme(!lightTheme)
              }}>
                {editorTheme === 'vs-dark'? <MdLightMode className="text-2xl text-gray-400" />: <MdDarkMode className="text-2xl text-gray-900" />}
              </div>
              <div className="p-3 mb-3 border border-gray-500 rounded-lg cursor-pointer" onClick={()=>{
                localStorage.removeItem("code");
                console.log(question);
                setValue(question.starterCode);
              }}>
                <VscDebugRestart/>
              </div>
            </div>
            <Editor
              className="border border-gray-600 h-[60vh] lg:h-[70vh]"
              // height="75vh"
              theme= {editorTheme}
              language={language}
              onMount={onMount}
              value={value}
              onChange={(e) => {
                setValue(e)
                localStorage.setItem("code", value)
              }}
              options={
                {
                  minimap: { enabled: false },
                  fontSize: 16,
                  wordWrap: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  lineNumbers: "on",
                  fontFamily: "JetBrains Mono",
                  contextmenu: false,
                  "semanticHighlighting.enabled": true,
                  acceptSuggestionOnEnter: "on",
                  scrollbar: {
                    vertical: "auto",
                    horizontal: "auto",
                    useShadows: true,
                    verticalHasArrows: false,
                    horizontalHasArrows: false,
                    verticalScrollbarSize: 17,
                    horizontalScrollbarSize: 17,
                    verticalSliderSize: 17,
                    horizontalSliderSize: 17,
                    horizontalScrollbarSize: 17,
                  }
                }
              }
            />
          </div>
        {/* <div className=" w-full lg:w-1/2">
        <OutputBox editorRef={editorRef} language={language} stdin={stdin} lightTheme= {lightTheme} />
          <div>
            <InputArea stdin={stdin} setStdin= {setStdin} lightTheme = {lightTheme} />
          </div>
        </div> */}
      </div>
      <OutputModal output= {output} modalOpen={modalOpen} setModalOpen={setModalOpen} loading={isLoading} />
    </div>
  );
};

export default EditorComponent;
