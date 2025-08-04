const mongoose = require('mongoose');

const mdsEntrySchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  mdsNumber: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MdsEntry', mdsEntrySchema); 