# Real-time Collaboration Tool API Documentation

Welcome to the API documentation for the Real-time Collaboration Tool backend. This guide provides detailed information on all available endpoints, request/response formats, authentication, and usage examples.

---

## Base URL

```
http://localhost:3001/api
```

---

## Authentication

> **Most endpoints require authentication.**
> - Use the `Authorization: Bearer <token>` header or a `token` header.
> - Obtain a token via the `/auth/login` endpoint.

---

## Endpoints Overview

| Resource | Method | Path | Description |
|----------|--------|------|-------------|
| Auth     | POST   | /auth/signup         | Register a new user           |
| Auth     | POST   | /auth/admin/signup   | Register a new admin          |
| Auth     | POST   | /auth/login          | User login                    |
| Auth     | GET    | /auth/refresh-token  | Refresh access token          |
| Users    | GET    | /user/detail         | Get user details              |
| Users    | PUT    | /user/update         | Update user profile           |
| Users    | PUT    | /user/reset-password | Reset user password           |
| Folder   | POST   | /folder/new          | Create a new folder           |
| Folder   | GET    | /folder/list         | List all folders              |
| Folder   | GET    | /folder/{id}         | Get folder by ID              |
| Folder   | PUT    | /folder/{id}         | Update folder                 |
| Folder   | DELETE | /folder/{id}         | Delete folder                 |
| Page     | POST   | /page/new            | Create a new page             |
| Page     | PUT    | /page/{id}           | Update page                   |
| Page     | GET    | /page/{id}           | Get page by ID                |
| Page     | GET    | /page/all/{spaceId}  | List all pages in a space     |
| Page     | DELETE | /page/{id}           | Delete page                   |
| Space    | POST   | /space/create        | Create a new space            |
| Space    | GET    | /space/list          | List all spaces               |
| Space    | GET    | /space/{id}          | Get space by ID               |
| Space    | PUT    | /space/{id}          | Update space                  |
| Space    | DELETE | /space/{id}          | Delete space                  |

---

# Endpoint Details

## Auth

### Signup
- **POST** `/auth/signup`
- **Description:** Register a new user.
- **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword",
  "username": "yourusername"
}
```
- **Success Response:**
```json
{
  "status": 200,
  "success": true,
  "message": "Registration successful.",
  "data": {
    "id": 1,
    "username": "yourusername",
    "email": "user@example.com",
    "role": "user",
    "createdAt": "2024-06-01T12:00:00.000Z",
    "updatedAt": "2024-06-01T12:00:00.000Z"
  }
}
```
- **Error Response:**
```json
{
  "status": 400,
  "success": false,
  "message": "Email already in use."
}
```

---

### Login
- **POST** `/auth/login`
- **Description:** Authenticate user and receive tokens.
- **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```
- **Success Response:**
```json
{
  "status": 200,
  "success": true,
  "message": "Login successful.",
  "data": {
    "id": 1,
    "username": "yourusername",
    "email": "user@example.com",
    "role": "user",
    "createdAt": "2024-06-01T12:00:00.000Z",
    "updatedAt": "2024-06-01T12:00:00.000Z"
  }
}
```
- **Error Response:**
```json
{
  "status": 400,
  "success": false,
  "message": "Invalid email or password."
}
```
- **Notes:**
  - The response headers will include `token` and `x-refresh-token`.

---

### Refresh Token
- **GET** `/auth/refresh-token`
- **Description:** Get a new access token using a refresh token.
- **Headers:**
  - `Authorization: Bearer <refresh_token>`
- **Success Response:**
```json
{
  "status": 200,
  "success": true,
  "message": "Token refreshed successfully."
}
```
- **Error Response:**
```json
{
  "status": 401,
  "success": false,
  "message": "Unauthorized."
}
```

---

## Users

> **All endpoints require authentication.**

### Get User Detail
- **GET** `/user/detail`
- **Description:** Fetch the authenticated user's details.
- **Success Response:**
```json
{
  "status": 200,
  "success": true,
  "message": "User details fetched successfully.",
  "data": {
    "id": 1,
    "username": "yourusername",
    "email": "user@example.com",
    "role": "user",
    "createdAt": "2024-06-01T12:00:00.000Z",
    "updatedAt": "2024-06-01T12:00:00.000Z"
  }
}
```

