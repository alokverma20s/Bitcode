import bcrypt  from 'bcryptjs'
import crypto from 'crypto'

import User from"../models/auth.js";
import mailSender from"../utils/mailSender.js";

// resetPasswordToken
export const resetPasswordToken = async (req, res) => {
    try {
        // Get email from the body
        const { email } = req.body;

        // Check user for the this email, email verification
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Your Email is not registered with us",
            })
        }

        //generate token
        const token = crypto.randomUUID();

        // Update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
            { email },
            {
                token: token,
                resetPasswordExpires: (Date.now() + 5 * 60 * 1000),
            },
            { new: true }
        );
        const url = `http://localhost:3000/update-password/${token}`;

        // send mail containing the url
        await mailSender(
            email,
            "Password Reset Link",
            "Password Reset Link: " + url,
        )
        // return response
        return res.json({
            success: true,
            message: "Email sent successfully, Please check email and change Password",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while sending reset password mail",
        });
    }
}

// resetPassword
export const resetPassword = async (req, res) => {
    try {
        // fetch data
        const { password, confirmPassword, token } = req.body;

        // validate data
        if (password !== confirmPassword) {
            return res.json({
                success: false,
                message: "Password not matching",
            });
        }

        // get userdetails from db using token
        const userDetails = await User.findOne({ token: token });
        // if no entry - invalid token
        if (!userDetails) {
            return res.json({
                success: false,
                message: "Token is not valid",
            });
        }

        //token time check
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.json({
                success: false,
                // userDetails,
                message: "Token is Expired. Please regenerate your token",
            });
        }

        // hash pwd
        const hashedPassword = await bcrypt.hash(password, 12);
        //password update

        const response = await User.findOneAndUpdate(
            { token: token },
            { password: hashedPassword },
            { new: true }
        )
        //return response
        return res.json({
            success: true,
            message: "Password Reset successful",
            response
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong, While reseting password."
        })
    }
}