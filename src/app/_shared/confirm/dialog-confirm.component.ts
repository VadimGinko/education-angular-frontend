import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'dialog-confirm.component',
  templateUrl: 'dialog-confirm.component.html',
})
export class DialogConfirm {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogConfirm);
  }
}
