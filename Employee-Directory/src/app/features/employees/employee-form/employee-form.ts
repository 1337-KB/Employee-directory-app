import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../services/employee';
import { Employee } from '../../../models/employee';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-employee-form',
  standalone: true,
  styleUrl: './employee-form.css',
  templateUrl: './employee-form.html',
})
export class EmployeeForm implements OnInit {
  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  router = inject(Router);
  private route = inject(ActivatedRoute);
  
  employeeId = this.route.snapshot.paramMap.get('id');
  isEditMode = !!this.employeeId;
  loading = signal(false);
  
  employeeForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    role: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  ngOnInit(): void {
    if (this.employeeId) {
      this.loading.set(true);
      this.employeeService.getEmployeeById(this.employeeId).subscribe({
        next: (employee) => {
          this.employeeForm.patchValue({
            firstName: employee.firstName,
            lastName: employee.lastName,
            role: employee.role,
            email: employee.email
          });
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error loading employee:', err);
          this.loading.set(false);
          alert('Failed to load employee data');
        }
      });
    }
  }

  onSubmit() {
    console.log('onSubmit called');
    console.log('Form valid?', this.employeeForm.valid);
    console.log('Form value:', this.employeeForm.value);

    const formValue = this.employeeForm.value;

    if (this.employeeId) {
      console.log('Edit mode - updating employee');
      const updatedEmployee: Employee = {
        id: this.employeeId,
        firstName: formValue.firstName ?? '',
        lastName: formValue.lastName ?? '',
        role: formValue.role ?? '',
        email: formValue.email ?? ''
      };

      console.log('Sending update request:', updatedEmployee);
      this.employeeService
        .updateEmployee(updatedEmployee)
        .subscribe({
          next: () => {
            console.log('Update successful');
            alert('Employee updated successfully.');
            this.employeeService.loadEmployees();
            this.router.navigate(['/employees']);
          },
          error: (err) => {
            console.error('Error updating employee:', err);
            alert('Failed to update employee: ' + err.message);
          }
        });

    } else {
      console.log('Add mode - creating new employee');
      const newEmployee: Partial<Employee> = {
        firstName: formValue.firstName ?? '',
        lastName: formValue.lastName ?? '',
        role: formValue.role ?? '',
        email: formValue.email ?? 'no-reply@company.com'
      };

      console.log('Sending add request:', newEmployee);
      this.employeeService
        .addEmployee(newEmployee as Employee)
        .subscribe({
          next: (response) => {
            console.log('Add successful, response:', response);
            alert('Employee added successfully.');
            this.employeeService.loadEmployees();
            this.router.navigate(['/employees']);
          },
          error: (err) => {
            console.error('Error adding employee:', err);
            alert('Failed to add employee: ' + err.message);
          }
        });
    }
  }
}

