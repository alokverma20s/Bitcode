const BASE_URL = process.env.REACT_APP_BASE_URL;

export const contestEndPoints = {
    CREATE_CONTEST_API: BASE_URL+"/contest/createContest",
    GET_CONTEST_API: BASE_URL+"/contest/getContest/",
    GET_ALL_CONTEST_API: BASE_URL+"/contest/getAllContest",
    DELETE_CONTEST_API: BASE_URL+"/contest/deleteContest/",
    UPDATE_CONTEST_API: BASE_URL+"/contest/updateContest/id",
    GET_CONTEST_LEADERBOARD: BASE_URL+"/contest/getLeaderboard/",
}

export const problemEndPoints = {
    CREATE_PROBLEM_API: BASE_URL+"/problem/createProblem",
    GET_PROBLEM_API: BASE_URL+"/problem/getProblem/",
    GET_ALL_PROBLEM_API: BASE_URL+"/problem/getAllProblem",
    DELETE_PROBLEM_API: BASE_URL+"/problem/deleteProblem/id",
    UPDATE_PROBLEM_API: BASE_URL+"/problem/updateProblem/id",
}

export const submissionEndPoints = {
    RUN_SUBMISSION_API: BASE_URL+"/submission",
    SUBMIT_SUBMISSION_API: BASE_URL+"/submission/submit",
    GET_SUBMISSION_API: BASE_URL+"/submission/getSubmission",
    GET_SUBMISSION_BY_ID_API: BASE_URL+"/submission/getSubmission/id",
}
