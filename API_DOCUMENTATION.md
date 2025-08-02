# 📚 Complete API Documentation

## 🌐 **Base URL**
```
https://file-server-api-production.up.railway.app/api/
```

## 🔐 **Authentication**
All endpoints (except login) require JWT token in Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 📋 **API Endpoints**

### **1. Authentication**

#### **POST /api/auth/login**
Login to get JWT token.

**URL:** `https://file-server-api-production.up.railway.app/api/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "admin"
  }
}
```

**Default Users:**
- **Username:** `admin`, **Password:** `admin123`
- **Username:** `user`, **Password:** `user123`

---

### **2. File Management**

#### **POST /api/files/upload**
Upload PDF file with MDS number and manual type.

**URL:** `https://file-server-api-production.up.railway.app/api/files/upload`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: multipart/form-data
```

**Form Data:**
- `mdsNumber`: MDS number (string) - e.g., "MDS2025/07-test"
- `manualType`: Manual type (string) - e.g., "spare_manual", "operation_manual"
- `pdf`: PDF file

**Response:**
```json
{
  "message": "File uploaded successfully",
  "data": {
    "id": 1754106940840,
    "mdsId": "mds_1754106940840_abc123def",
    "mdsNumber": "MDS2025/07-test",
    "manualType": "spare_manual",
    "filename": "pdf-1754106940815-733789080.pdf",
    "originalName": "Spare Parts Manual.pdf",
    "uploadDate": "2025-08-02T03:55:40.840Z",
    "fileUrl": "/uploads/pdf-1754106940815-733789080.pdf"
  }
}
```

#### **GET /api/files**
Get all uploaded files with MDS IDs.

**URL:** `https://file-server-api-production.up.railway.app/api/files`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "message": "Files retrieved successfully",
  "data": [
    {
      "id": 1754106940840,
      "mdsId": "mds_1754106940840_abc123def",
      "mdsNumber": "MDS2025/07-test",
      "manualType": "spare_manual",
      "filename": "pdf-1754106940815-733789080.pdf",
      "originalName": "Spare Parts Manual.pdf",
      "uploadDate": "2025-08-02T03:55:40.840Z",
      "fileUrl": "/uploads/pdf-1754106940815-733789080.pdf"
    },
    {
      "id": 1754107000000,
      "mdsId": "mds_1754106940840_abc123def",
      "mdsNumber": "MDS2025/07-test",
      "manualType": "operation_manual",
      "filename": "pdf-1754107000000-123456789.pdf",
      "originalName": "Operation Manual.pdf",
      "uploadDate": "2025-08-02T04:00:00.000Z",
      "fileUrl": "/uploads/pdf-1754107000000-123456789.pdf"
    }
  ]
}
```

---

### **3. MDS Management**

#### **GET /api/files/mds**
Get all unique MDS numbers.

**URL:** `https://file-server-api-production.up.railway.app/api/files/mds`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "message": "MDS numbers retrieved successfully",
  "data": ["MDS2025/07-test", "1234", "5678"]
}
```

#### **GET /api/files/mds/:mdsNumber**
Get files by specific MDS number.

**URL:** `https://file-server-api-production.up.railway.app/api/files/mds/MDS2025%2F07-test`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "message": "Files retrieved successfully",
  "data": [
    {
      "id": 1754106940840,
      "mdsId": "mds_1754106940840_abc123def",
      "mdsNumber": "MDS2025/07-test",
      "manualType": "spare_manual",
      "filename": "pdf-1754106940815-733789080.pdf",
      "originalName": "Spare Parts Manual.pdf",
      "uploadDate": "2025-08-02T03:55:40.840Z",
      "fileUrl": "/uploads/pdf-1754106940815-733789080.pdf"
    },
    {
      "id": 1754107000000,
      "mdsId": "mds_1754106940840_abc123def",
      "mdsNumber": "MDS2025/07-test",
      "manualType": "operation_manual",
      "filename": "pdf-1754107000000-123456789.pdf",
      "originalName": "Operation Manual.pdf",
      "uploadDate": "2025-08-02T04:00:00.000Z",
      "fileUrl": "/uploads/pdf-1754107000000-123456789.pdf"
    }
  ]
}
```

---

### **4. MDS ID System (NEW)**

#### **GET /api/files/mds-entries**
Get all MDS entries with their unique IDs.

**URL:** `https://file-server-api-production.up.railway.app/api/files/mds-entries`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "message": "MDS entries retrieved successfully",
  "data": [
    {
      "_id": "mds_1754106940840_abc123def",
      "mdsNumber": "MDS2025/07-test",
      "createdAt": "2025-08-02T03:55:40.840Z",
      "fileCount": 2
    },
    {
      "_id": "mds_1754107000000_xyz789ghi",
      "mdsNumber": "1234",
      "createdAt": "2025-08-02T04:00:00.000Z",
      "fileCount": 1
    }
  ]
}
```

#### **GET /api/files/mds-entries/:mdsId**
Get files by MDS ID (clean URL, no special characters).

**URL:** `https://file-server-api-production.up.railway.app/api/files/mds-entries/mds_1754106940840_abc123def`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "message": "Files retrieved successfully",
  "data": {
    "mdsEntry": {
      "_id": "mds_1754106940840_abc123def",
      "mdsNumber": "MDS2025/07-test",
      "createdAt": "2025-08-02T03:55:40.840Z"
    },
    "files": [
      {
        "id": 1754106940840,
        "mdsId": "mds_1754106940840_abc123def",
        "mdsNumber": "MDS2025/07-test",
        "manualType": "spare_manual",
        "filename": "pdf-1754106940815-733789080.pdf",
        "originalName": "Spare Parts Manual.pdf",
        "uploadDate": "2025-08-02T03:55:40.840Z",
        "fileUrl": "/uploads/pdf-1754106940815-733789080.pdf"
      },
      {
        "id": 1754107000000,
        "mdsId": "mds_1754106940840_abc123def",
        "mdsNumber": "MDS2025/07-test",
        "manualType": "operation_manual",
        "filename": "pdf-1754107000000-123456789.pdf",
        "originalName": "Operation Manual.pdf",
        "uploadDate": "2025-08-02T04:00:00.000Z",
        "fileUrl": "/uploads/pdf-1754107000000-123456789.pdf"
      }
    ]
  }
}
```

---

### **5. File Download**

#### **GET /api/files/download/:filename**
Download a specific file.

**URL:** `https://file-server-api-production.up.railway.app/api/files/download/pdf-1754106940815-733789080.pdf`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:** File download

