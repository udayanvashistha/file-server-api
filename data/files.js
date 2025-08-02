// MongoDB models
const File = require('../models/File');
const MdsEntry = require('../models/MdsEntry');
const Company = require('../models/Company');

const addFile = async (mdsNumber, companyName, manualType, filename, originalName) => {
  try {
    // Check if MDS already exists, if not create new MDS entry
    let mdsEntry = await MdsEntry.findOne({ mdsNumber });
    
    if (!mdsEntry) {
      mdsEntry = new MdsEntry({
        _id: `mds_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        mdsNumber: mdsNumber
      });
      await mdsEntry.save();
    }

    // Check if Company already exists, if not create new Company entry
    let company = await Company.findOne({ companyName });
    
    if (!company) {
      company = new Company({
        _id: `company_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        companyName: companyName
      });
      await company.save();
    }

    const fileData = new File({
      mdsId: mdsEntry._id,
      mdsNumber,
      companyId: company._id,
      companyName,
      manualType,
      filename,
      originalName,
      fileUrl: `/uploads/${filename}`
    });
    
    return await fileData.save();
  } catch (error) {
    console.error('Error adding file:', error);
    throw error;
  }
};

const getAllFiles = async () => {
  try {
    return await File.find().sort({ uploadDate: -1 });
  } catch (error) {
    console.error('Error getting all files:', error);
    throw error;
  }
};

const getFileById = async (id) => {
  try {
    return await File.findById(id);
  } catch (error) {
    console.error('Error getting file by ID:', error);
    throw error;
  }
};

const getFilesByMdsNumber = async (mdsNumber) => {
  try {
    return await File.find({ mdsNumber }).sort({ uploadDate: -1 });
  } catch (error) {
    console.error('Error getting files by MDS number:', error);
    throw error;
  }
};

const getFilesByMdsId = async (mdsId) => {
  try {
    return await File.find({ mdsId }).sort({ uploadDate: -1 });
  } catch (error) {
    console.error('Error getting files by MDS ID:', error);
    throw error;
  }
};

const getAllMdsNumbers = async () => {
  try {
    const files = await File.find();
    const uniqueMdsNumbers = [...new Set(files.map(file => file.mdsNumber))];
    return uniqueMdsNumbers.sort();
  } catch (error) {
    console.error('Error getting all MDS numbers:', error);
    throw error;
  }
};

const getAllMdsEntries = async () => {
  try {
    // Get all companies first
    const companies = await Company.find().sort({ createdAt: -1 });
    const result = [];
    
    for (const company of companies) {
      // Get all MDS entries that have files for this company
      const companyFiles = await File.find({ companyId: company._id });
      const mdsIds = [...new Set(companyFiles.map(file => file.mdsId))];
      
      const mdsEntries = [];
      for (const mdsId of mdsIds) {
        const mdsEntry = await MdsEntry.findById(mdsId);
        if (mdsEntry) {
          const fileCount = await File.countDocuments({ 
            mdsId: mdsId, 
            companyId: company._id 
          });
          
          mdsEntries.push({
            _id: mdsEntry._id,
            mdsNumber: mdsEntry.mdsNumber,
            createdAt: mdsEntry.createdAt,
            fileCount: fileCount
          });
        }
      }
      
      if (mdsEntries.length > 0) {
        result.push({
          companyId: company._id,
          companyName: company.companyName,
          mdsEntries: mdsEntries
        });
      }
    }
    
    return result;
  } catch (error) {
    console.error('Error getting all MDS entries:', error);
    throw error;
  }
};

const getMdsEntryById = async (mdsId) => {
  try {
    return await MdsEntry.findById(mdsId);
  } catch (error) {
    console.error('Error getting MDS entry by ID:', error);
    throw error;
  }
};

const getMdsEntryByNumber = async (mdsNumber) => {
  try {
    return await MdsEntry.findOne({ mdsNumber });
  } catch (error) {
    console.error('Error getting MDS entry by number:', error);
    throw error;
  }
};

// Company functions
const getAllCompanies = async () => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });
    const result = [];
    
    for (const company of companies) {
      const fileCount = await File.countDocuments({ companyId: company._id });
      
      // Get unique manual types for this company
      const manualTypes = await File.distinct('manualType', { companyId: company._id });
      
      result.push({
        _id: company._id,
        companyName: company.companyName,
        createdAt: company.createdAt,
        fileCount: fileCount,
        manualTypes: manualTypes
      });
    }
    
    return result;
  } catch (error) {
    console.error('Error getting all companies:', error);
    throw error;
  }
};

const getCompanyById = async (companyId) => {
  try {
    return await Company.findById(companyId);
  } catch (error) {
    console.error('Error getting company by ID:', error);
    throw error;
  }
};

const getFilesByCompanyId = async (companyId) => {
  try {
    return await File.find({ companyId }).sort({ uploadDate: -1 });
  } catch (error) {
    console.error('Error getting files by company ID:', error);
    throw error;
  }
};

// Get MDS entries for a specific company
const getMdsEntriesByCompanyId = async (companyId) => {
  try {
    const company = await Company.findById(companyId);
    if (!company) {
      throw new Error('Company not found');
    }
    
    // Get all MDS entries that have files for this company
    const companyFiles = await File.find({ companyId: companyId });
    const mdsIds = [...new Set(companyFiles.map(file => file.mdsId))];
    
    const mdsEntries = [];
    for (const mdsId of mdsIds) {
      const mdsEntry = await MdsEntry.findById(mdsId);
      if (mdsEntry) {
        const fileCount = await File.countDocuments({ 
          mdsId: mdsId, 
          companyId: companyId 
        });
        
        mdsEntries.push({
          _id: mdsEntry._id,
          mdsNumber: mdsEntry.mdsNumber,
          createdAt: mdsEntry.createdAt,
          fileCount: fileCount
        });
      }
    }
    
    return {
      companyId: company._id,
      companyName: company.companyName,
      mdsEntries: mdsEntries
    };
  } catch (error) {
    console.error('Error getting MDS entries by company ID:', error);
    throw error;
  }
};

module.exports = {
  addFile,
  getAllFiles,
  getFileById,
  getFilesByMdsNumber,
  getFilesByMdsId,
  getAllMdsNumbers,
  getAllMdsEntries,
  getMdsEntryById,
  getMdsEntryByNumber,
  getAllCompanies,
  getCompanyById,
  getFilesByCompanyId,
  getMdsEntriesByCompanyId
}; 