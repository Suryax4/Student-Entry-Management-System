# Student Entry API

This is a RESTful API for managing student entries in database.

## Prerequisites

Before running the API, ensure you have the following installed:

- Node.js
- MongoDB

## Getting Started

1. Clone this repository:

- git clone https://github.com/Suryax4/TranFi-Learning

2. Install dependencies:

- cd TranFi-Learning
- npm install

3. Set up environment variables:Create a .env file in the root directory of the project and provide the following variables:

- PORT=3000
- MONGODB_URI=mongodb://localhost:27017/studentEntries

4. Start the MongoDB server:

- mongod

5. Run the API:

- npm run dev
- The API will start running on http://localhost:3000.

## API Endpoints

## STUDENT Entry Operations

- POST /api/student/createEntry: Create a new student entry.
- GET /api/student/getAllEntry: Get all student entries.
- PATCH /api/student/updateEntry/:id: Update a student entry by ID.
- DELETE /api/student/deleteEntry/:id: Delete a student entry by ID.
