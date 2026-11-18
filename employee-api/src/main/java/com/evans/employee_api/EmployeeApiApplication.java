package com.evans.employee_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.evans.employee_api.util.EnvLoader;

@SpringBootApplication
public class EmployeeApiApplication {

	public static void main(String[] args) {
		EnvLoader.loadEnv();  // Load .env.local before Spring starts
		SpringApplication.run(EmployeeApiApplication.class, args);
	}

}
