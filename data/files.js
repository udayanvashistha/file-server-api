// In-memory file storage (in production, use a database)
const files = [];

const addFile = (mdsNumber, manualType, filename, originalName) => {
  const fileData = {
    id: Date.now(),
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

const getAllMdsNumbers = () => {
  // Get unique MDS numbers from all files
  const uniqueMdsNumbers = [...new Set(files.map(file => file.mdsNumber))];
  return uniqueMdsNumbers.sort(); // Sort alphabetically
};

module.exports = {
  addFile,
  getAllFiles,
  getFileById,
  getFilesByMdsNumber,
  getAllMdsNumbers
}; 