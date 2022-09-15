import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from '@app/_helpers/errorState';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirm } from '@app/_shared/confirm/dialog-confirm.component';
import { UserControllerService } from '@app/api/services/user-controller.service';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.less'],
})
export class UserStatusComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  changeUserstatusForm: FormGroup;
  createSubmitted = false;

  activeStatuses: string[] = ['ACTIVE', 'IN_ACTIVE'];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserControllerService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.changeUserstatusForm = this.formBuilder.group({
      userMail: ['', [Validators.required, Validators.email]],
      activeStatuses: ['', Validators.required],
    });
  }

  onChange() {
    this.createSubmitted = true;

    if (this.changeUserstatusForm.invalid) {
      return;
    }

    this.userService
      .getUserByEmail({
        email: this.changeUserstatusForm.get('userMail').value
      })
      .pipe(first())
      .subscribe({
        next: (user) => {
          if (
            (user.status == 'ACTIVE' &&
              !(
                this.changeUserstatusForm.get('activeStatuses').value ==
                'ACTIVE'
              ) ) ||
            (user.status == 'IN_ACTIVE' &&
              !(
                this.changeUserstatusForm.get('activeStatuses').value ==
                'IN_ACTIVE'
              ))
          ) {
            if (
              user.role.name == 'TEACHER' &&
              this.changeUserstatusForm.get('activeStatuses').value ==
              'IN_ACTIVE'
            ) {
              let mail = this.changeUserstatusForm.get('userMail').value;
              const dialogRef = this.dialog.open(DialogConfirm);

              dialogRef.afterClosed().subscribe((result) => {
                if (result) {
                  this.changeUserStatus(mail, 'IN_ACTIVE');
                }
              });
            } else {
              if (
                this.changeUserstatusForm.get('activeStatuses').value ==
                'IN_ACTIVE'
              )
                this.changeUserStatus(
                  this.changeUserstatusForm.get('userMail').value,
                  'IN_ACTIVE'
                );
              else
                this.changeUserStatus(
                  this.changeUserstatusForm.get('userMail').value,
                  'ACTIVE'
                );
            }
          } else {
            this.changeUserstatusForm
              .get('activeStatuses')
              .setErrors({ dublicateStatus: 'a' });
          }
        },
        error: (error) => {
          this.changeUserstatusForm
            .get('userMail')
            .setErrors({ notSuchUser: 'a' });
        },
      });
  }

  changeUserStatus(email: string, status: 'ACTIVE' | 'IN_ACTIVE') {
    this.userService.changeUserStatus({
      body: {
        email: email,
        status: status
      }
    }).pipe().subscribe();

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin/user-status']);
    });
  }

  get getchangeUserstatusForm() {
    return this.changeUserstatusForm.controls;
  }
}
