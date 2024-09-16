import mongoose from "mongoose";

const contestSchema = mongoose.Schema(
  {
    name: String,
    description: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    startTime: Date,
    endTime: Date,
    duration: Number,
    problems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
      },
    ],
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    submissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Submission",
      },
    ],
    leaderboard: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        problems: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Problem",
          },
        ],
        score: Number,
        lastSubmission: Date,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Contest", contestSchema);
