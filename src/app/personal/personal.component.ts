import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserDto } from '@app/api/models/user-dto';
import { UserControllerService } from '@app/api/services/user-controller.service';
import {
  AuthenticationService
} from '@app/_services';

@Component({ templateUrl: 'personal.component.html' })
export class PersonalComponent {
  loading = false;
  editTeacherInfo: FormGroup;
  editPasswordForm: FormGroup;
  editTeacherInfoSubmitted = false;
  editPasswordSubmitted = false;
  currentUser: UserDto;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserControllerService,
    public dialog: MatDialog,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.editPasswordForm = this.formBuilder.group({
      editPasswordRepeat: [''],
      editPassword: [
        '',
        [Validators.pattern('^[a-zA-Z0-9]{8,20}$')],
      ],
    });
    this.editTeacherInfo = this.formBuilder.group({
      editTeacherFirstName: [this.currentUser.firstName, Validators.required],
      editTeacherLastName: [this.currentUser.lastName, Validators.required],
      editTeacherLink: [
        this.currentUser.link,
        [
          Validators.required,
          Validators.pattern(
            '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
          ),
        ],
      ],
      editTeacherDescription: [
        this.currentUser.description,
        Validators.required,
      ],
    });
  }

  onEdit() {
    this.editTeacherInfoSubmitted = true;

    this.userService
      .updateUserInfo({
        id: this.currentUser.id,
        body: {
          firstName: this.editTeacherInfo.get('editTeacherFirstName').value,
          lastName: this.editTeacherInfo.get('editTeacherLastName').value,
          link: this.editTeacherInfo.get('editTeacherLink').value,
          description: this.editTeacherInfo.get('editTeacherDescription').value
        }
      })
      .pipe()
      .subscribe({
        next: (user) => {
          this.authenticationService.editUserInfo(user);
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/personal-teacher']);
            });
        },
        error: (error) => { },
      });
  }

  onEditPassword() {
    console.log(this.editPasswordForm.get('editPassword').value)
    console.log(this.editPasswordForm.get('editPasswordRepeat').value)
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
              this.router.navigate(['/personal-teacher']);
            });
        },
        error: (error) => { },
      });
  }

  get getEditTeacherInfo() {
    return this.editTeacherInfo.controls;
  }
  get getEditPasswordForm() {
    return this.editPasswordForm.controls;
  }
}
