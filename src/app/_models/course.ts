import { User } from '.';
import { CourseType } from './courseType';

export class Task {
  id: number;
  name: string;
  order: number;
  rating: number;
  courseId: number;
  links: TaskLink[];
  type: string;
  content: string;
}

export class Subscription {
  course: Course;
  user: User;
  rating: number;
  status: string;
}

export class Course {
  id: number;
  rating: number;
  name: string;
  type: CourseType;
  status: string;
  publisher: User;
  tasks: Task[];
  description: string;
}

export class TaskLink {
  id: number;
  link: string;
  taskId: number;
}
export enum ProgressStatus {
  READY = 'READY',
  REVIEW = 'REVIEW',
  REJECT = 'REJECT',
  COMPLETE = 'COMPLETE',
}
export class TaskProgress {
  id: number;
  taskId: number;
  userId: number;
  status: ProgressStatus;
}

export class CodeAnswer {
  id: number;
  taskProgressId: number;
  repositoryLink: string;
  teacherComment: string;
}


export class TaskReview {
  progressId: number;
  task: Task;
  codeAnswer: CodeAnswer;
}
