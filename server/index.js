import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import userRoutes from "./routes/users.js";
import contestRoutes from './routes/Contest.js'
import problemRoutes from './routes/Problem.js'
import submissionRoutes from './routes/Submission.js'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: process.env.ALLOWED_ORIGINS || "https://bitcodee.netlify.app/", // Specify the allowed origin here
    }
))

app.use("/users", userRoutes);
app.use("/contest", contestRoutes);
app.use("/problem", problemRoutes);
app.use('/submission', submissionRoutes);



app.get("/", (req, res) => {
    res.send("Hello World");
    }
);
const PORT = process.env.PORT || 4000;
const DATABASE_URL = process.env.CONNECTION_URL
mongoose.connect(DATABASE_URL)
    .then(()=> app.listen(PORT, ()=> {console.log(`server running on port ${PORT}`);}))
    .catch((err) =>{console.log(err.message);})