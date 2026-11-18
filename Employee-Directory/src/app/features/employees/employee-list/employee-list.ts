import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee';
import { RouterLink } from '@angular/router';
import { Employee } from '../../../models/employee';

@Component({
  standalone: true,
  selector: 'app-employee-list',
  imports: [RouterLink],
  styleUrl: './employee-list.css',
  templateUrl: './employee-list.html',
})
export class EmployeeList implements OnInit {
  private employeeService = inject(EmployeeService);
  employees:Employee[] = [];
  loading = this.employeeService.loading;
  
  searchText = signal('');
  filteredEmployees = computed(() => {
    const search = this.searchText().toLowerCase();
    return this.employeeService.employees().filter(employee =>
      `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(search)
    );
  });

  constructor() {
    this.employeeService.loadEmployees();
  }

  ngOnInit(): void {
    this.employeeService
      .getEmployees()
      .subscribe(data => {
        this.employeeService.employees.set(data);
        console.log(data);
      });
  }

  deleteEmployee(id: string | number) {
    const confirmed = confirm('Are you sure you want to delete this employee?');
    if (!confirmed) {
      return;
    }
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.employeeService.loadEmployees();
      },
      error: err => {
        console.error(err);
      }
    });
  }
}