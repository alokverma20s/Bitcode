import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    about: {type: String},
    Subject: [{type: mongoose.Schema.Types.ObjectId, ref: "Subject"}],
    joinedOn: {type: Date, default: Date.now},
    role: {type: String, enum: ["student", "admin", "instructor"], default: 'student'},
    result: [
        {
            quizId:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"Quiz"
            },
            marks: {
                type: Number
            },
            totalMarks:{
                type: Number
            }
        }
    ],
    questionAsked: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Queston'
    }],
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    active: {
        type: Boolean,
        default: true,
    },
    approved: {
        type: Boolean,
        default: true,
    },
})

export default mongoose.model("User", userSchema);