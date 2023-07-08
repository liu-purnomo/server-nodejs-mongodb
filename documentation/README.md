## REST API DOCUMENTATION

This is the documentation for the REST API of the application.

**!Note:** This server is using JWT for authentication. All routes except for the login and register routes require a Bearer token to be sent in the Authorization header.

**!Note:** All routes except for the login and register routes require the user to be logged in.

**!Note:** For real project, only admin can do change user status, change verified user, and other sensitive activity.

## Table of Contents

- [REST API DOCUMENTATION](#rest-api-documentation)
- [Table of Contents](#table-of-contents)
- [User Routes](#user-routes)
- [Base URL](#base-url)
- [Routes](#routes)
  - [1. Get all users](#1-get-all-users)
  - [2. Register new user](#2-register-new-user)
    - [Request Body:](#request-body)
  - [3. Confirmation email](#3-confirmation-email)
    - [Request Body:](#request-body-1)
  - [4. Find or create user](#4-find-or-create-user)
    - [Request Body:](#request-body-2)
  - [5. Login user](#5-login-user)
    - [Request Body:](#request-body-3)
  - [6. Get detail user by id](#6-get-detail-user-by-id)
    - [Query Parameters:](#query-parameters)
  - [7. Change password](#7-change-password)
    - [Request Body:](#request-body-4)
  - [8. Update user](#8-update-user)
    - [Request Body:](#request-body-5)
  - [9. Delete user](#9-delete-user)
    - [Request Body:](#request-body-6)
  - [10. Change role user](#10-change-role-user)
    - [Request Body:](#request-body-7)
  - [11. Change status user](#11-change-status-user)
    - [Request Body:](#request-body-8)
  - [12. Change verified user](#12-change-verified-user)
    - [Request Body:](#request-body-9)
  - [13. Check username](#13-check-username)
    - [Request Body:](#request-body-10)

## User Routes

list of user routes:

| Route               | HTTP   | Description                |
| ------------------- | ------ | -------------------------- |
| /                   | GET    | Get all users list         |
| /register           | POST   | Register new user          |
| /confirmation       | POST   | Confirmation user          |
| /find-or-create     | POST   | Find or create user        |
| /login              | POST   | Login user                 |
| /detail             | GET    | Get user detail            |
| /update             | PUT    | Update user                |
| /change-password    | PATCH  | Change password user       |
| /delete:id          | DELETE | Delete user by id          |
| /change-role:id     | PATCH  | Change role user by id     |
| /change-status:id   | PATCH  | Change status user by id   |
| /change-verified:id | PATCH  | Change verified user by id |
| /check-username     | get    | Change username user       |

## Base URL

The base URL for all API endpoints is: http://your-server.com

## Routes

### 1. Get all users

**Method: GET**

**URL: /**

> Description: Retrieves a list of all users.

> **Required Headers: None**

> **Required Permissions: None**

### 2. Register new user

```
Method: POST
URL: /register
Description: Registers a new user.
Required Headers: None
Required Permissions: None
```

#### Request Body:

```json
{
    username (string, required): The username of the new user.
    name (string, required): The name of the new user.
    password (string, required): The password of the new user.
    email (string, required): The email address of the new user.
}
```

### 3. Confirmation email

```
Method: POST
URL: /confirmation
Description: Sends a confirmation email to the user.
Required Headers: None
Required Permissions: None
```

#### Request Body:

```json
{
    email (string, required): The email address of the user.
    token (string, required): The token of the user.
}
```

### 4. Find or create user

```
Method: POST
URL: /find-or-create
Description: Finds or creates a user based on the provided information.
Required Headers: None
Required Permissions: None
```

#### Request Body:

```json
{
    username (string, required): The username of the user.
    email (string, required): The email address of the user.
}
```

### 5. Login user

```
Method: POST
URL: /login
Description: Logs in a user.
Required Headers: None
Required Permissions: None
```

#### Request Body:

```json
{
    email (string, required): The email of the user.
    password (string, required): The password of the user.
}
```

### 6. Get detail user by id

```
Method: GET
URL: /detail
Description: Retrieves detailed information about a user by their ID.
Required Headers:
Authorization (string, required): Bearer token for authentication.
Required Permissions: Logged-in user
```

#### Query Parameters:

```
id (string, required): The ID of the user.
```

### 7. Change password

```
Method: PATCH
URL: /change-password
Description: Changes the password of a user.
Required Headers:
Authorization (string, required): Bearer token for authentication.
Required Permissions: Logged-in user
```

#### Request Body:

```json
{
    oldPassword (string, required): The current password of the user.
    newPassword (string, required): The new password for the user.
}
```

### 8. Update user

```
Method: PUT
URL: /update
Description: Updates the information of a user.
Required Headers:
Authorization (string, required): Bearer token for authentication.
Required Permissions: Logged-in user
```

#### Request Body:

```json
{
    username (string, optional): The new username for the user.
    email (string, optional): The new email address for the user.
}
```

### 9. Delete user

```
Method: DELETE
URL: /delete/:id
Description: Delete user by id.
Required Headers:
Authorization (string, required): Bearer token for authentication.
Required Permissions: Logged-in user
```

#### Request Body:

```json
{
    id (string, required): The id of the user.
}
```

### 10. Change role user

```
Method: PATCH
URL: /change-role/:id
Description: Change role user by id.
Required Headers:
Authorization (string, required): Bearer token for authentication.
Required Permissions: Logged-in user
```

#### Request Body:

```json
{
    id (string, required): The id of the user.
    role (string, required): The role of the user.
}
```

### 11. Change status user

```
Method: PATCH
URL: /change-status/:id
Description: Change status user by id.
Required Headers:
Authorization (string, required): Bearer token for authentication.
Required Permissions: Logged-in user
```

#### Request Body:

```json
{
    id (string, required): The id of the user.
    status (string, required): The status of the user.
}
```

### 12. Change verified user

```
Method: PATCH
URL: /change-verified/:id
Description: Change verified user by id.
Required Headers:
Authorization (string, required): Bearer token for authentication.
Required Permissions: Logged-in user
```

#### Request Body:

```json
{
    id (string, required): The id of the user.
    verified (string, required): The verified of the user.
}
```

### 13. Check username

```
Method: GET
URL: /check-username
Description: Check username user.
Required Headers:
Authorization (string, required): Bearer token for authentication.
Required Permissions: Logged-in user
```

#### Query Parameters:

```
username (string, required): The username of the user.
```
