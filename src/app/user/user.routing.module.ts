import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskProgressComponent } from './task-progress/task-progress.component';
import { UserGuard } from '@app/_helpers';
import { UserComponent } from '.';
const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    // children: [
    //   {
    //     path: 'course/create',
    //     component: CreateCourseComponent,
    //     canActivate: [TeacherGuard]
    //   },
    //   {
    //     path: 'task',
    //     component: TaskComponent,
    //     canActivate: [TeacherGuard]
    //   },
    //   {
    //     path: 'course/edit',
    //     component: EditCourseComponent,
    //     canActivate: [TeacherGuard]
    //   },
    // ],
    canActivate: [UserGuard]
  },
  { path: 'user/course-progress/:id', component: TaskProgressComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
