import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '@app/_helpers';
import { AdminComponent } from '.';

import { CourseTypeComponent } from './course-type/course-type.component';
import { UserStatusComponent } from './user-status/user-status.component';
import { EditCourseStatusComponent } from './edit-course-status/edit.course.status.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'course/type', component: CourseTypeComponent, canActivate: [AdminGuard] },
      { path: 'course/status', component: EditCourseStatusComponent, canActivate: [AdminGuard] },
      { path: 'user-status', component: UserStatusComponent, canActivate: [AdminGuard] },
    ],
    canActivate: [AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
