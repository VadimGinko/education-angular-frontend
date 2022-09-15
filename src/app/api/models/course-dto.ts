/* tslint:disable */
/* eslint-disable */
import { CourseTypeDto } from './course-type-dto';
import { TaskDto } from './task-dto';
import { UserDto } from './user-dto';
export interface CourseDto {
  createdOn?: string;
  description?: string;
  id?: number;
  name?: string;
  publisher?: UserDto;
  rating?: number;
  status?: 'ACTIVE' | 'IN_ACTIVE';
  tasks?: Array<TaskDto>;
  type?: CourseTypeDto;
}
