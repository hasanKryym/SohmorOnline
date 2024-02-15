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

    - Success: Status 201 CREATED
    - Error: Status 400 Bad Request

      ```

      ```

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
    - Success: Status 200 OK
    - Error: Status 401 Unauthorized

### Authorization

- **Check Authorization**
  - Endpoint: `/auth`
  - Method: `GET`
  - Description: Check if the user is authenticated (checks Authorization header).
  - Response:
    - Success: Status 200 OK
    - Error: Status 401 Unauthorized

#### Mongoose Errors

- Validation Errors
- Duplicate (Email)
- Cast Error
