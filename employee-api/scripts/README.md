# Database Population Scripts

This directory contains everything you need to set up and populate the Employee API database with test data.

## 🚀 Quick Start (30 seconds)

### Terminal 1: Start the Application
```powershell
cd employee-api
$env:SPRING_PROFILES_ACTIVE = "dev"
./mvnw spring-boot:run
```

### Terminal 2: Populate Database
```powershell
cd employee-api\scripts
.\setup-test-data.ps1
```

Done! Your database is populated with 8 test employees.

---

## 📁 Files in This Directory

### 1. `setup-test-data.ps1` ⭐ **START HERE**
**Automated PowerShell script to populate your database**

**What it does:**
- ✅ Checks if app is running
- ✅ Creates 8 test employees via REST API
- ✅ Shows progress for each employee
- ✅ Verifies final result
- ✅ Handles errors gracefully

**How to run:**
```powershell
.\setup-test-data.ps1
```

**Requirements:**
- PowerShell
- Application must be running on port 8080

**Output example:**
```
✅ Application is running
✅ John Smith
✅ Sarah Johnson
✅ Michael Brown
✅ Emily Davis
✅ David Wilson
✅ Jessica Martinez
✅ Robert Anderson
✅ Amanda Taylor

Results
✅ Successfully created: 8
✅ Total employees in database: 8
```

---

### 2. `h2-init.sql`
**SQL initialization script for H2 (development) database**

**What it contains:**
- CREATE TABLE statement
- 8 INSERT statements with sample employees
- SELECT verification query

**When to use:**
- Manual initialization via H2 Console
- When you prefer raw SQL execution
- For documentation/version control

**How to use:**

**Option A: Via H2 Console (GUI)**
1. App running with dev profile
2. Open: `http://localhost:8080/h2-console`
3. Paste entire contents of this file
4. Click **Run**

**Option B: Command line**
```bash
# Copy file contents to clipboard
type h2-init.sql | clip

# Then paste into H2 Console
```

**Column structure:**
```
CREATE TABLE employees (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role VARCHAR(255)
);
```

---

### 3. `postgres-init.sql`
**SQL initialization script for PostgreSQL (production) database**

**What it contains:**
- DROP TABLE (to reset)
- CREATE TABLE statement
- 8 INSERT statements with sample employees
- SELECT verification query

**When to use:**
- Setting up production PostgreSQL database
- When H2 won't work for your use case
- For persistent data storage

**How to use:**

**Option A: Via psql CLI**
```bash
# Ensure PostgreSQL is running
# Create database first
psql -h localhost -U postgres -c "CREATE DATABASE employee_db;"

# Then populate
psql -h localhost -U postgres -d employee_db -f postgres-init.sql
```

**Option B: Via GUI tool**
1. Open pgAdmin
2. Right-click database → Query Tool
3. Copy-paste contents of this file
4. Click **Execute**

**Requirements:**
- PostgreSQL installed and running
- `psql` command available (or pgAdmin)
- Database `employee_db` must exist

---

## 👥 Sample Data

All scripts populate the database with these 8 employees:

| # | Name | Role | Email |
|---|------|------|-------|
| 1 | John Smith | Senior Developer | john.smith@company.com |
| 2 | Sarah Johnson | Product Manager | sarah.johnson@company.com |
| 3 | Michael Brown | UX Designer | michael.brown@company.com |
| 4 | Emily Davis | QA Engineer | emily.davis@company.com |
| 5 | David Wilson | DevOps Engineer | david.wilson@company.com |
| 6 | Jessica Martinez | Backend Developer | jessica.martinez@company.com |
| 7 | Robert Anderson | Frontend Developer | robert.anderson@company.com |
| 8 | Amanda Taylor | Technical Lead | amanda.taylor@company.com |

---

## 📋 Database Schema

```sql
CREATE TABLE employees (
    id VARCHAR(36) PRIMARY KEY,           -- Employee identifier
    first_name VARCHAR(255),               -- First name
    last_name VARCHAR(255),                -- Last name
    role VARCHAR(255),                     -- Job title
    email VARCHAR(255)                     -- Email address
);
```

---

## 🔧 Troubleshooting

### ❌ Script says "Application is not responding"

**Problem:** App not running on port 8080

**Solution:**
```powershell
# Terminal 1: Start the app
cd ..  # go back to employee-api folder
$env:SPRING_PROFILES_ACTIVE = "dev"
./mvnw spring-boot:run

# Wait 10 seconds, then run script again
# Terminal 2: Run the setup script
.\setup-test-data.ps1
```

