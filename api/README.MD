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

## Delete Shop

Deletes a shop from the database.

- **URL:** `/api/shops/manage/delete/:id`
- **Method:** `DELETE`
- **Auth Required:** Yes
- **Permissions Required:** Site Admin

### Request Parameters

- `id`: The ID of the shop to be deleted.

### Response

- **Success Response:**

  - **Status Code:** `200 OK`
  - **Content:**
    ```json
    {
      "success": true,
      "message": "Shop deleted successfully",
      "deletedShop": {
        "_id": "610ae319b3a7eb76b0d97837",
        "name": "Example Shop",
        "description": "This is an example shop.",
        "image": "example.jpg",
        "address": "123 Example St",
        "phoneNumber": "123-456-7890",
        "categories": ["Category 1", "Category 2"],
        "createdAt": "2022-08-05T12:00:00.000Z",
        "updatedAt": "2022-08-05T12:30:00.000Z"
      }
    }
    ```

- **Error Response:**

  - **Status Code:** `400 Bad Request`
  - **Content:**

    ```json
    {
      "success": false,
      "message": "Please provide the shop id"
    }
    ```

  - **Status Code:** `404 Not Found`
  - **Content:**

    ```json
    {
      "success": false,
      "message": "Shop not found"
    }
    ```

  - **Status Code:** `500 Internal Server Error`
  - **Content:**
    ```json
    {
      "success": false,
      "message": "Unable to delete shop"
    }
    ```

### Example Usage

```shell
curl -X DELETE http://localhost:5000/api/shops/610ae319b3a7eb76b0d97837 \
-H "Authorization: Bearer <token>"
```

## Add a New Product

Adds a new product to a shop.

**Endpoint:** `POST /products/manage/add`

- **Authentication required:** Yes (Shop admin)

### Request Body

| Field         | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `name`        | String | Yes      | The name of the product.    |
| `description` | String | Yes      | Description of the product. |
| `price`       | Number | Yes      | Price of the product.       |
| `image`       | String | Yes      | URL of the product image.   |

POST /products/add
Content-Type: application/json

````json
{
"name": "Classic Hamburger",
"description": "Juicy beef patty topped with lettuce, tomato, onion, and pickles, served on a toasted bun.",
"price": 8.99,
"image": "https://example.com/classic-hamburger.jpg"
}

### Response

```json
{
    "product": {
        "name": "Classic Hamburger",
        "description": "Juicy beef patty topped with lettuce, tomato, onion, and pickles, served on a toasted bun.",
        "price": 8.99,
        "rating": 0,
        "offer": 0,
        "image": "https://ucarecdn.com/b5232c56-306c-450f-94bf-8aab7c38d869/-/preview/667x1000/",
        "_id": "65d70699e6b65f90cf9a7970",
        "__v": 0
    },
    "success": true
}


POST /products/add
Content-Type: application/json

{
  "name": "Classic Hamburger",
  "description": "Juicy beef patty topped with lettuce, tomato, onion, and pickles, served on a toasted bun.",
  "price": 8.99,
  "image": "https://example.com/classic-hamburger.jpg"
}

````
