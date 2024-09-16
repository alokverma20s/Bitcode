import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector"
import { contestEndPoints } from "../apis";

const { CREATE_CONTEST_API, GET_ALL_CONTEST_API, GET_CONTEST_API, DELETE_CONTEST_API, UPDATE_CONTEST_API, GET_CONTEST_LEADERBOARD } = contestEndPoints;

export function createContest(setLoading, contestData, navigate){
    return async (dispatch) => {
        setLoading(true);
        try {
            const response = await apiConnector("POST", CREATE_CONTEST_API, contestData);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setLoading(false);
            navigate('/contest')
            toast.success("Contest Created Successfully...");
        } catch (error) {
            toast.error("Unable to create Contest");
        }
    }
}

export function getContestList(setLoading, setContests){
    return async (dispatch) => {
        setLoading(true);
        try {
            const response = await apiConnector("GET", GET_ALL_CONTEST_API);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setContests(response.data.contest);
            setLoading(false);
            // toast.success("Fetched Successfully...");
        } catch (error) {
            toast.error("Unable to fetch Contests");
        }
    }
}

export function getContestById(setLoading, setContest, contestId){
    return async (dispatch) => {
        setLoading(true);
        try {
            const response = await apiConnector("GET", GET_CONTEST_API + contestId);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setContest(response.data.contest);
            setLoading(false);
            // toast.success("Fetched Successfully...");
        } catch (error) {
            toast.error("Unable to fetch Contest");
        }
    }
}

export function deleteContest(setLoading, contestId, navigate){
    return async (dispatch) => {
        setLoading(true);
        try {
            const response = await apiConnector("DELETE", DELETE_CONTEST_API + contestId);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setLoading(false);
            navigate(0)
            toast.success("Contest Deleted Successfully...");
        } catch (error) {
            toast.error("Unable to delete Contest");
        }
    }
}

export function updateContest(setLoading, contestData, contestId){
    return async (dispatch) => {
        setLoading(true);
        try {
            const response = await apiConnector("PUT", UPDATE_CONTEST_API + contestId, contestData);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setLoading(false);
            toast.success("Contest Updated Successfully...");
        } catch (error) {
            toast.error("Unable to update Contest");
        }
    }
}

export function getLeaderboard(setLoading, setLeaderboard, contestId){
    return async (dispatch) => {
        setLoading(true);
        try {
            const response = await apiConnector("GET", GET_CONTEST_LEADERBOARD + contestId);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setLeaderboard(response.data.leaderboard);
            // toast.success("Fetched Successfully...");
            setLoading(false);
        } catch (error) {
            toast.error("Unable to fetch Leaderboard");
        }
    }
}