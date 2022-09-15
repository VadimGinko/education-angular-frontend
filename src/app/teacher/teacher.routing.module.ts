import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherGuard } from '@app/_helpers';
import { TeacherComponent } from '.';
import { CreateCourseComponent } from './create-course/create.course.component';
import { CourseProgressComponent } from './course-progress/course.progress.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  {
    path: '',
    component: TeacherComponent,
    children: [
      {
        path: 'course/create',
        component: CreateCourseComponent,
        canActivate: [TeacherGuard]
      },
      {
        path: 'task',
        component: TaskComponent,
        canActivate: [TeacherGuard]
      },
      {
        path: 'course/progress',
        component: CourseProgressComponent,
        canActivate: [TeacherGuard]
      },
    ],
    canActivate: [TeacherGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
