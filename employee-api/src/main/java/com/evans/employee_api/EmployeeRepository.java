package com.evans.employee_api;
import org.springframework.data.jpa.repository.JpaRepository;

import com.evans.employee_api.model.Employee;


public interface EmployeeRepository extends JpaRepository<Employee, String> {
    
}
    