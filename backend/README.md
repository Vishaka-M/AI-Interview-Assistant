# Backend API Documentation

## Overview
Express.js backend server for the AI Interview Assistant application with MongoDB integration.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env  # Create and configure your .env file

# Start development server
npm run dev
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
MONGO_URI=mongodb://localhost:27017/ai-interview-assistant

# Server
PORT=5000

# OpenAI (if using AI features)
OPENAI_API_KEY=your_openai_api_key_here
```

## API Endpoints

### Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Status |
|--------|----------|-------------|---------|
| POST | `/interviews` | Create new interview | ✅ Implemented |
| GET | `/interviews/:id` | Get interview by ID | ✅ Implemented |
| PATCH | `/interviews/:id/end` | End interview session | ❌ Not implemented |

## Project Structure

```
backend/
├── controllers/
│   └── interviewController.js    # Business logic for interviews
├── models/
│   └── interview.js             # MongoDB schema definitions
├── routes/
│   └── interviewRoutes.js       # Route definitions
├── server.js                    # Main server file
└── package.json                 # Dependencies and scripts
```

## Controllers

### InterviewController

Located in `controllers/interviewController.js`

#### Functions

##### `createInterview(req, res)`
Creates a new interview record in the database.

**Request Body:**
```json
{
  "candidateName": "string (required)",
  "role": "string (required)",
  "language": "string (required)"
}
```

**Success Response (201):**
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

**Error Response (500):**
```json
{
  "error": "Failed to create interview"
}
```

##### `getInterview(req, res)`
Retrieves an interview by its MongoDB ObjectId.

**URL Parameters:**
- `id`: MongoDB ObjectId

**Success Response (200):**
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

**Error Responses:**
- **404:** `{ "error": "Not found" }`
- **500:** `{ "error": "Failed to fetch interview" }`

## Models

### Interview Model

Located in `models/interview.js`

**Schema:**
```javascript
{
  candidateName: { 
    type: String, 
    required: true,
    description: "Full name of the candidate"
  },
  role: { 
    type: String, 
    required: true,
    description: "Position being interviewed for"
  },
  language: { 
    type: String, 
    required: true,
    description: "Interview language preference (e.g., 'en', 'es')"
  },
  createdAt: { 
    type: Date, 
    default: Date.now,
    description: "Interview creation timestamp"
  }
}
```

## Routes

### Interview Routes

Located in `routes/interviewRoutes.js`

All routes are prefixed with `/api/interviews`

```javascript
// POST /api/interviews
router.post("/", createInterview);

// GET /api/interviews/:id  
router.get("/:id", getInterview);

// PATCH /api/interviews/:id/end
router.patch("/:id/end", endInterview); // ⚠️ Controller not implemented
```

## Usage Examples

### Creating an Interview

```bash
curl -X POST http://localhost:5000/api/interviews \
  -H "Content-Type: application/json" \
  -d '{
    "candidateName": "Alice Johnson",
    "role": "Frontend Developer",
    "language": "en"
  }'
```

### Retrieving an Interview

```bash
curl -X GET http://localhost:5000/api/interviews/507f1f77bcf86cd799439011
```

### Using with JavaScript/Node.js

```javascript
const axios = require('axios');

// Create interview
const createInterview = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/interviews', {
      candidateName: 'Bob Smith',
      role: 'Backend Developer',
      language: 'en'
    });
    console.log('Interview created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
};

// Get interview
const getInterview = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/interviews/${id}`);
    console.log('Interview data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
};
```

## Dependencies

### Production Dependencies
- **express**: Web framework for Node.js
- **cors**: Cross-Origin Resource Sharing middleware
- **dotenv**: Environment variable loader
- **mongoose**: MongoDB object modeling
- **openai**: OpenAI API client (for future AI features)

### Development Dependencies
- **nodemon**: Development server with auto-restart

## Development Notes

### Missing Implementations
1. **endInterview Controller**: The route exists but controller function is missing
2. **Input Validation**: No validation middleware for request bodies
3. **Authentication**: No authentication/authorization implemented
4. **Error Logging**: Basic console.error, could be enhanced

### Recommended Enhancements
1. Add input validation middleware (e.g., express-validator)
2. Implement the missing `endInterview` function
3. Add authentication middleware
4. Add request logging middleware
5. Add rate limiting
6. Add comprehensive error handling
7. Add API documentation with Swagger/OpenAPI
8. Add unit and integration tests

### Database Connection
The server automatically connects to MongoDB on startup. Connection status is logged to the console:
- ✅ Success: "MongoDB Connected"
- ❌ Error: "MongoDB Connection Error: [error details]"

## Testing

Currently no tests are implemented. Consider adding:
- Unit tests for controllers
- Integration tests for API endpoints  
- Database connection tests
- Model validation tests

## Deployment

For production deployment:
1. Set appropriate environment variables
2. Use a process manager like PM2
3. Set up proper logging
4. Configure reverse proxy (nginx)
5. Enable HTTPS
6. Set up monitoring and health checks