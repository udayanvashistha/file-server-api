require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key_here',
  UPLOAD_DIR: process.env.UPLOAD_DIR || 'uploads',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://your_username:your_password@your_cluster.mongodb.net/file-server?retryWrites=true&w=majority'
}; 