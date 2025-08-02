# File Server API Documentation

## 📋 **Overview**
A complete REST API for uploading, managing, and retrieving PDF files with MDS numbers and manual types. Includes JWT authentication and file management capabilities.

**Base URL:** `http://localhost:3000`

---

## 🔐 **Authentication**

All protected endpoints require JWT token authentication in the header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 📚 **API Endpoints**

### 1. **Health Check**
**Endpoint:** `GET /health`

**Description:** Check if the server is running

**URL:** `http://localhost:3000/health`

**Headers:** None required

**Response:**
```json
{
  "message": "Server is running",
  "timestamp": "2023-12-21T10:30:45.123Z"
}
```

---

### 2. **Login**
**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate user and get JWT token

**URL:** `http://localhost:3000/api/auth/login`

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

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1NDAyMDA1OSwiZXhwIjoxNzU0MTA2NDU5fQ.qCif2Nq1srTCti891K-8e...",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "admin"
  }
}
```

**Error Responses:**
- **400 Bad Request:** Missing username or password
- **401 Unauthorized:** Invalid credentials

---

### 3. **Upload PDF File**
**Endpoint:** `POST /api/files/upload`

**Description:** Upload a PDF file with MDS number and manual type

**URL:** `http://localhost:3000/api/files/upload`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `mdsNumber` | string | ✅ | MDS number identifier |
| `manualType` | string | ✅ | Type of manual/document |
| `pdf` | file | ✅ | PDF file (max 10MB) |

**Response (201):**
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

**Error Responses:**
- **400 Bad Request:** Missing required fields or invalid file type
- **401 Unauthorized:** Missing or invalid token
- **413 Payload Too Large:** File size exceeds 10MB limit

---

### 4. **Get All Files**
**Endpoint:** `GET /api/files`

**Description:** Retrieve all uploaded files

**URL:** `http://localhost:3000/api/files`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200):**
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
    },
    {
      "id": 1703123456790,
      "mdsNumber": "MDS002",
      "manualType": "Technical Manual",
      "filename": "pdf-1703123456790-987654321.pdf",
      "originalName": "tech-manual.pdf",
      "uploadDate": "2023-12-21T10:35:12.456Z",
      "fileUrl": "/uploads/pdf-1703123456790-987654321.pdf"
    }
  ]
}
```

**Error Responses:**
- **401 Unauthorized:** Missing or invalid token
- **403 Forbidden:** Invalid or expired token

---

### 5. **Get Files by MDS Number**
**Endpoint:** `GET /api/files/mds/{mdsNumber}`

**Description:** Retrieve files filtered by MDS number

**URL:** `http://localhost:3000/api/files/mds/{mdsNumber}`

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mdsNumber` | string | ✅ | MDS number to filter by |

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200):**
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

**Error Responses:**
- **401 Unauthorized:** Missing or invalid token
- **403 Forbidden:** Invalid or expired token

---

### 6. **Download File**
**Endpoint:** `GET /api/files/download/{filename}`

**Description:** Download a specific PDF file

**URL:** `http://localhost:3000/api/files/download/{filename}`

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filename` | string | ✅ | Filename to download |

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200):**
- **Content-Type:** `application/pdf`
- **Content-Disposition:** `attachment; filename="original-name.pdf"`
- **Body:** PDF file content

**Error Responses:**
- **401 Unauthorized:** Missing or invalid token
- **403 Forbidden:** Invalid or expired token
- **404 Not Found:** File not found

---

## 📱 **Mobile App Integration Examples**

### **JavaScript/React Native**
```javascript
class FileServerAPI {
  constructor(baseURL = 'http://localhost:3000') {
    this.baseURL = baseURL;
    this.token = null;
  }

  // Login
  async login(username, password) {
    const response = await fetch(`${this.baseURL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();
      this.token = data.token;
      return data;
    } else {
      throw new Error('Login failed');
    }
  }

  // Upload file
  async uploadFile(mdsNumber, manualType, pdfFile) {
    const formData = new FormData();
    formData.append('mdsNumber', mdsNumber);
    formData.append('manualType', manualType);
    formData.append('pdf', pdfFile);

    const response = await fetch(`${this.baseURL}/api/files/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`
      },
      body: formData
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Upload failed');
    }
  }

  // Get files by MDS
  async getFilesByMDS(mdsNumber) {
    const response = await fetch(`${this.baseURL}/api/files/mds/${mdsNumber}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      throw new Error('Failed to fetch files');
    }
  }

  // Get PDF URL
  getPdfUrl(fileUrl) {
    return `${this.baseURL}${fileUrl}`;
  }
}

// Usage
const api = new FileServerAPI();
await api.login('admin', 'admin123');
const files = await api.getFilesByMDS('MDS001');
files.forEach(file => {
  console.log(`PDF URL: ${api.getPdfUrl(file.fileUrl)}`);
});
```

### **Swift (iOS)**
```swift
class FileServerAPI {
    private let baseURL = "http://localhost:3000"
    private var token: String?
    
    // Login
    func login(username: String, password: String) async throws -> LoginResponse {
        let url = URL(string: "\(baseURL)/api/auth/login")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body = ["username": username, "password": password]
        request.httpBody = try JSONSerialization.data(withJSONObject: body)
        
        let (data, response) = try await URLSession.shared.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse,
              httpResponse.statusCode == 200 else {
            throw NetworkError.invalidResponse
        }
        
        let loginResponse = try JSONDecoder().decode(LoginResponse.self, from: data)
        self.token = loginResponse.token
        return loginResponse
    }
    
