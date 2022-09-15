/* tslint:disable */
/* eslint-disable */
import { RoleRequestDto } from './role-request-dto';
export interface RegistrationRequestDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role?: RoleRequestDto;
}
