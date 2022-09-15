import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { CourseType } from '../_models/courseType';
import { Task } from '@app/_models/course';
import { TaskDto } from '@app/api/models/task-dto';

@Injectable({ providedIn: 'root' })
export class TaskInfoService {
  addTaskCourseId: number;
  editedTask: TaskDto;
  editedLinksTask: TaskDto;
  currentCourse: number;
}
