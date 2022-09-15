import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '@app/_services';
import { Role, UserRegister } from '@app/_models';

@Component({ templateUrl: 'main.component.html' })
export class MainComponent implements OnInit {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['/login']);
    } else {
      var user = this.authenticationService.currentUserValue;
      if (user.role.name == 'TEACHER') {
        this.router.navigate(['/teacher/course/create']);
      }
      if (user.role.name == 'ADMIN') {
        this.router.navigate(['/admin/course/type']);
      }
      if (user.role.name == 'USER') {
        this.router.navigate(['/user']);
      }
    }
  }

  ngOnInit() {}
}
