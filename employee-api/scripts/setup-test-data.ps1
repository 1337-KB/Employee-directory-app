# Quick Database Population Script
# Run this to populate the H2 development database with test employee data

# PREREQUISITES:
# 1. Start the app with dev profile in one terminal:
#    $env:SPRING_PROFILES_ACTIVE = "dev"
#    ./mvnw spring-boot:run
#
# 2. Run this script in another terminal:
#    cd scripts
#    .\setup-test-data.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Employee Database Population Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if app is running
Write-Host "Step 1: Checking if application is running..." -ForegroundColor Yellow
try {
    $test = Invoke-RestMethod -Uri "http://localhost:8080/api/employees" -Method Get -ErrorAction Stop
    Write-Host "✅ Application is running" -ForegroundColor Green
    Write-Host "   Current employees: $($test.value.Count)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Application is not responding at http://localhost:8080" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please start the application first:" -ForegroundColor Yellow
    Write-Host "  cd .." -ForegroundColor Gray
    Write-Host "  `$env:SPRING_PROFILES_ACTIVE = 'dev'" -ForegroundColor Gray
    Write-Host "  ./mvnw spring-boot:run" -ForegroundColor Gray
    exit 1
}

# Define test employees
Write-Host ""
Write-Host "Step 2: Preparing test data..." -ForegroundColor Yellow

$employees = @(
    @{
        firstName = "John"
        lastName = "Smith"
        role = "Senior Developer"
        email = "john.smith@company.com"
    },
    @{
        firstName = "Sarah"
        lastName = "Johnson"
        role = "Product Manager"
        email = "sarah.johnson@company.com"
    },
    @{
        firstName = "Michael"
        lastName = "Brown"
        role = "UX Designer"
        email = "michael.brown@company.com"
    },
    @{
        firstName = "Emily"
        lastName = "Davis"
        role = "QA Engineer"
        email = "emily.davis@company.com"
    },
    @{
        firstName = "David"
        lastName = "Wilson"
        role = "DevOps Engineer"
        email = "david.wilson@company.com"
    },
    @{
        firstName = "Jessica"
        lastName = "Martinez"
        role = "Backend Developer"
        email = "jessica.martinez@company.com"
    },
    @{
        firstName = "Robert"
        lastName = "Anderson"
        role = "Frontend Developer"
        email = "robert.anderson@company.com"
    },
    @{
        firstName = "Amanda"
        lastName = "Taylor"
        role = "Technical Lead"
        email = "amanda.taylor@company.com"
    }
)

Write-Host "   Prepared $($employees.Count) test employees" -ForegroundColor Green

# Create employees
Write-Host ""
Write-Host "Step 3: Creating employees..." -ForegroundColor Yellow

$successCount = 0
$failCount = 0

foreach ($emp in $employees) {
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:8080/api/employees" `
            -Method Post `
            -ContentType "application/json" `
            -Body ($emp | ConvertTo-Json) `
            -ErrorAction Stop
        
        Write-Host "   ✅ $($emp.firstName) $($emp.lastName)" -ForegroundColor Green
        $successCount++
    } catch {
        Write-Host "   ❌ $($emp.firstName) $($emp.lastName) - Error: $($_.Exception.Message)" -ForegroundColor Red
        $failCount++
    }
    Start-Sleep -Milliseconds 150
}

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Results" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ Successfully created: $successCount" -ForegroundColor Green
if ($failCount -gt 0) {
    Write-Host "❌ Failed: $failCount" -ForegroundColor Red
}

# Final verification
Write-Host ""
Write-Host "Step 4: Verifying data..." -ForegroundColor Yellow
$finalList = Invoke-RestMethod -Uri "http://localhost:8080/api/employees" -Method Get
Write-Host "   ✅ Total employees in database: $($finalList.value.Count)" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ SETUP COMPLETE" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "API Endpoints:" -ForegroundColor Cyan
Write-Host "   GET  http://localhost:8080/api/employees" -ForegroundColor Gray
Write-Host "   POST http://localhost:8080/api/employees" -ForegroundColor Gray
Write-Host ""
Write-Host "To create additional employees, use:" -ForegroundColor Cyan
Write-Host '   $emp = @{ firstName="John"; lastName="Doe"; role="Dev"; email="john@company.com" }' -ForegroundColor Gray
Write-Host '   Invoke-RestMethod -Uri "http://localhost:8080/api/employees" -Method Post -ContentType "application/json" -Body ($emp | ConvertTo-Json)' -ForegroundColor Gray
Write-Host ""
