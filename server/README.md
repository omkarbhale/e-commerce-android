# Server-Side Application

This is the server-side component of the application, built with Node.js and Express.js. It handles the backend logic, database operations, and API endpoints.

## 📖 Overview

The server is responsible for managing data and providing APIs for the client-side application. It uses SQLite as the database and follows an MVC (Model-View-Controller) architecture.

## 🚀 Get Started

### Prerequisites

-   Node.js installed on your system.
-   SQLite installed (optional, for database inspection).

### Steps

1. **Install dependencies**

    ```bash
    npm install
    ```

2. **Set up environment variables**

    - Ensure a `.env` file exists in the root of the `server` directory. You can copy the `.env.example` file as a starting point:
        ```bash
        cp .env.example .env
        ```
    - The `.env` file should contain the following variables:
        ```env
        PORT=3001
        JWT_SECRET=your_jwt_secret_key
        ```
    - Replace `your_jwt_secret_key` with a strong, unique key for signing JSON Web Tokens.

3. **Run the server**

    ```bash
    node main.js
    ```

4. **Access the APIs**
    - The server will start on `http://localhost:3001` (default port).
    - Use tools like Postman or cURL to test the API endpoints.

## 📂 Project Structure

-   `src/controllers/`: Contains the logic for handling requests.
-   `src/models/`: Defines the database models.
-   `src/routes/`: Contains route definitions for the APIs.
-   `src/middlewares/`: Includes middleware functions for request processing.
-   `src/database/`: Handles database connections and queries.

## 🛠️ Development

-   Modify the `main.js` file to configure the server.
-   Add new routes in the `src/routes/` directory.
-   Update database models in the `src/models/` directory.

## 📚 Learn More

-   [Express.js documentation](https://expressjs.com/): Learn about the framework used.
-   [SQLite documentation](https://sqlite.org/docs.html): Understand the database.

## 🤝 Contribute

Feel free to contribute by submitting issues or pull requests.
