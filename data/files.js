// In-memory file storage (in production, use a database)
const files = [];
const mdsEntries = []; // Store MDS entries with IDs

const addFile = (mdsNumber, manualType, filename, originalName) => {
  // Check if MDS already exists, if not create new MDS entry
  let mdsEntry = mdsEntries.find(mds => mds.mdsNumber === mdsNumber);
  
  if (!mdsEntry) {
    mdsEntry = {
      _id: `mds_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      mdsNumber: mdsNumber,
      createdAt: new Date().toISOString()
    };
    mdsEntries.push(mdsEntry);
  }

  const fileData = {
    id: Date.now(),
    mdsId: mdsEntry._id,
    mdsNumber,
    manualType,
    filename,
    originalName,
    uploadDate: new Date().toISOString(),
    fileUrl: `/uploads/${filename}`
  };
  files.push(fileData);
  return fileData;
};

const getAllFiles = () => {
  return files;
};

const getFileById = (id) => {
  return files.find(file => file.id === id);
};

const getFilesByMdsNumber = (mdsNumber) => {
  return files.filter(file => file.mdsNumber === mdsNumber);
};

const getFilesByMdsId = (mdsId) => {
  return files.filter(file => file.mdsId === mdsId);
};

const getAllMdsNumbers = () => {
  // Get unique MDS numbers from all files
  const uniqueMdsNumbers = [...new Set(files.map(file => file.mdsNumber))];
  return uniqueMdsNumbers.sort(); // Sort alphabetically
};

const getAllMdsEntries = () => {
  // Return all MDS entries with their IDs
  return mdsEntries.map(mds => ({
    _id: mds._id,
    mdsNumber: mds.mdsNumber,
    createdAt: mds.createdAt,
    fileCount: files.filter(file => file.mdsId === mds._id).length
  }));
};

const getMdsEntryById = (mdsId) => {
  return mdsEntries.find(mds => mds._id === mdsId);
};

const getMdsEntryByNumber = (mdsNumber) => {
  return mdsEntries.find(mds => mds.mdsNumber === mdsNumber);
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
  getMdsEntryByNumber
}; 