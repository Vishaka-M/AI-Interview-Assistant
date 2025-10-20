import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  candidateName: { type: String, required: true },
  role: { type: String, required: true },
  language: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Interview", interviewSchema);
