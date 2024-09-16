import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import otpGenerator from 'otp-generator'

import users from '../models/auth.js';
import OTP from "../models/OTP.js"

export const sendotp = async (req, res) => {

    try{
        // fetch email from request of body
        const {email} = req.body;

        // Check if user already exist
        const checkUserPresent = await users.findOne({email})

        // If user already exist, then return a response
        if(checkUserPresent){
            return res.status(401).json({
                success: false,
                message: "User already registred",
            })
        }
        // console.log(checkUserPresent);

        // Generate OTP
        var otp = otpGenerator.generate(6,  {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });

        // console.log("OTP generated : " + otp)

        // Check unique OTP or not
        var result = await OTP.findOne({otp: otp});

        while(result){
            otp = otpGenerator.generate(6,  {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            result = await OTP.findOne({otp: otp});
        }

        const optPayload = {email, otp};

        // Create an entry in OTP
        const otpBody = await OTP.create(optPayload);
        // console.log(otpBody);

        // Return response successfull

        res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        })


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const signup = async (req, res)=>{
    const {name, email, password, otp, confirmPassword, role} = req.body;
    try{
        if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message:
					"Password and Confirm Password do not match. Please try again.",
			});
		}
        const existingUser =  await users.findOne({ email });
        if(existingUser){
            return res.status(404).json({message: "User already exist."})
        }
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

        if (response.length === 0) {
			// OTP not found for the email
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		} else if (otp !== response[0].otp) {
			// Invalid OTP
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		}
        console.log(role);

        let approved = "";
		role === "instructor" ? (approved = false) : (approved = true);
        console.log(approved);
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await users.create({name, email, password: hashedPassword, approved: approved, role:'student'});
        const token = jwt.sign({email: newUser.email, id: newUser._id, role: newUser.role}, process.env.JWT_SECRET ,{expiresIn: '24h'});
        newUser.token = token
        newUser.password = undefined;

        const options = {
            expires: new Date(Date.now() + 3 *24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        res.cookie('token', token, options).status(200).json({
            success: true,
            token,
            result:newUser,
            message: "Signed in successfully."
        });
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}
export const login = async (req, res)=>{
    const {email, password} = req.body;
    try {
        // console.log("Request Reached");
        const existingUser =  await users.findOne({ email });
        if(!existingUser){
            return res.status(404).json({message: "User don't exist."})
        }
        const isPasswordCrt = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCrt){
            console.log("Password not matched");
            return res.status(400).json({success:false, message: "Invalid Credentials"});
        }
        const token = jwt.sign({email: existingUser.email, id: existingUser._id, role: existingUser.role}, process.env.JWT_SECRET ,{expiresIn: '24h'});
        existingUser.token = token
        existingUser.password = undefined;

        const options = {
            expires: new Date(Date.now() + 3 *24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        res.cookie('token', token, options).status(200).json({
            success: true,
            token,
            result: existingUser,
            message: "Logged in successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login failure, Please try again"
        });
    }
}

// ChangePassword
export const changePassword = async (req, res) =>{
    // Get data from req body,
    const {email, oldPassword, newPassword, confirmPassword} = req.body;

    // Get oldPassword, newPassword, confirmPassword,
    if(!email || !oldPassword || !newPassword || !confirmPassword){
        return res.status(403).json({
            success: false,
            message: "All field required."
        });
    }
    if(newPassword !== confirmPassword){
        return res.status(403).json({
            success: false,
            message: "Password and Confirm Password value does not match, please try again"
        });
    }
    
    // Validation,
    const user = await users.findOne({email});
    if(await bcrypt.compare(oldPassword, user.password)){
        // Update password in DB,
        const response = await users.findOneAndUpdate(
            {email},
            {
                password: await bcrypt.hash(newPassword, 12)
            },
            {
                new: true
            }
        );
        
        // send mail - Password updated,
        
        // return response
        return res.status(200).json({
            success: true,
            message: "Password updated Successfully",
            response
        });
    }
    else{
        return res.status(401).json({
            success: false,
            message: "Password is incorrect"
        });
    }
}