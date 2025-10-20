import Interview from "../models/Interview.js";

export async function createInterview(req, res) {
  try {
    const { candidateName, role, language = "en" } = req.body;
    if (!candidateName || !role) return res.status(400).json({ error: "candidateName and role are required" });
    const iv = await Interview.create({ candidateName, role, language });
    res.status(201).json({ id: iv._id.toString(), status: iv.status });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export async function getInterview(req, res) {
  try {
    const iv = await Interview.findById(req.params.id);
    if (!iv) return res.status(404).json({ error: "Not found" });
    res.json(iv);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export async function endInterview(req, res) {
  try {
    const iv = await Interview.findByIdAndUpdate(req.params.id, { status: "ended" }, { new: true });
    if (!iv) return res.status(404).json({ error: "Not found" });
    res.status(204).end();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
