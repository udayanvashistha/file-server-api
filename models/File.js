const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  mdsId: {
    type: String,
    required: true
  },
  mdsNumber: {
    type: String,
    required: true
  },
  companyId: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  manualType: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  fileUrl: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('File', fileSchema); 