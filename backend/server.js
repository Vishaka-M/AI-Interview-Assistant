import "dotenv/config";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import interviewRoutes from "./routes/interviewRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());




app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
99
// Routes
app.use("/api/interviews", interviewRoutes);

// Base route
app.get("/", (req, res) => {
  res.send("AI Interview Assistant Backend is Running Successfully...");
});

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};

startServer();
