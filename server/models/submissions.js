import mongoose from "mongoose";

const submissionSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        problem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Problem",
        },
        contest: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contest",
        },
        code: String,
        language: String,
        status: String,
        sourceCode: String,
        failedInput:String,
        yourOutput:String,
        expectedOutput:String,
    },
    { timestamps: true }
);

export default mongoose.model("Submission", submissionSchema);