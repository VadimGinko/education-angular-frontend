import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CourseTypeDto } from '@app/api/models/course-type-dto';
import { CourseControllerService } from '@app/api/services/course-controller.service';
import { CourseTypeControllerService } from '@app/api/services/course-type-controller.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'create-course',
  templateUrl: './create.course.component.html',
  styleUrls: ['./create.course.component.less'],
})
export class CreateCourseComponent implements OnInit {
  content = ''
  createCourseForm: FormGroup;
  createCourseSubmitted = false;
  courseTypeNames: CourseTypeDto[];

  constructor(
    private formBuilder: FormBuilder,
    private courseTypeService: CourseTypeControllerService,
    private courseService: CourseControllerService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.courseTypeService.findAllCourseTypes().subscribe(
      (courseTypeNames) => { this.courseTypeNames = courseTypeNames });

    this.createCourseForm = this.formBuilder.group({
      createCourseName: ['', Validators.required],
      description: [''],
      courseTypeNames: ['', Validators.required],
    });
  }
  get createCourseDescription() {
    return this.createCourseForm.controls.description as FormControl;
  }
  onCreate() {
    this.createCourseSubmitted = true;

    if (this.createCourseForm.invalid) {
      return;
    }

    this.courseService
      .createCourse({
        body: {
          name: this.createCourseForm.get('createCourseName').value,
          description: this.createCourseForm.get('description').value,
          type: {
            name: this.createCourseForm.get('courseTypeNames').value
          }
        }
      })
      .pipe(first())
      .subscribe({
        next: () => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/teacher/course/create']);
            });
        },
        error: (error) => {
          this.createCourseForm
            .get('createCourseName')
            .setErrors({ dublicate: 'a' });
        },
      });
  }

  get getCreateCourseForm() {
    return this.createCourseForm.controls;
  }
}
