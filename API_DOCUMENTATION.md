# AI Interview Assistant - API Documentation

## Overview

The AI Interview Assistant is a full-stack application consisting of a Node.js/Express backend and a React frontend. This documentation covers all public APIs, functions, and components.

## Table of Contents

1. [Backend API Documentation](#backend-api-documentation)
2. [Frontend Component Documentation](#frontend-component-documentation)
3. [Data Models](#data-models)
4. [Setup and Installation](#setup-and-installation)
5. [Usage Examples](#usage-examples)

---

## Backend API Documentation

### Base URL
```
http://localhost:5000/api
```

### Server Configuration
- **Port**: 5000 (configurable via `PORT` environment variable)
- **Database**: MongoDB (configurable via `MONGO_URI` environment variable)
- **CORS**: Enabled for all origins
- **Body Parser**: JSON

### API Endpoints

#### 1. Health Check
**GET** `/`

Returns server status and confirmation that the backend is running.

**Response:**
```json
"🚀 AI Interview Assistant Backend is Running Successfully..."
```

**Example:**
```bash
curl http://localhost:5000/
```

---

#### 2. Interview Management

##### Create Interview
**POST** `/api/interviews`

Creates a new interview session.

**Request Body:**
```json
{
  "candidateName": "string (required)",
  "role": "string (required)", 
  "language": "string (required)"
}
```

**Response:**
- **Success (201)**: Returns the created interview object
- **Error (500)**: Returns error message

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
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

##### Get Interview
**GET** `/api/interviews/:id`

Retrieves a specific interview by ID.

**Parameters:**
- `id` (string, required): MongoDB ObjectId of the interview

**Response:**
- **Success (200)**: Returns the interview object
- **Not Found (404)**: Returns error message
- **Error (500)**: Returns error message

**Example Request:**
```bash
curl http://localhost:5000/api/interviews/507f1f77bcf86cd799439011
```

**Example Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "candidateName": "John Doe",
  "role": "Software Engineer",
  "language": "en", 
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

##### End Interview
**PATCH** `/api/interviews/:id/end`

Ends an interview session (function referenced but not implemented).

**Parameters:**
- `id` (string, required): MongoDB ObjectId of the interview

**Note:** This endpoint is defined in routes but the controller function `endInterview` is not implemented in the current codebase.

---

### Data Models

#### Interview Schema
```javascript
{
  candidateName: String (required),
  role: String (required),
  language: String (required),
  createdAt: Date (default: Date.now)
}
```

**Field Descriptions:**
- `candidateName`: Full name of the interview candidate
- `role`: Position or role being interviewed for
- `language`: Language preference for the interview (e.g., "en", "es", "fr")
- `createdAt`: Timestamp when the interview was created (auto-generated)

---

## Frontend Component Documentation

### App Component

**File:** `src/App.jsx`

Main React component that provides the user interface for the AI Interview Assistant.

#### Props
None (root component)

#### State
- `status` (string): Current status message displayed to the user

#### Methods

##### `handleCreate()`
Async function that creates a new interview session.

**Behavior:**
1. Calls the `createInterview` API function with hardcoded test data
2. Updates the status state with success or error message
3. Displays the created interview ID on success

**Test Data Used:**
```javascript
{
  candidateName: "Varun",
  role: "Software Intern", 
  language: "en"
}
```

#### JSX Structure
```jsx
<div style={{ textAlign: "center", marginTop: "100px" }}>
  <h1>AI Interview Assistant</h1>
  <button onClick={handleCreate}>Create Interview</button>
  <p>{status}</p>
</div>
```

#### Usage Example
```jsx
import App from './App';

// The App component is automatically rendered in main.jsx
// No additional props or configuration needed
```

---

### API Service Functions

**File:** `src/Services/api.js`

Contains HTTP client functions for communicating with the backend API.

#### Configuration
- **Base URL**: `http://localhost:5000/api`
- **HTTP Client**: Axios
- **Content Type**: JSON (default)

#### Functions

##### `createInterview(data)`
Creates a new interview session.

**Parameters:**
- `data` (object): Interview data object
  - `candidateName` (string): Name of the candidate
  - `role` (string): Position being interviewed for
  - `language` (string): Language preference

**Returns:** Axios Promise

**Example:**
```javascript
import { createInterview } from './Services/api';

const interviewData = {
  candidateName: "Jane Smith",
  role: "Frontend Developer",
  language: "en"
};

createInterview(interviewData)
  .then(response => {
    console.log('Interview created:', response.data);
  })
  .catch(error => {
    console.error('Error creating interview:', error);
  });
```

##### `getInterview(id)`
Retrieves an interview by ID.

**Parameters:**
- `id` (string): MongoDB ObjectId of the interview

**Returns:** Axios Promise

**Example:**
```javascript
import { getInterview } from './Services/api';

getInterview('507f1f77bcf86cd799439011')
  .then(response => {
    console.log('Interview data:', response.data);
  })
  .catch(error => {
    console.error('Error fetching interview:', error);
  });
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

3. **Environment Configuration:**
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/interview-assistant
   PORT=5000
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```

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

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## Usage Examples

### Complete Workflow Example

1. **Start both servers:**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev
   
   # Terminal 2 - Frontend  
   cd frontend-react && npm run dev
   ```

2. **Access the application:**
   - Frontend: `http://localhost:5173` (Vite default)
   - Backend API: `http://localhost:5000/api`

3. **Create an interview:**
   - Click the "Create Interview" button in the UI
   - The app will create an interview with test data
   - The interview ID will be displayed

4. **Test API directly:**
   ```bash
   # Create interview
   curl -X POST http://localhost:5000/api/interviews \
     -H "Content-Type: application/json" \
     -d '{"candidateName": "Alice Johnson", "role": "Data Scientist", "language": "en"}'
   
   # Get interview (replace with actual ID)
   curl http://localhost:5000/api/interviews/INTERVIEW_ID
   ```

### Error Handling

The application includes basic error handling:

- **Backend**: Returns appropriate HTTP status codes and error messages
- **Frontend**: Displays error messages in the UI when API calls fail

### Development Notes

- The frontend uses hardcoded test data for demonstration
- The `endInterview` endpoint is defined but not implemented
- CORS is enabled for development purposes
- The application uses ES6 modules throughout

---

## Dependencies

### Backend Dependencies
- `express`: Web framework
- `cors`: Cross-origin resource sharing
- `dotenv`: Environment variable management
- `mongoose`: MongoDB object modeling
- `nodemon`: Development server with auto-restart

### Frontend Dependencies
- `react`: UI library
- `react-dom`: React DOM rendering
- `axios`: HTTP client
- `vite`: Build tool and dev server

---

## Future Enhancements

1. **Implement missing `endInterview` functionality**
2. **Add authentication and authorization**
3. **Implement interview question generation**
4. **Add real-time interview features**
5. **Enhance error handling and validation**
6. **Add comprehensive testing suite**
7. **Implement interview session management**
8. **Add candidate and role management features**