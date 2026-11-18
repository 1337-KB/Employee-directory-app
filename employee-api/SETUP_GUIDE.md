# Database Setup & Test Data Guide

## Quick Start (Recommended)

### Development with H2 (No PostgreSQL Required)

**Terminal 1 - Start the application:**
```powershell
cd employee-api
$env:SPRING_PROFILES_ACTIVE = "dev"
./mvnw spring-boot:run
```

**Terminal 2 - Populate with test data:**
```powershell
cd employee-api\scripts
.\setup-test-data.ps1
```

Done! Your database now has 8 test employees ready to use.

---

## What Gets Created

**Table Name:** `employees`

**Columns:**
- `id` - Employee ID (string, primary key)
- `first_name` - First name
- `last_name` - Last name  
- `role` - Job title
- `email` - Email address

**Sample Data (8 Employees):**

| ID | Name | Role | Email |
|----|------|------|-------|
| 1 | John Smith | Senior Developer | john.smith@company.com |
| 2 | Sarah Johnson | Product Manager | sarah.johnson@company.com |
| 3 | Michael Brown | UX Designer | michael.brown@company.com |
| 4 | Emily Davis | QA Engineer | emily.davis@company.com |
| 5 | David Wilson | DevOps Engineer | david.wilson@company.com |
| 6 | Jessica Martinez | Backend Developer | jessica.martinez@company.com |
| 7 | Robert Anderson | Frontend Developer | robert.anderson@company.com |
| 8 | Amanda Taylor | Technical Lead | amanda.taylor@company.com |

---

## Setup Methods

### Method 1: PowerShell Script (Easiest) ⭐

**Pros:**
- Automated
- Handles all errors
- Shows progress
- Works on any OS

**Steps:**
```powershell
# Terminal 1
cd employee-api
$env:SPRING_PROFILES_ACTIVE = "dev"
./mvnw spring-boot:run

# Terminal 2 (wait for app to start)
cd employee-api\scripts
.\setup-test-data.ps1
```

**Output:**
```
✅ Application is running
✅ Successfully created: 8
✅ Total employees in database: 8
```

---

### Method 2: H2 Web Console (Manual)

**For when you prefer GUI:**

1. Start app with dev profile:
```powershell
$env:SPRING_PROFILES_ACTIVE = "dev"
./mvnw spring-boot:run
```

2. Open browser: `http://localhost:8080/h2-console`

3. Connection settings (already filled in):
   - Driver Class: `org.h2.Driver`
   - JDBC URL: `jdbc:h2:mem:testdb`
   - User Name: `sa`
   - Password: (leave blank)

4. Click **Connect**

5. Copy-paste entire contents of `h2-init.sql`

6. Click **Run** button

7. Verify with: `SELECT * FROM employees;`

---

### Method 3: PostgreSQL (Production Database)

**Requirements:**
- PostgreSQL installed and running
- `psql` command available

**Steps:**

1. Create database:
```bash
psql -h localhost -U postgres
CREATE DATABASE employee_db;
```

2. Populate using SQL file:
```bash
psql -h localhost -U postgres -d employee_db -f postgres-init.sql
```

3. Start application:
```powershell
cd employee-api
./mvnw spring-boot:run
```

4. Verify:
```bash
psql -h localhost -U postgres -d employee_db -c "SELECT COUNT(*) FROM employees;"
```

---

### Method 4: REST API Direct Calls (Manual)

**For adding individual employees:**

```powershell
$employee = @{
    firstName = "Jane"
    lastName = "Doe"
    role = "Data Scientist"
    email = "jane.doe@company.com"
}

Invoke-RestMethod -Uri "http://localhost:8080/api/employees" `
    -Method Post `
    -ContentType "application/json" `
    -Body ($employee | ConvertTo-Json)
```

---

## Testing the Setup

### Via REST API

**Get all employees:**
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/employees" -Method Get | ConvertTo-Json -Depth 3
```

**Expected output:**
```json
{
  "value": [
    {
      "id": "1",
      "firstName": "John",
      "lastName": "Smith",
      "role": "Senior Developer",
      "email": "john.smith@company.com"
    },
    ...
  ],
  "Count": 8
}
```

**Create new employee:**
```powershell
$newEmp = @{
    firstName = "Test"
    lastName = "User"
    role = "Tester"
    email = "test@company.com"
}

Invoke-RestMethod -Uri "http://localhost:8080/api/employees" `
    -Method Post `
    -ContentType "application/json" `
    -Body ($newEmp | ConvertTo-Json)
```

### Via H2 Console

Navigate to: `http://localhost:8080/h2-console`

Run queries:
```sql
-- Count employees
SELECT COUNT(*) FROM employees;

-- Get specific employee
SELECT * FROM employees WHERE first_name = 'John';

-- Delete employee
DELETE FROM employees WHERE id = '8';

-- Update employee
UPDATE employees SET role = 'Lead Developer' WHERE id = '1';
```

