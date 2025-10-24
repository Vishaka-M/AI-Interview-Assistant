# AI Interview Assistant

A full-stack web application for managing AI-powered interview sessions, built with React, Node.js, Express, and MongoDB.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Documentation](#documentation)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

AI Interview Assistant is a modern web application designed to streamline the interview process. It allows users to create, manage, and track interview sessions with candidates, providing a seamless experience for both interviewers and administrators.

---

## ✨ Features

- **Create Interview Sessions:** Quickly set up new interview sessions with candidate information
- **Retrieve Interview Details:** Access complete interview information by ID
- **RESTful API:** Well-structured API for easy integration
- **Real-time Updates:** Live feedback on interview creation and status
- **MongoDB Integration:** Persistent data storage with MongoDB
- **Modern UI:** Clean and responsive React-based interface
- **Scalable Architecture:** Modular backend with Express.js

---

## 🛠 Tech Stack

### Frontend
- **React** 19.1.1 - UI library
- **Vite** 7.1.7 - Build tool and dev server
- **Axios** 1.12.2 - HTTP client
- **CSS3** - Styling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** 4.18.2 - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** 8.0.0 - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

---

## 📚 Documentation

Comprehensive documentation is available in the following files:

| Document | Description |
|----------|-------------|
| **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** | Complete REST API reference with examples |
| **[BACKEND_FUNCTIONS.md](./BACKEND_FUNCTIONS.md)** | Backend controllers, models, and utilities |
| **[FRONTEND_COMPONENTS.md](./FRONTEND_COMPONENTS.md)** | React components, hooks, and services |
| **[SETUP_AND_USAGE_GUIDE.md](./SETUP_AND_USAGE_GUIDE.md)** | Installation, configuration, and deployment |

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v6 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   ```

   Create `.env` file:
   ```env
   MONGO_URI=mongodb://localhost:27017/ai-interview-assistant
   PORT=5000
   ```

   Start the backend:
   ```bash
   npm run dev
   ```

3. **Setup Frontend:**
   Open a new terminal:
   ```bash
   cd frontend-react
   npm install
   npm run dev
   ```

4. **Access the Application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - API Endpoint: http://localhost:5000/api

---

## 📁 Project Structure

```
workspace/
├── backend/
│   ├── controllers/          # Business logic
│   │   └── interviewController.js
│   ├── models/               # Database schemas
│   │   └── interview.js
│   ├── routes/               # API routes
│   │   └── interviewRoutes.js
│   ├── server.js             # Entry point
│   ├── package.json          # Dependencies
│   └── .env                  # Environment variables
│
├── frontend-react/
│   ├── src/
│   │   ├── Services/         # API services
│   │   │   └── api.js
│   │   ├── App.jsx           # Main component
│   │   ├── main.jsx          # Entry point
│   │   ├── App.css           # Component styles
│   │   └── index.css         # Global styles
│   ├── public/               # Static assets
│   ├── index.html            # HTML template
│   ├── package.json          # Dependencies
│   └── vite.config.js        # Vite configuration
│
└── [Documentation]
    ├── API_DOCUMENTATION.md
    ├── BACKEND_FUNCTIONS.md
    ├── FRONTEND_COMPONENTS.md
    └── SETUP_AND_USAGE_GUIDE.md
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/` | Health check | - |
| POST | `/interviews` | Create interview | `{ candidateName, role, language }` |
| GET | `/interviews/:id` | Get interview by ID | - |
| PATCH | `/interviews/:id/end` | End interview | - |

### Example Requests

**Create Interview:**
```bash
curl -X POST http://localhost:5000/api/interviews \
  -H "Content-Type: application/json" \
  -d '{
    "candidateName": "John Doe",
    "role": "Software Engineer",
    "language": "en"
  }'
```

**Get Interview:**
```bash
curl http://localhost:5000/api/interviews/<INTERVIEW_ID>
```

For detailed API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

---

## 💻 Usage

### Creating an Interview (Web UI)

1. Open http://localhost:5173 in your browser
2. Click the "Create Interview" button
3. View the interview ID in the status message

### Creating an Interview (Programmatically)

```javascript
import { createInterview } from './services/api';

const newInterview = await createInterview({
  candidateName: "Alice Johnson",
  role: "Product Manager",
  language: "en"
});

console.log('Created:', newInterview.data._id);
```

---

## 🧪 Testing

### Backend Testing
```bash
cd backend
# Add your test commands here
```

### Frontend Testing
```bash
cd frontend-react
npm test
```

For detailed testing instructions, see [SETUP_AND_USAGE_GUIDE.md](./SETUP_AND_USAGE_GUIDE.md)

---

## 🚢 Deployment

### Backend Deployment

**Using PM2:**
```bash
npm install -g pm2
pm2 start server.js --name interview-backend
pm2 save
```

### Frontend Deployment

**Build for production:**
```bash
npm run build
```

Deploy the `dist/` folder to any static hosting service (Netlify, Vercel, AWS S3, etc.)

For detailed deployment instructions, see [SETUP_AND_USAGE_GUIDE.md](./SETUP_AND_USAGE_GUIDE.md)

---

## 🔧 Environment Variables

### Backend `.env`

```env
MONGO_URI=mongodb://localhost:27017/ai-interview-assistant
PORT=5000
NODE_ENV=development
```

### Frontend `.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Ensure MongoDB is running
sudo systemctl start mongod
sudo systemctl status mongod
```

### Port Already in Use
```bash
# Find and kill process using port 5000
lsof -i :5000
kill -9 <PID>
```

For more troubleshooting tips, see [SETUP_AND_USAGE_GUIDE.md](./SETUP_AND_USAGE_GUIDE.md)

---

## 📖 Development

### Adding New Features

1. **Backend:**
   - Add controller in `controllers/`
   - Define route in `routes/`
   - Update model if needed in `models/`

2. **Frontend:**
   - Add API function in `Services/api.js`
   - Create component in `src/components/`
   - Update App.jsx as needed

### Code Style

- Use ES6+ features
- Follow modular architecture
- Write clean, documented code
- Handle errors gracefully

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- React team for the amazing library
- Express.js for the robust backend framework
- MongoDB for the powerful database
- Vite for the fast build tool

---

## 📞 Support

For questions or issues:

- Check the [documentation](./API_DOCUMENTATION.md)
- Open an issue on GitHub
- Contact the maintainers

---

## 🗺️ Roadmap

- [ ] Add authentication and authorization
- [ ] Implement real AI interview features
- [ ] Add video/audio recording capabilities
- [ ] Create admin dashboard
- [ ] Add analytics and reporting
- [ ] Implement email notifications
- [ ] Add multi-language support
- [ ] Create mobile app

---

**Version:** 1.0.0  
**Last Updated:** 2025-10-24

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Built with ❤️ using React, Node.js, and MongoDB**
