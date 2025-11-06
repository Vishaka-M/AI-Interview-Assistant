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
  }
};
