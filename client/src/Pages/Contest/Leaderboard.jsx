import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getLeaderboard } from '../../services/operations/contestAPI';
import Loader from "../../components/Loader/Loader";

const Leaderboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const contestId = useParams().id;
    const [loading, setLoading] = useState(true);
    const [leaderboard, setLeaderboard] = useState([]);
    const [currentUserData, setCurrentUserData] = useState({})
    const currentUser = useSelector((state) => state.currentUserReducer);
    
    console.log(leaderboard);
    
    useEffect(() => {
        dispatch(getLeaderboard(setLoading, setLeaderboard, contestId));
    }, []);

    useEffect(() => {
        setCurrentUserData(leaderboard.find(user => user?.user?._id === currentUser?.result?._id));
    }, [leaderboard, currentUserData]);
    return (
    <div className='mt-16'>
        <h1 className='text-3xl font-bold text-center text-primary-600'>Leaderboard</h1>
        <div className='mt-10'>
            { loading ? <div className='w-full h-[90vh] flex justify-center items-center'><Loader /></div>:
            <div>
            { leaderboard.length > 0 ? 
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th className='text-xl font-semibold text-center text-primary-500'>Rank</th>
                            <th className='text-xl font-semibold text-center text-primary-500'>Name</th>
                            <th className='text-xl font-semibold text-center text-primary-500'>Email</th>
                            <th className='text-xl font-semibold text-center text-primary-500'>Score</th>
                            <th className='text-xl font-semibold text-center text-primary-500'>Finish Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUserData && 
                        <tr key={currentUserData?._id} className='border-b-primary-600 border-b mb-2'>
                            <td className='text-lg text-center font-semibold'>{currentUserData?.ranks}</td>
                            <td className='text-lg text-center font-semibold'>{currentUserData?.user?.name}</td>
                            <td className='text-lg text-center font-semibold'>{currentUserData?.user?.email}</td>
                            <td className='text-lg text-center font-semibold'>{currentUserData?.score}</td>
                            <td className='text-lg text-center font-semibold'>{new Date(currentUserData?.lastSubmission).toLocaleTimeString()}</td>
                        </tr>}
                            
                        {
                            leaderboard.map((user, index) => (
                                <tr key={user?._id ?? index} className='border-b-primary-600 border-b mb-2'>
                                    <td className='text-lg font-semibold text-center'>{user?.ranks}</td>
                                    <td className='text-lg font-semibold text-center'>{user?.user?.name}</td>
                                    <td className='text-lg font-semibold text-center'>{user?.user?.email}</td>
                                    <td className='text-lg font-semibold text-center'>{user?.score}</td>
                                    <td className='text-lg font-semibold text-center'>{new Date(user.lastSubmission).toLocaleTimeString()}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>:
                <div className="flex justify-center items-center w-screen h-[78vh]">
                    <p className='text-primary-700 font-bold text-3xl'>No Data Available...</p>
                </div>
            }</div>
                
            }
        </div>
    </div>
  )
}

export default Leaderboard