import React, { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Editor from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";
import { createProblem } from "../../services/operations/ProblemAPI";
import Loader from "../../components/Loader/Loader"
import CodeEditor from "../Compiler/CodeEditor";

const AddProblem = () => {
  const navigate = useNavigate();
  const User = useSelector(state => state.userInfo.id);
  const editorRef = useRef(null);
  const [problemData, setProblemData] = useState({
    title: "",
    author: User?.result?._id,
    statement: "",
    examples: [],
    starterCode: "",
    constraints: "",
    difficulty: "",
    topics: "",
    companies: "",
    testcases: [],
    followUp: "",
    hints: "",
  });
  // console.log(problemData)

  const [tempExample, setTempExample] = useState({ input: "", output: "", explanation: "", });
  const [tempTestcase, setTempTestcase] = useState({ input: "", output: "", });
  const [loading, setLoading] = useState(false);

  const addExample = (e) => {
    e.preventDefault()
    setProblemData({
      ...problemData,
      examples: [...problemData.examples, tempExample],
    });
    setTempExample({
      input: "",
      output: "",
      explanation: "",
    });
  };

  const onMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();
  };
  const addTestcase = (e) => {
    e.preventDefault();
    setProblemData({
      ...problemData,
      testcases: [...problemData.testcases, tempTestcase],
    });
    setTempTestcase({
      input: "",
      output: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(problemData);
    // if (
    //   problemData.title === "" ||
    //   problemData.statement === "" ||
    //   problemData.examples.length === 0 ||
    //   problemData.constraints === "" ||
    //   problemData.difficulty === "" ||
    //   problemData.topics.length === 0 ||
    //   problemData.testcases.length === 0 ||
    //   problemData.starterCode === ""
    // )
    //   return alert("Please fill all the fields form the problem");


      const sourceCode = editorRef.current.getValue();

    const newProblemData = ({
      ...problemData,
      constraints: problemData.constraints.split("\n"),
      topics: problemData.topics.split(","),
      companies: problemData.companies.split(","),
      author: User?.result?._id,
      hints: problemData.hints.split("\n"),
      starterCode: sourceCode,
    });
    console.log(newProblemData);
    createProblem(setLoading, newProblemData, navigate)
  };

  return (
    
    <div className={`flex justify-center mx-auto ${loading ? 'h-screen items-center':""}`}>
      {loading ? <Loader /> : 
        <div className="mt-20 flex flex-col justify-center items-center w-[80vw]">
          <h1 className="text-4xl font-bold font-sans">Add Problem</h1>
          <form className="w-full" onSubmit={() => handleSubmit()}>
            <div className="my-10 flex flex-col gap-4">
              {/* Problem Title */}
              <div className="flex w-full flex-col lg:flex-row justify-between items-start my-4">
                <label className="text-base font-sans font-medium">
                  Problem Title<sup className="text-sm text-red-700">*</sup> :
                </label>
                <div className="w-full lg:w-[60%]">
                  <input
                    type="text"
                    name="title"
                    onChange={(e) => {
                      setProblemData({ ...problemData, title: e.target.value });
                    }}
                    className=" w-full rounded-md border-2 border-primary-300 bg-black px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border  focus:border-2 focus:border-primary-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder="Enter the name of the Problem"
                  />
                </div>
              </div>

              {/* Problem Statement */}
              <div className="flex w-full flex-col lg:flex-row justify-between items-start">
                <label className="text-base font-sans mt-4 font-medium">
                  Problem Statement<sup className="text-sm text-red-700">*</sup> :
                </label>
                <div className="w-full lg:w-[60%]">
                  <textarea
                    type="text"
                    name="title"
                    onChange={(e) => {
                      setProblemData({
                        ...problemData,
                        statement: e.target.value,
                      });
                    }}
                    className=" h-[200px] w-full resize-none rounded-md border-2 border-primary-300 bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border  focus:border-2 focus:border-primary-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder="Enter the description of the problem"
                  />
                </div>
              </div>

              {/* Problem Example */}
              <div className="flex flex-col lg:flex-row w-full justify-between items-start">
                <label className="text-base font-sans mt-4 font-medium">
                  Problem Example<sup className="text-sm text-red-700">*</sup> :
                </label>
                <div className="flex items-start flex-col w-full lg:w-[60%] gap-2">
                  {problemData.examples.length > 0 &&
                    problemData.examples.map((example, index) => (
                      <div key={index} className="flex flex-col w-full gap-2">
                        <div className="flex justify-between">
                          Input: {example.input} <br />
                          Output: {example.output} <br />
                          Explanation: {example.explanation}
                          <MdDelete
                            className="text-xl cursor-pointer mr-2"
                            onClick={() =>
                              setProblemData({
                                ...problemData,
                                examples: problemData.examples.filter(
                                  (item, i) => i !== index
                                ),
                              })
                            }
                          />
                        </div>
                        <div className="h-[1px] bg-gray-300 w-full rounded-full" />
                      </div>
                    ))}
                  <textarea
                    type="text"
                    name="input"
                    onChange={(e) =>
                      setTempExample({ ...tempExample, input: e.target.value })
                    }
                    value={tempExample.input}
                    className=" w-[100%] resize-none rounded-md border-2 border-primary-300 bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border  focus:border-2 focus:border-primary-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder="Input"
                  />
                  <textarea
                    type="text"
                    name="output"
                    onChange={(e) =>
                      setTempExample({ ...tempExample, output: e.target.value })
                    }
                    value={tempExample.output}
                    className=" w-[100%] resize-none rounded-md border-2 border-primary-300 bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border  focus:border-2 focus:border-primary-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder="Output"
                  />
                  <textarea
                    type="text"
                    name="explanation"
                    onChange={(e) =>
                      setTempExample({
                        ...tempExample,
                        explanation: e.target.value,
                      })
                    }
                    value={tempExample.explanation}
                    className=" w-[100%] resize-none rounded-md border-2 border-primary-300 bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border  focus:border-2 focus:border-primary-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder="Explanation"
                  />
                  <span
                    className="mt-6 block w-full cursor-pointer select-none rounded-lg bg-primary-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-primary-2 transition-all hover:shadow-lg hover:shadow-primary-500 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    onClick={(e) => addExample(e)}
                  >
                    Add Example
                  </span>
                </div>
              </div>

              {/* Constraints */}
              <div className="flex w-full flex-col lg:flex-row justify-between items-start mt-6">
                <label className="text-base font-sans mt-4 font-medium">
                  Problem Constraints<sup className="text-sm text-red-700">*</sup> :
                </label>
                <div className="w-full lg:w-[60%] flex flex-col items-start">
                  <textarea
                    type="text"
                    name="constraint"
                    onChange={(e) => {
                      setProblemData({
                        ...problemData,
                        constraints: e.target.value,
                      });
                    }}
                    value={problemData.constraints}
                    autoComplete="off"
                    className="w-full h-[100px] resize-none rounded-md border-2 border-primary-300 bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border  focus:border-2 focus:border-primary-400  focus:outline-0 disabled:border-0 disabled:bg-primary-500"
                    placeholder="Enter the constraints of the problem"
                  />
                  <p className="text-xs w-full text-blue-500 ml-1">
                    Write different constraint in different line.
                  </p>
                </div>
              </div>
                
              {/* Starter code */}


              <div className="flex w-full flex-col lg:flex-row justify-between items-start mt-6">
                <label className="text-base font-sans mt-4 font-medium">
                  Starter Code<sup className="text-sm text-red-700">*</sup> :
                </label>
                <div className="w-full lg:w-[60%] flex flex-col items-start">
                  <Editor
                    className="border border-gray-600 h-[60vh] lg:h-[70vh]"
                    // height="75vh"
                    theme= {"light"}
                    language={"cpp"}
                    onMount={onMount}
                    value={problemData.starterCode}
                    onChange={
                      (e) => setProblemData({...problemData, starterCode: e})
                  }
                  options={{
                    minimap:{
                      enabled: true
                    },
                    wordWrap: 'on',
                    cursorBlinking: "smooth",
                    // deco
                  }}
                  />
                </div>
              </div>


              {/* Difficulty */}
              <div className="flex w-full flex-col lg:flex-row justify-between items-start mt-6">
                <label className="text-base font-sans mt-4 font-medium">
                  Difficulty<sup className="text-sm text-red-700">*</sup> :
                </label>
                <div className="w-full lg:w-[60%] flex flex-col items-center">
                  <select
                    name="difficulty"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setProblemData({
                        ...problemData,
                        difficulty: e.target.value,
                      });
                    }}
                    className="w-full resize-none rounded-md border-2 border-primary-300 bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border  focus:border-2 focus:border-primary-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder="Enter the constraints of the problem"
                  >
                    <option value="">Select the difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              {/* Topic */}
              <div className="flex w-full flex-col lg:flex-row justify-between items-start mt-2">
                <label className="text-base font-sans mt-4 font-medium">
                  Topics<sup className="text-sm text-red-700">*</sup> :
                </label>
                <div className="w-full lg:w-[60%] flex flex-col items-start">
                  <input
                    type="text"
                    name="title"
                    onChange={(e) => {
                      setProblemData({ ...problemData, topics: e.target.value });
                    }}
                    value={problemData.topics}
                    autoComplete="off"
                    className="w-full resize-none rounded-md border-2 border-primary-300 bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border  focus:border-2 focus:border-primary-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder="Enter the Topics of the problem"
                  />
                  <p className="text-xs text-blue-500 ml-1">Write topics with comma(,) seperated and without space</p>
                </div>
              </div>

              {/* Company Name */}
              <div className="flex w-full flex-col lg:flex-row justify-between items-start mt-2">
                <label className="text-base font-sans mt-4 font-medium">
                  Companies :
                </label>
                <div className="w-full lg:w-[60%] flex flex-col items-start">
                    <input
                      type="text"
                      name="title"
                      onChange={(e) => {
                        setProblemData({ ...problemData, companies: e.target.value });
                      }}
                      value={problemData.companies}
                      autoCorrect="off"
                      className="w-full resize-none rounded-md border-2 border-primary-300 bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border  focus:border-2 focus:border-primary-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder="Enter the companies of the problem"
                    />
                  <p className="text-xs text-blue-500 ml-1">Write companies with comma(,) seperated and without space</p>
                </div>
              </div>

              {/* TestCases */}
              <div className="flex w-full flex-col lg:flex-row justify-between items-start mt-6">
                <label className="text-base font-sans mt-4 font-medium">
                  Testcases<sup className="text-sm text-red-700">*</sup> :
                </label>
                <div className="flex items-start flex-col w-full  lg:w-[60%] gap-2">
                  {problemData.testcases.length > 0 &&
                    problemData.testcases.map((testcase, index) => (
                      <div key={index} className="flex flex-col w-full gap-2">
                        <div className="flex justify-between">
                          Input: {testcase.input} <br />
                          Output: {testcase.output}
                          <MdDelete
                            className="text-xl cursor-pointer mr-2"
                            onClick={() =>
                              setProblemData({
                                ...problemData,
                                testcases: problemData.testcases.filter(
                                  (item, i) => i !== index
                                ),
                              })
                            }
                          />
                        </div>
                        <div className="h-[1px] bg-gray-300 w-full rounded-full" />
                      </div>
                    ))}
                  <textarea
                    type="text"
                    name="inputTestcase"
                    onChange={(e) =>
                      setTempTestcase({ ...tempTestcase, input: e.target.value })
                    }
                    value={tempTestcase.input}
                    className=" w-[100%] resize-none rounded-md border-2 border-primary-300 bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border  focus:border-2 focus:border-primary-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder="Input"
                  />
                  <textarea
                    type="text"
                    name="output"
                    onChange={(e) =>
                      setTempTestcase({ ...tempTestcase, output: e.target.value })
                    }
                    value={tempTestcase.output}
                    className=" w-[100%] resize-none rounded-md border-2 border-primary-300 bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border  focus:border-2 focus:border-primary-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder="Output"
                  />
                  <span
                    className="mt-6 block w-full cursor-pointer select-none rounded-lg bg-primary-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-primary-2 transition-all hover:shadow-lg hover:shadow-primary-500 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    onClick={(e) => addTestcase(e)}
                  >
                    Add Testcase
                  </span>
                </div>
              </div>

              {/* Follow up */}
              <div className="flex w-full flex-col lg:flex-row justify-between items-start mt-2">
                <label className="text-base font-sans mt-4 font-medium">
                  Follow up :
                </label>
                <div className="w-full lg:w-[60%] flex flex-col items-start">
                    <input
                      type="text"
                      name="title"
                      onChange={(e) => {
                        setProblemData({ ...problemData, followUp: e.target.value });
                      }}
                      value={problemData.followUp}
                      autoCorrect="off"
                      className="w-full resize-none rounded-md border-2 border-primary-300 bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border  focus:border-2 focus:border-primary-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder="Enter the Follow up of the problem"
                    />
                </div>
              </div>


              {/* Hints */}
              <div className="flex w-full flex-col lg:flex-row justify-between items-start mt-6">
                <label className="text-base font-sans mt-4 font-medium">
                  Problem Hints :
                </label>
                <div className="w-full lg:w-[60%] flex flex-col items-start">
                  <textarea
                    type="text"
                    name="hints"
                    onChange={(e) => { setProblemData({ ...problemData, hints: e.target.value, }); }}
                    value={problemData.hints}
                    autoComplete="off"
                    className="w-full h-[100px] resize-none rounded-md border-2 border-primary-300 bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border  focus:border-2 focus:border-primary-400  focus:outline-0 disabled:border-0 disabled:bg-primary-500"
                    placeholder="Enter the hints of the problem"
                  />
                  <p className="text-xs w-full text-blue-500 ml-1">
                    Write different hints in different line.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="mt-6 block w-full select-none rounded-lg bg-primary-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-primary-2 transition-all hover:shadow-lg hover:shadow-primary-500 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      }
    </div>
  );
};

export default AddProblem;
