# API Documentation

## Overview

AI Interview Assistant is a full-stack application built with React (frontend) and Node.js/Express (backend), with MongoDB for data persistence. This documentation provides comprehensive details on all public APIs, functions, and components.

---

## Table of Contents

1. [REST API Endpoints](#rest-api-endpoints)
2. [Backend Architecture](#backend-architecture)
3. [Frontend Architecture](#frontend-architecture)
4. [Data Models](#data-models)
5. [Setup & Installation](#setup--installation)
6. [Usage Examples](#usage-examples)

---

## REST API Endpoints

### Base URL

```
http://localhost:5000/api
```

### Endpoints

#### 1. Create Interview

**Endpoint:** `POST /api/interviews`

**Description:** Creates a new interview session.

**Request Body:**
```json
{
  "candidateName": "string",
  "role": "string",
  "language": "string"
}
```

**Request Example:**
```bash
curl -X POST http://localhost:5000/api/interviews \
  -H "Content-Type: application/json" \
  -d '{
    "candidateName": "John Doe",
    "role": "Software Engineer",
    "language": "en"
  }'
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "candidateName": "John Doe",
  "role": "Software Engineer",
  "language": "en",
  "createdAt": "2025-10-24T12:00:00.000Z",
  "__v": 0
}
```

**Error Response (500):**
```json
{
  "error": "Failed to create interview"
}
```

---

#### 2. Get Interview by ID

**Endpoint:** `GET /api/interviews/:id`

**Description:** Retrieves a specific interview session by its ID.

**URL Parameters:**
- `id` (required): MongoDB ObjectId of the interview

**Request Example:**
```bash
curl -X GET http://localhost:5000/api/interviews/507f1f77bcf86cd799439011
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "candidateName": "John Doe",
  "role": "Software Engineer",
  "language": "en",
  "createdAt": "2025-10-24T12:00:00.000Z",
  "__v": 0
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Not found"
}
```

**Error Response (500):**
```json
{
  "error": "Failed to fetch interview"
}
```

---

#### 3. End Interview

**Endpoint:** `PATCH /api/interviews/:id/end`

**Description:** Marks an interview session as ended.

**URL Parameters:**
- `id` (required): MongoDB ObjectId of the interview

**Request Example:**
```bash
curl -X PATCH http://localhost:5000/api/interviews/507f1f77bcf86cd799439011/end
```

**Note:** This endpoint is defined in the routes but the controller implementation is pending.

---

## Backend Architecture

### Server Configuration

**File:** `backend/server.js`

#### Main Server Features

- **Framework:** Express.js
- **Port:** 5000 (default) or from `process.env.PORT`
- **Database:** MongoDB via Mongoose
- **CORS:** Enabled for all origins
- **Body Parser:** JSON payloads supported

#### Environment Variables

Create a `.env` file in the backend directory:

```env
MONGO_URI=mongodb://localhost:27017/ai-interview-assistant
PORT=5000
```

---

### Controllers

**File:** `backend/controllers/interviewController.js`

#### createInterview

**Function Signature:**
```javascript
export const createInterview = async (req, res) => { ... }
```

**Description:** Handles the creation of a new interview record in the database.

**Parameters:**
- `req.body`: Object containing interview data
  - `candidateName` (string, required): Name of the candidate
  - `role` (string, required): Position/role being interviewed for
  - `language` (string, required): Language code (e.g., 'en', 'es')

**Returns:**
- Success: HTTP 201 with created interview object
- Error: HTTP 500 with error message

**Example Usage:**
```javascript
import { createInterview } from './controllers/interviewController.js';

// In your route handler
router.post('/interviews', createInterview);
```

---

#### getInterview

**Function Signature:**
```javascript
export const getInterview = async (req, res) => { ... }
```

**Description:** Retrieves an interview record by its MongoDB ObjectId.

**Parameters:**
- `req.params.id`: MongoDB ObjectId string

**Returns:**
- Success: HTTP 200 with interview object
- Not Found: HTTP 404 with error message
- Error: HTTP 500 with error message

**Example Usage:**
```javascript
import { getInterview } from './controllers/interviewController.js';

// In your route handler
router.get('/interviews/:id', getInterview);
```

---

### Models

**File:** `backend/models/interview.js`

#### Interview Schema

**Description:** Mongoose schema for interview documents.

**Schema Definition:**
```javascript
{
  candidateName: { type: String, required: true },
  role: { type: String, required: true },
  language: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}
```

**Fields:**

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| candidateName | String | Yes | - | Name of the interview candidate |
| role | String | Yes | - | Position/role for the interview |
| language | String | Yes | - | Language code for the interview |
| createdAt | Date | No | Date.now | Timestamp of interview creation |

**Model Export:**
```javascript
import Interview from './models/interview.js';

// Create a new interview
const interview = new Interview({
  candidateName: "Jane Smith",
  role: "Product Manager",
  language: "en"
});
await interview.save();

// Find by ID
const found = await Interview.findById(id);
```

---

### Routes

**File:** `backend/routes/interviewRoutes.js`

#### Route Definitions

| Method | Path | Controller | Description |
|--------|------|------------|-------------|
| POST | `/` | createInterview | Create new interview |
| GET | `/:id` | getInterview | Get interview by ID |
| PATCH | `/:id/end` | endInterview | End interview session |

**Integration Example:**
```javascript
import express from 'express';
import interviewRoutes from './routes/interviewRoutes.js';

const app = express();
app.use('/api/interviews', interviewRoutes);
```

---

## Frontend Architecture

### Main Application

**File:** `frontend-react/src/App.jsx`

#### App Component

**Description:** Root component of the React application that provides the main UI for creating interviews.

**Component Signature:**
```jsx
function App() { ... }
```

**State:**
- `status` (string): Display status messages for user feedback

**Methods:**

##### handleCreate()
```jsx
const handleCreate = async () => { ... }
```

**Description:** Asynchronously creates a new interview using the API service.

**Behavior:**
- Calls `createInterview()` from API service
- Updates status on success with interview ID
- Displays error message on failure

**Example Usage:**
```jsx
import App from './App.jsx';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(<App />);
```

**Component UI:**
- Displays application title
- Provides a button to create interviews
- Shows status messages

**Hardcoded Demo Data:**
```javascript
{
  candidateName: "Varun",
  role: "Software Intern",
  language: "en"
}
```

---

### API Service

**File:** `frontend-react/src/Services/api.js`

#### API Client Configuration

**Description:** Axios-based API client for communicating with the backend.

**Base Configuration:**
```javascript
const API = axios.create({
  baseURL: "http://localhost:5000/api"
});
```

---

#### createInterview()

**Function Signature:**
```javascript
export const createInterview = (data) => API.post("/interviews", data)
```

**Description:** Sends a POST request to create a new interview.

**Parameters:**
- `data` (Object): Interview data object
  - `candidateName` (string): Candidate's name
  - `role` (string): Job role
  - `language` (string): Language code

**Returns:** Promise<AxiosResponse> with created interview data

**Example Usage:**
```javascript
import { createInterview } from './services/api';

try {
  const response = await createInterview({
    candidateName: "Alice Johnson",
    role: "Data Scientist",
    language: "en"
  });
  console.log("Interview created:", response.data);
} catch (error) {
  console.error("Error creating interview:", error);
}
```

---

#### getInterview()

**Function Signature:**
```javascript
export const getInterview = (id) => API.get(`/interviews/${id}`)
```

**Description:** Sends a GET request to retrieve an interview by ID.

**Parameters:**
- `id` (string): MongoDB ObjectId of the interview

**Returns:** Promise<AxiosResponse> with interview data

**Example Usage:**
```javascript
import { getInterview } from './services/api';

try {
  const response = await getInterview("507f1f77bcf86cd799439011");
  console.log("Interview details:", response.data);
} catch (error) {
  console.error("Error fetching interview:", error);
}
```

---

### Entry Point

**File:** `frontend-react/src/main.jsx`

**Description:** Application entry point that mounts the React app to the DOM.

**Code:**
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

**Features:**
- Uses React 19's `createRoot` API
- Wraps app in `StrictMode` for development checks
- Mounts to DOM element with id `root`

---

## Data Models

### Interview

**Description:** Represents an interview session in the database.

**Structure:**
```typescript
interface Interview {
  _id: ObjectId;           // MongoDB auto-generated ID
  candidateName: string;   // Candidate's full name
  role: string;            // Job position/role
  language: string;        // Language code (ISO 639-1)
  createdAt: Date;         // Creation timestamp
  __v: number;             // MongoDB version key
}
```

**Example Document:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "candidateName": "Michael Chen",
  "role": "Full Stack Developer",
  "language": "en",
  "createdAt": "2025-10-24T10:30:00.000Z",
  "__v": 0
}
```

---

## Setup & Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v6 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
MONGO_URI=mongodb://localhost:27017/ai-interview-assistant
PORT=5000
```

4. Start MongoDB:
```bash
mongod
```

5. Run the development server:
```bash
npm run dev
```

The backend should now be running on `http://localhost:5000`

---

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend should now be running on `http://localhost:5173` (default Vite port)

---

## Usage Examples

### Complete Workflow Example

#### 1. Start the servers

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend-react
npm run dev
```

---

#### 2. Create an Interview (via UI)

1. Open `http://localhost:5173` in your browser
2. Click the "Create Interview" button
3. View the interview ID in the status message

---

#### 3. Create an Interview (via API)

**Using cURL:**
```bash
curl -X POST http://localhost:5000/api/interviews \
  -H "Content-Type: application/json" \
  -d '{
    "candidateName": "Sarah Williams",
    "role": "UX Designer",
    "language": "en"
  }'
```

**Using JavaScript (fetch):**
```javascript
const createInterview = async () => {
  const response = await fetch('http://localhost:5000/api/interviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      candidateName: "Sarah Williams",
      role: "UX Designer",
      language: "en"
    })
  });
  
  const data = await response.json();
  console.log('Created interview:', data);
  return data;
};
```

---

#### 4. Retrieve an Interview

**Using cURL:**
```bash
curl http://localhost:5000/api/interviews/507f1f77bcf86cd799439011
```

**Using JavaScript (fetch):**
```javascript
const getInterview = async (id) => {
  const response = await fetch(`http://localhost:5000/api/interviews/${id}`);
  const data = await response.json();
  console.log('Interview details:', data);
  return data;
};
```

**Using the Frontend Service:**
```javascript
import { getInterview } from './services/api';

const fetchInterviewDetails = async () => {
  try {
    const response = await getInterview('507f1f77bcf86cd799439011');
    console.log(response.data);
  } catch (error) {
    console.error('Failed to fetch interview:', error);
  }
};
```

---

### Advanced Usage Examples

#### Custom API Client Configuration

**Adding Authentication Headers:**
```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN_HERE'
  }
});

// Add request interceptor for dynamic tokens
API.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);
```

---

#### Error Handling Best Practices

**Frontend:**
```javascript
import { createInterview } from './services/api';

