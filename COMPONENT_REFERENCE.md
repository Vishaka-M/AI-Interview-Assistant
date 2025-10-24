# Component Reference Guide

## Quick Reference

| Component/Function | Location | Type | Status |
|-------------------|----------|------|---------|
| `App` | `/frontend-react/src/App.jsx` | React Component | ✅ Complete |
| `createInterview` | `/frontend-react/src/Services/api.js` | API Function | ✅ Complete |
| `getInterview` | `/frontend-react/src/Services/api.js` | API Function | ✅ Complete |
| `createInterview` | `/backend/controllers/interviewController.js` | Controller | ✅ Complete |
| `getInterview` | `/backend/controllers/interviewController.js` | Controller | ✅ Complete |
| `endInterview` | `/backend/controllers/interviewController.js` | Controller | ❌ Missing |
| `Interview` | `/backend/models/interview.js` | Mongoose Model | ✅ Complete |

---

## Frontend Components

### App Component

**File:** `/frontend-react/src/App.jsx`  
**Type:** React Functional Component  
**Purpose:** Main application interface for interview creation

#### API
```jsx
function App()
```

#### State
- `status: string` - Current operation status message

#### Methods
- `handleCreate(): Promise<void>` - Creates interview with hardcoded data

#### Props
None

#### Usage
```jsx
import App from './App.jsx';

// Render main application
<App />
```

#### Example Integration
```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(<App />);
```

---

## API Service Functions

### createInterview

**File:** `/frontend-react/src/Services/api.js`  
**Type:** Async Function  
**Purpose:** Creates new interview via HTTP POST

#### API
```javascript
createInterview(data: Object): Promise<AxiosResponse>
```

#### Parameters
- `data` (Object): Interview data
  - `candidateName` (string, required): Candidate's full name
  - `role` (string, required): Position being interviewed for
  - `language` (string, required): Interview language preference

#### Returns
Promise resolving to Axios response object with created interview data

#### Usage
```javascript
import { createInterview } from './Services/api';

const interview = await createInterview({
  candidateName: "John Doe",
  role: "Software Engineer",
  language: "en"
});

console.log('Created:', interview.data);
```

#### Error Handling
```javascript
try {
  const result = await createInterview(data);
} catch (error) {
  if (error.response?.status === 400) {
    // Bad request - validation error
  } else if (error.response?.status === 500) {
    // Server error
  } else {
    // Network or other error
  }
}
```

---

### getInterview

**File:** `/frontend-react/src/Services/api.js`  
**Type:** Async Function  
**Purpose:** Retrieves interview by ID via HTTP GET

#### API
```javascript
getInterview(id: string): Promise<AxiosResponse>
```

#### Parameters
- `id` (string, required): MongoDB ObjectId of the interview

#### Returns
Promise resolving to Axios response object with interview data

#### Usage
```javascript
import { getInterview } from './Services/api';

const interview = await getInterview('507f1f77bcf86cd799439011');
console.log('Interview:', interview.data);
```

#### Error Handling
```javascript
try {
  const result = await getInterview(id);
} catch (error) {
  if (error.response?.status === 404) {
    console.log('Interview not found');
  } else {
    console.log('Fetch failed:', error.message);
  }
}
```

---

## Backend Controllers

### createInterview (Controller)

**File:** `/backend/controllers/interviewController.js`  
**Type:** Express Controller Function  
**Purpose:** Handles interview creation requests

#### API
```javascript
createInterview(req: Request, res: Response): Promise<void>
```

#### Parameters
- `req.body`: Interview data object
- `res`: Express response object

#### Request Body Schema
```json
{
  "candidateName": "string (required)",
  "role": "string (required)",
  "language": "string (required)"
}
```

#### Response Codes
- `201`: Interview created successfully
- `500`: Server error during creation

#### Usage
```javascript
// Route definition
router.post("/", createInterview);

// Manual usage (not typical)
import { createInterview } from './controllers/interviewController.js';
app.post('/interviews', createInterview);
```

#### Implementation Details
- Creates new Interview model instance
- Saves to MongoDB via Mongoose
- Returns created interview with generated `_id` and `createdAt`
- Handles database errors with 500 status

---

### getInterview (Controller)

**File:** `/backend/controllers/interviewController.js`  
**Type:** Express Controller Function  
**Purpose:** Handles interview retrieval requests

#### API
```javascript
getInterview(req: Request, res: Response): Promise<void>
```

#### Parameters
- `req.params.id`: Interview ID from URL parameter
- `res`: Express response object

#### Response Codes
- `200`: Interview found and returned
- `404`: Interview not found
- `500`: Server error during retrieval

#### Usage
```javascript
// Route definition
router.get("/:id", getInterview);

// Manual usage (not typical)
import { getInterview } from './controllers/interviewController.js';
app.get('/interviews/:id', getInterview);
```

#### Implementation Details
- Uses `Interview.findById()` to query MongoDB
- Returns 404 if interview doesn't exist
- Returns full interview object if found
- Handles database errors with 500 status

---

## Data Models

### Interview Model

**File:** `/backend/models/interview.js`  
**Type:** Mongoose Schema/Model  
**Purpose:** Defines interview data structure and validation

#### API
```javascript
const Interview = mongoose.model("Interview", interviewSchema)
```

#### Schema Definition
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

#### Methods

##### Static Methods (Model Level)
- `Interview.findById(id)` - Find interview by MongoDB ObjectId
- `Interview.create(data)` - Create new interview
- `Interview.find(query)` - Find interviews matching query
- `Interview.findOne(query)` - Find single interview matching query

