/* tslint:disable */
/* eslint-disable */
export interface TaskProgressDto {
  id?: number;
  status?: 'READY' | 'REVIEW' | 'REJECT' | 'COMPLETE';
  taskId?: number;
  userId?: number;
}
