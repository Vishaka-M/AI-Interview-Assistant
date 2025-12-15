<<<<<<< HEAD
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
  axios.get("http://localhost:5000/api/interviews/health")
    .then(res => setMessage(res.data.status))
    .catch(err => setMessage("Backend not reachable"));
}, []);


  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">AI Interview Assistant Dashboard</h1>
      <p className="mt-4 text-green-600">{message}</p>
=======
import { useState } from "react";
import { createInterview } from "./services/api";

function App() {
  const [status, setStatus] = useState("");

  const handleCreate = async () => {
    try {
      const res = await createInterview({
        candidateName: "Varun",
        role: "Software Intern",
        language: "en",
      });
      setStatus("Interview created: " + res.data._id);
    } catch (err) {
      setStatus("Error: " + err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>AI Interview Assistant</h1>
      <button onClick={handleCreate}>Create Interview</button>
      <p>{status}</p>
>>>>>>> 2990c84185f78c949b7bce9f0b807586210659fe
    </div>
  );
}

export default App;
