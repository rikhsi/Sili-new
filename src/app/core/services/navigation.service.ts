import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ROOT_ROUTE } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  onLogout(): void {
    this.router.navigate([ROOT_ROUTE.auth]);
  }

  onLogIn(): void {
    this.router.navigate([ROOT_ROUTE.dashboard]);
  }
}