---

## Scripts Reference

### `setup-test-data.ps1`
**Automated PowerShell script to populate database**

- Checks if app is running
- Creates all 8 test employees via REST API
- Shows progress and results
- Verifies final count

**Run:**
```powershell
.\setup-test-data.ps1
```

**Parameters:** None (all settings auto-detected)

### `h2-init.sql`
**SQL script for H2 database initialization**

- Creates employees table
- Inserts 8 test records
- Verification query

**Usage:**
1. Paste into H2 Console
2. Click Run
3. Or: `cat h2-init.sql | psql` (if using PostgreSQL)

### `postgres-init.sql`
**SQL script for PostgreSQL initialization**

- Drops existing table (if any)
- Creates employees table
- Inserts 8 test records
- Verification query

**Usage:**
```bash
psql -U postgres -d employee_db -f postgres-init.sql
```

---

## Troubleshooting

### "Application is not responding"

**Problem:** Script can't connect to app

**Solutions:**
1. Make sure app is running: Check if `http://localhost:8080/api/employees` works in browser
2. Check port: Is the app on port 8080?
3. Start app in dev profile: `$env:SPRING_PROFILES_ACTIVE = "dev"` then `./mvnw spring-boot:run`

### "Failed to create employee"

**Problem:** REST API returned error

**Solutions:**
1. Check JSON format: Use valid JSON in Body
2. Check content-type: Must be `application/json`
3. Check app logs: Look for error messages
4. Try H2 console directly: Test database connectivity

### "Cannot load driver class: org.h2.Driver"

**Problem:** H2 dependency not found

**Solutions:**
1. Ensure dev profile is active: `$env:SPRING_PROFILES_ACTIVE = "dev"`
2. Clean rebuild: `./mvnw clean package`
3. Check pom.xml: H2 scope should be `runtime`

### "psql: command not found"

**Problem:** PostgreSQL CLI not installed

**Solutions:**
1. Install PostgreSQL: https://www.postgresql.org/download/
2. Add to PATH: PostgreSQL bin folder
3. Use pgAdmin GUI instead
4. Use H2 for development instead

### "FATAL: database 'employee_db' does not exist"

**Problem:** Trying to use PostgreSQL but database not created

**Solutions:**
```bash
# Create database first
psql -U postgres -c "CREATE DATABASE employee_db;"

# Then run setup script
psql -U postgres -d employee_db -f postgres-init.sql
```

---

## API Endpoints

Once data is populated, test these endpoints:

### GET /api/employees
Returns all employees
```bash
curl http://localhost:8080/api/employees
```

### POST /api/employees
Create new employee
```bash
curl -X POST http://localhost:8080/api/employees \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","role":"Dev","email":"john@company.com"}'
```

---

## Next Steps

1. **Frontend Testing:**
   - Open Employee Directory Angular app
   - Should display all 8 employees
   - Test add/edit/delete operations

2. **Performance Testing:**
   - Load test with more employees
   - Check API response times
   - Verify database indexing

3. **Production Setup:**
   - Switch to PostgreSQL database
   - Configure proper backups
   - Set up monitoring

---

## Cleanup

### Reset H2 Database (for development)
```sql
-- H2 Console
DELETE FROM employees;
```

### Reset PostgreSQL Database
```bash
# Delete all data
psql -U postgres -d employee_db -c "DELETE FROM employees;"

# Or drop and recreate database
psql -U postgres -c "DROP DATABASE employee_db;"
psql -U postgres -c "CREATE DATABASE employee_db;"
psql -U postgres -d employee_db -f postgres-init.sql
```

---

## File Locations

```
employee-api/
├── scripts/
│   ├── setup-test-data.ps1      ← PowerShell automation script
│   ├── h2-init.sql              ← H2 initialization SQL
│   ├── postgres-init.sql        ← PostgreSQL initialization SQL
│   └── SETUP_GUIDE.md           ← This file
├── src/
│   └── main/resources/
│       ├── application.properties       ← Production (PostgreSQL)
│       └── application-dev.properties   ← Development (H2)
└── pom.xml                      ← Maven config (H2 scope: runtime)
```

---

## Summary

| Method | Pros | Cons | Best For |
|--------|------|------|----------|
| PowerShell Script | Automated, smart error handling | Requires PowerShell | Quick development setup |
| H2 Console | Visual, easy to verify | Manual copy-paste | Learning/debugging |
| SQL File | Reproducible, version control | Manual execution | Production scripts |
| REST API | Direct control, programmatic | No transaction support | Testing APIs directly |
| PostgreSQL | Production-ready, persistent | Requires DB server | Production environment |

**Recommendation:** Use **PowerShell Script** for fastest development setup! 🚀
