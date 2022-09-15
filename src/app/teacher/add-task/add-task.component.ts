import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TaskControllerService } from '@app/api/services/task-controller.service';
import { RefreshEvent, TaskInfoService, UpdateTeacheBoardEvent } from '@app/_services';

@Component({
  selector: 'add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  addTaskCodeForm: FormGroup;
  addTaskMaterialForm: FormGroup;
  addTaskVideoForm: FormGroup;
  videoForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    courseId: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  wait = false;

  taskType: String;
  addTaskSubmitted = false;
  taskTypes: string[] = ['MATERIAL', 'CODE', 'VIDEO'];

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private taskInfoService: TaskInfoService,
    private taskService: TaskControllerService,
    private service: UpdateTeacheBoardEvent,
    private refreshEvent: RefreshEvent,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.addTaskCodeForm = this.formBuilder.group({
      name: ['', Validators.required],
      content: ['', Validators.required]
    });
    this.addTaskMaterialForm = this.formBuilder.group({
      name: ['', Validators.required],
      content: ['', Validators.required]
    });
    this.addTaskVideoForm = this.formBuilder.group({
      name: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  addTaskVideo() {
    this.wait = true;
    const formData = new FormData();
    formData.append('name', this.videoForm.get('name').value);
    formData.append('courseId', this.taskInfoService.addTaskCourseId.toString());
    formData.append('file', this.videoForm.get('fileSource').value);

    this.http.post('http://172.16.0.221:8070/api/v1/tasks/video', formData)
      .subscribe({
        next: () => {
          this.refreshEvent.event.emit(null);
          this.wait = false;
        }
      })

    this.service.event.emit(null);
  }

  addTaskCode() {
    this.addTaskSubmitted = true;
    if (this.addTaskCodeForm.invalid) {
      return;
    }
    this.wait = true;
    this.taskService
      .createTask({
        body: {
          name: this.addTaskCodeForm.get('name').value,
          content: this.addTaskCodeForm.get('content').value,
          type: 'CODE',
          courseId: this.taskInfoService.addTaskCourseId
        }
      })
      .pipe()
      .subscribe({
        next: () => {
          this.refreshEvent.event.emit(null);
          this.wait = false;
        },
      });

    this.service.event.emit(null);
  }

  addTaskMaterial() {
    this.addTaskSubmitted = true;
    if (this.addTaskMaterialForm.invalid) {
      return;
    }
    this.wait = true;
    this.taskService
      .createTask({
        body: {
          name: this.addTaskMaterialForm.get('name').value,
          content: this.addTaskMaterialForm.get('content').value,
          type: 'MATERIAL',
          courseId: this.taskInfoService.addTaskCourseId
        }
      })
      .pipe()
      .subscribe({
        next: () => {
          this.refreshEvent.event.emit(null);
          this.wait = false;
        },
      });

    this.service.event.emit(null);
  }

  get contentMaterial() {
    return this.addTaskMaterialForm.controls.content as FormControl;
  }

  get contentCode() {
    return this.addTaskCodeForm.controls.content as FormControl;
  }

  get getaddTaskCodeForm() {
    return this.addTaskCodeForm.controls;
  }

  get getaddTaskMaterialForm() {
    return this.addTaskMaterialForm.controls;
  }

  get getaddTaskVideoForm() {
    return this.addTaskVideoForm.controls;
  }

  get f() {
    return this.videoForm.controls;
  }


  onFileChange(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.videoForm.patchValue({
        fileSource: file
      });
    }
  }
}
