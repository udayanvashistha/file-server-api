const express = require('express');
const { upload } = require('../middleware/upload');
const { authenticateToken } = require('../middleware/auth');
const { addFile, getAllFiles, getFilesByMdsNumber, getFilesByMdsId, getAllMdsNumbers, getAllMdsEntries, getMdsEntryById, getMdsEntryByNumber } = require('../data/files');
const path = require('path');

const router = express.Router();

// POST /api/files/upload - Upload PDF file with MDS number and manual type
router.post('/upload', authenticateToken, upload.single('pdf'), (req, res) => {
  try {
    const { mdsNumber, manualType } = req.body;
    const file = req.file;

    // Validate required fields
    if (!mdsNumber || !manualType) {
      return res.status(400).json({ 
        error: 'MDS number and manual type are required' 
      });
    }

    if (!file) {
      return res.status(400).json({ 
        error: 'PDF file is required' 
      });
    }

    // Save file metadata
    const fileData = addFile(
      mdsNumber,
      manualType,
      file.filename,
      file.originalname
    );

    res.status(201).json({
      message: 'File uploaded successfully',
      data: {
        id: fileData.id,
        mdsId: fileData.mdsId,
        mdsNumber: fileData.mdsNumber,
        manualType: fileData.manualType,
        filename: fileData.filename,
        originalName: fileData.originalName,
        uploadDate: fileData.uploadDate,
        fileUrl: fileData.fileUrl
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/files - Get all files
router.get('/', authenticateToken, (req, res) => {
  try {
    const files = getAllFiles();
    res.json({
      message: 'Files retrieved successfully',
      data: files
    });
  } catch (error) {
    console.error('Get files error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/files/mds/:mdsNumber - Get files by MDS number
router.get('/mds/:mdsNumber', authenticateToken, (req, res) => {
  try {
    const { mdsNumber } = req.params;
    const files = getFilesByMdsNumber(mdsNumber);
    
    res.json({
      message: 'Files retrieved successfully',
      data: files
    });
  } catch (error) {
    console.error('Get files by MDS error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/files/mds - Get all unique MDS numbers
router.get('/mds', authenticateToken, (req, res) => {
  try {
    const mdsNumbers = getAllMdsNumbers();
    
    res.json({
      message: 'MDS numbers retrieved successfully',
      data: mdsNumbers
    });
  } catch (error) {
    console.error('Get MDS numbers error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/files/mds-entries - Get all MDS entries with IDs
router.get('/mds-entries', authenticateToken, (req, res) => {
  try {
    const mdsEntries = getAllMdsEntries();
    
    res.json({
      message: 'MDS entries retrieved successfully',
      data: mdsEntries
    });
  } catch (error) {
    console.error('Get MDS entries error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/files/mds-entries/:mdsId - Get files by MDS ID
router.get('/mds-entries/:mdsId', authenticateToken, (req, res) => {
  try {
    const { mdsId } = req.params;
    const mdsEntry = getMdsEntryById(mdsId);
    
    if (!mdsEntry) {
      return res.status(404).json({ error: 'MDS entry not found' });
    }
    
    const files = getFilesByMdsId(mdsId);
    
    res.json({
      message: 'Files retrieved successfully',
      data: {
        mdsEntry: mdsEntry,
        files: files
      }
    });
  } catch (error) {
    console.error('Get files by MDS ID error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/files/download/:filename - Download file
router.get('/download/:filename', authenticateToken, (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '..', 'uploads', filename);
    
    res.download(filePath, (err) => {
      if (err) {
        res.status(404).json({ error: 'File not found' });
      }
    });
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 