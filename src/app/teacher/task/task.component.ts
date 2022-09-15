import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { CourseDto } from '@app/api/models/course-dto';
import { TaskDto } from '@app/api/models/task-dto';
import { CourseControllerService } from '@app/api/services/course-controller.service';
import { CourseTypeControllerService } from '@app/api/services/course-type-controller.service';
import { TaskControllerService } from '@app/api/services/task-controller.service';
import { UserControllerService } from '@app/api/services/user-controller.service';
import { User } from '@app/_models';
import { CourseType } from '@app/_models/courseType';
import {
  ChangeCourseLinksService, EditTaskEvent, RefreshEvent, TaskInfoService, UpdateTeacheBoardEvent
} from '@app/_services';
import * as BehaviorSubject from 'rxjs/internal/BehaviorSubject';
import { first } from 'rxjs/operators';

enum Current {
  "CREATE", "EDIT", "LINK", "NONE"
}

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  showTasksForm: FormGroup;

  courseTypeNames: Array<CourseDto>;
  current: Current;
  courses: CourseDto[];
  tasks: TaskDto[];

  private currentUserSubject: BehaviorSubject.BehaviorSubject<User>;
  displayedColumns: string[] = [
    'order',
    'name',
    'content',
    'type',
    'button',
    'links',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private taskInfoService: TaskInfoService,
    private courseService: CourseControllerService,
    private userService: UserControllerService,
    private service: ChangeCourseLinksService,
    private editTaskEvent: EditTaskEvent,
    private updateTeacheBoardEvent: UpdateTeacheBoardEvent,
    private refreshEvent: RefreshEvent,
    private taskControllerService: TaskControllerService,
    private courseTypeService: CourseTypeControllerService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.currentUserSubject = new BehaviorSubject.BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
  }

  ngOnInit(): void {
    this.courseTypeService
      .findAllCourseTypes()
      .subscribe((courseTypeNames) => this.courseTypeNames = courseTypeNames);

    this.updateTeacheBoardEvent.event.subscribe(() => {
      this.current = Current.CREATE;
    });

    this.refreshEvent.event.subscribe(() => {
      this.current = Current.NONE;
      this.showTasks();
    });

    this.userService
      .getTeacherCourses({ id: this.currentUserSubject.value.id })
      .subscribe((courses) => this.courses = courses);

    this.showTasksForm = this.formBuilder.group({
      courseNames: ['', Validators.required],
    });

    if (this.taskInfoService.currentCourse != undefined) {
      this.courseService.getByCourseId({ id: this.taskInfoService.currentCourse }).subscribe(
        (course) => {
          // Это нужно для передачи данных компоненту добаления курса
          this.taskInfoService.addTaskCourseId = this.taskInfoService.currentCourse;
          this.current = Current.CREATE;
          if (course.tasks.length != 0) {
            this.tasks = course.tasks;
          }
        });
    }
    
  }
  courseEdit: CourseDto;
  showTasks() {
    if (this.showTasksForm.invalid) {
      return;
    }

    var courseId = this.showTasksForm.get('courseNames').value;
    this.taskInfoService.currentCourse = courseId;
    this.courseService
      .getByCourseId({ id: courseId })
      .subscribe((course) => {
        this.current = Current.CREATE;
        // Это нужно для передачи данных компоненту добаления курса
        this.taskInfoService.addTaskCourseId = courseId;
        if (course.tasks.length != 0) {
          this.tasks = course.tasks;
        } else {
          this.tasks = undefined;
        }
        this.courseEdit = course;
        this.showEditForm(course)
      });
  }

  editTask(task: TaskDto) {
    this.taskInfoService.editedTask = task;
    this.current = Current.CREATE;
    this.current = Current.EDIT;
    this.editTaskEvent.event.emit(null);
  }

  editLinks(task: TaskDto) {
    this.taskInfoService.editedLinksTask = task;
    this.current = Current.CREATE;
    this.current = Current.LINK;
    this.service.event.emit(null);
  }

  get getCreateCourseForm() {
    return this.showTasksForm.controls;
  }






























































  @ViewChild('table') table: MatTable<TaskDto>;
  dropTable(event: CdkDragDrop<TaskDto[]>) {
    const prevIndex = this.tasks.findIndex((d) => d === event.item.data);
    moveItemInArray(this.tasks, prevIndex, event.currentIndex);
    this.tasks.forEach((task, idx) => {
      task.order = idx + 1;
    })
    this.taskControllerService.updateOrder({
      body: this.tasks
    }).subscribe()
    this.table.renderRows();
  }






  editCourseSubmitted = false;
  editedCourse: CourseDto;
  editCourseForm: FormGroup;
  isEditorShow: Boolean = false;
  activeStatuses: string[] = ['Активный', 'Неактивный'];

  deleteCourse() {
    var courseId = this.showTasksForm.get('courseNames').value;
    var course =
      this.courseService
        .removeCourseById({ id: course.id })
        .subscribe({
          next: () => {
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['/teacher/task']);
              });
          },
          error: (error) => {
            alert(error)
          },
        });
  }

  onEdit() {
    this.editCourseSubmitted = true;

    if (this.editCourseForm.invalid) {
      return;
    }

    this.courseService
      .updateCourse({
        id: this.editedCourse.id,
        body: {
          id: this.editedCourse.id,
          name: this.editCourseForm.get('editCourseName').value,
          description: this.editCourseForm.get('editCourseDescription').value,
          status: (this.editCourseForm.get('editCourseStatus').value == 'Активный') ? 'ACTIVE' : 'IN_ACTIVE',
          type: {
            id: this.editCourseForm.get('editCourseType').value,
            name: ''
          }
        }
      })
      .pipe(first())
      .subscribe({
        next: () => {
          this.courseService.getByCourseId({ id: this.taskInfoService.currentCourse }).subscribe(
            (course) => {
              this.showEditForm(course)
            })
        },
        error: (error) => {
          this.editCourseForm
            .get('editCourseName')
            .setErrors({ dublicate: 'a' });
        },
      });
  }

  showEditForm(course: CourseDto) {
    this.editedCourse = course
    var status = ''
    if (course.status == 'ACTIVE')
      status = 'Активный'
    else if (course.status == 'IN_ACTIVE')
      status = 'Неактивный'

    this.editCourseForm = this.formBuilder.group({
      editCourseName: [course.name, Validators.required],
      editCourseDescription: [course.description, Validators.required],
      editCourseType: [course.type.id, Validators.required],
      editCourseStatus: [status, Validators.required],
    });

    this.isEditorShow = true;
  }

  get editCourseDescription() {
    return this.editCourseForm.controls.editCourseDescription as FormControl;
  }

  get getEditCourseForm() {
    return this.editCourseForm.controls;
  }
}
