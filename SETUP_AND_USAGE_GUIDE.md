# Setup and Usage Guide

Complete guide for setting up, running, and deploying the AI Interview Assistant application.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Development Workflow](#development-workflow)
4. [Configuration](#configuration)
5. [Running the Application](#running-the-application)
6. [Testing](#testing)
7. [Building for Production](#building-for-production)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)
10. [Common Tasks](#common-tasks)
11. [Environment Variables](#environment-variables)
12. [Database Management](#database-management)

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

| Software | Minimum Version | Recommended Version | Purpose |
|----------|----------------|---------------------|---------|
| Node.js | 16.x | 18.x or 20.x | JavaScript runtime |
| npm | 8.x | 9.x or 10.x | Package manager |
| MongoDB | 6.x | 7.x | Database |
| Git | 2.x | Latest | Version control |

### Installation Instructions

#### Node.js and npm

**Ubuntu/Debian:**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**macOS:**
```bash
brew install node
```

**Windows:**
Download from [nodejs.org](https://nodejs.org/)

**Verify Installation:**
```bash
node --version
npm --version
```

---

#### MongoDB

**Ubuntu/Debian:**
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Create list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update and install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0
```

**Windows:**
Download from [mongodb.com](https://www.mongodb.com/try/download/community)

**Verify Installation:**
```bash
mongod --version
```

---

## Initial Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

If you already have the files, skip to the next step.

---

### 2. Backend Setup

#### Navigate to Backend Directory
```bash
cd backend
```

#### Install Dependencies
```bash
npm install
```

This will install:
- express (^4.18.2)
- cors (^2.8.5)
- dotenv (^16.0.3)
- mongoose (^8.0.0)
- openai (^6.5.0)
- nodemon (^3.1.10)

#### Create Environment File
```bash
touch .env
```

#### Configure Environment Variables
Edit `.env` file:
```env
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/ai-interview-assistant

# Server Configuration
PORT=5000

# OpenAI Configuration (if using AI features)
OPENAI_API_KEY=your_openai_api_key_here

# Node Environment
NODE_ENV=development
```

#### Verify Backend Setup
```bash
npm run dev
```

You should see:
```
🔥 Server running on port 5000
✅ MongoDB Connected
```

---

### 3. Frontend Setup

#### Open New Terminal and Navigate to Frontend Directory
```bash
cd frontend-react
```

#### Install Dependencies
```bash
npm install
```

This will install:
- react (^19.1.1)
- react-dom (^19.1.1)
- axios (^1.12.2)
- vite (^7.1.7)
- Development dependencies

#### Verify Frontend Setup
```bash
npm run dev
```

You should see:
```
  VITE v7.1.7  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

### 4. Verify Installation

With both servers running:

1. **Backend Health Check:**
   ```bash
   curl http://localhost:5000/
   ```
   Expected response: `🚀 AI Interview Assistant Backend is Running Successfully...`

2. **Frontend:**
   Open browser and navigate to `http://localhost:5173`
   You should see the AI Interview Assistant interface

3. **API Test:**
   ```bash
   curl -X POST http://localhost:5000/api/interviews \
     -H "Content-Type: application/json" \
     -d '{"candidateName":"Test User","role":"Test Role","language":"en"}'
   ```

---

## Development Workflow

### Recommended Terminal Setup

Use 2-3 terminal windows/tabs:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend-react
npm run dev
```

**Terminal 3 - Database/Commands:**
```bash
# For MongoDB operations or other commands
mongosh
```

---

### File Structure

```
workspace/
├── backend/
│   ├── controllers/
│   │   └── interviewController.js    # Business logic
│   ├── models/
│   │   └── interview.js               # Database schemas
│   ├── routes/
│   │   └── interviewRoutes.js         # API routes
│   ├── node_modules/                   # Dependencies (ignored by git)
│   ├── .env                            # Environment variables (ignored by git)
│   ├── .gitignore                      # Git ignore rules
│   ├── package.json                    # Backend dependencies
│   ├── package-lock.json              # Dependency lock file
│   └── server.js                       # Entry point
│
├── frontend-react/
│   ├── src/
│   │   ├── Services/
│   │   │   └── api.js                 # API client
│   │   ├── assets/                     # Static assets
│   │   ├── App.jsx                     # Main component
│   │   ├── App.css                     # App styles
│   │   ├── main.jsx                    # Entry point
│   │   └── index.css                   # Global styles
│   ├── public/                         # Public assets
│   ├── node_modules/                   # Dependencies (ignored by git)
│   ├── .gitignore                      # Git ignore rules
│   ├── index.html                      # HTML template
│   ├── package.json                    # Frontend dependencies
│   ├── package-lock.json              # Dependency lock file
│   ├── vite.config.js                 # Vite configuration
│   ├── eslint.config.js               # ESLint configuration
│   └── README.md                       # Project readme
│
└── [Documentation files]
    ├── API_DOCUMENTATION.md
    ├── BACKEND_FUNCTIONS.md
    ├── FRONTEND_COMPONENTS.md
    └── SETUP_AND_USAGE_GUIDE.md
```

---

## Configuration

### Backend Configuration

#### server.js Settings

```javascript
// Port configuration
const PORT = process.env.PORT || 5000;

// CORS configuration (default: all origins)
app.use(cors());

// Custom CORS (if needed)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

#### MongoDB Connection Options

```javascript
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});
```

---

### Frontend Configuration

#### vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
```

#### API Base URL Configuration

Edit `src/Services/api.js`:
```javascript
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
});
```

Create `frontend-react/.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Running the Application

### Development Mode

#### Start Backend Server
```bash
cd backend
npm run dev
```

Features in development mode:
- Auto-restart on file changes (nodemon)
- Detailed error messages
- MongoDB connection logging

#### Start Frontend Server
```bash
cd frontend-react
npm run dev
```

Features in development mode:
- Hot Module Replacement (HMR)
- Fast refresh
- Development tools enabled

---

### Using the Application

#### 1. Create an Interview (UI)

1. Open browser to `http://localhost:5173`
2. Click "Create Interview" button
3. View the created interview ID in the status message

#### 2. Create an Interview (API)

```bash
curl -X POST http://localhost:5000/api/interviews \
  -H "Content-Type: application/json" \
  -d '{
    "candidateName": "Alice Johnson",
    "role": "Senior Developer",
    "language": "en"
  }'
```

#### 3. Get Interview Details

```bash
curl http://localhost:5000/api/interviews/<INTERVIEW_ID>
```

---

## Testing

### Backend Testing

#### Manual API Testing

**Test Health Endpoint:**
```bash
curl http://localhost:5000/
```

**Test Create Interview:**
```bash
curl -X POST http://localhost:5000/api/interviews \
  -H "Content-Type: application/json" \
  -d '{"candidateName":"Test","role":"Developer","language":"en"}'
```

**Test Get Interview:**
```bash
# Replace <ID> with actual interview ID
curl http://localhost:5000/api/interviews/<ID>
```

---

#### Automated Tests (To be implemented)

Install testing dependencies:
```bash
cd backend
npm install --save-dev jest supertest @types/jest
```

Create `backend/package.json` script:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

Example test file `backend/__tests__/interview.test.js`:
```javascript
const request = require('supertest');
const app = require('../server');

describe('Interview API', () => {
  it('should create a new interview', async () => {
    const response = await request(app)
      .post('/api/interviews')
      .send({
        candidateName: 'Test User',
        role: 'Developer',
        language: 'en'
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });
});
```

---

### Frontend Testing

#### Setup Vitest

Install dependencies:
```bash
cd frontend-react
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
```

Update `package.json`:
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui"
  }
}
```

Create `vite.config.js` test configuration:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  }
})
```

Example test `src/App.test.jsx`:
```javascript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders title', () => {
    render(<App />);
    expect(screen.getByText('AI Interview Assistant')).toBeInTheDocument();
  });
});
```

Run tests:
```bash
npm test
```

---

## Building for Production

### Backend Production Build

#### 1. Update Environment Variables

Create `.env.production`:
```env
MONGO_URI=mongodb://production-host:27017/ai-interview-assistant
PORT=5000
NODE_ENV=production
```

#### 2. Install Production Dependencies Only
```bash
npm install --production
```

#### 3. Use Process Manager (PM2)

Install PM2:
```bash
npm install -g pm2
```

Start application:
```bash
pm2 start server.js --name "interview-backend"
pm2 save
pm2 startup
```

---

### Frontend Production Build

#### 1. Create Environment File

Create `frontend-react/.env.production`:
```env
VITE_API_BASE_URL=https://your-api-domain.com/api
```

#### 2. Build Application
```bash
cd frontend-react
npm run build
```

This creates an optimized production build in the `dist/` directory.

#### 3. Preview Production Build
```bash
npm run preview
```

#### 4. Deploy Static Files

The `dist/` directory contains:
- `index.html`
- Optimized JavaScript bundles
- Optimized CSS files
- Assets

Deploy these files to any static hosting service.

---

## Deployment

### Backend Deployment Options

#### Option 1: Heroku

```bash
# Install Heroku CLI
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGO_URI=your_mongodb_uri
heroku config:set NODE_ENV=production

# Create Procfile
echo "web: node server.js" > Procfile

# Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main

# View logs
heroku logs --tail
```

---

#### Option 2: DigitalOcean / AWS / VPS

```bash
# SSH into server
ssh user@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
# (follow MongoDB installation instructions)

# Clone repository
git clone <your-repo>
cd backend

# Install dependencies
npm install --production

# Create .env file
nano .env
# Add your production environment variables

# Install PM2
npm install -g pm2

# Start application
pm2 start server.js --name interview-api
pm2 save
pm2 startup

# Setup Nginx as reverse proxy
sudo apt install nginx
sudo nano /etc/nginx/sites-available/interview-api
```

Nginx configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/interview-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

### Frontend Deployment Options

#### Option 1: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build application
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

Or use Netlify's GitHub integration for automatic deployments.

---

#### Option 2: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

Or use Vercel's GitHub integration.

---

#### Option 3: AWS S3 + CloudFront

```bash
# Build application
npm run build

# Install AWS CLI
# Configure AWS credentials
aws configure

# Create S3 bucket
aws s3 mb s3://your-bucket-name

# Upload files
aws s3 sync dist/ s3://your-bucket-name --acl public-read

# Configure bucket for website hosting
aws s3 website s3://your-bucket-name --index-document index.html
```

---

#### Option 4: Nginx (Static Hosting)

```bash
# Build application
npm run build

# Copy to server
scp -r dist/* user@server:/var/www/interview-app/

# Nginx configuration
server {
    listen 80;
    server_name your-frontend-domain.com;
    root /var/www/interview-app;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error

**Error:** `MongoNetworkError: failed to connect to server`

**Solutions:**
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log

# Verify connection string
# In .env file, ensure MONGO_URI is correct
MONGO_URI=mongodb://localhost:27017/ai-interview-assistant
```

---

#### 2. Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process (replace PID with actual ID)
kill -9 PID

# Or use a different port
# In .env file:
PORT=5001
```

---

#### 3. CORS Error

**Error:** `Access to fetch has been blocked by CORS policy`

**Solutions:**

Backend `server.js`:
```javascript
// Allow specific origin
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Or allow all origins (development only)
app.use(cors());
```

---

#### 4. Module Not Found Error

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

#### 5. Frontend API Connection Error

**Error:** Network error when calling API

**Solutions:**

1. **Check backend is running:**
   ```bash
   curl http://localhost:5000/
   ```

2. **Verify API base URL:**
   Check `src/Services/api.js`:
   ```javascript
   baseURL: "http://localhost:5000/api"
   ```

3. **Check for typos in endpoint:**
   ```javascript
   // Correct:
   API.post("/interviews", data)
   
   // Incorrect:
   API.post("/interview", data)  // Missing 's'
   ```

---

#### 6. Build Fails

**Frontend build errors:**

```bash
# Clear cache and rebuild
rm -rf node_modules/.vite
npm run build
```

**Backend issues:**
```bash
# Check for syntax errors
npm run dev

# Verify all dependencies installed
npm install
```

---

## Common Tasks

### Add New API Endpoint

#### 1. Create Controller Function
Edit `backend/controllers/interviewController.js`:
```javascript
export const getAllInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find().sort({ createdAt: -1 });
    res.json(interviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch interviews" });
  }
};
```

#### 2. Add Route
Edit `backend/routes/interviewRoutes.js`:
```javascript
import { getAllInterviews } from "../controllers/interviewController.js";

router.get("/", getAllInterviews);
```

#### 3. Add Frontend Service
Edit `frontend-react/src/Services/api.js`:
```javascript
export const getAllInterviews = () => API.get("/interviews");
```

#### 4. Use in Component
```javascript
import { getAllInterviews } from './services/api';

const { data } = await getAllInterviews();
```

---

### Update Database Schema

#### 1. Modify Model
Edit `backend/models/interview.js`:
```javascript
const interviewSchema = new mongoose.Schema({
  candidateName: { type: String, required: true },
  role: { type: String, required: true },
  language: { type: String, required: true },
  email: { type: String }, // New field
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});
```

#### 2. Update Controller (if needed)
Modify validation and business logic accordingly.

#### 3. Update Frontend Types
Update TypeScript interfaces or prop types.

---

### Reset Database

```bash
# Connect to MongoDB
mongosh

# Switch to database
use ai-interview-assistant

# Drop collection
db.interviews.drop()

# Verify
db.interviews.find()

# Exit
exit
```

---

### View Database Records

```bash
# Connect to MongoDB
mongosh

# Switch to database
use ai-interview-assistant

# View all interviews
db.interviews.find().pretty()

# Count documents
db.interviews.countDocuments()

# Find specific interview
db.interviews.findOne({ candidateName: "John Doe" })

# Exit
exit
```

---

## Environment Variables

### Backend Environment Variables

Create `backend/.env`:

```env
# Required Variables
MONGO_URI=mongodb://localhost:27017/ai-interview-assistant
PORT=5000

# Optional Variables
NODE_ENV=development
LOG_LEVEL=info

# If using authentication
JWT_SECRET=your_jwt_secret_key_here

# If using OpenAI
OPENAI_API_KEY=your_openai_api_key

# Email service (if implementing notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

### Frontend Environment Variables

Create `frontend-react/.env`:

```env
# Development
VITE_API_BASE_URL=http://localhost:5000/api

# Production
# VITE_API_BASE_URL=https://api.yourdomain.com/api
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

---

## Database Management

### Backup Database

```bash
# Create backup
mongodump --db ai-interview-assistant --out /path/to/backup

# With specific collection
mongodump --db ai-interview-assistant --collection interviews --out /path/to/backup
```

---

### Restore Database

```bash
# Restore from backup
mongorestore --db ai-interview-assistant /path/to/backup/ai-interview-assistant

# Drop existing database before restore
mongorestore --db ai-interview-assistant --drop /path/to/backup/ai-interview-assistant
```

---

### Database Indexes

Add indexes for better performance:

```javascript
// In models/interview.js
interviewSchema.index({ candidateName: 1 });
interviewSchema.index({ role: 1 });
interviewSchema.index({ createdAt: -1 });
interviewSchema.index({ candidateName: 'text', role: 'text' });
```

---

### MongoDB Commands Reference

```bash
# Start MongoDB
sudo systemctl start mongod

# Stop MongoDB
sudo systemctl stop mongod

# Restart MongoDB
sudo systemctl restart mongod

# Check status
sudo systemctl status mongod

# Enable autostart
sudo systemctl enable mongod

# View logs
sudo tail -f /var/log/mongodb/mongod.log
```

---

## Performance Optimization

### Backend Optimization

```javascript
// Enable compression
import compression from 'compression';
app.use(compression());

// Add caching headers
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=300');
  next();
});

// Use connection pooling
mongoose.connect(MONGO_URI, {
  maxPoolSize: 10,
  minPoolSize: 5
});
```

---

### Frontend Optimization

```javascript
// Lazy load components
const InterviewList = lazy(() => import('./components/InterviewList'));

// Use code splitting
<Suspense fallback={<Loading />}>
  <InterviewList />
</Suspense>

// Optimize images
// Use proper image formats and sizes
```

---

## Security Best Practices

### Backend Security

```javascript
// Install security packages
npm install helmet express-rate-limit express-mongo-sanitize

// Implement in server.js
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';

app.use(helmet());
app.use(mongoSanitize());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);
```

---

### Environment Security

```bash
# Never commit .env files
echo ".env" >> .gitignore

# Use strong passwords for production databases
# Rotate API keys regularly
# Use HTTPS in production
# Implement authentication and authorization
```

---

## Monitoring and Logging

### Backend Logging

```javascript
// Install winston
npm install winston

// Configure logger
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Use in application
logger.info('Server started');
logger.error('Error occurred', { error: err });
```

---

## Getting Help

### Documentation

- **API Documentation:** See `API_DOCUMENTATION.md`
- **Backend Functions:** See `BACKEND_FUNCTIONS.md`
- **Frontend Components:** See `FRONTEND_COMPONENTS.md`

### Useful Resources

- **Express.js:** https://expressjs.com/
- **React:** https://react.dev/
- **MongoDB:** https://docs.mongodb.com/
- **Mongoose:** https://mongoosejs.com/
- **Vite:** https://vitejs.dev/
- **Axios:** https://axios-http.com/

### Community

- Stack Overflow
- GitHub Issues
- Discord communities for React, Node.js, MongoDB

---

**Last Updated:** 2025-10-24

**Version:** 1.0.0
