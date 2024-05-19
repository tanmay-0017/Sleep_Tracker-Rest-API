# Sleep Tracker API

A simple RESTful API for a sleep tracker app using Node.js and Express.

## Table of Contents

1. [Features](#features)
2. [Setup and Installation](#setup-and-installation)
3. [API Endpoints](#api-endpoints)
4. [Testing](#testing)

## Features

- Allows users to submit their sleep duration along with a timestamp.
- Retrieves a list of all sleep records for a given user.
- Retrieve all sleep records.
- Delete a specific sleep record by its ID

## Setup

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
    npm test
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
      
