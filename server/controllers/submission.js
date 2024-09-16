import Submission from "../models/submissions.js";
import Problem from "../models/Problem.js";
import axios from "axios";
import Contest from "../models/contest.js";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

const runCode = async (req, res) => {
  const { user, problem, version, contest, sourceCode, language } = req.body;

  try {
    if (!user || !problem || !sourceCode || !language) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }

    // console.log(problem);

    const testcases = await Problem.findById(problem, { testcases: true });

    // const stdin = prepareTestcases(testcases.testcases);
    // const stdOutput = prepareOutput(testcases.testcases);
    let status = "Accepted";
    let failedInput = "";
    let yourOutput = "";
    let expectedOutput = "";
    let testCasePassed = 0;
    let totalTestCases = 2;
    async function runTestCasesWithDelay(testcases) {
      for (let i = 0; i < 2; i++) {
          const input = "1 "+ testcases[i].input;
          const output = testcases[i].output+"\n";
          // console.log(input, output);
          
          await new Promise(resolve => setTimeout(resolve, 200)); // Delay for 250ms
          
          const result = await runATestcase(language, version, sourceCode, input, output);
          if(result.status === "Rejected"){
            status = "Rejected";
            yourOutput = result.yourOutput;
            expectedOutput = result.expectedOutput;
            failedInput = input
            break;
          }else{
            testCasePassed++;
          }
      }
    }
    
    await runTestCasesWithDelay(testcases.testcases);

    if(status === "Rejected"){
      return res.status(200).json({
        success: true,
        status,
        expectedOutput,
        yourOutput,
        failedInput,
        totalTestCases,
        testCasePassed,
        message: "Submission created successfully",
      });
    }
    return res.status(201).json({
      success: true,
      status:"Accepted",
      message: "Submission created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong, while creating submission.",
    });
  }
};
async function runATestcase(language, version, sourceCode, input, output) {
  const result = await checkResult(language, version, sourceCode, input);

  let status = "Rejected";

  // console.log(result?.stdout === output, result?.stdout, output);

  if (result?.stdout === output && result?.stderr === "") {
    status = "Accepted";
    // console.log("Accepted");
  }

  if (status === "Rejected") {
    if (result?.stdout != output) {
      return {
        success: true,
        status,
        expectedOutput: output,
        yourOutput: result.stdout || "compilation error",
        message: "Submission created successfully",
      };
    } else {
      return {
        success: true,
        status,
        error: result,
        message: "Complilation Error",
      }
    }
  }
  else{
    return {
      success: true,
      status,
      message: "Solution Accepted",
    }
  }
}
const prepareTestcases = (testcases) => {
  // console.log(testcases);
  let allTestcase = "";
  allTestcase += testcases.length + "\n";
  testcases.forEach((testcase) => {
    allTestcase += `${testcase.input}\n`;
  });
  return allTestcase;
};
const prepareOutput = (testcases) => {
  // console.log(testcases);
  let allTestcase = "";
  testcases.forEach((testcase) => {
    allTestcase += `${testcase.output}\n`;
  });
  return allTestcase;
};
const checkResult = async (language, version, sourceCode, stdin) => {
  // console.log(stdin);
  const response = await API.post("/execute", {
    language,
    version,
    files: [
      {
        content: sourceCode,
      },
    ],
    stdin,
  });
  const data = response.data.run;

  return data;
};

const submitCode = async (req, res) => {
  const { user, problem, version, contest, sourceCode, language } = req.body;
  // console.log(problem);
  try {
    if(!user || !problem || !sourceCode || !language){
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }

    const contestDetails = await Contest.findById(contest);

    if((new Date(contestDetails.endTime))  <= (new Date())){
      return res.status(200).json({
        success: true,
        status: "Time Over",
        message: "Contest Ended..."
      })
    }

    const testcases = await Problem.findById(problem, {testcases:true, difficulty: true});

    const stdin = prepareTestcases(testcases.testcases);
    // console.log(stdin);
    const stdOutput = prepareOutput(testcases.testcases);
    const result = await checkResult(language, version, sourceCode, stdin);

    console.log(result, stdin, stdOutput);


    let status = "Rejected";

    if(result?.stdout === stdOutput && result?.stderr === ""){
      status = "Accepted";
    }

    if(status === 'Rejected'){
      if(result?.stdout != stdOutput){
        return res.status(200).json({
          success: true,
          status,
          yourOutput: result.stdout ? "Wrong answer" : "compilation error",
          message: "Compilation Error"
        })
      }
      else{
        return res.status(200).json({
          success: true,
          status,
          error: result,
          message:"Complilation Error"
        })

      }
    }

    let isPresent = false;
    for(let i=0; i< contestDetails.leaderboard.length; i++){
      if(contestDetails.leaderboard[i].user.toString() === user){
        isPresent = true;
        break;
      }
    }
    let score = 0;
    if(testcases.difficulty === "Easy"){
      score = 10;
    }else if(testcases.difficulty === "Medium"){
      score = 20;
    }else if(testcases.difficulty === "Hard"){
      score = 30;
    }
    // console.log("isPresent :>>", isPresent);
    if(isPresent){
      for(let i = 0; i<contestDetails.leaderboard.length; i++){
        if(contestDetails.leaderboard[i].user.toString() == user){
          let problemExist = false;
          for(let j=0; j<contestDetails.leaderboard[i].problems.length; j++){
            if(contestDetails.leaderboard[i]?.problems[j].toString() === problem){
              problemExist = true;
              break;
            }
          }
          if( problemExist === false ){
            contestDetails.leaderboard[i].problems.push(problem);
            contestDetails.leaderboard[i].score += score;
            contestDetails.leaderboard[i].lastSubmission = new Date();
          }
        }
      }
    }else if(!isPresent){
      contestDetails.leaderboard.push({
        user,
        problems: [problem],
        score,
        lastSubmission: new Date()
      });
    }
    // console.log(contestDetails);
    
    await contestDetails.save();

    const submission = await Submission.create({
      user,
      problem,
      contest,
      language,
      version,
      sourceCode,
      status,
    });
    // console.log(submission);
    return res.status(201).json({
      success: true,
      status,
      message: "Submission created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong, while creating submission.",
    });
  }
};

const getSubmission = async (req, res) => {
  try {
    const submission = await Submission.find();
    return res.status(200).json({
      success: true,
      submission,
      message: "Submission fetched Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong, while fetch submission list.",
    });
  }
};

const getSubmissionById = async (req, res) => {
  const { id } = req.params;
  try {
    const submission = await Submission.findById(id);
    return res.status(200).json({
      success: true,
      submission,
      message: "Submission fetched Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong, while fetch submission list.",
    });
  }
};

export { submitCode, runCode, getSubmission, getSubmissionById };
