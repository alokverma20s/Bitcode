import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

const API = axios.create({
  baseURL: "http://localhost:4000",
});

export const executeCode = async (user, problem, contest, language, sourceCode, stdin) => {
    console.log(language, sourceCode, stdin);
  const response = await API.post("/submission", {
    user, 
    problem, 
    contest,
    language,
    version: LANGUAGE_VERSIONS[language],
    sourceCode,
    stdin
  });
  return response.data;
};
