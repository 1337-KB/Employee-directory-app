import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../services/employee';

@Component({
  standalone: true,
  selector: 'app-employee-detail',
  styleUrl: './employee-detail.css',
  templateUrl: './employee-detail.html',
})
export class EmployeeDetail {
  private route = inject(ActivatedRoute);
  private employeeService = inject(EmployeeService);
  employeeId = this.route.snapshot.paramMap.get('id');  
  employee = this.employeeService.employees().find(emp => String(emp.id) === this.employeeId)
}
