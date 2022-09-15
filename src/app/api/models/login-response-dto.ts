/* tslint:disable */
/* eslint-disable */
import { RoleRequestDto } from './role-request-dto';
export interface LoginResponseDto {
  description?: string;
  email?: string;
  firstName?: string;
  id?: number;
  lastName?: string;
  link?: string;
  role?: RoleRequestDto;
}
