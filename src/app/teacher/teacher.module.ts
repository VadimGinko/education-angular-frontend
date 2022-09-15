import { NgModule, Component, Input, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from '../_helpers';
import { TeacherRoutingModule } from './teacher.routing.module';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateCourseComponent } from './create-course/create.course.component';
import { TeacherComponent } from '.';
import { RouterModule } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { EditLinksComponent } from './edit-links/edit-links.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { CreateLinkComponent } from './create-link/create.link.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CourseProgressComponent } from './course-progress/course.progress.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatRadioModule} from '@angular/material/radio';
import { QuillModule } from 'ngx-quill';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { RichTextComponent } from '@app/_shared/richText/rich-text.component';
import { SharedModule } from '@app/_shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  imports: [
    DragDropModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    TeacherRoutingModule,
    FormsModule,
    RouterModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatDialogModule,
    MatRadioModule,
    MatProgressBarModule,
    MatTooltipModule,  
    SharedModule,
    QuillModule.forRoot()
  ],
  declarations: [
    TeacherComponent,
    AddTaskComponent,
    EditTaskComponent,
    EditLinksComponent,
    CreateCourseComponent,
    CreateLinkComponent,
    CourseProgressComponent,
    TaskComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [TeacherComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class TeacherModule {}