##### Instance Methods
- `interview.save()` - Save interview to database
- `interview.toJSON()` - Convert to JSON object
- `interview.toObject()` - Convert to plain JavaScript object

#### Usage Examples

##### Creating an Interview
```javascript
import Interview from './models/interview.js';

// Method 1: Using constructor + save
const interview = new Interview({
  candidateName: "Jane Smith",
  role: "Data Scientist", 
  language: "en"
});
const saved = await interview.save();

// Method 2: Using create
const interview = await Interview.create({
  candidateName: "Jane Smith",
  role: "Data Scientist",
  language: "en"
});
```

##### Finding Interviews
```javascript
// Find by ID
const interview = await Interview.findById('507f1f77bcf86cd799439011');

// Find by criteria
const interviews = await Interview.find({ role: "Software Engineer" });

// Find one by criteria
const interview = await Interview.findOne({ candidateName: "John Doe" });
```

##### Validation
```javascript
// This will throw validation error
try {
  const interview = new Interview({
    candidateName: "John Doe"
    // Missing required fields: role, language
  });
  await interview.save();
} catch (error) {
  console.log('Validation failed:', error.message);
}
```

---

## Route Definitions

### Interview Routes

**File:** `/backend/routes/interviewRoutes.js`  
**Type:** Express Router  
**Purpose:** Defines HTTP routes for interview operations

#### Routes

| Method | Path | Controller | Description | Status |
|--------|------|------------|-------------|---------|
| POST | `/` | `createInterview` | Create new interview | ✅ Working |
| GET | `/:id` | `getInterview` | Get interview by ID | ✅ Working |
| PATCH | `/:id/end` | `endInterview` | End interview session | ❌ Missing Controller |

#### Usage
```javascript
import interviewRoutes from './routes/interviewRoutes.js';

// Mount routes with prefix
app.use('/api/interviews', interviewRoutes);

// Results in:
// POST /api/interviews
// GET /api/interviews/:id  
// PATCH /api/interviews/:id/end
```

#### Route Parameters
- `:id` - MongoDB ObjectId of the interview (24-character hex string)

#### Example Requests
```bash
# Create interview
POST /api/interviews
Content-Type: application/json
{
  "candidateName": "Alice Johnson",
  "role": "Frontend Developer",
  "language": "en"
}

# Get interview
GET /api/interviews/507f1f77bcf86cd799439011

# End interview (not implemented)
PATCH /api/interviews/507f1f77bcf86cd799439011/end
```

---

## Missing Implementations

### endInterview Controller

**Expected File:** `/backend/controllers/interviewController.js`  
**Status:** ❌ Not Implemented  
**Route:** `PATCH /api/interviews/:id/end`

#### Expected API
```javascript
endInterview(req: Request, res: Response): Promise<void>
```

#### Suggested Implementation
```javascript
// Add to interviewController.js
export const endInterview = async (req, res) => {
  try {
    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      { 
        endedAt: new Date(),
        status: 'completed'
      },
      { new: true }
    );
    
    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }
    
    res.json(interview);
  } catch (err) {
    console.error('End interview error:', err);
    res.status(500).json({ error: "Failed to end interview" });
  }
};
```

#### Required Schema Updates
```javascript
// Add to interview schema
const interviewSchema = new mongoose.Schema({
  // ... existing fields ...
  endedAt: { type: Date },
  status: { 
    type: String, 
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  }
});
```

---

## Integration Examples

### Full Stack Integration

#### Creating and Retrieving an Interview
```javascript
// Frontend component
import React, { useState } from 'react';
import { createInterview, getInterview } from './Services/api';

function InterviewFlow() {
  const [interviewId, setInterviewId] = useState(null);
  const [interviewData, setInterviewData] = useState(null);

  const createNewInterview = async () => {
    try {
      // Step 1: Create interview
      const createResponse = await createInterview({
        candidateName: "Sarah Wilson",
        role: "Product Manager",
        language: "en"
      });
      
      const newInterviewId = createResponse.data._id;
      setInterviewId(newInterviewId);
      
      // Step 2: Immediately fetch the created interview
      const getResponse = await getInterview(newInterviewId);
      setInterviewData(getResponse.data);
      
      console.log('Interview flow completed:', getResponse.data);
    } catch (error) {
      console.error('Interview flow failed:', error);
    }
  };

  return (
    <div>
      <button onClick={createNewInterview}>
        Start Interview Flow
      </button>
      
      {interviewData && (
        <div>
          <h3>Interview Created Successfully</h3>
          <p>ID: {interviewData._id}</p>
          <p>Candidate: {interviewData.candidateName}</p>
          <p>Role: {interviewData.role}</p>
          <p>Created: {new Date(interviewData.createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
```

#### Error Handling Across Stack
```javascript
// Comprehensive error handling
const handleInterviewOperation = async (operation, ...args) => {
  try {
    const result = await operation(...args);
    return { success: true, data: result.data };
  } catch (error) {
    // Frontend API errors
    if (error.response) {
      const { status, data } = error.response;
      return {
        success: false,
        error: {
          type: 'api_error',
          status,
          message: data.error || 'Unknown API error'
        }
      };
    }
    
    // Network errors
    if (error.request) {
      return {
        success: false,
        error: {
          type: 'network_error',
          message: 'Unable to connect to server'
        }
      };
    }
    
    // Other errors
    return {
      success: false,
      error: {
        type: 'unknown_error',
        message: error.message
      }
    };
  }
};

// Usage
const result = await handleInterviewOperation(createInterview, interviewData);
if (result.success) {
  console.log('Success:', result.data);
} else {
  console.error('Error:', result.error);
}
```

This component reference provides comprehensive documentation for all public APIs, functions, and components in the AI Interview Assistant application.