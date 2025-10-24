# Backend Functions Documentation

Complete reference for all backend functions, controllers, models, and utilities.

---

## Table of Contents

1. [Controllers](#controllers)
2. [Models](#models)
3. [Routes](#routes)
4. [Server Configuration](#server-configuration)
5. [Middleware](#middleware)
6. [Utilities](#utilities)
7. [Database Operations](#database-operations)

---

## Controllers

### interviewController.js

Location: `backend/controllers/interviewController.js`

---

#### createInterview

```javascript
export const createInterview = async (req, res) => {
  try {
    const interview = new Interview(req.body);
    const saved = await interview.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create interview" });
  }
};
```

**Purpose:** Creates a new interview record in the MongoDB database.

**Parameters:**
- `req` (Object): Express request object
  - `req.body` (Object): Interview data
    - `candidateName` (string, required): Candidate's name
    - `role` (string, required): Job position
    - `language` (string, required): Language code

- `res` (Object): Express response object

**Returns:**
- **Success (201):** Created interview document with MongoDB `_id`
- **Error (500):** Error object with descriptive message

**Side Effects:**
- Saves a new document to the `interviews` collection
- Logs errors to console

**Usage Example:**
```javascript
// In route handler
router.post('/interviews', createInterview);

// Direct usage in tests
const mockReq = {
  body: {
    candidateName: "John Doe",
    role: "Developer",
    language: "en"
  }
};
const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
};

await createInterview(mockReq, mockRes);
```

**Error Scenarios:**
1. **Missing Required Fields:**
   - Mongoose validation error
   - Returns 500 with error message

2. **Database Connection Error:**
   - MongoDB connection lost
   - Returns 500 with error message

3. **Invalid Data Types:**
   - Mongoose casting error
   - Returns 500 with error message

**Best Practices:**
- Always validate input before calling
- Use middleware for input sanitization
- Implement request body validation (e.g., with `joi`)

**Future Improvements:**
- Add detailed error messages per field
- Return 400 for validation errors instead of 500
- Add data sanitization
- Implement field-level validation

---

#### getInterview

```javascript
export const getInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) return res.status(404).json({ error: "Not found" });
    res.json(interview);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch interview" });
  }
};
```

**Purpose:** Retrieves a specific interview document by its MongoDB ObjectId.

**Parameters:**
- `req` (Object): Express request object
  - `req.params.id` (string): MongoDB ObjectId

- `res` (Object): Express response object

**Returns:**
- **Success (200):** Interview document
- **Not Found (404):** Error object indicating resource not found
- **Error (500):** Error object with descriptive message

**Side Effects:**
- None (read-only operation)

**Usage Example:**
```javascript
// In route handler
router.get('/interviews/:id', getInterview);

// Direct usage
const mockReq = {
  params: { id: "507f1f77bcf86cd799439011" }
};
const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
};

await getInterview(mockReq, mockRes);
```

**Error Scenarios:**
1. **Invalid ObjectId Format:**
   - Mongoose CastError
   - Returns 500 with error message
   - Should be handled separately with 400 status

2. **Document Not Found:**
   - Returns 404 with "Not found" message

3. **Database Connection Error:**
   - Returns 500 with error message

**Best Practices:**
- Validate ObjectId format before querying
- Use mongoose.Types.ObjectId.isValid() for validation
- Cache frequently accessed interviews

**Future Improvements:**
- Return 400 for invalid ObjectId format
- Add detailed error messages
- Implement caching layer
- Add query projections to limit returned fields

---

#### endInterview (Pending Implementation)

**Status:** Route defined but controller not implemented

**Expected Signature:**
```javascript
export const endInterview = async (req, res) => {
  // Implementation needed
};
```

**Purpose:** Marks an interview as ended and possibly saves additional data (feedback, scores, etc.)

**Suggested Implementation:**
```javascript
export const endInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    
    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }
    
    // Add endedAt timestamp and any additional data from request body
    interview.endedAt = new Date();
    if (req.body.feedback) interview.feedback = req.body.feedback;
    if (req.body.score) interview.score = req.body.score;
    
    const updated = await interview.save();
    res.json(updated);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to end interview" });
  }
};
```

**Required Schema Updates:**
```javascript
// Add to interview schema
{
  endedAt: { type: Date },
  feedback: { type: String },
  score: { type: Number }
}
```

---

## Models

### Interview Model

Location: `backend/models/interview.js`

```javascript
import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  candidateName: { type: String, required: true },
  role: { type: String, required: true },
  language: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Interview", interviewSchema);
```

---

#### Schema Definition

**Model Name:** `Interview`
**Collection Name:** `interviews` (automatically pluralized by Mongoose)

**Schema Structure:**

| Field | Type | Required | Default | Validation | Description |
|-------|------|----------|---------|------------|-------------|
| candidateName | String | Yes | - | - | Full name of the candidate |
| role | String | Yes | - | - | Job position/role title |
| language | String | Yes | - | - | Language code (ISO 639-1) |
| createdAt | Date | No | Date.now | - | Timestamp of creation |

---

#### Instance Methods

**Default Mongoose Methods:**

##### save()
```javascript
const interview = new Interview({ 
  candidateName: "Jane Doe",
  role: "Developer",
  language: "en"
});
await interview.save();
```

##### remove() / deleteOne()
```javascript
await interview.deleteOne();
```

##### validate()
```javascript
await interview.validate(); // Throws ValidationError if invalid
```

---

#### Static Methods

**Default Mongoose Statics:**

##### findById(id)
```javascript
const interview = await Interview.findById("507f1f77bcf86cd799439011");
```

##### find(query)
```javascript
// Find all interviews for a role
const interviews = await Interview.find({ role: "Developer" });

// Find with date filter
const recentInterviews = await Interview.find({
  createdAt: { $gte: new Date('2025-01-01') }
});
```

##### findOne(query)
```javascript
const interview = await Interview.findOne({ 
  candidateName: "John Doe",
  role: "Developer"
});
```

##### create(data)
```javascript
const interview = await Interview.create({
  candidateName: "Alice Smith",
  role: "Designer",
  language: "en"
});
```

##### findByIdAndUpdate(id, update, options)
```javascript
const updated = await Interview.findByIdAndUpdate(
  "507f1f77bcf86cd799439011",
  { role: "Senior Developer" },
  { new: true } // Return updated document
);
```

##### findByIdAndDelete(id)
```javascript
const deleted = await Interview.findByIdAndDelete("507f1f77bcf86cd799439011");
```

##### countDocuments(query)
```javascript
const count = await Interview.countDocuments({ language: "en" });
```

---

#### Custom Statics (Suggested Additions)

```javascript
// Add to schema
interviewSchema.statics.findByRole = function(role) {
  return this.find({ role }).sort({ createdAt: -1 });
};

interviewSchema.statics.findRecent = function(days = 7) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return this.find({ createdAt: { $gte: date } });
};

// Usage
const devInterviews = await Interview.findByRole("Developer");
const recentInterviews = await Interview.findRecent(30);
```

---

#### Custom Instance Methods (Suggested Additions)

```javascript
// Add to schema
interviewSchema.methods.getDetails = function() {
  return {
    candidate: this.candidateName,
    position: this.role,
    date: this.createdAt.toLocaleDateString()
  };
};

interviewSchema.methods.isRecent = function(days = 7) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return this.createdAt >= date;
};

// Usage
const details = interview.getDetails();
const recent = interview.isRecent(30);
```

---

#### Virtuals (Suggested Additions)

```javascript
// Add to schema
interviewSchema.virtual('displayName').get(function() {
  return `${this.candidateName} - ${this.role}`;
});

interviewSchema.virtual('age').get(function() {
  const now = new Date();
  const diff = now - this.createdAt;
  return Math.floor(diff / (1000 * 60 * 60 * 24)); // days
});

// Usage (need to set virtuals in toJSON)
interviewSchema.set('toJSON', { virtuals: true });
console.log(interview.displayName);
console.log(interview.age);
```

---

#### Pre/Post Hooks

**Suggested Middleware:**

```javascript
// Pre-save hook
interviewSchema.pre('save', function(next) {
  // Capitalize candidate name
  this.candidateName = this.candidateName.trim();
  next();
});

// Post-save hook
interviewSchema.post('save', function(doc) {
  console.log(`Interview created for ${doc.candidateName}`);
});

// Pre-remove hook
interviewSchema.pre('remove', function(next) {
  console.log(`Removing interview: ${this._id}`);
  next();
});
```

---

#### Indexes (Suggested)

```javascript
// Add indexes for better query performance
interviewSchema.index({ role: 1 });
interviewSchema.index({ createdAt: -1 });
interviewSchema.index({ candidateName: 1, role: 1 });
interviewSchema.index({ language: 1 });
```

---

## Routes

### interviewRoutes.js

Location: `backend/routes/interviewRoutes.js`

```javascript
import express from "express";
import {
  createInterview,
  getInterview,
  endInterview
} from "../controllers/interviewController.js";

const router = express.Router();

router.post("/", createInterview);
router.get("/:id", getInterview);
router.patch("/:id/end", endInterview);

export default router;
```

---

#### Route Definitions

##### POST /
**Handler:** `createInterview`
**Purpose:** Create new interview
**Request Body:** Interview data
**Response:** Created interview with `_id`

##### GET /:id
**Handler:** `getInterview`
**Purpose:** Retrieve interview by ID
**URL Params:** `id` - MongoDB ObjectId
**Response:** Interview document

##### PATCH /:id/end
**Handler:** `endInterview` (not yet implemented)
**Purpose:** Mark interview as ended
**URL Params:** `id` - MongoDB ObjectId
**Response:** Updated interview document

---

#### Suggested Additional Routes

```javascript
// Get all interviews
router.get("/", getAllInterviews);

// Update interview
router.put("/:id", updateInterview);

// Delete interview
router.delete("/:id", deleteInterview);

// Get interviews by role
router.get("/role/:role", getInterviewsByRole);

// Get interview statistics
router.get("/stats/summary", getInterviewStats);
```

**Corresponding Controller Implementations:**

```javascript
// Get all interviews with pagination
export const getAllInterviews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const interviews = await Interview.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
      
    const total = await Interview.countDocuments();
    
    res.json({
      interviews,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch interviews" });
  }
};

// Update interview
export const updateInterview = async (req, res) => {
  try {
    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!interview) {
      return res.status(404).json({ error: "Not found" });
    }
    
    res.json(interview);
  } catch (err) {
    res.status(500).json({ error: "Failed to update interview" });
  }
};

// Delete interview
export const deleteInterview = async (req, res) => {
  try {
    const interview = await Interview.findByIdAndDelete(req.params.id);
    
    if (!interview) {
      return res.status(404).json({ error: "Not found" });
    }
    
    res.json({ message: "Interview deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete interview" });
  }
};

// Get interviews by role
export const getInterviewsByRole = async (req, res) => {
  try {
    const interviews = await Interview.find({ role: req.params.role })
      .sort({ createdAt: -1 });
    res.json(interviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch interviews" });
  }
};

// Get statistics
export const getInterviewStats = async (req, res) => {
  try {
    const total = await Interview.countDocuments();
    const byRole = await Interview.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } }
    ]);
    const byLanguage = await Interview.aggregate([
      { $group: { _id: "$language", count: { $sum: 1 } } }
    ]);
    
    res.json({
      total,
      byRole,
      byLanguage
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
};
```

---

## Server Configuration

### server.js

Location: `backend/server.js`

```javascript
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import interviewRoutes from "./routes/interviewRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/interviews", interviewRoutes);

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Base route
app.get("/", (req, res) => {
  res.send("🚀 AI Interview Assistant Backend is Running Successfully...");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
```

---

#### Configuration Details

**Port:** Environment variable `PORT` or default `5000`
**Database:** MongoDB via Mongoose
**CORS:** Enabled for all origins

**Dependencies:**
- `express`: Web framework
- `cors`: Cross-origin resource sharing
- `dotenv`: Environment variable management
- `mongoose`: MongoDB ODM

---

#### Middleware Stack

1. **CORS:** `app.use(cors())`
   - Allows cross-origin requests
   - Enables frontend-backend communication

2. **JSON Parser:** `app.use(express.json())`
   - Parses incoming JSON payloads
   - Makes data available in `req.body`

---

#### Suggested Middleware Additions

```javascript
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

// Security headers
app.use(helmet());

// HTTP request logger
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Custom error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
```

---

## Middleware

### Custom Middleware (Suggested)

#### Validation Middleware

```javascript
// middleware/validation.js
import { body, param, validationResult } from 'express-validator';

export const validateInterview = [
  body('candidateName')
    .trim()
    .notEmpty().withMessage('Candidate name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  
  body('role')
    .trim()
    .notEmpty().withMessage('Role is required')
    .isLength({ min: 2, max: 100 }).withMessage('Role must be 2-100 characters'),
  
  body('language')
    .trim()
    .notEmpty().withMessage('Language is required')
    .isLength({ min: 2, max: 5 }).withMessage('Language code must be 2-5 characters'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateObjectId = [
  param('id')
    .isMongoId().withMessage('Invalid interview ID'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Usage in routes
router.post("/", validateInterview, createInterview);
router.get("/:id", validateObjectId, getInterview);
```

---

#### Authentication Middleware

```javascript
// middleware/auth.js
import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
    
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Usage in routes
router.post("/", authenticate, createInterview);
```

---

#### Logging Middleware

```javascript
// middleware/logger.js
export const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
};

// Usage
app.use(requestLogger);
```

---

## Utilities

### Suggested Utility Functions

```javascript
// utils/database.js
import mongoose from 'mongoose';

export const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB Disconnected');
  } catch (err) {
    console.error('Error disconnecting from MongoDB:', err);
  }
};
```

```javascript
// utils/response.js
export const successResponse = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data
  });
};

export const errorResponse = (res, message, statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    error: message
  });
};

// Usage in controllers
successResponse(res, interview, 201);
errorResponse(res, 'Interview not found', 404);
```

```javascript
// utils/validators.js
import mongoose from 'mongoose';

export const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const sanitizeInput = (input) => {
  if (typeof input === 'string') {
    return input.trim().replace(/[<>]/g, '');
  }
  return input;
};
```

---

## Database Operations

### Common Query Patterns

#### Pagination

```javascript
const getPaginatedInterviews = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  
  const [interviews, total] = await Promise.all([
    Interview.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
    Interview.countDocuments()
  ]);
  
  return {
    interviews,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1
    }
  };
};
```

---

#### Filtering

```javascript
const getFilteredInterviews = async (filters) => {
  const query = {};
  
  if (filters.role) query.role = filters.role;
  if (filters.language) query.language = filters.language;
  if (filters.startDate) query.createdAt = { $gte: new Date(filters.startDate) };
  if (filters.endDate) {
    query.createdAt = query.createdAt || {};
    query.createdAt.$lte = new Date(filters.endDate);
  }
  
  return await Interview.find(query).sort({ createdAt: -1 });
};
```

---

#### Aggregation

```javascript
const getInterviewStatistics = async () => {
  const stats = await Interview.aggregate([
    {
      $group: {
        _id: null,
        totalInterviews: { $sum: 1 },
        uniqueRoles: { $addToSet: "$role" },
        uniqueLanguages: { $addToSet: "$language" }
      }
    },
    {
      $project: {
        _id: 0,
        totalInterviews: 1,
        uniqueRolesCount: { $size: "$uniqueRoles" },
        uniqueLanguagesCount: { $size: "$uniqueLanguages" }
      }
    }
  ]);
  
  return stats[0] || { totalInterviews: 0, uniqueRolesCount: 0, uniqueLanguagesCount: 0 };
};
```

---

#### Text Search (Requires Index)

```javascript
// Add text index to schema
interviewSchema.index({ candidateName: 'text', role: 'text' });

// Search function
const searchInterviews = async (searchTerm) => {
  return await Interview.find({
    $text: { $search: searchTerm }
  }).select({ score: { $meta: 'textScore' } })
    .sort({ score: { $meta: 'textScore' } });
};
```

---

## Performance Optimization

### Query Optimization

```javascript
// Use lean() for read-only operations
const interviews = await Interview.find().lean();

// Use select() to limit fields
const interviews = await Interview.find().select('candidateName role -_id');

// Use populate() efficiently
const interviews = await Interview.find()
  .populate('relatedField', 'name email'); // Only populate needed fields
```

### Caching Strategy

```javascript
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 600 }); // 10 minutes

export const getCachedInterview = async (id) => {
  const cacheKey = `interview_${id}`;
  const cached = cache.get(cacheKey);
  
  if (cached) {
    return cached;
  }
  
  const interview = await Interview.findById(id);
  cache.set(cacheKey, interview);
  
  return interview;
};
```

---

## Testing

### Unit Tests Example

```javascript
// __tests__/interviewController.test.js
import { createInterview, getInterview } from '../controllers/interviewController';
import Interview from '../models/interview';

jest.mock('../models/interview');

describe('Interview Controller', () => {
  describe('createInterview', () => {
    it('should create a new interview', async () => {
      const mockInterview = {
        _id: '123',
        candidateName: 'Test',
        role: 'Developer',
        language: 'en',
        save: jest.fn().mockResolvedValue(this)
      };
      
      Interview.mockImplementation(() => mockInterview);
      
      const req = {
        body: {
          candidateName: 'Test',
          role: 'Developer',
          language: 'en'
        }
      };
      
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      
      await createInterview(req, res);
      
      expect(res.status).toHaveBeenCalledWith(201);
      expect(mockInterview.save).toHaveBeenCalled();
    });
  });
});
```

---

## Error Handling Best Practices

### Centralized Error Handler

```javascript
// utils/errors.js
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Global error handler
export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }
};

// Usage in controllers
throw new AppError('Interview not found', 404);
```

---

**Last Updated:** 2025-10-24
