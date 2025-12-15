<<<<<<< HEAD
import "dotenv/config";
=======
>>>>>>> 2990c84185f78c949b7bce9f0b807586210659fe
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
<<<<<<< HEAD
import interviewRoutes from "./routes/interviewRoutes.js";
=======
import interviewRoutes from "./routes/interviewRoutes.js"; // important
>>>>>>> 2990c84185f78c949b7bce9f0b807586210659fe

dotenv.config();
const app = express();

// Middleware
app.use(cors());
<<<<<<< HEAD




app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
99
// Routes
app.use("/api/interviews", interviewRoutes);

=======
app.use(express.json());

//  connect route
app.use("/api/interviews", interviewRoutes);

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

>>>>>>> 2990c84185f78c949b7bce9f0b807586210659fe
// Base route
app.get("/", (req, res) => {
  res.send("AI Interview Assistant Backend is Running Successfully...");
});

<<<<<<< HEAD
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
=======
// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
>>>>>>> 2990c84185f78c949b7bce9f0b807586210659fe