    // Get files by MDS
    func getFilesByMDS(mdsNumber: String) async throws -> [FileData] {
        guard let token = token else {
            throw NetworkError.noToken
        }
        
        let url = URL(string: "\(baseURL)/api/files/mds/\(mdsNumber)")!
        var request = URLRequest(url: url)
        request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        
        let (data, response) = try await URLSession.shared.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse,
              httpResponse.statusCode == 200 else {
            throw NetworkError.invalidResponse
        }
        
        let apiResponse = try JSONDecoder().decode(APIResponse.self, from: data)
        return apiResponse.data
    }
    
    // Get PDF URL
    func getPdfUrl(fileUrl: String) -> URL {
        return URL(string: "\(baseURL)\(fileUrl)")!
    }
}

// Data models
struct LoginResponse: Codable {
    let message: String
    let token: String
    let user: User
}

struct User: Codable {
    let id: Int
    let username: String
    let role: String
}

struct FileData: Codable {
    let id: Int64
    let mdsNumber: String
    let manualType: String
    let filename: String
    let originalName: String
    let uploadDate: String
    let fileUrl: String
}

struct APIResponse: Codable {
    let message: String
    let data: [FileData]
}

enum NetworkError: Error {
    case invalidResponse
    case noToken
}
```

### **Kotlin (Android)**
```kotlin
class FileServerAPI(private val baseURL: String = "http://localhost:3000") {
    private var token: String? = null
    
    // Login
    suspend fun login(username: String, password: String): LoginResponse {
        val client = OkHttpClient()
        val json = JSONObject().apply {
            put("username", username)
            put("password", password)
        }
        
        val request = Request.Builder()
            .url("$baseURL/api/auth/login")
            .addHeader("Content-Type", "application/json")
            .post(json.toString().toRequestBody("application/json".toMediaType()))
            .build()
        
        val response = client.newCall(request).execute()
        
        return if (response.isSuccessful) {
            val responseBody = response.body?.string()
            val loginResponse = Gson().fromJson(responseBody, LoginResponse::class.java)
            token = loginResponse.token
            loginResponse
        } else {
            throw Exception("Login failed")
        }
    }
    
    // Get files by MDS
    suspend fun getFilesByMDS(mdsNumber: String): List<FileData> {
        val client = OkHttpClient()
        val request = Request.Builder()
            .url("$baseURL/api/files/mds/$mdsNumber")
            .addHeader("Authorization", "Bearer $token")
            .get()
            .build()
        
        val response = client.newCall(request).execute()
        
        return if (response.isSuccessful) {
            val responseBody = response.body?.string()
            val apiResponse = Gson().fromJson(responseBody, APIResponse::class.java)
            apiResponse.data
        } else {
            throw Exception("Failed to fetch files")
        }
    }
    
    // Get PDF URL
    fun getPdfUrl(fileUrl: String): String {
        return "$baseURL$fileUrl"
    }
}

// Data classes
data class LoginResponse(
    val message: String,
    val token: String,
    val user: User
)

data class User(
    val id: Int,
    val username: String,
    val role: String
)

data class FileData(
    val id: Long,
    val mdsNumber: String,
    val manualType: String,
    val filename: String,
    val originalName: String,
    val uploadDate: String,
    val fileUrl: String
)

data class APIResponse(
    val message: String,
    val data: List<FileData>
)
```

---

## 🧪 **Testing with cURL**

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
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "mdsNumber=MDS001" \
  -F "manualType=User Manual" \
  -F "pdf=@/path/to/your/file.pdf"
```

### **4. Get All Files**
```bash
curl -X GET http://localhost:3000/api/files \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### **5. Get Files by MDS**
```bash
curl -X GET http://localhost:3000/api/files/mds/MDS001 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### **6. Download File**
```bash
curl -X GET http://localhost:3000/api/files/download/filename.pdf \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -o downloaded-file.pdf
```

---

## 📊 **Response Field Descriptions**

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Unique file identifier (timestamp) |
| `mdsNumber` | string | MDS number associated with file |
| `manualType` | string | Type of manual/document |
| `filename` | string | Server-generated unique filename |
| `originalName` | string | Original uploaded filename |
| `uploadDate` | string | ISO 8601 timestamp of upload |
| `fileUrl` | string | Relative URL to access PDF |

---

## 🔒 **Security Features**

- **JWT Authentication:** All file operations require valid token
- **File Type Validation:** Only PDF files accepted
- **File Size Limits:** Maximum 10MB per file
- **CORS Enabled:** Cross-origin requests supported
- **Input Validation:** All inputs validated and sanitized

---

## 📄 **PDF Access Methods**

### **1. Direct Browser Access (No Auth)**
```
http://localhost:3000/uploads/filename.pdf
```

### **2. Download with Authentication**
```
GET /api/files/download/filename.pdf
Authorization: Bearer TOKEN
```

---

## 🚀 **Quick Start**

1. **Start Server:** `npm start`
2. **Login:** `POST /api/auth/login`
3. **Upload File:** `POST /api/files/upload`
4. **Get Files:** `GET /api/files/mds/MDS001`
5. **Access PDF:** Use `fileUrl` in browser or download API

---

## 📝 **Error Codes**

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created (file uploaded) |
| 400 | Bad Request (missing fields, invalid file) |
| 401 | Unauthorized (missing/invalid token) |
| 403 | Forbidden (expired token) |
| 404 | Not Found (file not found) |
| 413 | Payload Too Large (file too big) |
| 500 | Internal Server Error |

---

## 🔧 **Configuration**

Edit `config.js` to customize:
- **Port:** `PORT` (default: 3000)
- **JWT Secret:** `JWT_SECRET`
- **Upload Directory:** `UPLOAD_DIR` (default: 'uploads')

---

## 📞 **Support**

For issues or questions:
- Check server logs for detailed error messages
- Verify JWT token is valid and not expired
- Ensure PDF files are valid and under 10MB limit
- Confirm all required fields are provided in requests 