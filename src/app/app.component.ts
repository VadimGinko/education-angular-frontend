import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { UserDto } from './api/models/user-dto';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
  currentUser: UserDto;
  teacherRole = false;
  userRole = false;
  adminRole = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    this.teacherRole = false;
    this.userRole = false;
    if (this.authenticationService.currentUserValue) {
      var role = this.authenticationService.currentUserValue.role.name;
      this.teacherRole = role == 'TEACHER' ? true : false;
      this.userRole = role == 'USER' ? true : false;
      this.adminRole = role == 'ADMIN' ? true : false;
    }
  }

  logout() {
    this.authenticationService.logout().subscribe();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/login']);
    });
  }
}
