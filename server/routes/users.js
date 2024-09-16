import express from 'express'

import { changePassword, login, sendotp, signup } from '../controllers/auth.js'
// import {getAllUsers, getAskQuesition, updateProfile} from '../controllers/users.js'

import {auth} from "../middlewares/auth.js"
import { resetPassword, resetPasswordToken } from '../controllers/ResetPassword.js';

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)

// router.get('/getAllUsers', getAllUsers);
// router.patch('/update/:id', updateProfile);

// router.post('/userQuestions', getAskQuesition);

router.post("/sendotp", sendotp)
router.post("/changepassword", auth, changePassword)

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

// Export the router for use in the main application

export default router;