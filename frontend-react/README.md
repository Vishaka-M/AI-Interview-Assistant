# Frontend Documentation - React Application

## Overview
React-based frontend for the AI Interview Assistant application built with Vite.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Project Structure

```
frontend-react/
├── src/
│   ├── Services/
│   │   └── api.js           # API client functions
│   ├── assets/
│   │   └── react.svg        # Static assets
│   ├── App.jsx              # Main application component
│   ├── App.css              # Application styles
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
├── public/
│   └── vite.svg             # Public assets
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
└── eslint.config.js         # ESLint configuration
```

## Components Documentation

### App Component (`src/App.jsx`)

The main application component that provides the user interface for creating interviews.

#### Props
None

#### State
- `status` (string): Current operation status message

#### Methods

##### `handleCreate()`
Handles the interview creation process when the "Create Interview" button is clicked.

**Behavior:**
- Calls `createInterview` API function with hardcoded test data
- Updates `status` state with success message (interview ID) or error message
- Uses async/await for API call handling

**Example Usage:**
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

#### JSX Structure
```jsx
<div style={{ textAlign: "center", marginTop: "100px" }}>
  <h1>AI Interview Assistant</h1>
  <button onClick={handleCreate}>Create Interview</button>
  <p>{status}</p>
</div>
```

#### Styling
Uses inline styles for:
- Center alignment (`textAlign: "center"`)
- Top margin (`marginTop: "100px"`)

### Main Entry Point (`src/main.jsx`)

Application bootstrap file that renders the App component.

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**Features:**
- Uses React 19's `createRoot` API
- Wraps app in `StrictMode` for development checks
- Imports global styles

## API Service Documentation

### API Client (`src/Services/api.js`)

Axios-based HTTP client for communicating with the backend API.

#### Configuration
```javascript
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});
```

#### Functions

##### `createInterview(data)`
Creates a new interview via POST request.

**Parameters:**
- `data` (object): Interview data object

**Returns:** 
- Promise resolving to Axios response object

**Usage Example:**
```javascript
import { createInterview } from './Services/api';

const interviewData = {
  candidateName: "Jane Doe",
  role: "Full Stack Developer",
  language: "en"
};

try {
  const response = await createInterview(interviewData);
  console.log('Interview created:', response.data);
  // response.data contains the created interview object
} catch (error) {
  console.error('Creation failed:', error);
}
```

##### `getInterview(id)`
Retrieves an interview by ID via GET request.

**Parameters:**
- `id` (string): Interview ID (MongoDB ObjectId)

**Returns:**
- Promise resolving to Axios response object

**Usage Example:**
```javascript
import { getInterview } from './Services/api';

try {
  const response = await getInterview('507f1f77bcf86cd799439011');
  console.log('Interview data:', response.data);
  // response.data contains the interview object
} catch (error) {
  if (error.response?.status === 404) {
    console.error('Interview not found');
  } else {
    console.error('Fetch failed:', error);
  }
}
```

## Dependencies

### Production Dependencies
- **react** (^19.1.1): Core React library
- **react-dom** (^19.1.1): React DOM rendering
- **axios** (^1.12.2): HTTP client for API requests

### Development Dependencies
- **@vitejs/plugin-react** (^5.0.4): Vite React plugin
- **vite** (^7.1.7): Build tool and dev server
- **eslint** (^9.36.0): JavaScript linter
- **@eslint/js** (^9.36.0): ESLint JavaScript rules
- **eslint-plugin-react-hooks** (^5.2.0): React Hooks linting rules
- **eslint-plugin-react-refresh** (^0.4.22): React Refresh linting rules
- **@types/react** (^19.1.16): TypeScript types for React
- **@types/react-dom** (^19.1.9): TypeScript types for React DOM
- **globals** (^16.4.0): Global variables for ESLint

## Usage Examples

### Complete Interview Management Component

Here's an enhanced version of how you might extend the current App component:

