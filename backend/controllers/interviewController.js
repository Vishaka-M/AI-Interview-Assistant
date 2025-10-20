import Interview from "../models/Interview.js";

// POST /api/interviews
export const createInterview = async (req, res) => {
  try {
    const interview = new Interview(req.body);
    const saved = await interview.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create interview" });
  }
};

// GET /api/interviews/:id
export const getInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) return res.status(404).json({ error: "Not found" });
    res.json(interview);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch interview" });
  }
};
