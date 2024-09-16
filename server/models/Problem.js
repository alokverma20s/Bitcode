import mongoose from "mongoose";

const problemSchema = mongoose.Schema(
    {
        name: String,
        seq: {
            type: Number,
            default: 0,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        inputFormat: [String],
        outputFormat: [String],
        statement: String,
        starterCode: String,
        constraints: [String],
        hints: [String],
        examples: [
            {
                input: String,
                output: String,
            },
        ],
        explanation: String,
        difficulty: String,
        topics: [String],
        companies: [String],
        code: String,
        language: String,
        testcases: [
            {
                input: String,
                output: String,
            },
        ],
    },
    { timestamps: true }
);

problemSchema.pre("save", async function (next) {
    if (!this.isNew) {
        return next();
    }

    try {
        const lastProblem = await this.constructor.findOne({}, {}, { sort: { seq: -1 } });
        if (lastProblem) {
            this.seq = lastProblem.seq + 1;
        }
    } catch (error) {
        return next(error);
    }

    next();
});

export default mongoose.model("Problem", problemSchema);