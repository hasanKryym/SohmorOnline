# SohmorOnline

## Endpoints

### Authentication

- **Register User**

  - Endpoint: `/auth/register`
  - Method: `POST`
  - Description: Register a new user.
  - Request Body:
    ```json
    {
      "name": "user_name",
      "email": "user@example.com",
      "password": "user_password",
      "address": "user_address",
      "number": "user_phone_number"
    }
    ```
  - Response:

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWNkZjM1YTBhNmQ5MmI2NmRkZjk3YWYiLCJuYW1lIjoiTWF5YSIsImlhdCI6MTcwNzk5NTk5NCwiZXhwIjoxNzM5NTMxOTk0fQ.DUwElnNTU6WWef2jG86tfROFcvV6YhbRy9fXgp5w9bw",
    "user": {
      "name": "Maya",
      "email": "maya@gmail.com",
      "address": "Beirut",
      "number": "+961 70243456",
      "role": {
        "position": "user",
        "shop": null
      },
      "_id": "65cdf35a0a6d92b66ddf97af",
      "__v": 0
    },
    "success": true
  }
  ```

  - Success: Status 201 CREATED
  - Error: Status 400 Bad Request

- **Login User**

  - Endpoint: `/auth/login`
  - Method: `POST`
  - Description: Log in an existing user.
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "user_password"
    }
    ```
  - Response:

  ```json
  {
    "user": {
      "role": {
        "position": "user",
        "shop": null
      },
      "_id": "65cdebad71d455c99062c5f4",
      "name": "Alex",
      "email": "alex@gmail.com",
      "address": "Zahle",
      "number": "+961 70061426",
      "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWNkZWJhZDcxZDQ1NWM5OTA2MmM1ZjQiLCJuYW1lIjoiQWxleCIsImlhdCI6MTcwNzk5NjI0MiwiZXhwIjoxNzM5NTMyMjQyfQ.qUWzqY5wwwUe3RhvFZsz5_zg6zzmjwntY5Hsu5Uexnw",
    "success": true,
    "message": "Logged in successfully"
  }
  ```

      - Success: Status 200 OK
      - Error: Status 401 Unauthorized

### Authorization

- **Check Authorization**
  - Endpoint: `/auth`
  - Method: `GET`
  - Description: Check if the user is authenticated (checks Authorization header).
  - Response:
  ```json
  {
    "success": true,
    "message": "user is autharized"
  }
  ```
      - Success: Status 200 OK
      - Error: Status 401 Unauthorized

#### Mongoose Errors

- Validation Errors
- Duplicate (Email)
- Cast Error

## Add Shop

Adds a new shop to the database. This endpoint is accessible only to site admins.

- **URL:** `/api/shops/manage/add`
- **Method:** `POST`
- **Authentication required:** Yes (Site admin)
- **Request Body:**
  - `name`: String (required) - Name of the shop.
  - `description`: String (required) - Description of the shop.
  - `address`: String (required) - Address of the shop.
  - `phoneNumber`: String - Phone number of the shop.
  - `categories`: Array - Categories of the shop.
  - `image`: String - URL of the shop's image.
- **Response:**
  - **Success:** `201 Created`
    ```json
    {
      "success": true,
      "shop": {
        "_id": "611f5c57a31dc74cfa1e8e38",
        "name": "Example Shop",
        "description": "This is an example shop.",
        "address": "123 Main Street",
        "phoneNumber": "123-456-7890",
        "categories": ["Food", "Clothing"],
        "image": "https://example.com/shop.jpg",
        "createdAt": "2022-01-01T12:00:00.000Z",
        "updatedAt": "2022-01-01T12:00:00.000Z"
      }
    }
    ```
  - **Error:** `401 Unauthorized`
    ```json
    {
      "success": false,
      "error": "Only site admins are authorized to perform this action."
    }
    ```
