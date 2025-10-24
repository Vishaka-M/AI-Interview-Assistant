# AI Interview Assistant - Component Documentation

## Overview

This document provides detailed documentation for all React components, their props, methods, and usage patterns in the AI Interview Assistant frontend application.

## Table of Contents

1. [App Component](#app-component)
2. [API Service Functions](#api-service-functions)
3. [Styling and CSS](#styling-and-css)
4. [Component Architecture](#component-architecture)
5. [Usage Patterns](#usage-patterns)

---

## App Component

### File Location
`src/App.jsx`

### Component Description
The main application component that serves as the entry point for the AI Interview Assistant user interface. It provides a simple interface for creating interview sessions and displays the status of operations.

### Component Signature
```jsx
function App() {
  // Component implementation
}
```

### State Management

#### State Variables
| Variable | Type | Initial Value | Description |
|----------|------|---------------|-------------|
| `status` | `string` | `""` | Current status message displayed to the user |

#### State Updates
- **setStatus**: Updates the status message to show success or error information

### Methods

#### `handleCreate()`
**Type:** Async Function  
**Purpose:** Creates a new interview session using the API service

**Implementation:**
```javascript
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

**Behavior:**
1. Calls the `createInterview` API function with hardcoded test data
2. On success: Updates status with the created interview ID
3. On error: Updates status with error message

**Test Data Used:**
```javascript
{
  candidateName: "Varun",
  role: "Software Intern",
  language: "en"
}
```

### JSX Structure

#### Component Tree
```jsx
<div style={{ textAlign: "center", marginTop: "100px" }}>
  <h1>AI Interview Assistant</h1>
  <button onClick={handleCreate}>Create Interview</button>
  <p>{status}</p>
</div>
```

#### Element Descriptions
- **Container div**: Centers content with inline styles
- **h1**: Main application title
- **button**: Triggers interview creation on click
- **p**: Displays current status or error messages

### Styling
The component uses inline styles for basic layout:
- `textAlign: "center"`: Centers all content horizontally
- `marginTop: "100px"`: Adds top margin for visual spacing

### Usage Example
```jsx
import App from './App';

// App component is automatically rendered in main.jsx
// No props or configuration needed
```

### Dependencies
- `react`: For useState hook
- `./services/api`: For createInterview function

---

## API Service Functions

### File Location
`src/Services/api.js`

### Service Description
Contains HTTP client functions for communicating with the backend API. Uses Axios for HTTP requests with a configured base URL.

### Configuration
```javascript
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});
```

### Functions

#### `createInterview(data)`
**Type:** Function  
**Purpose:** Creates a new interview session via POST request

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `object` | Yes | Interview data object |

**Data Object Structure:**
```javascript
{
  candidateName: string,  // Required: Name of the candidate
  role: string,          // Required: Position being interviewed for
  language: string       // Required: Language preference
}
```

**Returns:** `Promise<AxiosResponse>`

**HTTP Method:** POST  
**Endpoint:** `/interviews`

**Example Usage:**
```javascript
import { createInterview } from './Services/api';

const interviewData = {
  candidateName: "Alice Johnson",
  role: "Frontend Developer", 
  language: "en"
};

// Using async/await
try {
  const response = await createInterview(interviewData);
  console.log('Interview created:', response.data);
} catch (error) {
  console.error('Error:', error.message);
}

// Using Promises
createInterview(interviewData)
  .then(response => {
    console.log('Success:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
```

**Response Format:**
```javascript
{
  data: {
    _id: "507f1f77bcf86cd799439011",
    candidateName: "Alice Johnson",
    role: "Frontend Developer",
    language: "en",
    createdAt: "2024-01-15T10:30:00.000Z"
  },
  status: 201,
  statusText: "Created"
}
```

#### `getInterview(id)`
**Type:** Function  
**Purpose:** Retrieves an interview by ID via GET request

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | MongoDB ObjectId of the interview |

**Returns:** `Promise<AxiosResponse>`

**HTTP Method:** GET  
**Endpoint:** `/interviews/:id`

**Example Usage:**
```javascript
import { getInterview } from './Services/api';

// Using async/await
try {
  const response = await getInterview('507f1f77bcf86cd799439011');
  console.log('Interview data:', response.data);
} catch (error) {
  console.error('Error:', error.message);
}

// Using Promises
getInterview('507f1f77bcf86cd799439011')
  .then(response => {
    console.log('Interview:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
```

**Response Format:**
```javascript
{
  data: {
    _id: "507f1f77bcf86cd799439011",
    candidateName: "Alice Johnson",
    role: "Frontend Developer", 
    language: "en",
    createdAt: "2024-01-15T10:30:00.000Z"
  },
  status: 200,
  statusText: "OK"
}
```

### Error Handling
Both functions return Axios promises that can be handled with:
- `.then()` and `.catch()` for Promise-based handling
- `try/catch` blocks for async/await syntax

Common error scenarios:
- Network connectivity issues
- Server errors (5xx status codes)
- Client errors (4xx status codes)
- Invalid data format

---

## Styling and CSS

### Global Styles

#### `src/index.css`
Contains global CSS variables and base styles:

**CSS Variables:**
```css
:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
}
```

**Key Features:**
- System font stack for cross-platform consistency
- Dark mode by default with light mode support
- Optimized text rendering
- Responsive design considerations

#### `src/App.css`
Contains component-specific styles:

**Logo Animation:**
```css
@keyframes logo-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

**Component Classes:**
- `.logo`: Styling for logo elements with hover effects
- `.card`: Padding for card-like containers
- `.read-the-docs`: Styling for documentation links

### Styling Approach
- **Global styles**: Defined in `index.css` for consistency
- **Component styles**: Defined in `App.css` for specific elements
- **Inline styles**: Used in App component for simple layout needs

---

## Component Architecture

### File Structure
```
src/
├── App.jsx           # Main application component
├── App.css          # Component-specific styles
├── index.css        # Global styles
├── main.jsx         # Application entry point
└── Services/
    └── api.js       # API service functions
```

### Component Hierarchy
```
main.jsx
└── App (StrictMode)
    ├── h1 (Title)
    ├── button (Create Interview)
    └── p (Status Display)
```

### Data Flow
1. **User Interaction**: User clicks "Create Interview" button
2. **Event Handler**: `handleCreate()` function is triggered
3. **API Call**: `createInterview()` service function is called
4. **State Update**: `setStatus()` updates the UI with result
5. **UI Update**: React re-renders with new status message

### State Management Pattern
- **Local State**: Uses React's `useState` hook for simple state management
- **No Global State**: No Redux, Context, or other global state management
- **Props**: No props passed between components (single component app)

---

## Usage Patterns

### Basic Usage
```jsx
import React from 'react';
import App from './App';

// App component handles all functionality internally
// No additional setup required
```

### Extending the Component
To add new functionality:

1. **Add new state variables:**
   ```jsx
   const [newState, setNewState] = useState(initialValue);
   ```

2. **Add new methods:**
   ```jsx
   const handleNewAction = async () => {
     // Implementation
   };
   ```

3. **Add new UI elements:**
   ```jsx
   <button onClick={handleNewAction}>New Action</button>
   ```

### API Integration Patterns
```jsx
// Pattern for API calls with loading states
const [loading, setLoading] = useState(false);

const handleApiCall = async () => {
  setLoading(true);
  try {
    const result = await apiFunction(data);
    // Handle success
  } catch (error) {
    // Handle error
  } finally {
    setLoading(false);
  }
};
```

### Error Handling Patterns
```jsx
// Pattern for comprehensive error handling
const handleAction = async () => {
  try {
    setStatus("Processing...");
    const result = await apiCall();
    setStatus(`Success: ${result.data.message}`);
  } catch (error) {
    if (error.response) {
      // Server responded with error status
      setStatus(`Error: ${error.response.data.error}`);
    } else if (error.request) {
      // Network error
      setStatus("Error: Network connection failed");
    } else {
      // Other error
      setStatus(`Error: ${error.message}`);
    }
  }
};
```

---

## Development Guidelines

### Code Style
- Use functional components with hooks
- Prefer async/await over Promise chains
- Use descriptive variable and function names
- Include error handling for all async operations

### Performance Considerations
- Component re-renders only when state changes
- No unnecessary re-renders due to proper state management
- API calls are only made on user interaction

### Testing Recommendations
- Test component rendering
- Test user interactions (button clicks)
- Test API integration
- Test error handling scenarios
- Test state updates

### Future Enhancements
- Add loading states for better UX
- Implement form validation
- Add more interactive features
- Implement proper error boundaries
- Add unit and integration tests