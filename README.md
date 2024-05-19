# Sleep Tracker API

A simple RESTful API for a sleep tracker app using Node.js and Express.

## Setup

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd sleep-tracker
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the server:
    ```bash
    npm start
    ```

4. Run tests:
    ```bash
    npm test
    ```

## API Endpoints

- **POST `/sleep`**: Add a new sleep record.
    - **Request Body**:
        ```json
        {
            "userId": "user1",
            "hours": 8,
            "timestamp": "2023-05-01T10:00:00Z"
        }
        ```
    - **Response**:
        ```json
        {
            "id": "generated-id",
            "userId": "user1",
            "hours": 8,
            "timestamp": "2023-05-01T10:00:00Z"
        }
        ```

- **GET `/sleep/:userId`**: Get all sleep records for a user.
    - **Response**:
        ```json
        [
            {
                "id": "generated-id",
                "userId": "user1",
                "hours": 8,
                "timestamp": "2023-05-01T10:00:00Z"
            }
        ]
        ```

- **DELETE `/sleep/:recordId`**: Delete a sleep record by ID.
    - **Response**:
        ```json
        {
            "id": "deleted-record-id",
            "userId": "user1",
            "hours": 8,
            "timestamp": "2023-05-01T10:00:00Z"
        }
        ```
