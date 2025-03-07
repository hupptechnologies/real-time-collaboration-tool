# Real-Time Collaboration Tool

Building a Real-Time Collaboration Tool: TypeScript + NodeJS + Fastify + Sequelize + Web Socket

## **Overview**

This project is a backend service built with **Node.js, Fastify, Typescript, Sequelize and WebSocket**s. This service is optimized for high-performance API responses, real-time communication, and efficient request handling.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [WebSocket Events](#websocket-events)
- [Usage](#usage)
- [Error Handling](#error-handling)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- **Node.js** (>= 16.x recommended)
- **NPM** or **Yarn**

### Steps to Install

1. Clone the repository:
   ```sh
   git clone https://github.com/hupptechnologies/real-time-collaboration-tool
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file in the root directory and add required environment variables (see [Configuration](#configuration)).

## Configuration

Use a `.env` file to define environment variables:

```env
PORT=3000
DATABASE_URL=mysql://user:password@localhost:3306/dbname
JWT_SECRET=your_secret_key
WS_PORT=8080
```

## Project Structure

```
iveMind-Lambda/
│── src/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── websocket/
│   ├── utils/
│   ├── index.ts
│── tests/
│── .env
│── package.json
│── README.md
```

- **controllers/** - Handles HTTP request logic
- **services/** - Business logic and database interactions
- **routes/** - Fastify route definitions
- **websocket/** - WebSocket event handlers
- **utils/** - Helper functions
- **app.js** - Entry point for Fastify server

## API Endpoints

### Authentication

#### `POST /auth/login`

- **Request:** `{ email, password }`
- **Response:** `{ token }`

#### `POST /auth/register`

- **Request:** `{ name, email, password }`
- **Response:** `{ message: 'User registered' }`

### Orders

#### `GET /orders`

- **Response:** `[{ id, product, quantity, status }]`

#### `POST /orders`

- **Request:** `{ product, quantity }`
- **Response:** `{ orderId }`

## WebSocket Events

| Event Name     | Description                          |
| -------------- | ------------------------------------ |
| `connection`   | Triggered when a client connects     |
| `orderUpdated` | Sent when an order status is updated |
| `newMessage`   | Broadcasts a new chat message        |

## Usage

### Start the server

```sh
npm run dev
# or
yarn dev
```

### Run tests

```sh
npm test
# or
yarn test
```

## Error Handling

- Uses Fastify’s built-in error handling.
- Returns JSON responses with status codes and error messages.
- Logs errors using Fastify’s logger.

## Security

- Uses JWT authentication for protected routes.
- Input validation to prevent SQL injection & XSS attacks.
- WebSocket authentication using tokens.

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Commit your changes: `git commit -m "Add feature"`
4. Push to the branch: `git push origin feature-branch`
5. Open a Pull Request.

## License

This project is licensed under the MIT License.

### **Want to Contribute?**

Feel free to submit pull requests or issues!

🚀 **Happy Coding!**
