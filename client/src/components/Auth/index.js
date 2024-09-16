import React, { useState } from "react";
import Modal from "../Modal";
import InputField from "../InputField";
import { loggingIn, signup, sendotp } from "../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import OtpInput from "react-otp-input";

const Auth = () => {
  const [isOpen, setIsOpen] = useState(true);
  const onClose = () => {};
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
    confirmPassword: "",
    role: "student",
  });

  const [login, setLogin] = useState(false);
  const [sendOtp, setSendOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (login) {
      // login
      dispatch(
        loggingIn(
          { email: formData.email, password: formData.password },
          navigate,
          setLoading
        )
      );
    } else {
      // signup
      if (!sendOtp) {
        // send otp

        dispatch(sendotp({ email: formData.email }, setLoading));
        console.log("OTP sent");
        setSendOtp(true);
      } else {
        // signup
        formData.otp = otp;
        dispatch(signup(formData, navigate, setLoading));
      }
    }
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        {!loading ? (
          sendOtp ? (
            <div className="text-center flex flex-col gap-7">
              <div className="">
                <p className="text-[20px] leading-6 mb-7 font-semibold">
                  Enter your Verification Code
                </p>
              </div>
              <div className="flex gap-[28px]">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderInput={(props) => (
                    <input
                      {...props}
                      style={{ width: "60px" }}
                      className="border h-14 w-14 text-center font-semibold text-[20px] rounded-xl mx-1"
                    />
                  )}
                />
              </div>
              <button
                className="bg-primary-500 text-white py-2 rounded-xl p-4"
                type="submit"
                onClick={submitHandler}
              >
                <span className="text-xl font-semibold">
                  {"Verify & Signup"}
                </span>
              </button>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="mb-4 text-4xl font-semibold">
                {login ? "Login" : "Signup"}
              </h2>
              <form className="flex flex-col gap-4 w-[356px]">
                {!login && (
                  <InputField
                    type={"text"}
                    value={formData.name}
                    onChange={changeHandler}
                    name={"name"}
                    placeholder={"Name"}
                    id={"name"}
                  />
                )}
                <InputField
                  type={"email"}
                  value={formData.email}
                  onChange={changeHandler}
                  name={"email"}
                  placeholder={"Email"}
                  id={"email"}
                />
                <InputField
                  type={"password"}
                  value={formData.password}
                  onChange={changeHandler}
                  name={"password"}
                  placeholder={"Password"}
                  id={"password"}
                />
                {!login && (
                  <InputField
                    type={"password"}
                    value={formData.confirmPassword}
                    onChange={changeHandler}
                    name={"confirmPassword"}
                    placeholder={"Confirm Password"}
                    id={"confirmPassword"}
                  />
                )}
                <button
                  className="bg-primary-500 text-white py-2 rounded-xl"
                  type="submit"
                  onClick={submitHandler}
                >
                  <span className="text-xl font-semibold">
                    {login ? "Login" : "Send OTP"}
                  </span>
                </button>
              </form>
              <div className="my-4">
                {login ? (
                  <span>
                    Don't have account?
                    <span
                      className="text-primary-600 cursor-pointer"
                      onClick={() => setLogin(false)}
                    >
                      {" Signup"}
                    </span>
                  </span>
                ) : (
                  <span>
                    Already have account?
                    <span
                      className="text-primary-600 cursor-pointer"
                      onClick={() => setLogin(true)}
                    >
                      {" Login"}
                    </span>
                  </span>
                )}
              </div>
            </div>
          )
        ) : (
          <Loader />
        )}
      </Modal>
    </div>
  );
};

export default Auth;