---

## 📱 **React Native Integration**

### **Base Configuration:**
```javascript
export const Base_Url = 'https://file-server-api-production.up.railway.app/api/';
```

### **API Functions:**
```javascript
import { getApi, postApi } from "../base.api";

// Login
export const loginUser = async (username, password) => {
    const response = await postApi('auth/login', { username, password });
    return response;
}

// Upload file
export const uploadFileApi = async (file, mdsNumber, manualType) => {
    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('mdsNumber', mdsNumber);
    formData.append('manualType', manualType);
    
    const response = await fetch(`${Base_Url}files/upload`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${await getToken()}`
        },
        body: formData
    });
    
    return response.json();
}

// Get all files
export const getAllFiles = async() => {
    const data = await getApi('files');
    return data;
}

// Get all MDS numbers
export const getAllMdsNumbers = async() => {
    const data = await getApi('files/mds');
    return data;
}

// Get files by MDS number
export const getFilesByMds = async(mdsNumber) => {
    const encodedMds = encodeURIComponent(mdsNumber);
    const data = await getApi(`files/mds/${encodedMds}`);
    return data;
}

// Get all MDS entries with IDs
export const getAllMdsEntries = async() => {
    const data = await getApi('files/mds-entries');
    return data;
}

// Get files by MDS ID
export const getFilesByMdsId = async(mdsId) => {
    const data = await getApi(`files/mds-entries/${mdsId}`);
    return data;
}
```

---

## 🧪 **Testing with cURL**

### **Login:**
```bash
curl -X POST https://file-server-api-production.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

### **Upload File:**
```bash
curl -X POST https://file-server-api-production.up.railway.app/api/files/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "mdsNumber=MDS2025/07-test" \
  -F "manualType=spare_manual" \
  -F "pdf=@/path/to/your/file.pdf"
```

### **Get All Files:**
```bash
curl -X GET https://file-server-api-production.up.railway.app/api/files \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### **Get All MDS Numbers:**
```bash
curl -X GET https://file-server-api-production.up.railway.app/api/files/mds \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### **Get Files by MDS Number:**
```bash
curl -X GET "https://file-server-api-production.up.railway.app/api/files/mds/MDS2025%2F07-test" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### **Get All MDS Entries:**
```bash
curl -X GET https://file-server-api-production.up.railway.app/api/files/mds-entries \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### **Get Files by MDS ID:**
```bash
curl -X GET https://file-server-api-production.up.railway.app/api/files/mds-entries/mds_1754106940840_abc123def \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📋 **API Summary**

| Method | Endpoint | Description | Includes mdsId |
|--------|----------|-------------|----------------|
| POST | `/auth/login` | Login | ❌ |
| POST | `/files/upload` | Upload PDF | ✅ |
| GET | `/files` | Get all files | ✅ |
| GET | `/files/mds` | Get all MDS numbers | ❌ |
| GET | `/files/mds/:mdsNumber` | Get files by MDS number | ✅ |
| GET | `/files/mds-entries` | Get all MDS entries with IDs | ✅ |
| GET | `/files/mds-entries/:mdsId` | Get files by MDS ID | ✅ |
| GET | `/files/download/:filename` | Download file | ❌ |

---

## 🔄 **What's New**

### **MDS ID System:**
- ✅ **Unique IDs**: Each MDS gets a unique `_id`
- ✅ **Clean URLs**: No URL encoding needed for MDS IDs
- ✅ **File Count**: Know how many files each MDS has
- ✅ **Created Date**: Track when MDS was first added

### **Enhanced Responses:**
- ✅ **mdsId**: All file responses now include the MDS ID
- ✅ **Better Organization**: Group files by MDS ID
- ✅ **Cleaner URLs**: Use MDS IDs instead of special characters

---

## 🚀 **Live Server Status**

**Health Check:** `https://file-server-api-production.up.railway.app/health`

**Status:** ✅ **ACTIVE**

**Last Updated:** August 2, 2025 