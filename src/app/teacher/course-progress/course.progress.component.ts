import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CodeAnswerDto } from '@app/api/models/code-answer-dto';
import { CourseDto } from '@app/api/models/course-dto';
import { ReviewDto } from '@app/api/models/review-dto';
import { TaskDto } from '@app/api/models/task-dto';
import { UserDto } from '@app/api/models/user-dto';
import { CodeAnswerControllerService } from '@app/api/services/code-answer-controller.service';
import { CourseControllerService } from '@app/api/services/course-controller.service';
import { TaskProgressControllerService } from '@app/api/services/task-progress-controller.service';
import { UserControllerService } from '@app/api/services/user-controller.service';
import {
  ProgressStatus
} from '@app/_models/course';

@Component({
  selector: 'course-progress',
  templateUrl: './course.progress.component.html',
  styleUrls: ['./course.progress.component.less'],
})
export class CourseProgressComponent implements OnInit {
  checkTaskForm: FormGroup;
  currentTasksForm: FormGroup;
  coursesForm: FormGroup;
  userForm: FormGroup;
  courses: CourseDto[];
  mails: Set<String>;
  isProgressPresented = false;
  isMails = false;
  noTasks = false;
  isTs = false;
  isTeacherCommentPresented = false;
  taskProgressId: number;
  task: TaskDto;
  codeAnswer: CodeAnswerDto;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseControllerService,
    private taskProgressService: TaskProgressControllerService,
    private userService: UserControllerService,
    private router: Router,
    private codeAnswerService: CodeAnswerControllerService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.courseService.getTeacherCourses1().subscribe((courses) => this.courses = courses);

    this.coursesForm = this.formBuilder.group({
      courses: [''],
    });
    this.userForm = this.formBuilder.group({
      mails: [''],
    });
    this.checkTaskForm = this.formBuilder.group({
      comment: ''
    });
    this.currentTasksForm = this.formBuilder.group({
      currentTasks: [''],
    });
  }

  showTasks() {
    this.isTeacherCommentPresented = false;
    this.noTasks = false;
    this.isMails = false;
    this.isProgressPresented = false;
    var course = this.coursesForm.get('courses').value;

    this.userService.getTasksForReview({ id: course.id }).subscribe((reviews) => {
      console.log(reviews)
      this.reviews = reviews;
      this.mails = new Set();
      if (reviews == null) {
        this.noTasks = true;
      } else {
        reviews.forEach(i => this.mails.add(i.userMail))
        this.isMails = true;
        console.log(this.mails)
      }
    });
  }
  reviews: Array<ReviewDto>

  reviews2222: Array<ReviewDto>
  showReview(){
    var mail = this.userForm.get('mails').value;
    console.log(mail)
    this.reviews2222 = this.reviews.filter(i => i.userMail == mail);
    this.isTs = true;
  }

  showAnswer(){
    var current = this.currentTasksForm.get('currentTasks').value;

      this.isProgressPresented = true;
      this.taskProgressId = current.progressId;
      this.task = current.task;
      this.codeAnswer = current.codeAnswer;
      if (this.codeAnswer.teacherComment != null) {
        this.isTeacherCommentPresented = true;
      }
  }

  onComplete(status: ProgressStatus) {
    this.taskProgressService
      .updateTaskProgressByProgressId({
        id: this.taskProgressId,
        body: {
          status: ProgressStatus.COMPLETE
        }
      })
      .pipe()
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/teacher/course/progress']);
          });
          //this.showTasks();
        },
        error: (error) => { },
      });
  }

  onReject() {
    this.taskProgressService
      .updateTaskProgressByProgressId({
        id: this.taskProgressId,
        body: {
          status: ProgressStatus.REJECT
        }
      })
      .pipe()
      .subscribe(() => {

        //this.showTasks();
        if (this.checkTaskForm.get('comment').value == '') {
          this.codeAnswer.teacherComment = '';
        } else {
          this.codeAnswer.teacherComment =
            this.checkTaskForm.get('comment').value;
        }
        this.codeAnswerService
          .editCodeAnswer({
            body: this.codeAnswer
          })
          .pipe()
          .subscribe(() => {
            console.log("qqqq")
            window.location.reload()
           });
          
      });
  }

  get getCoursesForm() {
    return this.coursesForm.controls;
  }

  get getCheckTaskForm() {
    return this.checkTaskForm.controls;
  }
}
