import { Injectable, signal, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee'; 
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient);
  private apiUrl = "http://localhost:8080/api/employees"
  
  employees = signal<Employee[]>([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Smith',
      role: 'Manager',
      email: 'john@company.com'
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Doe',
      role: 'Analyst',
      email: 'jane@company.com'
    }
  ]);
  loading = signal(false);

  addEmployee(employee: Employee):Observable<Employee[]> {
    return this.http.post<Employee[]>(this.apiUrl, employee);
  }
  loadEmployees() {
    this.loading.set(true);
    this.http.get<Employee[]>(this.apiUrl).subscribe({
      next: employees => {
        this.employees.set(employees);
      },
      error: err => {
        console.error(err);
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }
  deleteEmployee(id: Employee['id']) {
    return this.http.delete<Employee[]>(`${this.apiUrl}/${id}`);
  }
  updateEmployee(employee: Employee) {
    return this.http.put<Employee[]>(`${this.apiUrl}/${employee.id}`, employee);
  }
  getEmployee(id: Employee['id']) {
  return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }
}