import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RootRoute } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  onLogout(): void {
    this.router.navigate([RootRoute.auth]);
  }

  onLogIn(): void {
    this.router.navigate([RootRoute.dashboard]);
  }
}
