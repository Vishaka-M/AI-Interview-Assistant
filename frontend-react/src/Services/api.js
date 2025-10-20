import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const createInterview = (data) => API.post("/interviews", data);
export const getInterview = (id) => API.get(`/interviews/${id}`);
