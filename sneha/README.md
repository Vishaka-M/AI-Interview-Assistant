# AI Interview Assistant Backend

This is the backend server for the AI Interview Assistant application. It provides APIs for managing interviews, user authentication, and audio processing.

## Features

- User authentication with JWT
- Interview scheduling and management
- Audio file upload to S3
- Real-time interview feedback
- Role-based access control

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and update the values
4. Start the server:
   ```bash
   npm start
   ```

## Docker Setup

```bash
docker-compose up --build
```

## API Documentation

See `openapi.yaml` for detailed API documentation.

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `AWS_ACCESS_KEY_ID`: AWS access key
- `AWS_SECRET_ACCESS_KEY`: AWS secret key
- `AWS_REGION`: AWS region
- `AWS_BUCKET_NAME`: S3 bucket name
- `REDIS_HOST`: Redis host
- `REDIS_PORT`: Redis port
- `PORT`: Server port (default: 3000)