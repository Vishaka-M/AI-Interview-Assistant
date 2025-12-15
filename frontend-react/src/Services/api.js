import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/interviews",
});

export const createInterview = (data) => API.post("/", data);
export const getInterview = (id) => API.get(`/${id}`);
export const generateInterview = (data) => API.post("/generate", data);
export const listInterviews = () => API.get("/");
