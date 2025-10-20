import express from "express";
import {
  createInterview,
  getInterview,
  endInterview
} from "../controllers/interviewController.js";

const router = express.Router();

router.post("/", createInterview);
router.get("/:id", getInterview);
router.patch("/:id/end", endInterview);

export default router;