### Update User
- **PUT** `/user/update`
- **Description:** Update the user's profile.
- **Request Body:**
```json
{
  "username": "newusername"
}
```
- **Success Response:**
```json
{
  "status": 200,
  "success": true,
  "message": "User updated successfully."
}
```
- **Error Response:**
```json
{
  "status": 400,
  "success": false,
  "message": "Required Keys: username"
}
```

### Reset Password
- **PUT** `/user/reset-password`
- **Description:** Change the user's password.
- **Request Body:**
```json
{
  "password": "NewPassword123"
}
```
- **Success Response:**
```json
{
  "status": 200,
  "success": true,
  "message": "Password reset successfully."
}
```

---

## Folder

> **All endpoints require authentication.**

### Create Folder
- **POST** `/folder/new`
- **Description:** Create a new folder in a space.
- **Request Body:**
```json
{
  "name": "Project Docs",
  "spaceId": 1,
  "parentFolderId": null,
  "description": "Documentation folder."
}
```
- **Success Response:**
```json
{
  "status": 200,
  "success": true,
  "message": "Folder created successfully.",
  "data": {
    "id": 1,
    "name": "Project Docs",
    "description": "Documentation folder.",
    "parentFolderId": null,
    "spaceId": 1,
    "userId": 1,
    "createdAt": "2024-06-01T12:00:00.000Z",
    "updatedAt": "2024-06-01T12:00:00.000Z"
  }
}
```
- **Error Response:**
```json
{
  "status": 400,
  "success": false,
  "message": "Folder already exists."
}
```

### List Folders
- **GET** `/folder/list`
- **Description:** List all folders for the authenticated user.
- **Success Response:**
```json
{
  "status": 200,
  "success": true,
  "message": "Folders fetched successfully.",
  "totalCount": 2,
  "data": [
    {
      "id": 1,
      "name": "Project Docs",
      "description": "Documentation folder.",
      "parentFolderId": null,
      "spaceId": 1,
      "userId": 1,
      "createdAt": "2024-06-01T12:00:00.000Z",
      "updatedAt": "2024-06-01T12:00:00.000Z"
    },
    {
      "id": 2,
      "name": "Designs",
      "description": "Design assets folder.",
      "parentFolderId": null,
      "spaceId": 1,
      "userId": 1,
      "createdAt": "2024-06-01T12:05:00.000Z",
      "updatedAt": "2024-06-01T12:05:00.000Z"
    }
  ]
}
```

### Get Folder by ID
- **GET** `/folder/{id}`
- **Description:** Get details of a specific folder.
- **Success Response:**
```json
{
  "status": 200,
  "success": true,
  "message": "Folder details fetched successfully.",
  "data": {
    "id": 1,
    "name": "Project Docs",
    "description": "Documentation folder.",
    "parentFolderId": null,
    "spaceId": 1,
    "userId": 1,
    "createdAt": "2024-06-01T12:00:00.000Z",
    "updatedAt": "2024-06-01T12:00:00.000Z"
  }
}
```

### Update Folder
- **PUT** `/folder/{id}`
- **Description:** Update folder details.
- **Request Body:**
```json
{
  "name": "Updated Folder Name",
  "description": "Updated description."
}
```
- **Success Response:**
```json
{
  "status": 200,
  "success": true,
  "message": "Folder updated successfully."
}
```

### Delete Folder
- **DELETE** `/folder/{id}`
- **Description:** Delete a folder.
- **Success Response:**
```json
{
  "status": 200,
  "success": true,
  "message": "Folder deleted successfully."
}
```

---

## Page

> **All endpoints require authentication.**

### Create Page
- **POST** `/page/new`
- **Description:** Create a new page in a space or folder.
- **Request Body:**
```json
{
  "title": "API Reference",
  "content": "This is the API reference page.",
  "spaceId": 1,
  "status": "draft",
  "folderId": null,
  "parentId": null
}
```
- **Success Response:**
```json
{
  "status": 200,
  "success": true,
  "message": "Page created successfully.",
  "data": {
    "id": 1,
    "title": "API Reference",
    "content": "This is the API reference page.",
    "status": "draft",
    "parentId": null,
    "folderId": null,
    "spaceId": 1,
    "userId": 1,
    "createdAt": "2024-06-01T12:10:00.000Z",
    "updatedAt": "2024-06-01T12:10:00.000Z"
  }
}
```

