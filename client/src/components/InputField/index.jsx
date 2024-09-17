import React, { useEffect, useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import './style.css';

const InputField = ({ type, value, onChange, name, placeholder, id, disabled=false, options=[] }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleWheel = (event) => {
      if (document.activeElement === inputRef.current) {
        event.preventDefault();
      }
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  // Check if options are provided and type is 'select'
  if (options.length > 0 && type === "select") {
    return (
      <div className="relative w-full">
        <select
          id={id}
          disabled={disabled}
          required
          value={value}
          name={name}
          onChange={onChange}
          className={`py-2 px-4 rounded-xl w-full h-14 outline outline-1 focus:outline-none focus:border-primary-500 focus:border-2 transition-colors duration-300 peer ${disabled ? "cursor-not-allowed" : ""}`}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>
        <label
          htmlFor={id}
          className={`absolute top-4 left-2 py-0 ${disabled ? "bg-white -top-2.5 text-xs lg:text-xs" : ""} lg:text-[16px] text-[14px] select-none px-1.5 text-gray-900 cursor-text peer-focus:text-xs peer-focus:-top-2.5 peer-focus:bg-white transition-all duration-300 peer-focus:text-primary-600 peer-valid:bg-white peer-valid:-top-2.5 peer-valid:text-xs whitespace-nowrap z-10`}
        >
          {placeholder} <span className="ml-1 text-red-600">*</span>
        </label>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <input
        type={type !== "password" ? type : showPassword ? "text" : "password"}
        id={id}
        disabled={disabled}
        maxLength={type === "tel" ? 10 : null}
        required
        value={value}
        ref={inputRef}
        name={name}
        onChange={onChange}
        className={`no-spinners py-2 px-4 rounded-xl w-full h-14 outline outline-1 outline-gray-500 focus:outline-none focus:border-primary-500 focus:border-2 transition-colors duration-300 peer ${disabled ? "cursor-not-allowed" : ""}`}
      />
      <label
        htmlFor={id}
        className={`absolute top-4 left-2 py-0 ${disabled ? "bg-white -top-2.5 text-xs lg:text-xs" : ""} lg:text-[16px] text-[14px] select-none px-1.5 text-gray-800 cursor-text peer-focus:text-xs peer-focus:-top-2.5 peer-focus:bg-white transition-all duration-300 peer-focus:text-primary-600 peer-valid:bg-white peer-valid:-top-2.5 peer-valid:text-xs whitespace-nowrap z-10`}
      >
        {placeholder} <span className="ml-1 text-red-600">*</span>
      </label>
      {type === "password" && (
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-4 z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
      )}
    </div>
  );
};

export default InputField;