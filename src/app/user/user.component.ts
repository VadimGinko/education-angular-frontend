import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CourseDto } from '@app/api/models/course-dto';
import { CourseTypeDto } from '@app/api/models/course-type-dto';
import { CourseControllerService } from '@app/api/services/course-controller.service';
import { CourseTypeControllerService } from '@app/api/services/course-type-controller.service';
import { TaskProgressControllerService } from '@app/api/services/task-progress-controller.service';
import { UserControllerService } from '@app/api/services/user-controller.service';
import { Course } from '@app/_models/course';
import { TeacherInfo } from '@app/_shared/teacherInfo/teacher.component';
import { first } from 'rxjs/operators';


@Component({ templateUrl: 'user.component.html' })
export class UserComponent {
  unsubscribedCourses: Array<CourseDto>;
  unsubscribedCoursesConst: Array<CourseDto>;
  subscribedCourses: Array<CourseDto>;
  courseTypes: Array<CourseTypeDto>;
  upDownTypes: Array<String> = ["UP", "DOWN"]
  searchCourse: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserControllerService,
    private taskProgressControllerService: TaskProgressControllerService,
    private courseTypeService: CourseTypeControllerService,
    private courseControllerService: CourseControllerService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.searchCourse = this.formBuilder.group({
      name: [''],
      type: [''],
    });
    this.courseTypeService.findAllCourseTypes()
      .subscribe((courseTypes) => this.courseTypes = courseTypes);

    this.userService.getSubscribedCourses().subscribe({
      next: (subscribedCourses) => {
        subscribedCourses.forEach(async (i) => {
          i['percent'] = await this.getPercent(i) * 100;
        })
        this.subscribedCourses = subscribedCourses;
      },
    });
    this.userService.getUnSubscribedCoursesByFilters({
      status: 'ACTIVE',
    }).subscribe((unSubscrubedCourses) => {
      this.unsubscribedCourses = unSubscrubedCourses
      this.unsubscribedCoursesConst = unSubscrubedCourses
    });
  }
  onSubscribe(course: CourseDto) {
    this.userService
      .subscribe({
        body: course
      })
      .pipe(first())
      .subscribe({
        next: () => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/user']);
            });
        },
        error: (error) => { },
      });
  }

  onGoToTask(course: Course) {
    this.router.navigate([`/user/course-progress/${course.id}`]);
  }
  async getPercent(course: CourseDto) {
    return await this.taskProgressControllerService.getPercent({
      courseId: course.id
    }).toPromise()
  }

  onUnsubscribe(course: CourseDto) {
    this.userService
      .updateSubscription({
        body: {
          course: course,
          status: 'IN_ACTIVE'
        }
      })
      .pipe(first())
      .subscribe({
        next: () => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/user']);
            });
        },
        error: (error) => { },
      });
  }

  onTeacherInfo(course: Course) {
    const dialogRef = this.dialog.open(TeacherInfo, {
      data: course.publisher,
    });
    dialogRef.afterClosed().subscribe();
  }

  search() {
    this.userService.getUnSubscribedCoursesByFilters({
      status: 'ACTIVE',
      name: this.searchCourse.get('name').value,
      type: this.searchCourse.get('type').value
    })
      .subscribe({
        next: (unSubscrubedCourses) => {
          this.unsubscribedCourses = unSubscrubedCourses;
        },
      });
  }

  removeProgress(course: CourseDto) {
    this.courseControllerService.removeProgress({
      courseId: course.id
    }).subscribe(() => {
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => {
          this.router.navigate(['/user']);
        });
    })
  }



  private name: String = undefined;
  private type: String = undefined;
  private date: String = undefined;

  onSearchChange(searchValue: string): void {
    if (searchValue == "") {
      this.name = undefined
    } else {
      this.name = searchValue;
    }
    this.show()
  }

  onTypeChange(searchValue: string): void {
    this.type = searchValue;
    this.show()
  }

  onDateChange(searchValue: string): void {
    this.date = searchValue;
    this.show()
  }
  selectedOption1: string;
  selectedOption2: string;
  selectedOption3: string;
  removeFilters() {
    this.name = undefined;
    this.selectedOption1 = "";
    this.selectedOption2 = "";
    this.selectedOption3 = "";
    this.type = undefined;
    this.date = undefined;
    this.show()
  }

  show() {
    var courses = this.unsubscribedCoursesConst;
    if (this.name != undefined) {
      courses = courses.filter(i => i.name.includes(this.name.toString()))
    }
    if (this.type != undefined) {
      courses = courses.filter(i => i.type.name == this.type.toString())
    }
    if (this.date != undefined) {
      if (this.date == "UP") {
        courses = courses.sort(function (a, b) {
          return +new Date(a.createdOn.toString()) - +new Date(b.createdOn.toString());
        });
      } else {
        courses = courses.sort(function (a, b) {
          return +new Date(b.createdOn.toString()) - +new Date(a.createdOn.toString());
        });
      }
    }
    this.unsubscribedCourses = courses
    // console.log(courses)
    // console.log(this.name + ' ' + this.type + ' ' + this.date)
  }
}
