# File Server API

A Node.js/Express.js backend for file upload and management with MDS number tracking.

## 🚀 Features

- **File Upload**: Upload PDF files with MDS number and manual type
- **Authentication**: JWT-based authentication
- **File Management**: Get files by MDS number, download files
- **MDS Tracking**: Get all unique MDS numbers

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login with username/password |
| POST | `/api/files/upload` | Upload PDF with MDS number and manual type |
| GET | `/api/files` | Get all files |
| GET | `/api/files/mds` | Get all unique MDS numbers |
| GET | `/api/files/mds/:mdsNumber` | Get files by MDS number |
| GET | `/api/files/download/:filename` | Download file |

## 🛠️ Local Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd FileServer

# Install dependencies
npm install

# Start the server
npm start

# For development with auto-restart
npm run dev
```

### Environment Variables
Create a `.env` file in the root directory:
```env
PORT=3000
JWT_SECRET=your_jwt_secret_key_here
UPLOAD_DIR=uploads
```

## 🚀 Deployment Options

### Option 1: Railway (Recommended)
1. Push your code to GitHub
2. Go to [Railway.app](https://railway.app)
3. Connect your GitHub repository
4. Add environment variables in Railway dashboard
5. Deploy automatically

### Option 2: Render
1. Push your code to GitHub
2. Go to [Render.com](https://render.com)
3. Create a new Web Service
4. Connect your GitHub repository
5. Set environment variables
6. Deploy

### Option 3: Heroku
1. Push your code to GitHub
2. Install Heroku CLI
3. Create Heroku app
4. Set environment variables
5. Deploy

## 📱 React Native Integration

Update your React Native app's base URL to your deployed server:

```javascript
// For Railway deployment
export const Base_Url = 'https://your-app-name.railway.app/api/';

// For Render deployment
export const Base_Url = 'https://your-app-name.onrender.com/api/';
```

## 🔐 Default Users

- **Username**: `admin`, **Password**: `admin123`
- **Username**: `user`, **Password**: `user123`

## 📁 File Storage

Files are stored in the `uploads/` directory. In production, consider using cloud storage like AWS S3 or Google Cloud Storage.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License 