const handleCreateWithErrorHandling = async (interviewData) => {
  try {
    const response = await createInterview(interviewData);
    console.log('Success:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    if (error.response) {
      // Server responded with error status
      console.error('Server error:', error.response.data);
      return { success: false, error: error.response.data.error };
    } else if (error.request) {
      // Request made but no response
      console.error('Network error:', error.request);
      return { success: false, error: 'Network error' };
    } else {
      // Something else happened
      console.error('Error:', error.message);
      return { success: false, error: error.message };
    }
  }
};
```

---

#### MongoDB Queries

**Backend - Additional Query Examples:**
```javascript
import Interview from './models/interview.js';

// Find all interviews for a specific role
const findByRole = async (role) => {
  return await Interview.find({ role });
};

// Find interviews created after a specific date
const findRecent = async (date) => {
  return await Interview.find({ 
    createdAt: { $gte: date } 
  }).sort({ createdAt: -1 });
};

// Count interviews by language
const countByLanguage = async (language) => {
  return await Interview.countDocuments({ language });
};

// Update interview details
const updateInterview = async (id, updates) => {
  return await Interview.findByIdAndUpdate(
    id, 
    updates, 
    { new: true }
  );
};

// Delete an interview
const deleteInterview = async (id) => {
  return await Interview.findByIdAndDelete(id);
};
```

---

## Testing

### Backend Testing Example

**Manual API Testing with cURL:**

```bash
# Test health endpoint
curl http://localhost:5000/

