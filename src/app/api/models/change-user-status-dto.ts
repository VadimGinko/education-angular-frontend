/* tslint:disable */
/* eslint-disable */
export interface ChangeUserStatusDto {
  email: string;
  status: 'ACTIVE' | 'IN_ACTIVE' | 'EMAIL_NOT_CONFIRMED';
}
