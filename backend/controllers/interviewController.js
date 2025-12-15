<<<<<<< HEAD
import InterviewModel from "../models/Interview.js";

// POST /api/interviews
export const createInterview = async (req, res) => {
  try {
    const interview = await InterviewModel.create(req.body);
    return res.status(201).json(interview);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create interview" });
  }
};

// GET /api/interviews/:id
export const getInterview = async (req, res) => {
  try {
    const interview = await InterviewModel.findById(req.params.id);
    if (!interview) return res.status(404).json({ error: "Interview not found" });
    return res.status(200).json(interview);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch interview" });
  }
};

// GET /api/interviews
export const listInterviews = async (_req, res) => {
  try {
    const items = await InterviewModel.find().sort({ createdAt: -1 }).limit(50);
    return res.json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to list interviews" });
=======
import Interview from "../models/Interview.js";


// POST /api/interviews
import Interview from "../models/Interview.js";

export const createInterview = async (req, res) => {
  try {
    const interview = await Interview.create(req.body);
    res.status(201).json(interview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create interview" });
  }
};


// GET /api/interviews/:id
export const getInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) return res.status(404).json({ error: "Interview not found" });
    res.status(200).json(interview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch interview" });
>>>>>>> 2990c84185f78c949b7bce9f0b807586210659fe
  }
};
