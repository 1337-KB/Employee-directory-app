import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  imports: [RouterLink, RouterLinkActive, CommonModule],
  selector: 'app-menu',
  styleUrl: './menu.css',
  templateUrl: './menu.html',
  standalone: true,
})
export class Menu {
  isSidebarOpen = signal(false);

  toggleSidebar() {
    this.isSidebarOpen.set(!this.isSidebarOpen());
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }

  logout() {
    console.log('User logged out');
  }
}

