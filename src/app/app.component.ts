import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';

@Component({
  selector: 'sili-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AuthLayoutComponent,
    DashboardLayoutComponent
  ],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {}
