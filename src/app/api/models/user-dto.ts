/* tslint:disable */
/* eslint-disable */
import { Role } from './role';
export interface UserDto {
  description?: string;
  email?: string;
  firstName?: string;
  id?: number;
  lastName?: string;
  link?: string;
  role?: Role;
  status?: 'ACTIVE' | 'IN_ACTIVE' | 'EMAIL_NOT_CONFIRMED';
}
