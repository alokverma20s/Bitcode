import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { submissionEndPoints } from "../apis";

const {
  SUBMIT_SUBMISSION_API,
  RUN_SUBMISSION_API,
  GET_SUBMISSION_API,
  GET_SUBMISSION_BY_ID_API,
} = submissionEndPoints;

export function test(setLoading, submissionData, setOutput) {
  
  return async (dispatch) => {
    console.log(submissionData);
    setLoading(true);
    try {
      const response = await apiConnector(
        "POST",
        RUN_SUBMISSION_API,
        submissionData
      );
      console.log(response);

      // Ensure that response and response.data exist
      if (!response || !response.data || !response.data.success) {
        throw new Error(response?.data?.message || "Unknown error occurred");
      }

      setOutput(response.data);

      // Check the status and show appropriate toast
      if (response.data.status === "Accepted") {
        toast.success("Accepted");
      } else if (response.data.status === "Rejected") {
        if (response.data.yourOutput === "compilation error") {
          toast.error("Compilation Error");
        } else {
          toast.error("Wrong Answer");
        }
      }
    } catch (error) {
      console.error("Error while submitting:", error);
      toast.error(error.message || "Unable to create submission");
    } finally {
      // Ensure loading state is set to false after processing is done
      setLoading(false);
    }
  }
}

export function runCodeOnServer(setLoading, submissionData, setOutput) {
  console.log(submissionData);
  return async () => {
    console.log("submissionData");
    setLoading(true);

    try {
      const response = await apiConnector(
        "POST",
        RUN_SUBMISSION_API,
        submissionData
      );
      console.log(response);

      // Ensure that response and response.data exist
      if (!response || !response.data || !response.data.success) {
        throw new Error(response?.data?.message || "Unknown error occurred");
      }

      setOutput(response.data);

      // Check the status and show appropriate toast
      if (response.data.status === "Accepted") {
        toast.success("Accepted");
      } else if (response.data.status === "Rejected") {
        if (response.data.yourOutput === "compilation error") {
          toast.error("Compilation Error");
        } else {
          toast.error("Wrong Answer");
        }
      }
    } catch (error) {
      console.error("Error while submitting:", error);
      toast.error(error.message || "Unable to create submission");
    } finally {
      // Ensure loading state is set to false after processing is done
      setLoading(false);
    }
  };
}

export function submitCodeOnServer(setLoading, submissionData, setOutput) {
  return async (dispatch) => {
    setLoading(true);
    try {
      console.log(submissionData);
      const response = await apiConnector(
        "POST",
        SUBMIT_SUBMISSION_API,
        submissionData,
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      setOutput(response.data);
      if (response.data.status === "Accepted") toast.success("Accepted");
      else if (response.data.status === "Rejected") {
        if (response.data.yourOutput === "compilation error")
          toast.error("Compilation Error");
        else toast.error("Wrong Answer");
      }
    } catch (error) {
      toast.error("Unable to create Submission");
    }
    setLoading(false);
  };
}

export function getSubmissionList(setLoading, setSubmissions) {
  return async (dispatch) => {
    setLoading(true);
    try {
      const response = await apiConnector("GET", GET_SUBMISSION_API);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      setSubmissions(response.data.submission);
      setLoading(false);
      toast.success("Fetched Successfully...");
    } catch (error) {
      toast.error("Unable to fetch Submissions");
    }
  };
}
