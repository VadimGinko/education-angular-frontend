import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@app/_models';
import { Course } from '@app/_models/course';

@Component({
  selector: 'teacher.component',
  templateUrl: 'teacher.component.html',
})
export class TeacherInfo {
  constructor(
    public dialogRef: MatDialogRef<TeacherInfo>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    public dialog: MatDialog
  ) {
  }
}
