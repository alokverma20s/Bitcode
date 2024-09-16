import React, { useEffect, useState } from "react";
import { getContestById } from "../../services/operations/contestAPI";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const ContestPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contestId = useParams().id;
  const [loading, setLoading] = useState(false);
  const [contest, setContest] = useState([]);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const amOrPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert hour to 12-hour format
    hours = String(hours).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes} ${amOrPm}`;
  };

  useEffect(() => {
    dispatch(getContestById(setLoading, setContest, contestId));
  }, []);
  console.log(contest);
  return (
    <div className="mt-20 bg-[#E1E3F2] p-6">
      {loading ? (
        <div className="flex h-[90vh] w-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div>
          <h1 className="text-center text-3xl font-bold text-primary-600">
            {contest.name}
          </h1>
          <div className="relative text-right">
            <button
              className="absolute bottom-2 right-0 rounded-md border-gray-500 bg-primary-600 px-6 py-3 text-center text-lg text-white hover:bg-primary-500"
              onClick={() => navigate(`/contest/${contestId}/leaderboard`)}
            >
              Leaderboard
            </button>
          </div>

          <div className="mt-4 text-center text-xl font-semibold text-[#212328]">
            {contest.description}
          </div>
          <div className="mt-4 flex justify-center gap-20 text-gray-600">
            <div className="text-lg font-semibold">
              Starts At: {formatDate(new Date(contest.startTime))}
            </div>
            <div className="text-lg font-semibold">
              Ends At: {formatDate(new Date(contest.endTime))}
            </div>
          </div>

          <div className="mt-10">
            <div className="text-center text-2xl font-semibold text-primary-600">
              Problems
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {contest.problems?.map((problem) => (
                <div
                  key={problem._id}
                  className="contest-problem-card"
                  onClick={() =>
                    navigate(`/contest/${contestId}/${problem._id}`)
                  }
                >
                  <h2 className="text-2xl font-semibold text-slate-500">
                    {problem.name}
                  </h2>
                  <p className="text-md mt-5 text-white">
                    {problem.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestPage;
