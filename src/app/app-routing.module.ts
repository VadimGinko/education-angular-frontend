import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main';
import { LoginComponent } from './login';
import { UserComponent } from './user';
import { RegisterComponent } from './register';
import { PersonalComponent } from './personal';
import { PersonalUserComponent } from './personal-user';
import { TeacherGuard, UserGuard } from './_helpers';

const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'teacher',
    loadChildren: () =>
      import('./teacher/teacher.module').then((m) => m.TeacherModule),
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'personal-teacher', component: PersonalComponent, canActivate: [TeacherGuard] },
  { path: 'personal-user', component: PersonalUserComponent, canActivate: [UserGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
