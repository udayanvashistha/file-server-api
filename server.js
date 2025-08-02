const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config');

// Import routes
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/files');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, config.UPLOAD_DIR)));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.message === 'Only PDF files are allowed') {
    return res.status(400).json({ error: err.message });
  }
  
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(config.PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${config.PORT}`);
  console.log(`Health check: http://localhost:${config.PORT}/health`);
  console.log(`Network access: http://192.168.0.12:${config.PORT}/health`);
  console.log(`API Documentation:`);
  console.log(`  POST /api/auth/login - Login with username and password`);
  console.log(`  POST /api/files/upload - Upload PDF with MDS number and manual type`);
  console.log(`  GET /api/files - Get all files`);
  console.log(`  GET /api/files/mds/:mdsNumber - Get files by MDS number`);
  console.log(`  GET /api/files/download/:filename - Download file`);
}); 