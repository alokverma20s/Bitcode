import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdEdit } from "react-icons/md";
import { deleteContest } from "../../services/operations/contestAPI";
import { useNavigate } from "react-router-dom";

import { IoIosArrowForward } from "react-icons/io";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './card.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Card = ({ contest }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const User = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const currentTime = new Date();
  const startTime = new Date(contest.startTime);
  const endTime = new Date(contest.endTime);
  // console.log("startTime", new Date(contest.startTime) , "currentTime", currentTime, "endTime" , new Date(contest.endTime));

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

  const handleDeleteContest = () => {
    dispatch(deleteContest( setLoading ,contest._id, navigate));
  };
  const handleEdit = () => {
    navigate(`/contest/editContest/${contest._id}`);
  };

  function isDisabled(){
    return ((
      new Date(contest.startTime) > currentTime
        ? true
        : new Date(contest.endTime) < currentTime
    )
      ? true
      : false)
  }

  return (
    // <div className="min-w-[300px] flex flex-col rounded-3xl bg-[#092540] p-10 text-center">
    <div className="contest-card">
      {(User?.result?._id === contest?.author) && (
        <div className="flex items-center justify-end gap-3">
          <button onClick={()=>handleEdit()} className="border border-white p-1 rounded-md">
            <MdEdit className="text-white text-2xl" />
          </button>
          <button onClick={() => handleDeleteContest()} className="border-[0.125px] border-white p-1 rounded-md">
            <MdDelete className="text-white text-2xl" />
          </button>
        </div>
      )}
      <h2 className="text-3xl font-bold leading-tight text-primary-600">
        {contest?.name}
      </h2>
      <p className="mt-5 text-md leading-8">
        Starts At: {formatDate(startTime)} <br />
        Ends At: {formatDate(endTime)}
      </p>
      {new Date(contest.endTime) >= currentTime ? (
        <div className="mt-6 flex flex-col lg:flex-row items-center justify-center gap-4">
          <button
            className={`flex items-center justify-center gap-2 rounded-full bg-primary-600 px-5 py-3 text-lg font-medium text-white  ${isDisabled()? 'cursor-not-allowed' : 'cursor-pointer hover:bg-primary-700'}`}
            disabled={ isDisabled() }
            onClick={() => navigate(`/contest/${contest._id}`)}
          >
            <span> Start </span>
            <IoIosArrowForward />
          </button>
          <button className="flex items-center justify-center gap-2 rounded-full border border-white/50 px-5 py-3 text-lg font-medium text-white bg-primary-400 hover:bg-primary-500">
            <span onClick={handleOpen}>Instruction</span>
            <IoIosArrowForward />
          </button>
        </div>
      ) : (
        <div className="mt-6 flex flex-col lg:flex-row items-center justify-center gap-4">
          <button 
          className="flex items-center justify-center gap-2 rounded-full border border-white/50 px-5 py-3 text-lg font-medium text-white bg-primary-600 hover:bg-primary-500" 
          onClick={()=>navigate(`/contest/${contest._id}/leaderboard`)}
          >
            <span>Leaderboard</span>
            <IoIosArrowForward />
          </button>
        </div>
      )}


        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Instructions
            </Typography>
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
              <ul>
                <li>1. Questions are categorised as easy(10 marks), medium(20 marks), hard(30 marks)</li>
                <li>2. You can write code in any of the available languages</li>
                <li>3. Any submission after the submission time will not be considered</li>
                <li>4. Ranking will be done on the basis of Marks obtained and submission time.</li>
              </ul>
            {/* </Typography> */}
          </Box>
        </Modal>
    </div>
  );
};

export default Card;
