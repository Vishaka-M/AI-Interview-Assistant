# Frontend Documentation

Built with React + Vite.

## Services

Base URL: `http://localhost:5000/api`

### `createInterview(data)`
- Description: Creates a new interview.
- Import: `import { createInterview } from "./services/api"`
- Params:
  - `data` object with `candidateName`, `role`, `language`
- Returns: Axios Promise resolving to created interview.
- Example:
```js
const res = await createInterview({ candidateName: "Varun", role: "Software Intern", language: "en" });
console.log(res.data._id);
```

### `getInterview(id)`
- Description: Fetch a specific interview by id.
- Import: `import { getInterview } from "./services/api"`
- Params:
  - `id` string (ObjectId)
- Returns: Axios Promise resolving to interview document.
- Example:
```js
const res = await getInterview("66f123abcde0123456789abc");
console.log(res.data);
```

## Components

### `App`
- Location: `src/App.jsx`
- Responsibilities:
  - Provides a button to create an interview using `createInterview`
  - Displays operation status
- Minimal usage:
```jsx
import { useState } from "react";
import { createInterview } from "./services/api";

function App() {
  const [status, setStatus] = useState("");
  const handleCreate = async () => {
    const res = await createInterview({ candidateName: "Varun", role: "Software Intern", language: "en" });
    setStatus("Interview created: " + res.data._id);
  };
  return (
    <div>
      <button onClick={handleCreate}>Create Interview</button>
      <p>{status}</p>
    </div>
  );
}
export default App;
```
