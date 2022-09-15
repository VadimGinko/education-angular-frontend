import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CourseDto } from '@app/api/models/course-dto';
import { CourseControllerService } from '@app/api/services/course-controller.service';
import { CourseTypeControllerService } from '@app/api/services/course-type-controller.service';
import { User } from '@app/_models';
import * as BehaviorSubject from 'rxjs/internal/BehaviorSubject';
import { first } from 'rxjs/operators';

@Component({
  selector: 'edit-course-status',
  templateUrl: './edit.course.status.component.html',
  styleUrls: ['./edit.course.status.component.css'],
})
export class EditCourseStatusComponent implements AfterViewInit {
  currentPage = -1;
  visibleCoursesCount = 3;
  courses: MatTableDataSource<CourseDto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  editCourseSubmitted = false;
  editCourseForm: FormGroup;

  displayedColumns: string[] = [
    'name',
    'type',
    'publisher',
    'status',
    'edit'
  ];
  activeStatuses: string[] = ['Активный', 'Неактивный'];
  private currentUserSubject: BehaviorSubject.BehaviorSubject<User>;

  constructor(
    private formBuilder: FormBuilder,
    private courseTypeService: CourseTypeControllerService,
    private courseService: CourseControllerService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.currentUserSubject = new BehaviorSubject.BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
  }


  ngAfterViewInit(): void {
    this.courseService.getAllCourses().subscribe((courses) => {
      this.courses = new MatTableDataSource<CourseDto>(courses);
      this.courses.paginator = this.paginator;
      this.courses.sort = this.sort;
    });
  }

  ngOnInit(): void {
    this.editCourseForm = this.formBuilder.group({
      courseNames: ['', Validators.required],
      editCourseStatus: ['', Validators.required],
    });
  }

  editCourse(course: CourseDto) {
    this.editCourseSubmitted = true;

    if (course.status == 'ACTIVE')
      course.status = 'IN_ACTIVE';
    else
      course.status = 'ACTIVE';

    this.courseService
      .updateCourse({
        id: course.id,
        body: course
      })
      .pipe(first())
      .subscribe({
        next: () => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/admin/course/status']);
            });
        },
        error: (error) => {
          this.editCourseForm
            .get('editCourseName')
            .setErrors({ dublicate: 'a' });
        },
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.courses.filterPredicate = function (data, filter: string): boolean {
      return data.name.toLowerCase().includes(filter) || data.type.name.toLowerCase().includes(filter) || data.status.toLowerCase().includes(filter);
    };
    this.courses.filter = filterValue.trim().toLowerCase();

    if (this.courses.paginator) {
      this.courses.paginator.firstPage();
    }
  }

  get getEditCourseForm() {
    return this.editCourseForm.controls;
  }
}
