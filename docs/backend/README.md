## Backend APIs

### Overview
Express server providing interview management endpoints. Uses MongoDB via Mongoose. CORS and JSON body parsing are enabled.

- **Base URL**: `http://localhost:5000`
- **API Base Path**: `http://localhost:5000/api`
- **Content-Type**: `application/json`

### Health Check
- **GET** `/`
  - Returns a simple text message confirming the server is running.

Example:
```bash
curl -s http://localhost:5000/
```

---

### Create Interview
- **Method**: POST
- **Path**: `/api/interviews`
- **Description**: Create a new interview document.
- **Request Body**:
```json
{
  "candidateName": "Varun",
  "role": "Software Intern",
  "language": "en"
}
```
- **Responses**:
  - `201 Created` with the created interview JSON
  - `500 Internal Server Error` with `{ "error": "Failed to create interview" }`

Example:
```bash
curl -s -X POST "http://localhost:5000/api/interviews" \
  -H "Content-Type: application/json" \
  -d '{
    "candidateName": "Varun",
    "role": "Software Intern",
    "language": "en"
  }'
```

Sample success response:
```json
{
  "_id": "665f2c...",
  "candidateName": "Varun",
  "role": "Software Intern",
  "language": "en",
  "createdAt": "2025-10-24T12:00:00.000Z"
}
```

---

### Get Interview by ID
- **Method**: GET
- **Path**: `/api/interviews/:id`
- **Description**: Fetch an interview by its MongoDB ObjectId.
- **Responses**:
  - `200 OK` with the interview JSON
  - `404 Not Found` with `{ "error": "Not found" }`
  - `500 Internal Server Error` with `{ "error": "Failed to fetch interview" }`

Example:
```bash
curl -s "http://localhost:5000/api/interviews/665f2c..."
```

---

### End Interview (declared, not implemented)
- **Method**: PATCH
- **Path**: `/api/interviews/:id/end`
- This route is declared in `backend/routes/interviewRoutes.js` but its controller (`endInterview`) is not implemented in `backend/controllers/interviewController.js`. Until implemented, this endpoint will not function and may cause a runtime error on server start.

Recommended fix:
- Implement and export `endInterview` in `interviewController.js` or remove the route.

---

### Error Format
Errors return JSON with an `error` field:
```json
{ "error": "<message>" }
```

---

### Environment & Running
- **Env var**: `MONGO_URI` (MongoDB connection string, required)
- The server listens on `PORT` env var or defaults to `5000`.

Example `.env`:
```bash
MONGO_URI=mongodb://localhost:27017/ai-interview
PORT=5000
```

Run the server (from `backend/`):
```bash
npm run dev
```

---

### Dependencies
- express, cors, dotenv, mongoose

---

### Files of Interest
- `backend/server.js`: App bootstrap, middleware, DB connect, and routes mount
- `backend/routes/interviewRoutes.js`: Routes definition
- `backend/controllers/interviewController.js`: Handlers for create and get
- `backend/models/interview.js`: Mongoose model
