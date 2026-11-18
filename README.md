# Employee Directory Application

A modern full-stack employee management application built with Angular 22 frontend and Spring Boot 4.1 backend API.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup & Installation](#setup--installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Features](#features)
- [Development](#development)
- [Testing](#testing)
- [Database](#database)
- [Contributing](#contributing)

## 🎯 Project Overview

The Employee Directory Application is a comprehensive solution for managing employee information within an organization. It provides a user-friendly interface for viewing, creating, updating, and deleting employee records with a robust backend API.

## 🛠️ Tech Stack

### Frontend
- **Angular 22.1** - Modern JavaScript framework
- **TypeScript 6.0** - Type-safe JavaScript
- **RxJS 7.8** - Reactive programming library
- **Angular Router** - Client-side routing
- **Angular Forms** - Form handling and validation

### Backend
- **Spring Boot 4.1.2** - Java web framework
- **Java 21** - Latest LTS Java version
- **Spring Data JPA** - Object-relational mapping
- **PostgreSQL/H2** - Database support
- **JWT (JSON Web Token)** - Authentication support

### Testing & Build
- **Vitest 4.0** - Frontend unit testing (Angular)
- **JUnit** - Backend unit testing (Spring Boot)
- **Maven** - Java build tool
- **Angular CLI 22.1** - Frontend build tooling

## 📁 Project Structure

```
Employee_Directory_App/
├── employee-api/                           # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/evans/employee_api/
│   │   │   │   ├── controller/            # REST API endpoints
│   │   │   │   ├── service/               # Business logic
│   │   │   │   ├── model/                 # Entity models
│   │   │   │   └── EmployeeApiApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties # Configuration
│   │   │       └── application-dev.properties
│   │   └── test/                          # Unit tests
│   ├── scripts/                           # Database initialization scripts
│   │   ├── h2-init.sql                   # H2 database setup
│   │   └── postgres-init.sql             # PostgreSQL setup
│   ├── pom.xml                           # Maven configuration
│   └── mvnw                              # Maven wrapper
│
├── Employee-Directory/                    # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── features/
│   │   │   │   └── employees/
│   │   │   │       ├── employee-list/    # Employee listing component
│   │   │   │       ├── employee-detail/  # Employee details view
│   │   │   │       └── employee-form/    # Employee creation/editing
│   │   │   ├── services/
│   │   │   │   └── employee.ts           # API service
│   │   │   ├── models/
│   │   │   │   └── employee.ts           # Data models
│   │   │   ├── app.ts                    # Main component
│   │   │   └── app.routes.ts             # Route configuration
│   │   ├── index.html                    # HTML entry point
│   │   ├── main.ts                       # Bootstrap file
│   │   └── styles.css                    # Global styles
│   ├── angular.json                      # Angular CLI config
│   ├── package.json                      # NPM dependencies
│   ├── tsconfig.json                     # TypeScript config
│   └── README.md                         # Frontend documentation
│
└── README.md                             # This file
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Java 21+** - [Download JDK](https://www.oracle.com/java/technologies/downloads/)
- **Node.js 18+** - [Download Node.js](https://nodejs.org/)
- **npm 11+** - Comes with Node.js
- **PostgreSQL 14+** (optional) - [Download PostgreSQL](https://www.postgresql.org/download/)
  - Or use H2 database (embedded, no installation needed)
- **Git** - For version control

## ⚙️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/1337-KB/Employee-directory-app.git
cd Employee-directory-app
```

### 2. Backend Setup (Spring Boot API)

```bash
cd employee-api

# Install dependencies (Maven)
mvnw clean install

# Or if Maven is installed globally
mvn clean install
```

### 3. Frontend Setup (Angular)

```bash
cd Employee-Directory

# Install dependencies
npm install

# Or using npm ci for exact versions
npm ci
```

## 🚀 Running the Application

### Start Backend API

```bash
cd employee-api

# Using Maven wrapper
mvnw spring-boot:run

# Or using Maven directly (if installed)
mvn spring-boot:run
```

The API will start on **http://localhost:8080**

#### Database Configuration

**Default (H2 - Embedded Database):**
- Automatic in-memory database
- No additional setup required
- Good for development and testing

**PostgreSQL (Optional):**
1. Update `employee-api/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/employee_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```
2. Create the database:
   ```bash
   createdb employee_db
   ```
3. Run initialization script:
   ```bash
   psql employee_db < scripts/postgres-init.sql
   ```

### Start Frontend Application

```bash
cd Employee-Directory

# Development server with hot reload
npm start

# Or using Angular CLI directly
ng serve

# For development with detailed output
ng serve --open
```

The frontend will start on **http://localhost:4200** and automatically open in your browser.

## 📡 API Endpoints

### Base URL
```
http://localhost:8080/api/employees
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/{id}` | Get employee by ID |
| POST | `/api/employees` | Create new employee |
| PUT | `/api/employees/{id}` | Update employee |
| DELETE | `/api/employees/{id}` | Delete employee |

### Example Requests

**Get All Employees:**
```bash
curl http://localhost:8080/api/employees
```

**Get Single Employee:**
```bash
curl http://localhost:8080/api/employees/1
```

**Create Employee:**
```bash
curl -X POST http://localhost:8080/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "department": "Engineering"
  }'
```

**Update Employee:**
```bash
curl -X PUT http://localhost:8080/api/employees/1 \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "department": "Product"
  }'
```

**Delete Employee:**
```bash
curl -X DELETE http://localhost:8080/api/employees/1
```

## ✨ Features

### Employee Management
- ✅ View all employees in a list
- ✅ View detailed employee information
- ✅ Create new employee records
- ✅ Update existing employee information
- ✅ Delete employee records
- ✅ Search and filter employees

### Frontend Features
- Responsive design for desktop and mobile
- Real-time form validation
- Error handling and user feedback
- Routing between different views
- Component-based architecture

### Backend Features
- RESTful API design
- CORS support for frontend integration
- Database persistence
- Logging and monitoring
- JWT authentication ready (configured)

## 🔧 Development

### Frontend Development

#### Generate Components
```bash
cd Employee-Directory
ng generate component component-name
```

#### File Structure
- **Components** - Reusable UI elements
- **Services** - API and business logic
- **Models** - TypeScript interfaces and types
- **Routes** - Application navigation

#### Hot Reload
Changes to source files automatically reload the browser during development.

### Backend Development

#### Project Structure
- **Controllers** - HTTP request handlers
- **Services** - Business logic
- **Models** - Entity definitions
- **Repositories** - Data access layer

#### Logging
Logs are configured in Spring Boot. Check console for debug information during development.

## 🧪 Testing

### Frontend Unit Tests

```bash
cd Employee-Directory

# Run tests
npm test

# Or with Angular CLI
ng test

# Run tests with coverage
ng test --code-coverage
```

### Backend Unit Tests

```bash
cd employee-api

# Run tests
mvnw test

# Or with Maven
mvn test

# Run specific test
mvnw test -Dtest=EmployeeServiceTest
```

### End-to-End Testing (Frontend)

```bash
cd Employee-Directory
ng e2e
```

## 🗄️ Database

### Schema

The application uses an `Employee` entity with the following fields:

- **id** - Unique identifier (UUID/Auto-increment)
- **firstName** - Employee's first name
- **lastName** - Employee's last name
- **email** - Email address
- **department** - Department name
- **position** - Job title
- **hireDate** - Employment start date

### Database Scripts

Initialize sample data:

```bash
# H2 Database
cd employee-api
mvnw spring-boot:run

# PostgreSQL
psql employee_db < scripts/postgres-init.sql
```

## 🤝 Contributing

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow the existing code structure
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure tests pass before submitting PR

## 📝 Configuration

### Frontend Configuration
- Port: `4200` (default)
- API URL: `http://localhost:8080` (see `environment.ts`)

### Backend Configuration
- Port: `8080` (default)
- Database: H2 (default) or PostgreSQL
- CORS: Enabled for `http://localhost:4200`

## 🐛 Troubleshooting

### Frontend Won't Connect to Backend
- Ensure backend is running on `http://localhost:8080`
- Check CORS configuration in backend
- Check browser console for CORS errors

### Database Connection Issues
- Verify database is running (if using PostgreSQL)
- Check connection strings in `application.properties`
- Ensure database user has correct permissions

### Port Already in Use
- Change frontend port: `ng serve --port 4201`
- Change backend port: Update `server.port` in `application.properties`

## 📄 License

This project is part of the modernization initiative.

## 👥 Author

Created by Evans

## 📞 Support

For issues and questions:
1. Check existing issues on GitHub
2. Create a new issue with detailed description
3. Include environment details and error logs

---

**Last Updated:** November 2026
**Version:** 1.0.0
