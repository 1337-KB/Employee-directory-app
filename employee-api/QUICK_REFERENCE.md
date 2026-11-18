# Quick Reference Card

## 🚀 Setup in 30 Seconds

```powershell
# Terminal 1 - Start App
cd employee-api
$env:SPRING_PROFILES_ACTIVE = "dev"
./mvnw spring-boot:run

# Terminal 2 - Populate Data (wait for app to start first)
cd employee-api\scripts
.\setup-test-data.ps1
```

**Done!** Database now has 8 test employees.

---

## 📊 Test Data (8 Employees)

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

## 🔄 Alternative Setup Methods

### H2 Console (Manual GUI)
```
1. Open: http://localhost:8080/h2-console
2. Paste: h2-init.sql contents
3. Click: Run
```

### PostgreSQL (SQL File)
```bash
# Create database
psql -U postgres -c "CREATE DATABASE employee_db;"

# Populate
psql -U postgres -d employee_db -f postgres-init.sql
```

### REST API (Manual)
```powershell
$emp = @{firstName="John"; lastName="Doe"; role="Dev"; email="john@company.com"}
Invoke-RestMethod -Uri "http://localhost:8080/api/employees" `
    -Method Post -ContentType "application/json" -Body ($emp | ConvertTo-Json)
```

---

## ✅ Test After Setup

```powershell
# Get all employees
Invoke-RestMethod -Uri "http://localhost:8080/api/employees" -Method Get

# Expected: 8 employees returned
```

Or visit H2 Console and run:
```sql
SELECT COUNT(*) FROM employees;  -- Should return: 8
```

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `scripts/setup-test-data.ps1` | Automated setup (⭐ recommended) |
| `scripts/h2-init.sql` | H2 manual initialization |
| `scripts/postgres-init.sql` | PostgreSQL initialization |
| `scripts/README.md` | Full scripts reference |
| `SETUP_GUIDE.md` | Complete setup guide |
| `RUN_INSTRUCTIONS.md` | How to run the app |

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| App not running | Start it: `$env:SPRING_PROFILES_ACTIVE = "dev"; ./mvnw spring-boot:run` |
| Script fails | Ensure app is on `http://localhost:8080/api/employees` |
| H2 console won't load | Check app is running, try clearing cache |
| No data created | Verify script output shows "✅ Created: 8" |
| Database empty after restart | Normal for H2 (in-memory); use PostgreSQL for persistence |

---

## 📚 Full Documentation

- **scripts/README.md** - All setup methods, detailed examples
- **SETUP_GUIDE.md** - Comprehensive guide with troubleshooting
- **RUN_INSTRUCTIONS.md** - Application usage guide

---

## 🎯 What Each Script Does

### `setup-test-data.ps1`
- ✅ Checks if app is running
- ✅ Creates 8 employees via REST API
- ✅ Shows progress
- ✅ Verifies results

### `h2-init.sql`
- Creates employees table
- Inserts 8 sample records
- Ready to paste into H2 Console

### `postgres-init.sql`
- Drops existing table (reset)
- Creates employees table
- Inserts 8 sample records

---

## 🌐 API Endpoints

```
GET  /api/employees           # Get all
POST /api/employees           # Create new
```

Example:
```powershell
# Get all
curl http://localhost:8080/api/employees

# Create
$emp = @{firstName="Jane"; lastName="Doe"; role="Dev"; email="jane@company.com"}
curl -X POST http://localhost:8080/api/employees `
  -H "Content-Type: application/json" `
  -d ($emp | ConvertTo-Json)
```

---

## 📝 Database Schema

```sql
CREATE TABLE employees (
    id VARCHAR(36) PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role VARCHAR(255),
    email VARCHAR(255)
);
```

---

## 💾 H2 vs PostgreSQL

| Feature | H2 | PostgreSQL |
|---------|----|----|
| Setup | Auto with app | Manual install |
| Persistence | None (in-memory) | Persistent |
| Best For | Development | Production |
| Data After Restart | Lost | Saved |
| Profile | `dev` | (default) |

---

## ✨ Next Steps

1. ✅ Populate database (this guide)
2. → Test API endpoints
3. → Start Angular frontend
4. → Create/edit employees in UI
5. → Deploy to production

---

**Questions?** See SETUP_GUIDE.md or scripts/README.md

**Ready?** Run: `.\setup-test-data.ps1` 🚀
