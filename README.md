# FieldForce HRMS - Attendance Break Management

## Project Overview

This project is an extension of the Attendance Module for the FieldForce HRMS SaaS platform. It adds comprehensive "Break Management" capabilities, allowing employees to start and end breaks (lunch, tea, etc.) while capturing location and reason details.

## Features

- **Start Break**: Securely start a break with location tracking.
- **End Break**: End an active break and automatically calculate duration.
- **Break Summary**: Retrieve break history with role-based filtering and nested data structure.
- **Multi-Tenant Support**: Every request is scoped to a specific tenant.
- **Validation**: Strict schema validation for all inputs using Joi.
- **Logging**: Comprehensive system logging using Winston.
- **Documentation**: Auto-generated Swagger/OpenAPI documentation.

## Tech Stack

- **Node.js + Express**
- **PostgreSQL + Sequelize ORM**
- **JWT Authentication**
- **Joi Validation**
- **Winston Logger**
- **Swagger/OpenAPI**

## Prerequisites

- Node.js (v14+)
- PostgreSQL database
- Environment variables configured in `.env`

## Setup Instructions

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/the-y0gi/hrms-break-project
    cd hrms-break-project
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Variables**:
    Create a `.env` file and add the following:
    ```env
    PORT=3000
    DB_NAME=attendance 
    DB_USER=postgres
    DB_PASSWORD=postgres123
    DB_HOST=127.0.0.1
    DB_DIALECT=postgres
    JWT_SECRET=supersecretkey123
    ```
4.  **Database Migration**:
    ```bash
    npm run migrate
    ```
5.  **Run the application**:
    ```bash
    npm start
    ```
    For development mode with auto-reload:
    ```bash
    npm run dev
    ```
## Running Tests / Seeding Data

You can use `node seed.js` to populate initial test data for a user, attendance, and tenant.
Use `node test-token.js` to generate a test JWT token for authentication.


## API Documentation

Once the server is running, visit:
`http://localhost:3000/api-docs`



## Scripts

- `npm start`: Starts the server.
- `npm run dev`: Starts the server in watch mode using nodemon.
- `npm run migrate`: Runs database migrations.
- `npm run docs:build`: Re-generates the Swagger documentation.


## Postman Collection
You can use `postman_collection.json` to test the API.
