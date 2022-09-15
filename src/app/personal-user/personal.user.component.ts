import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserDto } from '@app/api/models/user-dto';
import { UserControllerService } from '@app/api/services/user-controller.service';
import { User } from '@app/_models';
import {
  AuthenticationService,
} from '@app/_services';

@Component({ templateUrl: 'personal.user.component.html' })
export class PersonalUserComponent {
  loading = false;
  editUserInfo: FormGroup;
  editPasswordForm: FormGroup;
  editUserInfoSubmitted = false;
  editPasswordSubmitted = false;
  currentUser: UserDto;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserControllerService,
    public dialog: MatDialog,
    private authenticationService: AuthenticationService
  ) {
    this.editPasswordForm = this.formBuilder.group({
      editPasswordRepeat: ['', Validators.required],
      editPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9]{8,20}$'
          ),
        ],
      ],
    });
  }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.editUserInfo = this.formBuilder.group({
      editUserFirstName: [this.currentUser.firstName, Validators.required],
      editUserLastName: [this.currentUser.lastName, Validators.required]
    });
  }

  onEdit() {
    this.editUserInfoSubmitted = true;

    if (this.editUserInfo.invalid) {
      return;
    }

    this.userService
      .updateUserInfo({
        id: this.currentUser.id,
        body: {
          firstName: this.editUserInfo.get('editUserFirstName').value,
          lastName: this.editUserInfo.get('editUserLastName').value
        }
      })
      .pipe()
      .subscribe({
        next: (user) => {
          this.authenticationService.editUserInfo(user);
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/personal-user']);
            });
        },
        error: (error) => { },
      });
  }

  onEditPassword() {
    this.editPasswordSubmitted = false;

    if (this.editPasswordForm.invalid) {
      return;
    }

    if (
      this.editPasswordForm.get('editPassword').value !=
      this.editPasswordForm.get('editPasswordRepeat').value
    ) {
      this.editPasswordForm
        .get('editPasswordRepeat')
        .setErrors({ notEqual: 'a' });
      return;
    }

    this.userService
      .updatePassword({
        id: this.currentUser.id,
        body: this.editPasswordForm.get('editPassword').value
      })
      .pipe()
      .subscribe({
        next: (user) => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/personal-user']);
            });
        },
        error: (error) => {
        },
      });
  }

  get getEditUserInfo() {
    return this.editUserInfo.controls;
  }
  get getEditPasswordForm() {
    return this.editPasswordForm.controls;
  }
}
