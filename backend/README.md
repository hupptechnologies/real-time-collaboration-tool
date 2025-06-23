# Real-Time Collaboration Tool – Backend

## Overview

The **Real-Time Collaboration Tool** backend is a robust Node.js application built with Fastify and Sequelize, designed to provide efficient, scalable APIs for collaborative applications. It features JWT-based authentication, PostgreSQL integration, file uploads, and comprehensive code quality tooling.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Database Migrations](#database-migrations)
- [Code Quality](#code-quality)
- [License](#license)

---

## Tech Stack

- **Backend Framework:** Fastify (Node.js)
- **Database:** PostgreSQL (via Sequelize ORM)
- **Authentication:** JWT (JSON Web Tokens)
- **File Uploads:** Fastify-Multer & AWS S3
- **Linting & Formatting:** ESLint
- **Type Safety:** TypeScript

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v20.0.0 or higher)
- **NPM** (v10.0.0 or higher)
- **PostgreSQL**

### Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/hupptechnologies/real-time-collaboration-tool.git
cd real-time-collaboration-tool/backend
npm install
```

### Environment Variables

Create a `.env` file in the `backend` root directory and configure the following variables:

```env
PORT=your_project_port
DB_HOST=your_db_host
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_name
DB_DIALECT=postgres
DB_PORT=your_db_port

JWT_SECRET_KEY=your_jwt_secret_key
REFRESH_JWT_SECRET_KEY=your_refresh_jwt_secret_key
```

### Running the Project

**Development Mode:**

```sh
npm run dev
```

**Production Mode:**

```sh
npm run build
npm run prod
```

---

## Project Structure

```
backend/
│-- postmen/                # API collection
│-- src/
│   ├── config/             # Database configuration
│   ├── controllers/        # Route handlers
│   ├── interface/          # TypeScript interfaces & middleware
│   ├── models/             # Sequelize models
│   ├── migrations/         # Sequelize migrations
│   ├── routes/             # Fastify routes
│   ├── utils/              # Utility functions
│   └── index.ts            # Application entry point
│-- dist/                   # Compiled TypeScript (after build)
│-- .eslintrc               # ESLint configuration
│-- .sequelizerc            # Sequelize CLI configuration
│-- tsconfig.json           # TypeScript configuration
│-- package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

---

## Database Migrations

**Generate a New Model & Migration:**

```sh
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```

**Create a New Migration:**

```sh
npm run create:migrate migration_name
```

**Run Migrations:**

```sh
npm run migrate
```

**Undo Last Migration:**

```sh
npm run migrate:undo:one --name migration_file
```

**Undo All Migrations:**

```sh
npm run migrate:undo
```

---

## Code Quality

**Check for Linting Issues:**

```sh
npm run lint
```

**Automatically Fix Linting Issues:**

```sh
npm run lint:fix
```

---

## License

This project is licensed under the [MIT License](LICENSE).

---

**For any questions or contributions, please open an issue or submit a pull request.**

🚀 Happy Coding!