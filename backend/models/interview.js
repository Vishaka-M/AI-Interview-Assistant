import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema(
  {
    candidateName: { type: String, required: true },
    role: { type: String, required: true },
    language: { type: String, default: "en" },
    status: { type: String, enum: ["active", "ended"], default: "active" },
    transcript: [{ type: String }],
    star: { S: Number, T: Number, A: Number, R: Number },
    finalScore: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Interview", InterviewSchema);
