import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { CourseTypeDto } from '@app/api/models/course-type-dto';
import { CourseTypeControllerService } from '@app/api/services/course-type-controller.service';
import { MyErrorStateMatcher } from '@app/_helpers/errorState';
import { first } from 'rxjs/operators';

//https://jasonwatmore.com/post/2020/07/07/angular-10-reactive-forms-validation-example
@Component({
  selector: 'app-course-type',
  templateUrl: './course-type.component.html',
  styleUrls: ['./course-type.component.less'],
})
export class CourseTypeComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  editCourseType: CourseTypeDto;
  createTypeForm: FormGroup;
  editTypeForm: FormGroup;
  deleteTypeForm: FormGroup;
  courseTypes: Array<CourseTypeDto>;
  createSubmitted = false;
  editSubmitted = false;
  editFormFlag = false;
  addFormFlag = false;
  deleteSubmitted = false;
  error;


  constructor(
    private formBuilder: FormBuilder,
    private courseTypeService: CourseTypeControllerService,
    private router: Router
  ) { }

  displayedColumns: string[] = [
    'name',
    'edit',
    'remove'
  ];

  ngOnInit(): void {
    this.courseTypeService.findAllCourseTypes().subscribe(
      courseTypes => {
        this.courseTypes = courseTypes
      }
    );
    this.createTypeForm = this.formBuilder.group({
      createTypeName: ['', Validators.required],
    });

    this.editTypeForm = this.formBuilder.group({
      editTypeName: ['', Validators.required],
      courseNames: ['', Validators.required],
    });

    this.deleteTypeForm = this.formBuilder.group({
      courseNames: ['', Validators.required],
    });
  }

  onCreate() {
    this.error = "";
    this.createSubmitted = true;

    if (this.createTypeForm.invalid) {
      return;
    }
    this.courseTypeService
      .createCourseType({
        body: {
          name: this.createTypeForm.get('createTypeName').value
        }
      })
      .pipe(first())
      .subscribe({
        next: () => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/admin/course/type']);
            });
        },
        error: (error) => {
          this.createTypeForm
            .get('createTypeName')
            .setErrors({ dublicate: 'a' });
        },
      });
  }

  onEditForm(courseTypeDto: CourseTypeDto) {
    this.editFormFlag = true;
    this.editTypeForm.get('editTypeName').setValue(courseTypeDto.name);
    this.editCourseType = courseTypeDto;
  }

  onCancel() {
    this.editFormFlag = false;
  }

  onEdit() {
    this.courseTypeService
      .updateCourseType({
        id: this.editCourseType.id,
        body: {
          name: this.editTypeForm.get('editTypeName').value
        }
      })
      .pipe(first())
      .subscribe({
        next: () => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.editFormFlag = false;
              this.router.navigate(['/admin/course/type']);
            });
        },
        error: (error) => {
          this.editTypeForm.get('editTypeName').setErrors({ dublicate: 'a' });
        },
      });
  }

  onDelete(courseTypeDto: CourseTypeDto) {
    this.error = "";
    this.courseTypeService
      .removeCourseTypeById({
        id: courseTypeDto.id
      })
      .subscribe({
        next: () => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/admin/course/type']);
            });
        },
        error: (error) => {
          this.error = "Нельзя удалить этот тип курсов, так как существуют курсы с этим типом";
        },
      });
  }

  get getCreateForm() {
    return this.createTypeForm.controls;
  }
  get getEditForm() {
    return this.editTypeForm.controls;
  }
  get getDeleteForm() {
    return this.deleteTypeForm.controls;
  }
}
