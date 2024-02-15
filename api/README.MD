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
