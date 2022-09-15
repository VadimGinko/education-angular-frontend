/* tslint:disable */
/* eslint-disable */
import { TaskResourceDto } from './task-resource-dto';
export interface TaskDto {
  content?: string;
  courseId?: number;
  id?: number;
  links?: Array<TaskResourceDto>;
  name?: string;
  order?: number;
  rating?: number;
  type?: 'VIDEO' | 'MATERIAL' | 'CODE';
}
