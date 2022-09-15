/* tslint:disable */
/* eslint-disable */
import { CourseDto } from './course-dto';
import { UserDto } from './user-dto';
export interface SubscriptionDto {
  course?: CourseDto;
  id?: number;
  rating?: number;
  status?: 'ACTIVE' | 'IN_ACTIVE' | 'COMPLETE';
  user?: UserDto;
}
