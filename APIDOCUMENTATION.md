# Student Management API

A backend REST API for managing student accounts, authentication, profiles, role-based authorization, password reset, and profile image uploads.

---

## Base URL

```text
http://localhost:4000/api/v1/students
```

---

# Features

* Student Registration
* Student Login
* JWT Authentication
* HTTP-only Cookie Authentication
* Get Logged-in Student Profile
* Update Student
* Get Student by ID
* Get All Students
* Pagination
* Search
* Branch Filtering
* Sorting
* Role-based Authorization
* Admin-only Student Deletion
* Student Logout
* Forgot Password
* Reset Password
* Profile Image Upload
* Cloudinary Image Storage
* MongoDB Database

---

# Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Cookie Parser
* Multer
* Cloudinary
* Nodemailer
* dotenv
* Postman

---

# Authentication

This API uses **JWT-based authentication**.

After successful login, the JWT token is stored inside an HTTP-only cookie:

```text
token
```

Protected APIs automatically read this cookie through the authentication middleware.

### Protected APIs

```text
GET    /profile
PUT    /profile-image
DELETE /:id       (Admin only)
```

---

# API Endpoints

## 1. Create Student

Creates a new student account.

### Method

```text
POST
```

### Endpoint

```text
/create
```

### Authentication

```text
Not Required
```

### Content-Type

```text
application/json
```

### Request Body

```json
{
    "name": "Tisha Sahu",
    "email": "tisha@gmail.com",
    "password": "123456",
    "enrollmentNo": "IT123",
    "branch": "IT"
}
```

### Fields

| Field        | Type   | Required |
| ------------ | ------ | -------- |
| name         | String | Yes      |
| email        | String | Yes      |
| password     | String | Yes      |
| enrollmentNo | String | Yes      |
| branch       | String | Yes      |

### Description

The password is hashed using bcrypt before being stored in MongoDB.

The default role of a newly created student is:

```text
student
```

### Success Response

```json
{
    "success": true,
    "message": "Student created successfully"
}
```

---

# 2. Login Student

Authenticates a student and generates a JWT token.

### Method

```text
POST
```

### Endpoint

```text
/login
```

### Authentication

```text
Not Required
```

### Content-Type

```text
application/json
```

### Request Body

```json
{
    "email": "tisha@gmail.com",
    "password": "123456"
}
```

### Success Response

```json
{
    "success": true,
    "message": "Login successfully"
}
```

### Authentication Flow

```text
Email + Password
       ↓
Find User
       ↓
Compare Password using bcrypt
       ↓
Generate JWT
       ↓
Store JWT in HTTP-only Cookie
       ↓
User Authenticated
```

---

# 3. Get Logged-in Student Profile

Returns the profile of the currently authenticated student.

### Method

```text
GET
```

### Endpoint

```text
/profile
```

### Authentication

```text
Required
```

### Content-Type

```text
application/json
```

### Success Response

```json
{
    "success": true,
    "message": "login fetch successfully",
    "data": {
        "_id": "student_id",
        "name": "Tisha Sahu",
        "email": "tisha@gmail.com",
        "profileImage": "https://res.cloudinary.com/...",
        "enrollmentNo": "IT123",
        "branch": "IT",
        "role": "student"
    }
}
```

The password is excluded from the response.

---

# 4. Upload Profile Image

Uploads or updates the profile image of the currently logged-in student.

### Method

```text
PUT
```

### Endpoint

```text
/profile-image
```

### Authentication

```text
Required
```

### Content-Type

```text
multipart/form-data
```

### Form Data

| Key          | Type | Required |
| ------------ | ---- | -------- |
| profileImage | File | Yes      |

### Postman Configuration

```text
Body
 ↓
form-data
 ↓
Key: profileImage
 ↓
Type: File
 ↓
Select Image
```

### Upload Flow

```text
Image
  ↓
Multer
  ↓
req.file
  ↓
Cloudinary
  ↓
secure_url
  ↓
MongoDB
  ↓
profileImage
```

The image itself is stored on Cloudinary.

Only the Cloudinary URL is stored in MongoDB.

### Success Response

```json
{
    "success": true,
    "message": "file upload successfully",
    "image_url": "https://res.cloudinary.com/..."
}
```

---

# 5. Get All Students

Returns a list of students.

This API supports:

* Pagination
* Search
* Branch filtering
* Sorting

### Method

```text
GET
```

### Endpoint

```text
/list
```

### Authentication

```text
Not Required
```

### Query Parameters

| Parameter | Description                 |
| --------- | --------------------------- |
| page      | Page number                 |
| limit     | Number of students per page |
| search    | Search students             |
| branch    | Filter students by branch   |
| sort      | Field used for sorting      |
| order     | Sorting order               |

### Example

```text
/list?page=1&limit=10
```

### Example with Search

```text
/list?search=tisha
```

### Example with Branch Filt