# Test create interview
curl -X POST http://localhost:5000/api/interviews \
  -H "Content-Type: application/json" \
  -d '{"candidateName":"Test User","role":"Test Role","language":"en"}'

# Test get interview (replace ID with actual ID from create response)
curl http://localhost:5000/api/interviews/YOUR_INTERVIEW_ID
```

---

### Frontend Testing Example

**Component Testing (with React Testing Library):**

```jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import * as api from './services/api';

jest.mock('./services/api');

test('creates interview on button click', async () => {
  const mockResponse = {
    data: {
      _id: '123',
      candidateName: 'Varun',
      role: 'Software Intern',
      language: 'en'
    }
  };
  
  api.createInterview.mockResolvedValue(mockResponse);
  
  render(<App />);
  
  const button = screen.getByText('Create Interview');
  fireEvent.click(button);
  
  await waitFor(() => {
    expect(screen.getByText(/Interview created: 123/)).toBeInTheDocument();
  });
});
```

---

## Environment Configuration

### Backend Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| MONGO_URI | Yes | - | MongoDB connection string |
| PORT | No | 5000 | Server port number |

### Frontend Environment Variables

For production builds, you may want to configure the API base URL:

**Create `.env` file in frontend-react:**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Update `api.js`:**
```javascript
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
});
```

---

## Deployment

### Backend Deployment

**Example: Deploying to Heroku**

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGO_URI=your_mongodb_uri

# Deploy
git push heroku main

# Check logs
heroku logs --tail
```

