## Frontend (React)

Vite + React app consuming the backend APIs.

### Install & Run
From `frontend-react/`:
```bash
npm install
npm run dev
```

Set `backend` to run at `http://localhost:5000` or adjust `baseURL` in `src/Services/api.js`.

---

### Public Modules and Exports

#### `src/Services/api.js`
- **createInterview(data)** → Axios Promise
  - POST `/interviews` with `{ candidateName, role, language }`.
  - Example:
    ```javascript
    import { createInterview } from "./services/api";

    await createInterview({
      candidateName: "Varun",
      role: "Software Intern",
      language: "en",
    });
    ```
- **getInterview(id)** → Axios Promise
  - GET `/interviews/:id`.
  - Example:
    ```javascript
    import { getInterview } from "./services/api";

    const { data } = await getInterview("665f2c...");
    console.log(data);
    ```

---

### Components

#### `src/App.jsx`
- **App** (default export)
  - Simple demo component with a "Create Interview" button that calls `createInterview` and shows the result status.
  - Usage:
    ```jsx
    import App from "./App.jsx";

    export default function Root() {
      return <App />;
    }
    ```

#### `src/main.jsx`
- Application entry mounting `App` with `React.StrictMode`.

---

### Axios Client
Created as:
```javascript
const API = axios.create({ baseURL: "http://localhost:5000/api" });
```
Set a different base URL via environment variables or by editing the file.

---

### Error Handling
Axios errors propagate; in components, catch and surface `err.message` or response details.

---

### Notes
- Ensure backend is running and MongoDB is reachable via `MONGO_URI`.
- The route `PATCH /interviews/:id/end` exists server-side but is not wrapped by a frontend function yet.
