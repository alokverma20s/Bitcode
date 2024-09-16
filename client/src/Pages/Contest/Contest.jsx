import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { getContestList } from "../../services/operations/contestAPI";
import { useNavigate } from "react-router-dom";



const Contest = () => {
    const [loading, setLoading] = useState(false);
    const [contests, setContests] = useState([]);

    // console.log(contests);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getContestList(setLoading, setContests));
    }, []);

  return (
    <div className="flex flex-col flex-wrap justify-around items-center mt-20 bg-transparent gap-4">
        <div className="flex w-full justify-end pr-20 gap-4">
            <button onClick={()=>navigate("/contest/createContest")} className="border-2 p-2 rounded-md bg-primary-600 text-white hover:bg-primary-700">
                Create Contest
            </button>
            <button onClick={()=>navigate("/contest/addProblem")} className="border-2 p-2 rounded-md text-white bg-primary-600 hover:bg-primary-700">
                Add Problem
            </button>
        </div>
        <div className="flex w-[90vw] flex-wrap justify-center gap-6 bg-[#E1E3F2] p-12">
            {
                contests.length > 0 ?
                contests.map(contest => <Card key={contest._id} contest={contest} />):
                <div className="text-3xl font-semibold">No Contest is available now....</div>
            
            }
        </div>
    </div>
  );
};

export default Contest;