```jsx
import React, { useState, useEffect } from 'react';
import { createInterview, getInterview } from './Services/api';

function InterviewManager() {
  const [interviews, setInterviews] = useState([]);
  const [currentInterview, setCurrentInterview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    candidateName: '',
    role: '',
    language: 'en'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateInterview = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await createInterview(formData);
      const newInterview = response.data;
      
      setInterviews(prev => [...prev, newInterview]);
      setCurrentInterview(newInterview);
      
      // Reset form
      setFormData({
        candidateName: '',
        role: '',
        language: 'en'
      });
      
      console.log('Interview created successfully:', newInterview);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create interview');
      console.error('Interview creation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetInterview = async (id) => {
    setLoading(true);
    setError('');

    try {
      const response = await getInterview(id);
      setCurrentInterview(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch interview');
      console.error('Interview fetch failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>AI Interview Assistant</h1>
      
      {/* Interview Creation Form */}
      <form onSubmit={handleCreateInterview} style={{ marginBottom: '30px' }}>
        <h2>Create New Interview</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <label>
            Candidate Name:
            <input
              type="text"
              name="candidateName"
              value={formData.candidateName}
              onChange={handleInputChange}
              required
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </label>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label>
            Role:
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </label>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label>
            Language:
            <select
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              style={{ marginLeft: '10px', padding: '5px' }}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </label>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Creating...' : 'Create Interview'}
        </button>
      </form>

      {/* Error Display */}
      {error && (
        <div style={{ 
          color: 'red', 
          backgroundColor: '#ffebee', 
          padding: '10px', 
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          Error: {error}
        </div>
      )}

      {/* Current Interview Display */}
      {currentInterview && (
        <div style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '20px', 
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          <h3>Current Interview</h3>
          <p><strong>ID:</strong> {currentInterview._id}</p>
          <p><strong>Candidate:</strong> {currentInterview.candidateName}</p>
          <p><strong>Role:</strong> {currentInterview.role}</p>
          <p><strong>Language:</strong> {currentInterview.language}</p>
          <p><strong>Created:</strong> {new Date(currentInterview.createdAt).toLocaleString()}</p>
        </div>
      )}

      {/* Interview List */}
      {interviews.length > 0 && (
        <div>
          <h3>All Interviews</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {interviews.map(interview => (
              <li 
                key={interview._id}
                style={{ 
                  backgroundColor: '#f9f9f9', 
                  margin: '10px 0', 
                  padding: '15px', 
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
                onClick={() => handleGetInterview(interview._id)}
              >
                <strong>{interview.candidateName}</strong> - {interview.role}
                <br />
                <small>Created: {new Date(interview.createdAt).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default InterviewManager;
```

### Error Handling Patterns

#### API Error Handling
```javascript
const handleApiCall = async () => {
  try {
    const response = await createInterview(data);
    // Handle success
    return response.data;
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status (4xx, 5xx)
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          throw new Error(`Bad Request: ${data.error}`);
        case 404:
          throw new Error('Interview not found');
        case 500:
          throw new Error('Server error occurred');
        default:
          throw new Error(`HTTP ${status}: ${data.error || 'Unknown error'}`);
      }
    } else if (error.request) {
      // Network error - no response received
      throw new Error('Network error - please check your connection');
    } else {
      // Other error (e.g., request setup)
      throw new Error(`Request error: ${error.message}`);
    }
  }
};
```

#### Component Error Boundaries
```jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <InterviewManager />
    </ErrorBoundary>
  );
}
```

## Development

### Development Server
```bash
npm run dev
```
- Runs on `http://localhost:5173`
- Hot module replacement enabled
- Automatic browser refresh on file changes

### Building for Production
```bash
npm run build
```
- Creates optimized production build in `dist/` directory
- Minifies and bundles all assets
- Generates source maps

### Linting
```bash
npm run lint
```
- Runs ESLint with React-specific rules
- Checks for code quality and consistency
- Enforces React Hooks rules

## Configuration

### Vite Configuration (`vite.config.js`)
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### ESLint Configuration (`eslint.config.js`)
Configured with:
- React plugin
- React Hooks plugin  
- React Refresh plugin
- Modern JavaScript globals

## Deployment

### Production Build
1. Run `npm run build`
2. Deploy the `dist/` directory to your web server
3. Configure server to serve `index.html` for all routes (SPA routing)

### Environment Variables
For different environments, you can use:
- `.env.local` - Local development overrides
- `.env.production` - Production environment variables
- `.env.development` - Development environment variables

Example `.env.local`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=AI Interview Assistant
```

Access in code:
```javascript
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
```

## Testing

Currently no tests are implemented. Consider adding:
- Unit tests with Vitest
- Component tests with React Testing Library
- End-to-end tests with Playwright or Cypress

Example test setup:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

## Performance Considerations

1. **Code Splitting**: Consider implementing route-based code splitting
2. **Lazy Loading**: Use React.lazy() for component lazy loading
3. **Memoization**: Use React.memo() for expensive components
4. **Bundle Analysis**: Use `npm run build -- --analyze` to analyze bundle size