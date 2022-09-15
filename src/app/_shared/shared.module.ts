import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogConfirm } from './confirm/dialog-confirm.component';
import { TeacherInfo } from './teacherInfo/teacher.component';
import { RegDialogContent } from './reg-dialog/dialog-content-2';
import { RichTextComponent } from './richText/rich-text.component';
import { CourseCompleted } from './course-completed/course-completed';
import { MatButtonModule } from '@angular/material/button';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    QuillModule
  ],
  declarations: [DialogConfirm, TeacherInfo, RichTextComponent, RegDialogContent, CourseCompleted],
  exports: [RichTextComponent],
  providers: [],
  bootstrap: [DialogConfirm]
})
export class SharedModule {}
