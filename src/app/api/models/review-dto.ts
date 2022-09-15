/* tslint:disable */
/* eslint-disable */
import { CodeAnswerDto } from './code-answer-dto';
import { TaskDto } from './task-dto';
export interface ReviewDto {
  codeAnswer?: CodeAnswerDto;
  progressId?: number;
  task?: TaskDto;
  userMail?: string;
}
