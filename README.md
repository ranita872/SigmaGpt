# SigmaGPT

SigmaGPT is a full-stack AI-powered chatbot inspired by ChatGPT, built using React, Node.js, Express, and MongoDB. It leverages OpenAI's GPT-4o Mini model to deliver intelligent conversations, image understanding, voice interactions, persistent chat history, and a modern ChatGPT-like user experience.

![React](https://img.shields.io/badge/React-19-blue)
![Node.js](https://img.shields.io/badge/Node.js-24-green)
![Express](https://img.shields.io/badge/Express.js-black)
![MongoDB](https://img.shields.io/badge/MongoDB-green)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--Mini-purple)

---

## Overview

SigmaGPT is an AI assistant that combines the power of OpenAI's GPT-4o Mini with a modern and intuitive interface. Users can chat naturally, upload images for AI-powered analysis, interact using voice commands, manage conversation threads, and enjoy a seamless experience across devices.

The project is designed with scalability in mind and follows a full-stack architecture with React on the frontend and Express + MongoDB on the backend.

---

## Features

### AI Capabilities

- GPT-4o Mini powered conversations
- Image Analysis using GPT-4o Mini Vision
- Context-aware responses
- Markdown & Code Block Rendering
- Syntax Highlighting for Code Snippets

### Chat Features

- Persistent Chat History
- Unique Thread Management
- Automatic Thread Creation
- Thread Deletion
- ChatGPT-like Interface
- Typing Animation for AI Responses

### Voice Features

- Speech-to-Text Support
- Text-to-Speech Responses
- Continuous Voice Interaction Mode

### Image Features

- Image Upload via "+" Button
- AI-Powered Image Description
- Image Preview inside Chat
- Support for JPG, PNG, JPEG, and WebP files

### Authentication & UI

- JWT Authentication
- Protected Routes
- Landing Page
- Login & Signup
- User Profile Dropdown
- Dark & Light Theme Support
- Responsive Design

### Deployment

- Frontend Deployment (Vercel)
- Backend Deployment (Render)
- MongoDB Atlas Integration

---

## Tech Stack

### Frontend

- React.js
- React Router DOM
- JavaScript (ES6+)
- CSS3
- React Markdown
- Rehype Highlight
- React Spinners
- Font Awesome
- UUID

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- OpenAI SDK
- CORS

### AI Models

| Feature | Model |
|--------|--------|
| Chat | GPT-4o Mini |
| Image Understanding | GPT-4o Mini |
| Future Image Generation | GPT-Image-1 |

---

## Project Structure

```bash
SigmaGPT/
│
├── Frontend/
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── Chat.jsx
│       ├── ChatWindow.jsx
│       ├── Sidebar.jsx
│       ├── Home.jsx
│       ├── Login.jsx
│       ├── Signup.jsx
│       ├── MyContext.jsx
│       └── ...
│
├── Backend/
│   ├── middleware/
│   ├── models/
│   │   └── Thread.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   └── chat.js
│   │
│   ├── utils/
│   │   ├── openai.js
│   │   └── imageAnalysis.js
│   │
│   ├── uploads/
│   ├── server.js
│   └── .env
│
└── README.md
```



## Installation

### Clone Repository

```bash
git clone https://github.com/ranita872/SigmaGpt.git
```

```bash
cd SigmaGpt
```

---

## Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs at:

```bash
http://localhost:5173
```

---

## Backend Setup

```bash
cd Backend
npm install
npm start
```

Backend runs at:

```bash
http://localhost:8080
```

---

## Environment Variables

### Frontend (.env)

```env
VITE_API_URL=http://localhost:8080
```

### Backend (.env)

```env
OPENAI_API_KEY=your_openai_api_key
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

---

## API Endpoints

### Chat

```http
POST /api/chat
```

### Analyze Image

```http
POST /api/image-analyze
```

### Get All Threads

```http
GET /api/thread
```

### Get Thread by ID

```http
GET /api/thread/:threadId
```

### Delete Thread

```http
DELETE /api/thread/:threadId
```

### Authentication

```http
POST /api/auth/login
POST /api/auth/signup
```

---

## Implemented Functionalities

| Feature | Status |
|--------|--------|
| GPT-4o Mini Chat | ✅ |
| Image Analysis (Vision) | ✅ |
| JWT Authentication | ✅ |
| Chat History | ✅ |
| Thread Management | ✅ |
| Voice Input | ✅ |
| Voice Output | ✅ |
| Image Upload | ✅ |
| Image Preview | ✅ |
| Syntax Highlighting | ✅ |
| Dark/Light Theme | ✅ |
| Responsive Design | ✅ |
| Deployment | ✅ |

---

## AI Workflow

```text
User Message
     │
     ▼
 GPT-4o Mini
     │
     ▼
 AI Response
```

```text
Image Upload
     │
     ▼
GPT-4o Mini Vision
     │
     ▼
Image Description
```

```text
Voice Input
     │
     ▼
Speech Recognition API
     │
     ▼
GPT-4o Mini
     │
     ▼
Speech Synthesis API
```

---

## Future Improvements

- GPT-Image-1 Integration
- AI Image Generation
- PDF Summarization
- Document Q&A
- Voice-to-Voice Conversations
- Streaming Responses
- Multi-Model Support
- Chat Sharing
- User Profiles
- Message Search
- Export Conversations
- Real-Time Collaboration

---

## Deployment

### Frontend

https://sigma-gpt-fawn.vercel.app

### Backend

https://sigmagpt-backend-hn7q.onrender.com

---

## Performance Highlights

- Optimized React State Management
- Persistent MongoDB Storage
- Responsive UI Across Devices
- Lightweight GPT-4o Mini Integration
- Efficient Thread-Based Architecture
- Real-Time Image Processing
- Smooth Typing Animation

---

## Author

### Ranita Dutta

- GitHub: https://github.com/ranita872

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- OpenAI
- React
- MongoDB
- Express.js
- Node.js
- Font Awesome
- Render
- Vercel

---

### If you found this project useful, consider giving it a star!

⭐ **Star this repository to support the project and future enhancements!**
