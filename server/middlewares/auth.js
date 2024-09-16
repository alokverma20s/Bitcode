import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config();

// Auth
export const auth = async (req, res, next) =>{
    try{
        // extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace('Bearer', "");

        // if token missing , then return response
        if(!token){
            return res.status(401).json({
                success: false,
                messsage: 'Token is missing.'
            });
        }
        // Verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decode);
            req.user= decode;
        } catch (error) {
            // Verification -issue
            return res.status(401).json({
                success: false,
                message: 'Token is invalid.'
            });
        }
        next();
    }catch(error){
        return res.status(401).json({
            success: false,
            message: "Something went wrong, while verifying the token."
        });
    }
}

// isStudent
export const isStudent = async (req, res, next) =>{
    try {
        if(req.user.role !== "student"){
            return req.staus(401).json({
                success: false,
                message: "This is the protected routes for the Students only."
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, please try again."
        })
    }
}

// isInstructor
export const isInstructor = async (req, res, next) =>{
    try {
        if(req.user.role !== "instructor"){
            return req.staus(401).json({
                success: false,
                message: "This is the protected routes for the Instructor only."
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, please try again."
        })
    }
}

// isAdmin
export const isAdmin = async (req, res, next) =>{
    console.log("Printing AccountType: " , req.user);
    try {
        if(req.user.role !== "admin"){
            return req.staus(401).json({
                success: false,
                message: "This is the protected routes for the Admin only."
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, please try again."
        })
    }
}