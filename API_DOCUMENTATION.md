# AI Interview Assistant - API Documentation

## Overview

The AI Interview Assistant is a full-stack application with a Node.js/Express backend and React frontend. The backend provides RESTful APIs for managing interview sessions, while the frontend offers a user interface for creating and managing interviews.

## Base URL

- **Development**: `http://localhost:5000`
- **API Base**: `http://localhost:5000/api`

## Authentication

Currently, no authentication is required for API endpoints.

## API Endpoints

### 1. Health Check

#### GET /
Check if the server is running.

**Response:**
```json
"🚀 AI Interview Assistant Backend is Running Successfully..."
```

**Example:**
```bash
curl http://localhost:5000/
```

---

### 2. Interview Management

#### POST /api/interviews
Create a new interview session.

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
  "createdAt": "2024-01-01T00:00:00.000Z"
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
  "_id": "65f1234567890abcdef12345",
  "candidateName": "John Doe",
  "role": "Software Engineer", 
  "language": "en",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid request body
- `500 Internal Server Error`: Server error during creation

---

#### GET /api/interviews/:id
Retrieve a specific interview by ID.

**Parameters:**
- `id` (string, required): The unique identifier of the interview

**Response:**
```json
{
  "_id": "string",
  "candidateName": "string",
  "role": "string", 
  "language": "string",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Example Request:**
```bash
curl http://localhost:5000/api/interviews/65f1234567890abcdef12345
```

**Example Response:**
```json
{
  "_id": "65f1234567890abcdef12345",
  "candidateName": "John Doe",
  "role": "Software Engineer",
  "language": "en", 
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Responses:**
- `404 Not Found`: Interview not found
- `500 Internal Server Error`: Server error during retrieval

---

#### PATCH /api/interviews/:id/end
End an interview session.

**Parameters:**
- `id` (string, required): The unique identifier of the interview

**Note:** This endpoint is defined in routes but the controller function `endInterview` is not implemented yet.

**Example Request:**
```bash
curl -X PATCH http://localhost:5000/api/interviews/65f1234567890abcdef12345/end
```

---

## Data Models

### Interview Schema

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

## Error Handling

All API endpoints follow consistent error handling patterns:

### Error Response Format
```json
{
  "error": "Error message description"
}
```

### Common HTTP Status Codes
- `200 OK`: Successful GET request
- `201 Created`: Successful POST request
- `400 Bad Request`: Invalid request data
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## CORS Configuration

The API is configured with CORS enabled, allowing cross-origin requests from any domain. This is suitable for development but should be restricted in production.

## Database

The application uses MongoDB with Mongoose ODM. The connection string is configured via the `MONGO_URI` environment variable.

## Environment Variables

Required environment variables:

- `MONGO_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)

## Dependencies

### Backend Dependencies
- `express`: Web framework
- `mongoose`: MongoDB object modeling
- `cors`: Cross-origin resource sharing
- `dotenv`: Environment variable management
- `openai`: AI integration (for future features)

## Usage Examples

### JavaScript/Node.js
```javascript
const axios = require('axios');

// Create an interview
const createInterview = async (interviewData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/interviews', interviewData);
    console.log('Interview created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating interview:', error.response.data);
  }
};

// Get an interview
const getInterview = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/interviews/${id}`);
    console.log('Interview:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching interview:', error.response.data);
  }
};

// Usage
createInterview({
  candidateName: "Jane Smith",
  role: "Frontend Developer", 
  language: "en"
});
```

### Python
```python
import requests

# Create an interview
def create_interview(interview_data):
    response = requests.post('http://localhost:5000/api/interviews', json=interview_data)
    if response.status_code == 201:
        return response.json()
    else:
        print(f"Error: {response.json()}")

# Get an interview
def get_interview(interview_id):
    response = requests.get(f'http://localhost:5000/api/interviews/{interview_id}')
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.json()}")

# Usage
interview = create_interview({
    "candidateName": "Alice Johnson",
    "role": "Backend Developer",
    "language": "en"
})
```

### cURL Examples

```bash
# Create interview
curl -X POST http://localhost:5000/api/interviews \
  -H "Content-Type: application/json" \
  -d '{"candidateName":"Bob Wilson","role":"Full Stack Developer","language":"en"}'

# Get interview
curl http://localhost:5000/api/interviews/65f1234567890abcdef12345

# End interview (when implemented)
curl -X PATCH http://localhost:5000/api/interviews/65f1234567890abcdef12345/end
```

## Rate Limiting

Currently, no rate limiting is implemented. Consider adding rate limiting for production use.

## Security Considerations

1. **Input Validation**: Add proper input validation and sanitization
2. **Authentication**: Implement authentication for production use
3. **CORS**: Restrict CORS to specific domains in production
4. **Environment Variables**: Ensure sensitive data is stored in environment variables
5. **Error Handling**: Avoid exposing sensitive information in error messages

## Future Enhancements

1. Implement the missing `endInterview` controller function
2. Add interview questions and answers to the schema
3. Implement AI-powered interview question generation
4. Add user authentication and authorization
5. Add interview session management features
6. Implement real-time communication for live interviews