const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
  companyName: {
    type: String,
    required: true,
    unique: true
  },
  manualTypes: [{
    type: String,
    enum: ['spare_manual', 'operation_manual', 'maintenance_manual', 'user_manual']
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Company', companySchema); 