### Update Page
- **PUT** `/page/{id}`
- **Description:** Update a page's content or metadata.
- **Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content.",
  "status": "published"
}
```
- **Success Response:**
```json
{
  "status": 200,
  "success": true,
  "message": "Page updated successfully.",
  "data": {
    "id": 1,
    "title": "Updated Title",
    "content": "Updated content.",
    "status": "published",
    "parentId": null,
    "folderId": null,
    "spaceId": 1,
    "userId": 1,
    "createdAt": "2024-06-01T12:10:00.000Z",
    "updatedAt": "2024-06-01T12:20:00.000Z"
  }
}
```

### Get Page by ID
- **GET** `/page/{id}`
- **Description:** Get details of a specific page.
- **Success Response:**
```json
{
  "status": 200,
  "success": true,
  "message": "Page details fetched successfully.",
  "data": {
    "id": 1,
    "title": "API Reference",
    "content": "This is the API reference page.",
    "status": "draft",
    "parentId": null,
    "folderId": null,
    "spaceId": 1,
    "userId": 1,
    "createdAt": "2024-06-01T12:10:00.000Z",
    "updatedAt": "2024-06-01T12:10:00.000Z"
  }
}
```

### List Pages in Space
- **GET** `/page/all/{spaceId}`
- **Description:** List all pages in a given space.
- **Success Response:**
```json
{
  "status": 200,
  "success": true,
  "message": "Pages fetched successfully.",
  "data": [
    {
      "id": 1,
      "title": "API Reference",
      "content": "This is the API reference page.",
      "status": "draft",
      "parentId": null,
      "folderId": null,
      "spaceId": 1,
      "userId": 1,
      "createdAt": "2024-06-01T12:10:00.000Z",
      "updatedAt": "2024-06-01T12:10:00.000Z"
    }
  ]
}
```

### Delete Page
- **DELETE** `/page/{id}`
- **Description:** Delete a page.
- **Success Response:**
```json
{
  "status": 200,
  "success": true,
  "message": "Page deleted successfully."
}
```

---

## Space

> **All endpoints require authentication.**

### Create Space
- **POST** `/space/create`
- **Description:** Create a new workspace (space).
- **Request Body:**
```json
{
  "name": "Engineering",
  "description": "Engineering team workspace."
}
```
- **Success Response:**
```json
{
  "status": 200,
  "success": true,
  "message": "Space created successfully.",
  "data": {
    "id": 1,
    "name": "Engineering",
    "description": "Engineering team workspace.",
    "ownerId": 1,
    "createdAt": "2024-06-01T12:30:00.000Z",
    "updatedAt": "2024-06-01T12:30:00.000Z"
  }
}
```

### List Spaces
- **GET** `/space/list?field=createdAt&sort=DESC`
- **Description:** List all spaces for the authenticated user.
- **Success Response:**
```json
{
  "status": 200,
  "success": true,
  "message": "Spaces fetched successfully.",
  "totalCount": 1,
  "data": [
    {
      "id": 1,
      "name": "Engineering",
      "description": "Engineering team workspace.",
      "ownerId": 1,
      "createdAt": "2024-06-01T12:30:00.000Z",
      "updatedAt": "2024-06-01T12:30:00.000Z"
    }
  ]
}
```

### Get Space by ID
- **GET** `/space/{id}`
- **Description:** Get details of a specific space.
- **Success Response:**
```json
{
  "status": 200,
  "success": true,
  "message": "Space details fetched successfully.",
  "data": {
    "id": 1,
    "name": "Engineering",
    "description": "Engineering team workspace.",
    "ownerId": 1,
    "createdAt": "2024-06-01T12:30:00.000Z",
    "updatedAt": "2024-06-01T12:30:00.000Z"
  }
}
```

### Update Space
- **PUT** `/space/{id}`
- **Description:** Update space details.
- **Request Body:**
```json
{
  "name": "Updated Space Name",
  "description": "Updated description."
}
```
- **Success Response:**
```json
{
  "status": 200,
  "success": true,
  "message": "Space updated successfully."
}
```

### Delete Space
- **DELETE** `/space/{id}`
- **Description:** Delete a space.
- **Success Response:**
```json
{
  "status": 200,
  "success": true,
  "message": "Space deleted successfully."
}
```

---

## Using with Postman

- Import the `postmen/Real-time-collaboration-tool.postman_collection.json` file into Postman.
- Set the `BASEPATH` variable to your backend URL (e.g., `http://localhost:3001/api`).
- Use the collection to test all endpoints with example requests and responses.

---

## Notes
- All endpoints (except `/auth/*`) require authentication.
- Use the token from the login response in the `Authorization` header as `Bearer <token>` or as a `token` header.
- For more details, refer to the Postman collection for example requests and responses. 