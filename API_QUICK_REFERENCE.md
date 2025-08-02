# API Quick Reference

## 🚀 **Base URL:** `http://localhost:3000`

---

## 📋 **All Endpoints Summary**

| # | Method | Endpoint | Auth | Description |
|---|--------|----------|------|-------------|
| 1 | GET | `/health` | ❌ | Health check |
| 2 | POST | `/api/auth/login` | ❌ | Login & get token |
| 3 | POST | `/api/files/upload` | ✅ | Upload PDF file |
| 4 | GET | `/api/files` | ✅ | Get all files |
| 5 | GET | `/api/files/mds/{mdsNumber}` | ✅ | Get files by MDS |
| 6 | GET | `/api/files/download/{filename}` | ✅ | Download file |

---

## 🔐 **Authentication**

**Header:** `Authorization: Bearer YOUR_JWT_TOKEN`

**Get Token:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

---

## 📝 **Request Examples**

### **1. Health Check**
```bash
curl -X GET http://localhost:3000/health
```

### **2. Login**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

### **3. Upload File**
```bash
curl -X POST http://localhost:3000/api/files/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "mdsNumber=MDS001" \
  -F "manualType=User Manual" \
  -F "pdf=@/path/to/file.pdf"
```

### **4. Get All Files**
```bash
curl -X GET http://localhost:3000/api/files \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### **5. Get Files by MDS**
```bash
curl -X GET http://localhost:3000/api/files/mds/MDS001 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### **6. Download File**
```bash
curl -X GET http://localhost:3000/api/files/download/filename.pdf \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -o downloaded-file.pdf
```

---

## 📱 **Mobile Integration**

### **JavaScript/React Native**
```javascript
// Login
const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'admin', password: 'admin123' })
});
const { token } = await loginResponse.json();

// Get files by MDS
const filesResponse = await fetch('http://localhost:3000/api/files/mds/MDS001', {
  headers: { 'Authorization': `Bearer ${token}` }
});
const files = await filesResponse.json();
```

### **Swift (iOS)**
```swift
// Login
let loginURL = URL(string: "http://localhost:3000/api/auth/login")!
var request = URLRequest(url: loginURL)
request.httpMethod = "POST"
request.setValue("application/json", forHTTPHeaderField: "Content-Type")
request.httpBody = try JSONSerialization.data(withJSONObject: [
    "username": "admin", 
    "password": "admin123"
])

// Get files by MDS
let filesURL = URL(string: "http://localhost:3000/api/files/mds/MDS001")!
var filesRequest = URLRequest(url: filesURL)
filesRequest.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
```

### **Kotlin (Android)**
```kotlin
// Login
val loginRequest = Request.Builder()
    .url("http://localhost:3000/api/auth/login")
    .addHeader("Content-Type", "application/json")
    .post(jsonBody)
    .build()

// Get files by MDS
val filesRequest = Request.Builder()
    .url("http://localhost:3000/api/files/mds/MDS001")
    .addHeader("Authorization", "Bearer $token")
    .get()
    .build()
```

---

## 📄 **Response Examples**

### **Login Response**
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

### **File Upload Response**
```json
{
  "message": "File uploaded successfully",
  "data": {
    "id": 1703123456789,
    "mdsNumber": "MDS001",
    "manualType": "User Manual",
    "filename": "pdf-1703123456789-123456789.pdf",
    "originalName": "document.pdf",
    "uploadDate": "2023-12-21T10:30:45.123Z",
    "fileUrl": "/uploads/pdf-1703123456789-123456789.pdf"
  }
}
```

### **Get Files Response**
```json
{
  "message": "Files retrieved successfully",
  "data": [
    {
      "id": 1703123456789,
      "mdsNumber": "MDS001",
      "manualType": "User Manual",
      "filename": "pdf-1703123456789-123456789.pdf",
      "originalName": "document.pdf",
      "uploadDate": "2023-12-21T10:30:45.123Z",
      "fileUrl": "/uploads/pdf-1703123456789-123456789.pdf"
    }
  ]
}
```

---

## 🔗 **PDF Access URLs**

### **Direct Browser Access (No Auth)**
```
http://localhost:3000/uploads/filename.pdf
```

### **Download with Auth**
```
GET http://localhost:3000/api/files/download/filename.pdf
Authorization: Bearer TOKEN
```

---

## ⚠️ **Error Codes**

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 413 | File Too Large |
| 500 | Server Error |

---

## 🔧 **Configuration**

**File:** `config.js`
```javascript
module.exports = {
  PORT: 3000,
  JWT_SECRET: 'your_jwt_secret_key_here',
  UPLOAD_DIR: 'uploads'
};
```

---

## 📞 **Default Users**

| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | admin |
| user | user123 | user |

---

## 🚀 **Quick Start**

1. **Start server:** `npm start`
2. **Login:** `POST /api/auth/login`
3. **Upload:** `POST /api/files/upload`
4. **Get files:** `GET /api/files/mds/MDS001`
5. **Access PDF:** Use `fileUrl` in browser

---

## 📚 **Full Documentation**

See `API_DOCUMENTATION.md` for complete details with examples and integration code. 