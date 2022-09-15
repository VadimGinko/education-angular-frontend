import { NgModule, Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from '../_helpers';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { UserComponent } from '.';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from '../user/user.routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { TaskProgressComponent } from './task-progress/task-progress.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { VimeModule } from '@vime/angular';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  imports: [
    VimeModule,
    NgbRatingModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    UserRoutingModule,
    FormsModule,
    RouterModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  declarations: [UserComponent, TaskProgressComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [UserComponent],
})
export class UserModule {}
