import axios from "axios";

const API = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:5000/api/interviews",
});

export const createInterview = (data) => API.post("/", data);
export const getInterview = (id) => API.get(`/${id}`);
export const generateInterview = (data) => API.post("/generate", data);
export const listInterviews = () => API.get("/");
=======
  baseURL: "http://localhost:5000/api",
});

export const createInterview = (data) => API.post("/interviews", data);
export const getInterview = (id) => API.get(`/interviews/${id}`);
>>>>>>> 2990c84185f78c949b7bce9f0b807586210659fe
