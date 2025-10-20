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
    </div>
  );
}

export default App;
