import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema(
  {
    candidateName: { type: String, required: true },
    role: { type: String, required: true },
    language: { type: String, required: true },
    questions: { type: [String], default: [] },
    answers: { type: [String], default: [] },
    score: { type: Number, default: 0 },
    feedback: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Interview", InterviewSchema);
