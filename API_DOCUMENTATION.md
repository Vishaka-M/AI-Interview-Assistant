# AI Interview Assistant - API Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Backend API Documentation](#backend-api-documentation)
3. [Frontend Components Documentation](#frontend-components-documentation)
4. [Data Models](#data-models)
5. [Setup and Installation](#setup-and-installation)
6. [Usage Examples](#usage-examples)

---

## Project Overview

The AI Interview Assistant is a full-stack application built with:
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React.js, Vite, Axios
- **Database**: MongoDB

The application allows users to create and manage AI-powered interviews with candidates.

---

## Backend API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
Currently, no authentication is required for API endpoints.

### Error Handling
All endpoints return consistent error responses:
```json
{
  "error": "Error message description"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `404` - Not Found
- `500` - Internal Server Error

---

## API Endpoints

### 1. Create Interview

**Endpoint:** `POST /api/interviews`

**Description:** Creates a new interview session.

**Request Body:**
```json
{
  "candidateName": "string (required)",
  "role": "string (required)", 
  "language": "string (required)"
}
```

**Response:**
```json
{
  "_id": "string",
  "candidateName": "string",
  "role": "string",
  "language": "string",
  "createdAt": "ISO 8601 date string",
  "__v": 0
}
```

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/interviews \
  -H "Content-Type: application/json" \
  -d '{
    "candidateName": "John Doe",
    "role": "Software Engineer",
    "language": "en"
  }'
```

**Example Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "candidateName": "John Doe",
  "role": "Software Engineer",
  "language": "en",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "__v": 0
}
```

---

### 2. Get Interview

**Endpoint:** `GET /api/interviews/:id`

**Description:** Retrieves a specific interview by ID.

**Parameters:**
- `id` (path parameter): MongoDB ObjectId of the interview

**Response:**
```json
{
  "_id": "string",
  "candidateName": "string",
  "role": "string",
  "language": "string",
  "createdAt": "ISO 8601 date string",
  "__v": 0
}
```

**Example Request:**
```bash
curl -X GET http://localhost:5000/api/interviews/507f1f77bcf86cd799439011
```

**Example Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "candidateName": "John Doe",
  "role": "Software Engineer",
  "language": "en",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "__v": 0
}
```

**Error Response (404):**
```json
{
  "error": "Not found"
}
```

---

### 3. End Interview

**Endpoint:** `PATCH /api/interviews/:id/end`

**Description:** Ends an active interview session.

**Parameters:**
- `id` (path parameter): MongoDB ObjectId of the interview

**Note:** This endpoint is defined in routes but the controller function is not implemented yet.

---

## Backend Controllers Documentation

### Interview Controller (`/backend/controllers/interviewController.js`)

#### `createInterview(req, res)`
- **Purpose**: Handles interview creation
- **Parameters**: 
  - `req.body`: Interview data object
- **Returns**: Created interview object or error
- **Error Handling**: Catches database errors and returns 500 status

#### `getInterview(req, res)`
- **Purpose**: Retrieves interview by ID
- **Parameters**: 
  - `req.params.id`: Interview ID
- **Returns**: Interview object or 404 error
- **Error Handling**: Returns 404 if not found, 500 for other errors

---

## Data Models

### Interview Model (`/backend/models/interview.js`)

**Schema Definition:**
```javascript
{
  candidateName: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    required: true 
  },
  language: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}
```

**Field Descriptions:**
- `candidateName`: Full name of the interview candidate
- `role`: Position/role being interviewed for
- `language`: Language preference for the interview (e.g., "en" for English)
- `createdAt`: Timestamp when the interview was created (auto-generated)

---

## Frontend Components Documentation

### App Component (`/frontend-react/src/App.jsx`)

**Description:** Main application component that provides the user interface for creating interviews.

**State:**
- `status`: String to display current operation status

**Methods:**

#### `handleCreate()`
- **Purpose**: Creates a new interview when button is clicked
- **Behavior**: 
  - Calls the API to create an interview with hardcoded test data
  - Updates status with success message (interview ID) or error message
- **Error Handling**: Catches and displays API errors

**Props:** None

**Usage:**
```jsx
import App from './App.jsx';

// Render the main application
<App />
```

---

### API Service (`/frontend-react/src/Services/api.js`)

**Description:** Axios-based API client for communicating with the backend.

**Configuration:**
```javascript
const API = axios.create({
  baseURL: "http://localhost:5000/api"
});
```

**Functions:**

#### `createInterview(data)`
- **Purpose**: Creates a new interview
- **Parameters**: 
  - `data`: Object containing interview details
- **Returns**: Axios promise with API response
- **Usage**:
  ```javascript
  import { createInterview } from './Services/api';
  
  const interviewData = {
    candidateName: "Jane Smith",
    role: "Frontend Developer", 
    language: "en"
  };
  
  try {
    const response = await createInterview(interviewData);
    console.log('Interview created:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
  ```

#### `getInterview(id)`
- **Purpose**: Retrieves an interview by ID
- **Parameters**: 
  - `id`: Interview ID string
- **Returns**: Axios promise with API response
- **Usage**:
  ```javascript
  import { getInterview } from './Services/api';
  
  try {
    const response = await getInterview('507f1f77bcf86cd799439011');
    console.log('Interview data:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
  ```

---

## Setup and Installation

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/ai-interview-assistant
   PORT=5000
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend-react
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   Application will run on `http://localhost:5173`

### Database Setup

1. **Install MongoDB** (if not already installed)
2. **Start MongoDB service**
3. **The application will automatically connect and create the database**

---

## Usage Examples

### Complete Interview Creation Flow

#### 1. Backend API Call
```javascript
// Using fetch
const createInterview = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/interviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        candidateName: 'Alice Johnson',
        role: 'Data Scientist',
        language: 'en'
      })
    });
    
    const interview = await response.json();
    console.log('Created interview:', interview);
    return interview;
  } catch (error) {
    console.error('Error creating interview:', error);
  }
};
```

#### 2. Frontend Integration
```jsx
import React, { useState } from 'react';
import { createInterview, getInterview } from './Services/api';

function InterviewManager() {
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreateInterview = async () => {
    setLoading(true);
    try {
      const response = await createInterview({
        candidateName: 'Bob Wilson',
        role: 'DevOps Engineer',
        language: 'en'
      });
      setInterview(response.data);
    } catch (error) {
      console.error('Failed to create interview:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetInterview = async (id) => {
    try {
      const response = await getInterview(id);
      setInterview(response.data);
    } catch (error) {
      console.error('Failed to fetch interview:', error);
    }
  };

  return (
    <div>
      <button onClick={handleCreateInterview} disabled={loading}>
        {loading ? 'Creating...' : 'Create Interview'}
      </button>
      
      {interview && (
        <div>
          <h3>Interview Details</h3>
          <p><strong>ID:</strong> {interview._id}</p>
          <p><strong>Candidate:</strong> {interview.candidateName}</p>
          <p><strong>Role:</strong> {interview.role}</p>
          <p><strong>Language:</strong> {interview.language}</p>
          <p><strong>Created:</strong> {new Date(interview.createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default InterviewManager;
```

### Error Handling Examples

#### Backend Error Handling
```javascript
// In controller
export const createInterview = async (req, res) => {
  try {
    // Validate required fields
    const { candidateName, role, language } = req.body;
    
    if (!candidateName || !role || !language) {
      return res.status(400).json({ 
        error: 'Missing required fields: candidateName, role, language' 
      });
    }
    
    const interview = new Interview(req.body);
    const saved = await interview.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Interview creation error:', err);
    res.status(500).json({ error: 'Failed to create interview' });
  }
};
```

#### Frontend Error Handling
```javascript
const handleApiCall = async () => {
  try {
    const response = await createInterview(data);
    // Handle success
  } catch (error) {
    if (error.response) {
      // Server responded with error status
      console.error('Server Error:', error.response.data.error);
      setErrorMessage(error.response.data.error);
    } else if (error.request) {
      // Network error
      console.error('Network Error:', error.request);
      setErrorMessage('Network error - please check your connection');
    } else {
      // Other error
      console.error('Error:', error.message);
      setErrorMessage('An unexpected error occurred');
    }
  }
};
```

---

## Development Notes

### Missing Implementation
- The `endInterview` controller function is referenced in routes but not implemented
- Consider adding validation middleware for request bodies
- Add authentication/authorization for production use

### Recommended Enhancements
1. **Add request validation middleware**
2. **Implement the missing `endInterview` function**
3. **Add logging middleware**
4. **Add rate limiting**
5. **Add API versioning**
6. **Add comprehensive error handling**
7. **Add unit and integration tests**

### File Structure
```
/workspace/
├── backend/
│   ├── controllers/
│   │   └── interviewController.js
│   ├── models/
│   │   └── interview.js
│   ├── routes/
│   │   └── interviewRoutes.js
│   ├── package.json
│   └── server.js
└── frontend-react/
    ├── src/
    │   ├── Services/
    │   │   └── api.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

This documentation provides comprehensive coverage of all public APIs, functions, and components in the AI Interview Assistant application.