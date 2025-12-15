import express from "express";
<<<<<<< HEAD
import { createInterview, getInterview, listInterviews } from "../controllers/interviewController.js";
import { generateInterview } from "../controllers/aiController.js";

const router = express.Router();
router.get("/health", (req, res) => {
res.json({ status: "Backend OK" });
});

// CRUD
router.post("/", createInterview);
router.get("/", listInterviews);

// AI generation
router.post("/generate", generateInterview);

// Health check
router.get("/test-ai", (req, res) => {
  res.status(200).json({ message: "AI route working fine — backend connected!" });
});

// Keep this LAST so it doesn't swallow /generate or /test-ai
router.get("/:id", getInterview);
=======
import {
  createInterview,
  getInterview,
} from "../controllers/interviewController.js";

const router = express.Router();

// Existing routes
router.post("/", createInterview);
router.get("/:id", getInterview);
router.get("/test-ai", testAI);

// Simple Test Route (works even without DB or controller)
router.get("/test-ai", (req, res) => {
  res.status(200).json({
    message: "AI route working fine — backend connected!",
  });
});
>>>>>>> 2990c84185f78c949b7bce9f0b807586210659fe

export default router;
