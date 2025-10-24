# AI Interview Assistant

A full-stack web application for managing AI-powered interview sessions. The application consists of a Node.js/Express backend with MongoDB and a React frontend built with Vite.

## 🚀 Features

- **Interview Management**: Create and manage interview sessions
- **RESTful API**: Clean, well-documented API endpoints
- **Modern Frontend**: React 19 with Vite for fast development
- **Database Integration**: MongoDB with Mongoose ODM
- **CORS Support**: Cross-origin resource sharing enabled
- **Responsive Design**: Mobile-friendly interface

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## 🛠️ Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

4. Start the development server:
```bash
npm run dev
```

The backend will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📚 Documentation

- **[API Documentation](./API_DOCUMENTATION.md)** - Complete API reference with examples
- **[Component Documentation](./COMPONENT_DOCUMENTATION.md)** - Frontend components and usage guide

## 🏗️ Project Structure

```
├── backend/                 # Node.js/Express backend
│   ├── controllers/        # Route controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
├── frontend-react/         # React frontend
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   ├── Services/      # API service functions
│   │   └── main.jsx       # Application entry point
│   └── package.json       # Frontend dependencies
├── API_DOCUMENTATION.md    # API reference
├── COMPONENT_DOCUMENTATION.md # Component guide
└── README.md              # This file
```

## 🔧 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/interviews` | Create new interview |
| GET | `/interviews/:id` | Get interview by ID |
| PATCH | `/interviews/:id/end` | End interview session |

### Example Usage

```bash
# Create an interview
curl -X POST http://localhost:5000/api/interviews \
  -H "Content-Type: application/json" \
  -d '{
    "candidateName": "John Doe",
    "role": "Software Engineer",
    "language": "en"
  }'

# Get an interview
curl http://localhost:5000/api/interviews/65f1234567890abcdef12345
```

## 🎯 Quick Start

1. **Clone the repository** (if not already done)
2. **Set up the backend**:
   ```bash
   cd backend
   npm install
   # Add your MongoDB URI to .env
   npm run dev
   ```
3. **Set up the frontend**:
   ```bash
   cd frontend-react
   npm install
   npm run dev
   ```
4. **Open your browser** to `http://localhost:5173`
5. **Click "Create Interview"** to test the functionality

## 🧪 Testing the API

### Using cURL

```bash
# Health check
curl http://localhost:5000/

# Create interview
curl -X POST http://localhost:5000/api/interviews \
  -H "Content-Type: application/json" \
  -d '{"candidateName":"Test User","role":"Developer","language":"en"}'

# Get interview (replace ID with actual ID from create response)
curl http://localhost:5000/api/interviews/YOUR_INTERVIEW_ID
```

### Using JavaScript

```javascript
// Create interview
const response = await fetch('http://localhost:5000/api/interviews', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    candidateName: 'Jane Smith',
    role: 'Frontend Developer',
    language: 'en'
  })
});

const interview = await response.json();
console.log('Created interview:', interview);
```

## 🔧 Development

### Backend Development

- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Environment**: Node.js with ES modules
- **Scripts**:
  - `npm run dev` - Start development server with nodemon

### Frontend Development

- **Framework**: React 19
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Scripts**:
  - `npm run dev` - Start development server
  - `npm run build` - Build for production
  - `npm run preview` - Preview production build
  - `npm run lint` - Run ESLint

## 🐛 Known Issues

1. **Missing Controller Function**: The `endInterview` function is referenced in routes but not implemented in the controller
2. **Hardcoded Data**: The frontend currently uses hardcoded interview data
3. **No Error Handling**: Limited error handling in the frontend
4. **No Validation**: No input validation on the backend

## 🚀 Future Enhancements

- [ ] Implement missing `endInterview` functionality
- [ ] Add input validation and sanitization
- [ ] Implement user authentication
- [ ] Add AI-powered interview question generation
- [ ] Create interview session management
- [ ] Add real-time communication features
- [ ] Implement comprehensive error handling
- [ ] Add unit and integration tests
- [ ] Create admin dashboard
- [ ] Add interview analytics and reporting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation files
- Review the API and component documentation

## 🔗 Links

- [API Documentation](./API_DOCUMENTATION.md)
- [Component Documentation](./COMPONENT_DOCUMENTATION.md)
- [Backend Package.json](./backend/package.json)
- [Frontend Package.json](./frontend-react/package.json)