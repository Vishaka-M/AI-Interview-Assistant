import express from "express";
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

export default router;
