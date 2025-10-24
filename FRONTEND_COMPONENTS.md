# Frontend Components Documentation

Complete reference for all React components, hooks, services, and utilities in the frontend application.

---

## Table of Contents

1. [Overview](#overview)
2. [Components](#components)
3. [Services](#services)
4. [Hooks](#hooks)
5. [Utilities](#utilities)
6. [Styling](#styling)
7. [State Management](#state-management)
8. [Best Practices](#best-practices)

---

## Overview

**Framework:** React 19.1.1
**Build Tool:** Vite 7.1.7
**HTTP Client:** Axios 1.12.2
**Development Server:** http://localhost:5173

### Project Structure

```
frontend-react/
├── src/
│   ├── App.jsx           # Main application component
│   ├── App.css           # App-specific styles
│   ├── main.jsx          # Application entry point
│   ├── index.css         # Global styles
│   ├── Services/
│   │   └── api.js        # API service layer
│   └── assets/
│       └── react.svg     # React logo
├── public/               # Static assets
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
└── eslint.config.js      # ESLint configuration
```

---

## Components

### App Component

**File:** `src/App.jsx`

```jsx
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
```

---

#### Component Details

**Type:** Functional Component

**Purpose:** Main application component that provides the UI for creating interview sessions.

**Props:** None

**State:**
- `status` (string): Displays feedback messages to the user

**Methods:**

##### handleCreate()

```jsx
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
```

**Purpose:** Handles the interview creation process.

**Parameters:** None

**Returns:** Promise<void>

**Side Effects:**
- Calls the `createInterview` API service
- Updates component state with success/error messages

**Error Handling:**
- Catches API errors
- Displays user-friendly error messages

---

#### Usage Examples

**Basic Usage:**
```jsx
import App from './App';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

**With Router (Suggested Enhancement):**
```jsx
import { BrowserRouter } from 'react-router-dom';

<BrowserRouter>
  <App />
</BrowserRouter>
```

---

#### Suggested Improvements

##### 1. Dynamic Form Input

```jsx
import { useState } from "react";
import { createInterview } from "./services/api";

function App() {
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    candidateName: "",
    role: "",
    language: "en"
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    
    try {
      const res = await createInterview(formData);
      setStatus(`Interview created successfully! ID: ${res.data._id}`);
      setFormData({ candidateName: "", role: "", language: "en" });
    } catch (err) {
      setStatus(`Error: ${err.response?.data?.error || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", padding: "20px" }}>
      <h1>AI Interview Assistant</h1>
      
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            name="candidateName"
            value={formData.candidateName}
            onChange={handleChange}
            placeholder="Candidate Name"
            required
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
          />
        </div>
        
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role"
            required
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
          />
        </div>
        
        <div style={{ marginBottom: "15px" }}>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
            backgroundColor: loading ? "#ccc" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}
        >
          {loading ? "Creating..." : "Create Interview"}
        </button>
      </form>
      
      {status && (
        <p style={{
          marginTop: "20px",
          padding: "10px",
          color: status.includes("Error") ? "red" : "green",
          fontWeight: "bold"
        }}>
          {status}
        </p>
      )}
    </div>
  );
}

export default App;
```

---

##### 2. Component Breakdown (Recommended Architecture)

**Suggested File Structure:**
```
src/
├── components/
│   ├── InterviewForm/
│   │   ├── InterviewForm.jsx
│   │   ├── InterviewForm.css
│   │   └── index.js
│   ├── InterviewList/
│   │   ├── InterviewList.jsx
│   │   ├── InterviewList.css
│   │   └── index.js
│   └── InterviewDetails/
│       ├── InterviewDetails.jsx
│       ├── InterviewDetails.css
│       └── index.js
├── hooks/
│   ├── useInterview.js
│   └── useForm.js
├── services/
│   └── api.js
├── utils/
│   ├── validators.js
│   └── formatters.js
└── App.jsx
```

---

### Suggested Components

#### InterviewForm Component

```jsx
// components/InterviewForm/InterviewForm.jsx
import { useState } from 'react';
import './InterviewForm.css';

export const InterviewForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    candidateName: '',
    role: '',
    language: 'en'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="interview-form">
      <div className="form-group">
        <label htmlFor="candidateName">Candidate Name</label>
        <input
          id="candidateName"
          type="text"
          name="candidateName"
          value={formData.candidateName}
          onChange={handleChange}
          placeholder="Enter candidate name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="role">Role</label>
        <input
          id="role"
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Enter job role"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="language">Language</label>
        <select
          id="language"
          name="language"
          value={formData.language}
          onChange={handleChange}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>

      <button type="submit" disabled={loading} className="submit-button">
        {loading ? 'Creating...' : 'Create Interview'}
      </button>
    </form>
  );
};
```

**Props:**
- `onSubmit` (function): Callback for form submission
- `loading` (boolean): Loading state indicator

---

#### InterviewList Component

```jsx
// components/InterviewList/InterviewList.jsx
import { useState, useEffect } from 'react';
import { getInterview } from '../../services/api';
import './InterviewList.css';

export const InterviewList = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      // Note: This would need a "get all" endpoint
      const response = await fetch('http://localhost:5000/api/interviews');
      const data = await response.json();
      setInterviews(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="interview-list">
      <h2>Recent Interviews</h2>
      {interviews.length === 0 ? (
        <p>No interviews found.</p>
      ) : (
        <ul>
          {interviews.map((interview) => (
            <li key={interview._id} className="interview-item">
              <strong>{interview.candidateName}</strong> - {interview.role}
              <span className="date">
                {new Date(interview.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

**Props:** None

**State:**
- `interviews` (array): List of interview objects
- `loading` (boolean): Loading state
- `error` (string|null): Error message

---

#### InterviewDetails Component

```jsx
// components/InterviewDetails/InterviewDetails.jsx
import { useState, useEffect } from 'react';
import { getInterview } from '../../services/api';
import './InterviewDetails.css';

export const InterviewDetails = ({ interviewId }) => {
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (interviewId) {
      fetchInterview();
    }
  }, [interviewId]);

  const fetchInterview = async () => {
    try {
      const response = await getInterview(interviewId);
      setInterview(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!interview) return <div>No interview found</div>;

  return (
    <div className="interview-details">
      <h2>Interview Details</h2>
      <div className="detail-row">
        <label>ID:</label>
        <span>{interview._id}</span>
      </div>
      <div className="detail-row">
        <label>Candidate:</label>
        <span>{interview.candidateName}</span>
      </div>
      <div className="detail-row">
        <label>Role:</label>
        <span>{interview.role}</span>
      </div>
      <div className="detail-row">
        <label>Language:</label>
        <span>{interview.language}</span>
      </div>
      <div className="detail-row">
        <label>Created:</label>
        <span>{new Date(interview.createdAt).toLocaleString()}</span>
      </div>
    </div>
  );
};
```

**Props:**
- `interviewId` (string): MongoDB ObjectId of the interview

**State:**
- `interview` (object|null): Interview data
- `loading` (boolean): Loading state
- `error` (string|null): Error message

---

## Services

### API Service

**File:** `src/Services/api.js`

```javascript
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const createInterview = (data) => API.post("/interviews", data);
export const getInterview = (id) => API.get(`/interviews/${id}`);
```

---

#### API Configuration

##### API Instance

```javascript
const API = axios.create({
  baseURL: "http://localhost:5000/api"
});
```

**Configuration:**
- `baseURL`: Base URL for all API requests
- Default timeout: None (uses axios default)
- Default headers: None

---

#### API Functions

##### createInterview()

```javascript
export const createInterview = (data) => API.post("/interviews", data);
```

**Purpose:** Creates a new interview session.

**Parameters:**
- `data` (Object): Interview data
  - `candidateName` (string): Candidate's name
  - `role` (string): Job position
  - `language` (string): Language code

**Returns:** Promise<AxiosResponse>
- `response.data`: Created interview object
- `response.status`: HTTP status code (201 on success)

**Example:**
```javascript
import { createInterview } from './services/api';

const newInterview = await createInterview({
  candidateName: "John Doe",
  role: "Senior Developer",
  language: "en"
});

console.log(newInterview.data._id);
```

**Error Handling:**
```javascript
try {
  const response = await createInterview(data);
  console.log('Success:', response.data);
} catch (error) {
  if (error.response) {
    // Server responded with error
    console.error('Server error:', error.response.data);
  } else if (error.request) {
    // Request made but no response
    console.error('Network error');
  } else {
    // Other errors
    console.error('Error:', error.message);
  }
}
```

---

##### getInterview()

```javascript
export const getInterview = (id) => API.get(`/interviews/${id}`);
```

**Purpose:** Retrieves a specific interview by ID.

**Parameters:**
- `id` (string): MongoDB ObjectId of the interview

**Returns:** Promise<AxiosResponse>
- `response.data`: Interview object
- `response.status`: HTTP status code (200 on success)

**Example:**
```javascript
import { getInterview } from './services/api';

const interview = await getInterview("507f1f77bcf86cd799439011");
console.log(interview.data);
```

---

#### Enhanced API Service (Suggested)

```javascript
// services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Interview APIs
export const createInterview = (data) => API.post('/interviews', data);
export const getInterview = (id) => API.get(`/interviews/${id}`);
export const updateInterview = (id, data) => API.put(`/interviews/${id}`, data);
export const deleteInterview = (id) => API.delete(`/interviews/${id}`);
export const getAllInterviews = (params) => API.get('/interviews', { params });
export const endInterview = (id, data) => API.patch(`/interviews/${id}/end`, data);

// Statistics APIs
export const getInterviewStats = () => API.get('/interviews/stats/summary');

export default API;
```

---

## Hooks

### Custom Hooks (Suggested)

#### useInterview Hook

```jsx
// hooks/useInterview.js
import { useState, useEffect } from 'react';
import { getInterview } from '../services/api';

export const useInterview = (interviewId) => {
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!interviewId) {
      setLoading(false);
      return;
    }

    const fetchInterview = async () => {
      try {
        setLoading(true);
        const response = await getInterview(interviewId);
        setInterview(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
        setInterview(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [interviewId]);

  return { interview, loading, error };
};

// Usage
import { useInterview } from './hooks/useInterview';

function InterviewComponent({ id }) {
  const { interview, loading, error } = useInterview(id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!interview) return <div>Not found</div>;

  return <div>{interview.candidateName}</div>;
}
```

---

#### useForm Hook

```jsx
// hooks/useForm.js
import { useState } from 'react';

export const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit(values);
      setValues(initialValues); // Reset form
      setErrors({});
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    loading,
    handleChange,
    handleSubmit,
    reset
  };
};

// Usage
import { useForm } from './hooks/useForm';
import { createInterview } from './services/api';

function InterviewForm() {
  const { values, errors, loading, handleChange, handleSubmit } = useForm(
    { candidateName: '', role: '', language: 'en' },
    async (formData) => {
      const response = await createInterview(formData);
      console.log('Created:', response.data);
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="candidateName"
        value={values.candidateName}
        onChange={handleChange}
        placeholder="Candidate Name"
      />
      <input
        name="role"
        value={values.role}
        onChange={handleChange}
        placeholder="Role"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create'}
      </button>
      {errors.submit && <p className="error">{errors.submit}</p>}
    </form>
  );
}
```

---

#### useApi Hook

```jsx
// hooks/useApi.js
import { useState, useCallback } from 'react';

export const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiFunc(...args);
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunc]);

  return { data, loading, error, execute };
};

// Usage
import { useApi } from './hooks/useApi';
import { createInterview } from './services/api';

function CreateInterviewButton() {
  const { loading, error, execute } = useApi(createInterview);

  const handleClick = async () => {
    try {
      await execute({
        candidateName: 'Test',
        role: 'Developer',
        language: 'en'
      });
      alert('Interview created!');
    } catch (err) {
      console.error('Failed to create interview');
    }
  };

  return (
    <div>
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Creating...' : 'Create Interview'}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
```

---

## Utilities

### Suggested Utility Functions

```javascript
// utils/validators.js

export const validateInterviewData = (data) => {
  const errors = {};

  if (!data.candidateName || data.candidateName.trim().length < 2) {
    errors.candidateName = 'Candidate name must be at least 2 characters';
  }

  if (!data.role || data.role.trim().length < 2) {
    errors.role = 'Role must be at least 2 characters';
  }

  if (!data.language || !/^[a-z]{2}$/.test(data.language)) {
    errors.language = 'Invalid language code';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Usage
const { isValid, errors } = validateInterviewData(formData);
if (!isValid) {
  console.error('Validation errors:', errors);
}
```

```javascript
// utils/formatters.js

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatLanguage = (code) => {
  const languages = {
    'en': 'English',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German'
  };
  return languages[code] || code;
};

export const truncate = (str, length = 50) => {
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
};

// Usage
const formatted = formatDate(interview.createdAt);
const language = formatLanguage(interview.language);
```

```javascript
// utils/storage.js

export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error('Error saving to localStorage:', err);
    }
  },

  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (err) {
      console.error('Error reading from localStorage:', err);
      return null;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error('Error removing from localStorage:', err);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (err) {
      console.error('Error clearing localStorage:', err);
    }
  }
};

// Usage
storage.set('lastInterview', interviewData);
const lastInterview = storage.get('lastInterview');
```

---

## Styling

### App.css

Current styles are minimal. Here's an enhanced version:

```css
/* App.css */
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
}

.app-header {
  text-align: center;
  margin-bottom: 40px;
}

.app-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
}

.app-header p {
  color: #666;
  font-size: 1.1rem;
}

.button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #45a049;
}

.button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.status-message {
  margin-top: 20px;
  padding: 15px;
  border-radius: 5px;
  font-weight: 500;
}

.status-message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status-message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: #666;
}

.error {
  color: #d32f2f;
  padding: 10px;
  margin: 10px 0;
  background-color: #ffebee;
  border: 1px solid #ffcdd2;
  border-radius: 4px;
}
```

---

### index.css

Enhanced global styles:

```css
/* index.css */
:root {
  --primary-color: #4CAF50;
  --secondary-color: #2196F3;
  --error-color: #f44336;
  --warning-color: #ff9800;
  --success-color: #4caf50;
  --text-primary: #333333;
  --text-secondary: #666666;
  --background: #ffffff;
  --border-color: #dddddd;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f5f5;
  color: var(--text-primary);
  line-height: 1.6;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

h1, h2, h3, h4, h5, h6 {
  margin-bottom: 1rem;
  font-weight: 600;
}

button {
  font-family: inherit;
}

input, select, textarea {
  font-family: inherit;
  font-size: inherit;
}

a {
  color: var(--primary-color);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
```

---

## State Management

### Context API Example (Suggested)

```jsx
// context/InterviewContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';
import { createInterview, getInterview } from '../services/api';

const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addInterview = useCallback(async (data) => {
    try {
      setLoading(true);
      const response = await createInterview(data);
      setInterviews((prev) => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchInterview = useCallback(async (id) => {
    try {
      setLoading(true);
      const response = await getInterview(id);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    interviews,
    loading,
    error,
    addInterview,
    fetchInterview
  };

  return (
    <InterviewContext.Provider value={value}>
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterviewContext = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error('useInterviewContext must be used within InterviewProvider');
  }
  return context;
};

// Usage in App.jsx
import { InterviewProvider } from './context/InterviewContext';

function App() {
  return (
    <InterviewProvider>
      <YourComponents />
    </InterviewProvider>
  );
}

// Usage in components
import { useInterviewContext } from './context/InterviewContext';

function CreateButton() {
  const { addInterview, loading } = useInterviewContext();

  const handleCreate = async () => {
    await addInterview({ candidateName: 'Test', role: 'Dev', language: 'en' });
  };

  return <button onClick={handleCreate} disabled={loading}>Create</button>;
}
```

---

## Best Practices

### 1. Component Organization

```jsx
// ✅ Good: Organized with clear sections
function InterviewForm() {
  // Props destructuring
  // State declarations
  // Computed values
  // Effects
  // Event handlers
  // Render helpers
  // Main render
}

// ❌ Bad: Mixed organization
function InterviewForm() {
  const [a, setA] = useState();
  function handler() {}
  const [b, setB] = useState();
  useEffect(() => {});
  function anotherHandler() {}
}
```

---

### 2. Error Handling

```jsx
// ✅ Good: Comprehensive error handling
try {
  const response = await createInterview(data);
  handleSuccess(response.data);
} catch (error) {
  if (error.response) {
    // Server error
    handleServerError(error.response.data);
  } else if (error.request) {
    // Network error
    handleNetworkError();
  } else {
    // Other errors
    handleError(error.message);
  }
}

// ❌ Bad: Generic error handling
try {
  await createInterview(data);
} catch (error) {
  console.log('Error');
}
```

---

### 3. Loading States

```jsx
// ✅ Good: Clear loading states
{loading ? (
  <Spinner />
) : data ? (
  <DataDisplay data={data} />
) : error ? (
  <ErrorMessage error={error} />
) : (
  <EmptyState />
)}

// ❌ Bad: No loading states
{data && <DataDisplay data={data} />}
```

---

### 4. Prop Types / TypeScript

```javascript
// Consider migrating to TypeScript
// types/interview.ts
export interface Interview {
  _id: string;
  candidateName: string;
  role: string;
  language: string;
  createdAt: string;
}

export interface InterviewFormData {
  candidateName: string;
  role: string;
  language: string;
}
```

---

### 5. Performance Optimization

```jsx
import { memo, useMemo, useCallback } from 'react';

// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// Memoize components
const MemoizedComponent = memo(MyComponent);
```

---

## Testing

### Component Tests

```jsx
// App.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';
import * as api from './services/api';

vi.mock('./services/api');

describe('App Component', () => {
  it('renders the title', () => {
    render(<App />);
    expect(screen.getByText('AI Interview Assistant')).toBeInTheDocument();
  });

  it('creates interview on button click', async () => {
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

  it('displays error on API failure', async () => {
    api.createInterview.mockRejectedValue(new Error('Network error'));

    render(<App />);
    
    const button = screen.getByText('Create Interview');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Error: Network error/)).toBeInTheDocument();
    });
  });
});
```

---

**Last Updated:** 2025-10-24
