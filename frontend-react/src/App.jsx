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
    </div>
  );
}

export default App;
