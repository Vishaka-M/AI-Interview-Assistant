import express from "express";
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

export default router;
