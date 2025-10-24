# AI Interview Assistant - Component Documentation

## Overview

The frontend is built with React 19.1.1 and Vite, providing a modern, fast development experience. The application consists of a single-page interface for creating and managing AI-powered interviews.

## Project Structure

```
frontend-react/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx              # Main application component
│   ├── App.css              # Application styles
│   ├── main.jsx             # Application entry point
│   ├── index.css            # Global styles
│   └── Services/
│       └── api.js           # API service functions
├── package.json
├── vite.config.js
└── eslint.config.js
```

## Components

### 1. App Component

**File:** `src/App.jsx`

The main application component that handles interview creation and displays the user interface.

#### Props
None (root component)

#### State
- `status` (string): Current status message displayed to the user

#### Methods

##### `handleCreate()`
Creates a new interview by calling the API service.

**Parameters:** None

**Returns:** Promise<void>

**Behavior:**
- Calls `createInterview` API function with hardcoded data
- Updates status with success message containing the interview ID
- Handles errors and displays error message

**Example:**
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

#### Usage Example
```jsx
import App from './App';

// The App component is the root component and doesn't require any props
<App />
```

---

### 2. Main Entry Point

**File:** `src/main.jsx`

The application entry point that renders the App component to the DOM.

#### Code
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

#### Features
- Uses React 18+ `createRoot` API
- Wraps App in `StrictMode` for development checks
- Imports global styles

---

## Services

### API Service

**File:** `src/Services/api.js`

Centralized API service for making HTTP requests to the backend.

#### Configuration
```javascript
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});
```

#### Functions

##### `createInterview(data)`
Creates a new interview session.

**Parameters:**
- `data` (Object): Interview data object
  - `candidateName` (string): Name of the candidate
  - `role` (string): Position being interviewed for
  - `language` (string): Interview language

**Returns:** Promise<AxiosResponse>

**Example:**
```javascript
import { createInterview } from './Services/api';

const interviewData = {
  candidateName: "John Doe",
  role: "Software Engineer",
  language: "en"
};

try {
  const response = await createInterview(interviewData);
  console.log('Interview created:', response.data);
} catch (error) {
  console.error('Error:', error.message);
}
```

##### `getInterview(id)`
Retrieves an interview by ID.

**Parameters:**
- `id` (string): Unique identifier of the interview

**Returns:** Promise<AxiosResponse>

**Example:**
```javascript
import { getInterview } from './Services/api';

try {
  const response = await getInterview('65f1234567890abcdef12345');
  console.log('Interview:', response.data);
} catch (error) {
  console.error('Error:', error.message);
}
```

---

## Styling

### Global Styles

**File:** `src/index.css`

Contains global CSS styles including:
- CSS custom properties for theming
- Base typography and layout styles
- Button styling
- Dark/light mode support
- Responsive design considerations

#### Key Features
- System font stack
- Dark mode by default with light mode support
- Responsive button styling
- Smooth transitions and hover effects

### Component Styles

**File:** `src/App.css`

Contains component-specific styles:
- Root container styling
- Logo animations
- Card layouts
- Responsive design utilities

#### Key Features
- Centered layout with max-width constraint
- Logo hover effects with drop shadows
- CSS animations for logo spinning
- Card padding and layout utilities

---

## Dependencies

### Production Dependencies
- `react` (^19.1.1): Core React library
- `react-dom` (^19.1.1): React DOM rendering
- `axios` (^1.12.2): HTTP client for API requests

### Development Dependencies
- `@vitejs/plugin-react` (^5.0.4): Vite React plugin
- `vite` (^7.1.7): Build tool and dev server
- `eslint` (^9.36.0): Code linting
- `@eslint/js` (^9.36.0): ESLint JavaScript configuration
- `eslint-plugin-react-hooks` (^5.2.0): React Hooks linting rules
- `eslint-plugin-react-refresh` (^0.4.22): React Refresh linting
- `globals` (^16.4.0): Global variables for ESLint

---

## Development Scripts

### Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Development Server
- **URL:** `http://localhost:5173` (default Vite port)
- **Hot Module Replacement:** Enabled
- **Auto-reload:** Enabled for file changes

---

## Usage Examples

### Basic Usage
```jsx
import React from 'react';
import App from './App';

// App component handles all functionality internally
function Root() {
  return <App />;
}
```

### Custom API Integration
```jsx
import { createInterview, getInterview } from './Services/api';

function CustomInterviewComponent() {
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreateInterview = async (data) => {
    setLoading(true);
    try {
      const response = await createInterview(data);
      setInterview(response.data);
    } catch (error) {
      console.error('Failed to create interview:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button 
        onClick={() => handleCreateInterview({
          candidateName: "Jane Doe",
          role: "Frontend Developer",
          language: "en"
        })}
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Interview'}
      </button>
      {interview && (
        <div>
          <h3>Interview Created!</h3>
          <p>ID: {interview._id}</p>
          <p>Candidate: {interview.candidateName}</p>
        </div>
      )}
    </div>
  );
}
```

### Error Handling
```jsx
import { createInterview } from './Services/api';

function InterviewForm() {
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      setError(null);
      await createInterview(formData);
      // Handle success
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {/* Form content */}
    </div>
  );
}
```

---

## Configuration

### Vite Configuration
The project uses Vite with the React plugin. Configuration is in `vite.config.js`.

### ESLint Configuration
ESLint is configured with React-specific rules in `eslint.config.js`.

### Environment Variables
- No environment variables are currently required for the frontend
- API base URL is hardcoded to `http://localhost:5000/api`

---

## Browser Support

The application supports modern browsers that support:
- ES6+ features
- React 19
- CSS Grid and Flexbox
- CSS Custom Properties

---

## Performance Considerations

1. **Bundle Size**: Uses Vite for optimal bundling and tree-shaking
2. **Code Splitting**: Can be implemented for larger applications
3. **Lazy Loading**: Components can be lazy-loaded as needed
4. **Memoization**: Consider using `React.memo` for expensive components

---

## Future Enhancements

1. **State Management**: Add Redux or Zustand for complex state
2. **Routing**: Implement React Router for multiple pages
3. **Form Validation**: Add form validation library
4. **UI Components**: Create reusable component library
5. **Testing**: Add unit and integration tests
6. **Error Boundaries**: Implement error boundaries for better error handling
7. **Loading States**: Add loading indicators and skeleton screens
8. **Responsive Design**: Enhance mobile responsiveness