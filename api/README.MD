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
  - `domain`: mongoose ID - The id for the shop domain (array)
- **Response:**
  - **Success:** `201 Created`
    ````json
    {
    "shop": {
    "name": "Simple",
    "description": "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
    "products": [],
    "image": "https://ucarecdn.com/95a48ce0-61b2-483f-a729-c9fa11f1aa11/-/preview/500x500/-/quality/smart_retina/-/format/auto/",
    "sliderImages": [],
    "address": "Beirut",
    "phoneNumber": "+961 81982664",
    "categories": [
    "Food",
    "hot_drinks",
    "cold_drinks",
    "sweets"
    ],
    "domain": [
    "65d8d11b8e17d0d9ea9ef950"
    ],
    "rating": 0,
    "\_id": "65da20265bf31ecadbe38775",
    "\_\_v": 0
    },
    "success": true
    }
        ```
    ````
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

## get Shops

Search for shops by name, description, domain, or category.

- **URL**: `/shops`
- **Method**: `GET`
- **Parameters**:
  - `search` (optional): Search query to find matching shops by name, description, or category.
  - `domain` (optional): Filter shops by domain.
  - `minRating` (optional): Filter shops by rating get shops that have rating > minRating
  - `maxRating` (optional): Filter shops by rating get shops that have rating < maxRating
- **Response**:
  - **200 OK**: Successful response containing matching shops.
    ```json
    {
      "success": true,
      "shops": [
        {
          "_id": "shop_id",
          "name": "Shop Name",
          "description": "Shop Description",
          "image": "Shop Image URL",
          "address": "Shop Address",
          "phoneNumber": "Shop Phone Number",
          "categories": ["Category1", "Category2"],
          "domain": ["Domain1", "Domain2"],
          "rating": 4.5
        },
        {
          "_id": "shop_id",
          "name": "Shop Name",
          "description": "Shop Description",
          "image": "Shop Image URL",
          "address": "Shop Address",
          "phoneNumber": "Shop Phone Number",
          "categories": ["Category1", "Category2"],
          "domain": ["Domain1", "Domain2"],
          "rating": 4.2
        }
      ],
      "message": "shops retrieved successfully"
    }
    ```
  - **400 Bad Request**: Invalid request parameters.
  - **500 Internal Server Error**: Server error.

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

```json
{
  "name": "Classic Hamburger",
  "description": "Juicy beef patty topped with lettuce, tomato, onion, and pickles, served on a toasted bun.",
  "price": 8.99,
  "image": "https://ucarecdn.com/b5232c56-306c-450f-94bf-8aab7c38d869/-/preview/667x1000/",
  "categories": ["Food"]
}
```

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
        "categories": [
            "Food"
        ],
        "_id": "65da2216c27039dc5bdc2ec4",
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

```

## Add a New Domain

**Endpoint:** `POST /shops/manage/addDomain?name=newDomain`

- **Authentication required:** Yes (Site admin)

### Response

```json
{
  "success": true,
  "newDomain": {
    "name": "Clothing",
    "_id": "65d8d1338e17d0d9ea9ef956",
    "__v": 0
  }
}
```

```json
{
  "message": "domain name already exists",
  "success": false
}
```

## Creating a New Category for a Shop

To add a new category for a shop, use the `createCategory` endpoint.

#### Endpoint

```
POST /shops/manage/addCategory
```

#### Request Body

```json
{
  "name": "Electronics"
}
```

- `name` (string, required): The name of the category to be created.

#### Response

- **200 OK**: Category successfully created.
- **400 Bad Request**: If a category with the same name already exists for the shop.

#### Example

```json
{
  "category": "Electronics"
}
```

#### Error Handling

- Throws a 400 Bad Request error if a category with the same name already exists for the shop.

## get categories for a Shop

#### Endpoint

```
GET /shops/categories
```

#### Response

- **200 OK**: categories retrieved successfully.
- **404 Not Found**: If no categories were found for the shop.

## Get Products

Retrieve products based on various filters.

- **URL:** `/products`
- **Method:** `GET`
- **Query Parameters:**
  - `search`: Search term to filter products by name, description, or category.
  - `minPrice`: Minimum price of products.
  - `maxPrice`: Maximum price of products.
  - `minRating`: Minimum rating of products.
  - `maxRating`: Maximum rating of products.
  - `categories`: Array of category names to filter products.
  - `shopId`: retrieves products for the specified shop.
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:**
    ```json
    {
      "success": true,
      "products": [Array of product objects]
    }
    ```
- **Error Response:**
  - **Code:** `404 Not Found`
  - **Content:**
    ```json
    {
      "err": "No products found",
      "success": false
    }
    ```
- **Sample Request:**
  ```http
  GET /products?search=hamburger&minPrice=5&maxRating=4&categories=Food&shopId=609de71c70f49c3e487d1329
  ```

```

```

## Update User's Cart

Update the user's cart with new items.

- **URL**

  `/users/cart`

- **Method**

  `PATCH`

- **Data Params**

  ```json
  {
    "cart": [
      {
        "product": "product_id_1",
        "quantity": 3
      },
      {
        "product": "product_id_2",
        "quantity": 1
      }
    ]
  }
  ```

  - `cart`: An array of objects representing the new cart items.
  - `product`: The ID of the product to add to the cart.
  - `quantity`: The quantity of the product.

- **Success Response**

  - **Code:** 200
  - **Content:**
    ```json
    {
      "success": true,
      "updatedCart": {
        "cart": [
          {
            "product": "product_id_1",
            "quantity": 3
          },
          {
            "product": "product_id_2",
            "quantity": 1
          }
        ]
      }
    }
    ```

- **Error Response**

  - **Code:** 500 Internal Server Error
  - **Content:**
    ```json
    {
      "success": false,
      "error": "Internal Server Error"
    }
    ```

- **Sample Call**

  ```javascript
  fetch("users/cart", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cart: [
        {
          product: "product_id_1",
          quantity: 3,
        },
        {
          product: "product_id_2",
          quantity: 1,
        },
      ],
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
  ```

- **Notes**

  - This endpoint updates the user's cart with the provided cart items.
