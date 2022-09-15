import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '@app/_services';
import { Role, UserRegister } from '@app/_models';
import { UserControllerService } from '@app/api/services/user-controller.service';
import { RegistrationRequestDto } from '@app/api/models/registration-request-dto';
import { MatDialog } from '@angular/material/dialog';
import { RegDialogContent } from '@app/_shared/reg-dialog/dialog-content-2';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  roles: string[] = ['TEACHER', 'USER'];
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userControllerService: UserControllerService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  get getRegisterForm() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.userControllerService
      .register({
        body: {
          email: this.getRegisterForm.email.value,
          password: this.getRegisterForm.password.value,
          firstName: this.getRegisterForm.firstName.value,
          lastName: this.getRegisterForm.lastName.value,
          role: {
            name: this.getRegisterForm.role.value
          }
        }
      })
      .pipe()
      .subscribe({
        next: () => {
          const dialogRef = this.dialog.open(RegDialogContent);

          dialogRef.afterClosed().subscribe(() => {
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['/login']);
              });
          });

        },
        error: (error) => {
          this.error = JSON.parse(error.error).message;
        },
      });
  }
}
