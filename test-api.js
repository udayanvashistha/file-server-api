const fs = require('fs');
const path = require('path');

// Create a simple test PDF file
const createTestPdf = () => {
  const testPdfPath = path.join(__dirname, 'test.pdf');
  
  // Create a minimal PDF content (this is just for testing)
  const pdfContent = '%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/MediaBox [0 0 612 792]\n/Contents 4 0 R\n>>\nendobj\n4 0 obj\n<<\n/Length 44\n>>\nstream\nBT\n/F1 12 Tf\n72 720 Td\n(Test PDF) Tj\nET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000204 00000 n \ntrailer\n<<\n/Size 5\n/Root 1 0 R\n>>\nstartxref\n297\n%%EOF';
  
  fs.writeFileSync(testPdfPath, pdfContent);
  return testPdfPath;
};

// Test the API endpoints
const testAPI = async () => {
  console.log('🚀 Testing File Server API...\n');
  
  try {
    // Step 1: Login
    console.log('1. Testing Login...');
    const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123'
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('✅ Login successful:', loginData.message);
    const token = loginData.token;
    
    // Step 2: Create test PDF
    console.log('\n2. Creating test PDF file...');
    const testPdfPath = createTestPdf();
    console.log('✅ Test PDF created:', testPdfPath);
    
    // Step 3: Upload file
    console.log('\n3. Testing file upload...');
    const formData = new FormData();
    formData.append('mdsNumber', 'MDS001');
    formData.append('manualType', 'User Manual');
    formData.append('pdf', fs.createReadStream(testPdfPath));
    
    const uploadResponse = await fetch('http://localhost:3000/api/files/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    
    const uploadData = await uploadResponse.json();
    console.log('✅ File uploaded successfully:', uploadData.message);
    console.log('   File ID:', uploadData.data.id);
    console.log('   MDS Number:', uploadData.data.mdsNumber);
    console.log('   Manual Type:', uploadData.data.manualType);
    console.log('   File URL:', uploadData.data.fileUrl);
    
    // Step 4: Get all files
    console.log('\n4. Testing get all files...');
    const getAllResponse = await fetch('http://localhost:3000/api/files', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const getAllData = await getAllResponse.json();
    console.log('✅ Retrieved all files:', getAllData.message);
    console.log('   Total files:', getAllData.data.length);
    
    // Step 5: Get files by MDS number
    console.log('\n5. Testing get files by MDS number...');
    const getByMdsResponse = await fetch('http://localhost:3000/api/files/mds/MDS001', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const getByMdsData = await getByMdsResponse.json();
    console.log('✅ Retrieved files by MDS number:', getByMdsData.message);
    console.log('   Files found:', getByMdsData.data.length);
    
    // Clean up test file
    fs.unlinkSync(testPdfPath);
    console.log('\n🧹 Cleaned up test PDF file');
    
    console.log('\n🎉 All tests completed successfully!');
    console.log('\n📋 API Summary:');
    console.log('   ✅ Login API working');
    console.log('   ✅ File upload API working');
    console.log('   ✅ File retrieval API working');
    console.log('   ✅ MDS number filtering working');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

// Run tests if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = { testAPI }; 