import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import interviewRoutes from "./routes/interviewRoutes.js"; // ✅ important

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ connect route
app.use("/api/interviews", interviewRoutes);

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Base route
app.get("/", (req, res) => {
  res.send("🚀 AI Interview Assistant Backend is Running Successfully...");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