### ❌ H2 Console won't load

**Problem:** Can't access H2 console

**Solution:**
1. Verify app is running: `curl http://localhost:8080/api/employees`
2. Check Spring Boot started successfully (look for "Tomcat started on port 8080")
3. Try clearing browser cache and refresh
4. Try incognito/private window

### ❌ PostgreSQL commands not found

**Problem:** `psql` command not recognized

**Solution:**
```powershell
# Add PostgreSQL to PATH
$env:Path += ";C:\Program Files\PostgreSQL\15\bin"

# Then try again
psql --version
```

Or use pgAdmin GUI instead.

### ❌ "Database employee_db does not exist"

**Problem:** PostgreSQL database not created yet

**Solution:**
```bash
# Create the database first
psql -U postgres -c "CREATE DATABASE employee_db;"

# Then run the init script
psql -U postgres -d employee_db -f postgres-init.sql
```

### ❌ "Error: relation 'employees' does not exist"

**Problem:** Table not created

**Solution:**
1. Clear database: Drop table/database and start fresh
2. Run the init script again
3. Check for SQL syntax errors in output

---

## ✅ Verification

After running scripts, verify data was created:

### Via REST API
```powershell
# Get all employees
Invoke-RestMethod -Uri "http://localhost:8080/api/employees" -Method Get | ConvertTo-Json
```

### Via H2 Console
1. Open: `http://localhost:8080/h2-console`
2. Run: `SELECT COUNT(*) FROM employees;`
3. Should return: `8`

### Via psql
```bash
psql -U postgres -d employee_db -c "SELECT COUNT(*) FROM employees;"
# Output: count
#        8
```

---

## 🔄 Testing

### Create Additional Employee (via PowerShell)
```powershell
$employee = @{
    firstName = "Jane"
    lastName = "Doe"
    role = "Full Stack Developer"
    email = "jane.doe@company.com"
}

Invoke-RestMethod -Uri "http://localhost:8080/api/employees" `
    -Method Post `
    -ContentType "application/json" `
    -Body ($employee | ConvertTo-Json)
```

### Delete Employee
```sql
-- H2 Console or psql
DELETE FROM employees WHERE id = '8';
```

### Update Employee
```sql
UPDATE employees SET role = 'Staff Engineer' WHERE id = '1';
```

---

## 🗑️ Cleanup

### Clear H2 Database (keep structure)
```sql
DELETE FROM employees;
```

### Clear PostgreSQL Database (keep structure)
```bash
psql -U postgres -d employee_db -c "DELETE FROM employees;"
```

### Drop PostgreSQL Database (completely)
```bash
psql -U postgres -c "DROP DATABASE employee_db;"
```

---

## 📚 Related Files

- **`../SETUP_GUIDE.md`** - Comprehensive setup guide with all methods
- **`../RUN_INSTRUCTIONS.md`** - How to run the application
- **`../application-dev.properties`** - H2 configuration
- **`../application.properties`** - PostgreSQL configuration

---

## ⚡ Which Method Should I Use?

| Method | Best For | Time | Effort |
|--------|----------|------|--------|
| `setup-test-data.ps1` | Quick development | 30s | Minimal ⭐ |
| H2 Console | Learning/debugging | 2m | Low |
| `h2-init.sql` | Documentation | 1m | Low |
| `postgres-init.sql` | Production setup | 3m | Medium |
| REST API | Programmatic | 5m | Medium |

**Recommendation:** Use `setup-test-data.ps1` for fastest setup! 🚀

---

## 🆘 Getting Help

1. **Check SETUP_GUIDE.md** - Comprehensive troubleshooting guide
2. **Check application logs** - Look in Maven output for errors
3. **Test connectivity** - Try accessing API directly: `curl http://localhost:8080/api/employees`
4. **Verify database** - Use H2 console or psql to check table exists
5. **Check configuration** - Review `application-dev.properties` and `.env.local`

---

## 📝 Notes

- H2 database is **in-memory** - data is lost when app restarts
- PostgreSQL is **persistent** - data survives app restart
- IDs are auto-generated as UUIDs in production
- Sample data uses sequential string IDs (1-8) for easy testing
- All email addresses are placeholders for testing only
- No actual emails are sent from the application

---

**Happy testing! 🎉**

For questions or issues, check SETUP_GUIDE.md or RUN_INSTRUCTIONS.md
