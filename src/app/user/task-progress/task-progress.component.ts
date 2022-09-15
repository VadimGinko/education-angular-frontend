import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeAnswerDto } from '@app/api/models/code-answer-dto';
import { CourseDto } from '@app/api/models/course-dto';
import { TaskDto } from '@app/api/models/task-dto';
import { TaskProgressDto } from '@app/api/models/task-progress-dto';
import { CodeAnswerControllerService } from '@app/api/services/code-answer-controller.service';
import { TaskProgressControllerService } from '@app/api/services/task-progress-controller.service';
import { UserControllerService } from '@app/api/services/user-controller.service';
import {
  CodeAnswer, ProgressStatus, TaskProgress
} from '@app/_models/course';
import { CourseCompleted } from '@app/_shared/course-completed/course-completed';

@Component({
  selector: 'task-progress',
  templateUrl: './task-progress.component.html',
  styleUrls: ['./task-progress.component.css'],
})
export class TaskProgressComponent implements OnInit {
  currentRate: number;
  rating: number;
  course: CourseDto;
  taskProgress: TaskProgressDto;
  codeAnswer: CodeAnswerDto;
  task: TaskDto;
  isMaterial = false;
  isCode = false;
  isVideo = false;
  isTaskComment = false;
  repositoryLinkCourse: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private codeAnswerService: CodeAnswerControllerService,
    private userService: UserControllerService,
    private taskProgressControllerService: TaskProgressControllerService,
    private taskProgressService: TaskProgressControllerService,
    public dialog: MatDialog
  ) {
    this.taskProgress = new TaskProgress();
    this.taskProgress.status = ProgressStatus.READY;
    this.initializeRepositoryLinkForm('');
  }

  initializeRepositoryLinkForm(link: string) {
    this.repositoryLinkCourse = this.formBuilder.group({
      link: [
        link,
        [
          Validators.required,
          Validators.pattern(
            '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
          ),
        ],
      ],
    });
  }

  ngOnInit() {
    this.userService
      .getSubscriptionByCourseId({
        courseId: this.activateRoute.snapshot.params['id']
      })
      .subscribe({
        next: async (subscription) => {
          this.currentRate = subscription.rating;
          this.course = subscription.course;
          this.rating = subscription.rating;
          this.onClick(this.course.tasks[0]);
          this.changeMenuButtonColors();
        },
        error: (error) => { },
      });
  }

  async getPercent(course: CourseDto) {
    return await this.taskProgressControllerService.getPercent({
      courseId: course.id
    }).toPromise()
  }

  changeMenuButtonColors() {
    this.taskProgressService
      .getTaskProgressByFilters({
        courseId: this.activateRoute.snapshot.params['id']
      })
      .subscribe({
        next: (taskProgresses: Array<TaskProgressDto>) => {
          taskProgresses.forEach((taskProgress) => {
            if (taskProgress.status == ProgressStatus.COMPLETE) {
              document.getElementById(
                'task-' + taskProgress.taskId
              ).style.backgroundColor = '#24a319';
              document.getElementById(
                'task-' + taskProgress.taskId
              ).style.opacity = '0.8';
            }
          });
        },
        error: (error) => { },
      });
  }

  changeRating() {
    this.userService
      .updateSubscription({
        body: {
          course: this.course,
          rating: this.currentRate
        }
      })
      .pipe()
      .subscribe({
        next: () => { },
        error: (error) => { },
      });
  }

  async onClick(task: TaskDto) {
    this.task = task;
    this.isMaterial = task.type == 'MATERIAL';
    this.isCode = task.type == 'CODE';
    this.isVideo = task.type == 'VIDEO';
    if(await this.getPercent(this.course) * 100 == 100) {
      const dialogRef = this.dialog.open(CourseCompleted);

      dialogRef.afterClosed().subscribe(() => {
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/user']);
          });
      });
    }
    this.taskProgressService
      .getTaskProgressByFilters({
        taskId: task.id
      })
      .pipe()
      .subscribe({
        next: (taskProgress) => {
          this.changeMenuButtonColors();
          this.taskProgress = taskProgress[0];
          if (this.task.type == 'CODE') {
            this.taskProgressService
              .getCodeAnswerByProgressId({
                id: taskProgress[0].id
              })
              .pipe()
              .subscribe((codeAnswer) => {
                this.codeAnswer = codeAnswer;
                this.repositoryLinkCourse
                  .get('link')
                  .setValue(codeAnswer.repositoryLink);
              });
          }
        },
      });
  }

  completeMaterial(task: TaskDto) {
    this.taskProgressService
      .updateTaskProgress({
        body: {
          taskId: task.id,
          status: ProgressStatus.COMPLETE
        }
      })
      .pipe()
      .subscribe(() => this.onClick(task));
  }

  editCodeAnswer(task: TaskDto) {
    if (this.repositoryLinkCourse.invalid) {
      return;
    }
    this.codeAnswer.repositoryLink =
      this.repositoryLinkCourse.get('link').value;
    this.codeAnswerService
      .editCodeAnswer({
        body: this.codeAnswer
      })
      .pipe()
      .subscribe({
        next: () => {
          this.taskProgress.status = ProgressStatus.REVIEW;
          this.taskProgressService
            .updateTaskProgress({
              body: this.taskProgress
            })
            .pipe()
            .subscribe(() => this.onClick(task));
        },
      });
  }

  addCodeAnswer(task: TaskDto) {
    if (this.repositoryLinkCourse.invalid) {
      return;
    }
    var codeAnswer = new CodeAnswer();
    codeAnswer.taskProgressId = this.taskProgress.id;
    codeAnswer.repositoryLink = this.repositoryLinkCourse.get('link').value;
    this.taskProgressService
      .addCodeAnswer({
        id: this.taskProgress.id,
        body: codeAnswer
      })
      .pipe()
      .subscribe({
        next: () => {
          this.taskProgress.status = ProgressStatus.REVIEW;
          this.taskProgressService
            .updateTaskProgress({ body: this.taskProgress })
            .pipe()
            .subscribe({
              next: () => {
                this.onClick(task);
              },
            });
        },
      });
  }

  isTaskReady = () => this.taskProgress.status == ProgressStatus.READY;
  isTaskinReview = () => this.taskProgress.status == ProgressStatus.REVIEW;
  isTaskRejected = () => this.taskProgress.status == ProgressStatus.REJECT;
  isTaskCompleted = () => this.taskProgress.status == ProgressStatus.COMPLETE;

  get getRepositoryLinkCourse() {
    return this.repositoryLinkCourse.controls;
  }
}
