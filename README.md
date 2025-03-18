# financial-app
# Compound Financial API

This is the backend service for the Compound Financial API.

## Running the Application

Follow these steps to get the application running locally:

1.  **Prerequisites:**
    * **Node.js** (version >= 18 is recommended)
    * **npm** (or **yarn**)

2.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/AverageCoder2077/financial-app.git](https://github.com/AverageCoder2077/financial-app.git)
    cd financial-app
    ```

3.  **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

4.  **Create Data Directory and JSON Files:**
    Ensure you have a `data` directory in the root of your project (at the same level as `src`, `package.json`, etc.). Inside this directory, create the following JSON files with your data:
    * `data/advisors.json`
    * `data/accounts.json`
    * `data/securities.json`


5.  **Build the Application:**
    ```bash
    npm run build
    # or
    yarn build
    ```

6.  **Run the Application (Development Mode):**
    ```bash
    npm run start:dev
    # or
    yarn start:dev
    ```
    This will start the NestJS development server, typically on `http://localhost:3000`.
    
## API Authentication

**All API routes are now protected by JWT (JSON Web Token) authentication by default.** This means you need a valid JWT to access any route except for the login endpoint.

**1. Obtain an Access Token (Login):**

To get an access token, you need to send a `POST` request to the `/auth/login` endpoint with your username and password in the request body as JSON.

**Example using `curl`:**
```bash
curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser", "password": "password"}'
```



## Quick API Documentation

This API provides access to compound financial data. Here's a brief overview of the available routes:
* **`POST /auth/login`**: (Public) Authenticates a user and returns an access_token. Requires username and password in the request body.
 
* **`GET /auth/profile`**: (Protected) Returns the user profile information from the JWT. Requires a valid access_token in the Authorization header.
  
* **`GET /`**: (Default NestJS route) Returns a simple "Hello World!" message.

* **`GET /advisors`**: Retrieves a list of all advisors.

* **`GET /accounts`**: Retrieves a list of all accounts.

* **`GET /securities`**: Retrieves a list of all securities.

* **`GET /stats/total-account-value`**: Retrieves the total value of all accounts.

* **`GET /stats/top-securities`**: Retrieves a list of the top securities by total value.

* **`GET /stats/custodian-distribution`**: Retrieves the asset distribution across different custodians, broken down by advisor.

## Full API Documentation (Swagger UI)

For detailed information about all available API endpoints, including request and response schemas, parameters, and example usage, please refer to the interactive Swagger UI documentation available at:

**[http://localhost:3000/api/](http://localhost:3000/api/)**

You can use this interface to explore the API, try out different requests, and understand the expected responses.

---
