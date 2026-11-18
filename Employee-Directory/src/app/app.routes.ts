import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full'
  },
  {
    path: 'employees',
    loadComponent: () =>
      import('./features/employees/employee-list/employee-list')
        .then(m => m.EmployeeList)
  },
  {
    path: 'employees/add',
    loadComponent: () =>
        import('./features/employees/employee-form/employee-form')
        .then(m => m.EmployeeForm)
  },
  {
    path: 'employees/:id',
    loadComponent: () =>
      import('./features/employees/employee-detail/employee-detail')
        .then(m => m.EmployeeDetail)
  }, 
  {
    path: 'employees/edit/:id',
    loadComponent: () =>
      import('./features/employees/employee-form/employee-form')
        .then(m => m.EmployeeForm)
  }
];