---

### Frontend Deployment

**Build for Production:**
```bash
cd frontend-react
npm run build
```

**The build output will be in the `dist` directory.**

**Example: Deploying to Netlify**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## Best Practices

### Backend

1. **Error Handling:** Always use try-catch blocks in async functions
2. **Validation:** Add input validation using libraries like `joi` or `express-validator`
3. **Security:** Implement rate limiting, helmet.js, and authentication
4. **Logging:** Use proper logging libraries like `winston` or `morgan`
5. **Environment:** Never commit `.env` files to version control

### Frontend

1. **State Management:** Consider using Context API or Redux for complex state
2. **Error Boundaries:** Implement React Error Boundaries for better UX
3. **Loading States:** Show loading indicators during API calls
4. **Environment Variables:** Use Vite's built-in environment variable support
5. **Code Splitting:** Implement lazy loading for better performance

---

## Troubleshooting

### Common Issues

#### MongoDB Connection Error

**Error:** `MongoNetworkError: failed to connect to server`

**Solution:**
1. Ensure MongoDB is running: `mongod`
2. Check your `MONGO_URI` in `.env`
3. Verify MongoDB is listening on the correct port

---

#### CORS Error

**Error:** `Access to fetch at 'http://localhost:5000' from origin 'http://localhost:5173' has been blocked by CORS`

**Solution:**
CORS is already enabled in the backend. If you still see this error:
1. Ensure the backend server is running
2. Check that the frontend is using the correct API URL
3. Clear browser cache and cookies

---

#### Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process (replace PID with actual process ID)
kill -9 PID

# Or use a different port in .env
PORT=5001
```

---

## API Versioning

Currently, the API is unversioned. For future versions, consider:

```javascript
// v1 routes
app.use('/api/v1/interviews', interviewRoutesV1);

// v2 routes (future)
app.use('/api/v2/interviews', interviewRoutesV2);
```

---

## Rate Limiting

Consider implementing rate limiting for production:

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## Contributing

When adding new features:

1. **Backend:**
   - Add route in `routes/interviewRoutes.js`
   - Implement controller in `controllers/interviewController.js`
   - Update model if needed in `models/interview.js`
   - Document in this file

2. **Frontend:**
   - Add API function in `services/api.js`
   - Create/update components in `src/`
   - Document in this file

---

## License

Refer to the project's LICENSE file for licensing information.

---

## Support

For issues, questions, or contributions, please refer to the project repository.

---

**Last Updated:** 2025-10-24

**Version:** 1.0.0
