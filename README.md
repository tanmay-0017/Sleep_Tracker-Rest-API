# Sleep Tracker API

A simple RESTful API for a sleep tracker app using Node.js and Express. The API allows users to manage their sleep records, including creating new records, updating existing ones, fetching sleep data, and deleting records. It's designed to be a simple yet efficient solution for tracking sleep patterns, offering seamless integration with various client applications. MongoDB is utilized for seamless data storage and retrieval.

---

## Table of Contents

1. [Features](#features)
2. [Setup and Installation](#setup-and-installation)
3. [API Endpoints](#api-endpoints)
4. [Testing](#testing)

## Features

- Allows users to submit their sleep duration along with a timestamp.
- Retrieves a list of all sleep records for a given user sorted by timestamp.
- Retrieve all sleep records.
- Delete a specific sleep record by its ID

## Setup and Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd sleep-tracker-api
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
    npx mocha ./test/test.mjs
    ```

## API Endpoints

- **POST `/sleep`**: Add a new sleep record.
    - **Request Body**:
        ```json
        {
            "id": "1",
            "hours": 8,
            "timestamp": "1716070974887"
        }
        ```
    - **Response**:
        ```json
        {
            "id": "1",
            "hours": 8,
            "timestamp": "1716070974887"
        }
        ```
        

- **GET `/sleep/:userId`**: Get all sleep records for a user.
    - **Response**:
        ```json
        [
            {
                "id": "1",
                "hours": 8,
                "timestamp": "1716070974887"
            }
        ]
        ```

- **DELETE `/sleep/:recordId`**: Delete a sleep record by ID.
    - **Response**:
        `302 Found` (on success, redirects to `/all`)
        `404 Not Found` (if the entry does not exist)


- **GET `/all`**: Retrieves all sleep entries.
    - **Response**:
        ```json
        [
          {
            "id": 1,
            "hours": 8,
            "timestamp": 1716070974887
          },
          {
            "id": 2,
            "hours": 7,
            "timestamp": 1716070974890
          }
        ]
        ```
      

## Testing

The project includes a test suite to verify the functionality of the API endpoints. The tests are written using Mocha, Chai, and Supertest.

### Running the Tests

1. Ensure the server is not running.
2. Run the tests:

    ```bash
    npx mocha ./test/test.mjs
    ```

   The test suite will automatically start the server, run the tests, and then shut down the server.

### Screenshot

Here's an example of what running the tests looks like:

<img width="623" alt="Screenshot 2024-05-20 at 3 38 17 AM" src="https://github.com/tanmay-0017/Sleep_Tracker-Rest-API/assets/97460992/214061c9-3daf-4c66-9661-8f59e43b53de">

