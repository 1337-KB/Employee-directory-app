-- H2 Database Initialization Script
-- Run this script in H2 Console (http://localhost:8080/h2-console) when using development profile

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role VARCHAR(255)
);

-- Insert sample data
INSERT INTO employees (id, first_name, last_name, role, email) VALUES
('1', 'John', 'Smith', 'Senior Developer', 'john.smith@company.com'),
('2', 'Sarah', 'Johnson', 'Product Manager', 'sarah.johnson@company.com'),
('3', 'Michael', 'Brown', 'UX Designer', 'michael.brown@company.com'),
('4', 'Emily', 'Davis', 'QA Engineer', 'emily.davis@company.com'),
('5', 'David', 'Wilson', 'DevOps Engineer', 'david.wilson@company.com'),
('6', 'Jessica', 'Martinez', 'Backend Developer', 'jessica.martinez@company.com'),
('7', 'Robert', 'Anderson', 'Frontend Developer', 'robert.anderson@company.com'),
('8', 'Amanda', 'Taylor', 'Technical Lead', 'amanda.taylor@company.com');

-- Verify data was inserted
SELECT * FROM employees;
