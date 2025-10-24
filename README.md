# AI Interview Assistant

A full-stack web application for managing AI-powered interview sessions, built with Node.js/Express backend and React frontend.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [API Documentation](#api-documentation)
- [Component Documentation](#component-documentation)
- [Development](#development)
- [Contributing](#contributing)

## 🚀 Overview

The AI Interview Assistant is designed to streamline the interview process by providing a platform for creating and managing interview sessions. The application consists of a RESTful API backend and a modern React frontend that work together to provide a seamless user experience.

### Key Capabilities
- Create new interview sessions
- Retrieve interview details
- Simple, intuitive user interface
- RESTful API architecture
- MongoDB data persistence

## ✨ Features

### Backend Features
- **RESTful API**: Clean, well-structured endpoints for interview management
- **MongoDB Integration**: Persistent data storage with Mongoose ODM
- **CORS Support**: Cross-origin resource sharing enabled for frontend integration
- **Error Handling**: Comprehensive error handling with appropriate HTTP status codes
- **Environment Configuration**: Flexible configuration via environment variables

### Frontend Features
- **React Components**: Modern, functional components with hooks
- **API Integration**: Seamless communication with backend services
- **Responsive Design**: Clean, centered layout with modern styling
- **Real-time Feedback**: Status updates for user actions
- **Error Handling**: User-friendly error messages

## 🛠 Tech Stack

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Frontend
- **React 19**: UI library with latest features
- **Vite**: Fast build tool and development server
- **Axios**: HTTP client for API communication
- **CSS3**: Modern styling with CSS variables

## 📁 Project Structure

```
/workspace/
├── backend/                    # Backend API server
│   ├── controllers/           # Request handlers
│   │   └── interviewController.js
│   ├── models/               # Database models
│   │   └── interview.js
│   ├── routes/               # API routes
│   │   └── interviewRoutes.js
│   ├── server.js             # Main server file
│   └── package.json          # Backend dependencies
├── frontend-react/            # React frontend
│   ├── src/
│   │   ├── App.jsx           # Main component
│   │   ├── App.css           # Component styles
│   │   ├── index.css         # Global styles
│   │   ├── main.jsx          # Application entry point
│   │   └── Services/
│   │       └── api.js        # API service functions
│   └── package.json          # Frontend dependencies
├── API_DOCUMENTATION.md      # Comprehensive API docs
├── COMPONENT_DOCUMENTATION.md # Detailed component docs
└── README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-interview-assistant
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/interview-assistant
   PORT=5000
   ```

4. **Set up the frontend**
   ```bash
   cd ../frontend-react
   npm install
   ```

5. **Start the application**
   
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

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

## 📚 Documentation

### API Documentation
Comprehensive API documentation is available in [`API_DOCUMENTATION.md`](./API_DOCUMENTATION.md), including:
- Complete endpoint reference
- Request/response examples
- Error handling details
- Data model specifications

### Component Documentation
Detailed component documentation is available in [`COMPONENT_DOCUMENTATION.md`](./COMPONENT_DOCUMENTATION.md), including:
- Component props and methods
- Usage examples
- Styling guidelines
- Architecture patterns

## 🔧 Development

### Available Scripts

#### Backend Scripts
```bash
npm run dev    # Start development server with nodemon
```

#### Frontend Scripts
```bash
npm run dev     # Start Vite development server
npm run build   # Build for production
npm run preview # Preview production build
npm run lint    # Run ESLint
```

### Development Workflow

1. **Backend Development**
   - Modify controllers, models, or routes
   - Server auto-restarts with nodemon
   - Test endpoints with curl or Postman

2. **Frontend Development**
   - Modify React components
   - Hot reload enabled with Vite
   - Browser automatically refreshes

3. **API Testing**
   ```bash
   # Create interview
   curl -X POST http://localhost:5000/api/interviews \
     -H "Content-Type: application/json" \
     -d '{"candidateName": "John Doe", "role": "Developer", "language": "en"}'
   
   # Get interview
   curl http://localhost:5000/api/interviews/INTERVIEW_ID
   ```

### Code Style
- Use ES6+ features
- Follow React best practices
- Implement proper error handling
- Use descriptive variable names
- Include comments for complex logic

## 🐛 Known Issues

1. **Missing Implementation**: The `endInterview` endpoint is defined in routes but not implemented in the controller
2. **Hardcoded Data**: Frontend uses hardcoded test data instead of user input
3. **Limited Error Handling**: Basic error handling could be enhanced
4. **No Authentication**: No user authentication or authorization system

## 🔮 Future Enhancements

### Backend Improvements
- [ ] Implement missing `endInterview` functionality
- [ ] Add user authentication and authorization
- [ ] Implement interview question generation
- [ ] Add real-time features with WebSockets
- [ ] Enhance data validation and sanitization
- [ ] Add comprehensive logging
- [ ] Implement rate limiting

### Frontend Improvements
- [ ] Add form inputs for interview data
- [ ] Implement interview session management
- [ ] Add loading states and animations
- [ ] Create responsive design for mobile
- [ ] Add data visualization features
- [ ] Implement state management (Redux/Context)
- [ ] Add comprehensive testing suite

### General Improvements
- [ ] Add Docker containerization
- [ ] Implement CI/CD pipeline
- [ ] Add comprehensive documentation
- [ ] Implement monitoring and analytics
- [ ] Add internationalization support
- [ ] Create admin dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass
- Write clear commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation files
- Review the code examples

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js team for the robust backend framework
- MongoDB team for the flexible database solution
- Vite team for the fast build tool

---

**Happy Coding! 🎉**