# Employee API - Build and Runtime Instructions

## Root Cause of Previous Build Failure

The application failed to start with:
```
FATAL: database "employee_db" does not exist
```

### Issues Fixed

1. **Missing Database**: The `application.properties` file was configured for PostgreSQL but the database `employee_db` didn't exist on the system.

2. **Incorrect Dependency Scope**: The H2 database driver was marked with `scope=test`, making it unavailable at runtime for development.

3. **Incomplete Configuration**: The password line in `application.properties` was corrupted/incomplete.

## Solutions Implemented

### 1. Created Development Profile (`application-dev.properties`)
A new development configuration using H2 (in-memory database) for local development without requiring PostgreSQL:
- Uses H2 in-memory database (`jdbc:h2:mem:testdb`)
- Automatically creates and drops schema on startup
- Includes H2 console at `http://localhost:8080/h2-console`

### 2. Updated Main Configuration (`application.properties`)
- Restored production configuration for PostgreSQL
- Added comments explaining profile usage
- Fixed password configuration line

### 3. Fixed Dependency Scope (`pom.xml`)
- Changed H2 dependency scope from `test` to `runtime`
- Now available for local development and testing

## Running the Application

### Option 1: Development (H2 In-Memory Database) ✅ RECOMMENDED
```bash
cd employee-api
$env:SPRING_PROFILES_ACTIVE = "dev"
./mvnw spring-boot:run
```

**Access the application:**
- API: http://localhost:8080/api/employees
- H2 Console: http://localhost:8080/h2-console

### Option 2: Production (PostgreSQL)
First, create the PostgreSQL database:
```sql
CREATE DATABASE employee_db;
```

Then run:
```bash
cd employee-api
./mvnw spring-boot:run
```

Make sure the environment variables are set:
- `DB_USERNAME`: PostgreSQL username (default: postgres)
- `DB_PASSWORD`: PostgreSQL password (default: password)

## Running Tests

```bash
cd employee-api
./mvnw clean test
```

Tests automatically use the H2 in-memory database.

## Building the Application

```bash
cd employee-api
./mvnw clean package
```

This creates: `target/employee-api-0.0.1-SNAPSHOT.jar`

## Troubleshooting

### "Cannot load driver class: org.h2.Driver"
- Ensure you're running with `-Dspring.profiles.active=dev` or set `SPRING_PROFILES_ACTIVE=dev`
- Run `./mvnw clean compile` to refresh dependencies

### "FATAL: database 'employee_db' does not exist"
- You're running with the production profile but PostgreSQL database doesn't exist
- Either create the database or switch to development profile

### "Connection refused: localhost:5432"
- PostgreSQL is not running
- Use development profile instead: `$env:SPRING_PROFILES_ACTIVE = "dev"`

## Project Structure

```
employee-api/
├── src/
│   ├── main/
│   │   ├── java/com/evans/employee_api/
│   │   │   ├── EmployeeApiApplication.java (main class)
│   │   │   ├── controller/EmployeeController.java
│   │   │   ├── service/EmployeeService.java
│   │   │   ├── model/Employee.java
│   │   │   ├── repository/EmployeeRepository.java
│   │   │   └── util/EnvLoader.java
│   │   └── resources/
│   │       ├── application.properties (production config)
│   │       └── application-dev.properties (development config)
│   └── test/
│       ├── java/com/evans/employee_api/
│       │   └── EmployeeApiApplicationTests.java
│       └── resources/application.properties
├── pom.xml
└── mvnw / mvnw.cmd

```

## Java & Framework Versions

- **Java**: 21 LTS (upgraded from Java 17)
- **Spring Boot**: 4.1.2
- **Maven**: 3.10.0 (Maven Wrapper)

All components are compatible and tested.

## Environment Files

The application loads environment variables from `.env.local` before Spring starts (see `EnvLoader.java`):
- `DB_USERNAME`: PostgreSQL user
- `DB_PASSWORD`: PostgreSQL password

For development with H2, these are not required.
