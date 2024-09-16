import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector"
import { userEndPoints } from "../apis";


const { SIGN_UP_API, LOGIN_API, SEND_OTP_API, CHANGE_PASSWORD_API, RESET_PASSWORD_TOKEN_API, RESET_PASSWORD_API } = userEndPoints;


export function signup(data, navigate, setLoading){
    return async ()=>{
        setLoading(true);
        console.log(data);
        
        try {
            const response = await apiConnector("POST", SIGN_UP_API, data);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setLoading(false);
            
            localStorage.setItem("userInfo", {
                token:response.data.token,
                name: response.data.result.name,
                email: response.data.result.email,
            });
            navigate('/');
            toast.success("Signup Successfull");
        } catch (error) {
            toast.error("Signup Failed");
            setLoading(false);
        }
    }
}

export function loggingIn(data, navigate, setLoading){
    return async ()=>{
        setLoading(true);
        try {
            const response = await apiConnector("POST", LOGIN_API, data);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setLoading(false);
            localStorage.setItem("userInfo", {
                token:response.data.token,
                name: response.data.result.name,
                email: response.data.result.email,
            });
            navigate('/');
            toast.success("Login Successfull");
        } catch (error) {
            toast.error("Login Failed");
            setLoading(false);
        }
    }
}

export function sendotp(data, setLoading){
    return async ()=>{
        setLoading(true);
        try {
            console.log(SEND_OTP_API);
            const response = await apiConnector("POST", SEND_OTP_API, data);
            console.log(response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setLoading(false);
            toast.success("OTP Sent");
        } catch (error) {
            toast.error("Failed to send OTP");
            setLoading(false);
        }
    }
}
