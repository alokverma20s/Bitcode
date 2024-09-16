import React, { useState } from 'react';
import { MdCancel } from 'react-icons/md';
import SubmissionLoader from './SubmissionLoader';

const OutputModal = ({output, modalOpen, setModalOpen, loading}) => {
    

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <div className='mt-4'>
            <button className="py-3 px-6 text-center bg-primary-600 hover:bg-primary-500 border-gray-500 text-black rounded-md block" onClick={toggleModal}>
                Open Output
            </button>

            {modalOpen && (
                <div className="main-modal fixed w-full bg-opacity-[0.01] backdrop-filter backdrop-blur-lg bg-red-900 rounded-lg p-8 inset-0 z-50 overflow-hidden flex justify-center items-center">
                    <div className="modal-container bg-white w-11/12 lg:w-4/12 mx-auto rounded-xl z-50 overflow-y-auto">
                        <div className="modal-content py-4 text-left px-6">
                            <div className="flex justify-between items-center pb-3">
                                <p className="text-2xl font-bold text-primary-600">Output</p>
                                <div className="modal-close cursor-pointer" onClick={toggleModal}>
                                    <MdCancel className='text-2xl'/>
                                </div>
                            </div>
                            {
                                loading ? <SubmissionLoader/>:
                                <div className="my-5 mr-5 ml-5 flex justify-center flex-col items-center">
                                    <p className={`${output.status === 'Accepted'?'text-green-600':'text-red-500'} font-semibold text-xl`}>
                                        {
                                             output.status !== "Time Over" && (output.status === 'Accepted' ? 'Accepted' : output.status === 'Rejected' ? output.yourOutput === 'compilation error' ? 'Compilation Error' : 'Wrong Answer' : 'Run Code to see')
                                        }
                                    </p>
                                    <p>
                                        {
                                            output.status === 'Rejected' && 
                                            <div>
                                                {output.failedInput && <p><b>Input: </b> {output.failedInput}</p>}
                                                {output.expectedOutput && <p><b>Expected Output:</b> {output.expectedOutput}</p>}
                                                {output.yourOutput && <p><b>Your Output:</b> {output.yourOutput}</p> }
                                            </div>
                                        }
                                        {
                                            output.status === "Time Over" && <p className='text-xl font-semibold'>Contest Ended...</p>
                                        }
                                    </p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OutputModal;
