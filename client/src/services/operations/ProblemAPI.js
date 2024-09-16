import toast from "react-hot-toast";

import { apiConnector } from "../apiConnector"
import { problemEndPoints } from "../apis";

const { CREATE_PROBLEM_API, GET_ALL_PROBLEM_API, GET_PROBLEM_API, DELETE_PROBLEM_API, UPDATE_PROBLEM_API } = problemEndPoints;

export function createProblem(setLoading, problemData, navigate){
    return async (dispatch) => {
        setLoading(true);
        try {
            const response = await apiConnector("POST", CREATE_PROBLEM_API, problemData);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setLoading(false);
            navigate(-1)
            toast.success("Problem Created Successfully...");
        } catch (error) {
            toast.error("Unable to create Problem");
        }finally{
            setLoading(false);
        }
    }
}

export function getProblemList(setLoading, setProblems){
    return async (dispatch) => {
        setLoading(true);
        try {
            const response = await apiConnector("GET", GET_ALL_PROBLEM_API);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setProblems(response.data.problem);
            setLoading(false);
            //toast.success("Fetched Successfully...");
        } catch (error) {
            toast.error("Unable to fetch Problems");
        }
    }
}

export function getProblemById(setLoading, setQuestion, setValue= undefined, problemId){
    return async (dispatch) => {
        setLoading(true);
        try {
            const response = await apiConnector("GET", GET_PROBLEM_API + problemId);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setQuestion(response.data.problem);
            if(setValue !== undefined)
                setValue(response.data.problem.starterCode);
            //toast.success("Fetched Successfully...");
            setLoading(false);
        } catch (error) {
            toast.error("Unable to fetch Problem");
        }
    }
}
export function getProblemById2(setLoading, setQuestion, problemId){
    return async (dispatch) => {
        setLoading(true);
        try {
            const response = await apiConnector("GET", GET_PROBLEM_API + problemId);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setQuestion(response.data.problem);
            //toast.success("Fetched Successfully...");
            setLoading(false);
        } catch (error) {
            toast.error("Unable to fetch Problem");
        }
    }
}

export function deleteProblem(setLoading, problemId, navigate){
    return async (dispatch) => {
        setLoading(true);
        try {
            const response = await apiConnector("DELETE", DELETE_PROBLEM_API + problemId);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setLoading(false);
            navigate('/problem')
            toast.success("Problem Deleted Successfully...");
        } catch (error) {
            toast.error("Unable to delete Problem");
        }
    }
}

export function updateProblem(setLoading, problemData, problemId, navigate){
    return async (dispatch) => {
        setLoading(true);
        try {
            const response = await apiConnector("PUT", UPDATE_PROBLEM_API + problemId, problemData);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setLoading(false);
            navigate('/problem')
            toast.success("Problem Updated Successfully...");
        } catch (error) {
            toast.error("Unable to update Problem");
        }
    }
}

