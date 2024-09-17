import React, { useEffect, useRef } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Glassy effect */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>

      <div
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-lg p-6 w-[496px] py-[31px] px-7 flex flex-col gap-6 items-center"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
