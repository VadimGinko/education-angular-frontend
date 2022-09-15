import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from '../_helpers';
import { AdminComponent } from '.';
import { CourseTypeComponent } from './course-type/course-type.component';
import { EditCourseStatusComponent } from './edit-course-status/edit.course.status.component';
import { AdminRoutingModule } from './admin.routing.module';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserStatusComponent } from './user-status/user-status.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { VimeModule } from '@vime/angular';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  imports: [
    VimeModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    AdminRoutingModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule 
  ],
  declarations: [AdminComponent, CourseTypeComponent, UserStatusComponent, EditCourseStatusComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AdminComponent],
})
export class AdminModule { }
