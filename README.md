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

**All API routes are protected by JWT (JSON Web Token) authentication by default.** This means you need a valid JWT to access any route except for the login endpoint. tokens last for 1 hour.

**1. Obtain an Access Token (Login):**

To get an access token, you need to send a `POST` request to the `/auth/login` endpoint with your username and password in the request body as JSON.

**Example using `curl`:**
```bash
curl -X POST http://localhost:3000/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser", "password": "password"}'
```


`  credentials to get logged in ("username": "testuser", "password": "password") A successful login will return a JSON response containing an `access_token`:  ```json  {    "access_token": "YOUR_JWT_ACCESS_TOKEN"  }   ``

**2\. Accessing Protected Routes:**

To access any protected API route (e.g., /v1/advisors, /v1/accounts, /v1/securities, /v1/stats/...), you need to include the access\_token in the Authorization header of your request as a **Bearer token**.

**Example using curl to access the /v1/advisors endpoint:**

```Bash

 curl http://localhost:3000/v1/advisors \   
-H "Authorization: Bearer YOUR_JWT_ACCESS_TOKEN"
```

_(Replace YOUR\_JWT\_ACCESS\_TOKEN with the actual access\_token you obtained from the login request.)_

If the access\_token is valid, the server will respond with the requested data. If the token is missing, invalid, or expired, you will receive a 401 Unauthorized error. tokens last for 1 hour.

**Example curl commands for all endpoints with authentication:**

**Get Advisors:**

```Bash

 curl http://localhost:3000/v1/advisors -H "Authorization: Bearer YOUR_JWT_ACCESS_TOKEN"   `
```

**Get Accounts:**

```Bash

 curl http://localhost:3000/v1/accounts -H "Authorization: Bearer YOUR_JWT_ACCESS_TOKEN"   `
```
**Get Securities:**

```Bash

   curl http://localhost:3000/v1/securities -H "Authorization: Bearer YOUR_JWT_ACCESS_TOKEN"   `
```
**Get Total Account Value:**

```Bash

   curl http://localhost:3000/v1/stats/total-account-value -H "Authorization: Bearer YOUR_JWT_ACCESS_TOKEN"   `
```
**Get Top Securities:**

```Bash

  curl http://localhost:3000/v1/stats/top-securities -H "Authorization: Bearer YOUR_JWT_ACCESS_TOKEN"   `
```
**Get Custodian Distribution:**

```Bash

 curl http://localhost:3000/v1/stats/custodian-distribution -H "Authorization: Bearer YOUR_JWT_ACCESS_TOKEN"   `
```
**Get User Profile:**

```Bash

 curl http://localhost:3000/v1/auth/profile -H "Authorization: Bearer YOUR_JWT_ACCESS_TOKEN"   `
```
**How to Authorize in Swagger UI:**

1.  Open Swagger UI at http://localhost:3000/api/.
2.  scroll down to the login route and click the try it out button then press Excute to get your token.
    
3.  Click the "Authorize" button at the top right.
    
4.  In the "Available authorizations" modal, enter your JWT token (without "Bearer ") in the input field corresponding to the "JWT" security scheme.
    
5.  Click "Authorize" and then "Close".
    
6.  You can execute protected endpoints directly in Swagger UI.
    

Quick API Documentation
-----------------------

This API provides access to compound financial data. Here's a brief overview of the available routes:

*   **POST /v1/auth/login**: (Public) Authenticates a user and returns an access\_token. Requires username and password in the request body.
    
*   **GET /v1/auth/profile**: (Protected) Returns the user profile information from the JWT. Requires a valid access\_token in the Authorization header.
    
*   **GET /v1/advisors**: (Protected) Retrieves a list of all advisors. Requires a valid access\_token in the Authorization header.
    
*   **GET /v1/accounts**: (Protected) Retrieves a list of all accounts. Requires a valid access\_token in the Authorization header.
    
*   **GET /v1/securities**: (Protected) Retrieves a list of all securities. Requires a valid access\_token in the Authorization header.
    
*   **GET /v1/stats/total-account-value**: (Protected) Retrieves the total value of all accounts. Requires a valid access\_token in the Authorization header.
    
*   **GET /v1/stats/top-securities**: (Protected) Retrieves a list of the top securities by total value. Requires a valid access\_token in the Authorization header.
    
*   **GET /v1/stats/custodian-distribution**: (Protected) Retrieves the asset distribution across different custodians, broken down by advisor. Requires a valid access\_token in the Authorization header.
    

Full API Documentation (Swagger UI)
-----------------------------------

For detailed information about all available API endpoints, including request and response schemas, parameters, and example usage, please refer to the interactive Swagger UI documentation available at:

http://localhost:3000/api/

You can use this interface to explore the API, try out different requests, and understand the expected responses.

To-Dos
------

*   **Data Persistence (Beyond In-Memory JSON)**
    
    *   Implement data persistence using a database (e.g., PostgreSQL).
        
    *   To Justify Database Choice:
        
        *   PostgreSQL was chosen for its strong ACID properties, robust relational capabilities necessary for managing financial data with clear relationships between advisors, accounts, and holdings, and its excellent scalability.
            
*   **Role-Based Access Control (RBAC)**
    
    *   Implement custom guards that check user roles against required roles for specific endpoints.
        
    *   Store user roles in the JWT payload or fetch them from the database.
        
*   **Advanced Data Processing and Caching**
    
    *   Caching (NestJS Built-in).
        
    *   Background Jobs/Queues.
        
*   **Containerization and Orchestration (Docker)**
    
*   **Health Checks and Monitoring**
    
*   **Logging and Monitoring Tools:**
    
    *   Winston:
        
        *   Install: npm install winston nest-winston
            
        *   Configure a logger service using WinstonModule in AppModule or a dedicated LoggerModule.
            
        *   Use the logger service throughout your application to log events, errors, and performance metrics


