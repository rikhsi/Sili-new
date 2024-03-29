import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_ROUTE, ROOT_ROUTE } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  onLogout(): void {
    this.router.navigate([ROOT_ROUTE.auth, AUTH_ROUTE.login]);
  }

  onLogIn(): void {
    this.router.navigate([ROOT_ROUTE.dashboard]);
  }
}
