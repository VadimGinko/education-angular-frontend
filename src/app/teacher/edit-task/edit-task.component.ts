import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TaskDto } from '@app/api/models/task-dto';
import { TaskControllerService } from '@app/api/services/task-controller.service';
import { Task } from '@app/_models/course';
import { EditTaskEvent, TaskInfoService, UpdateTeacheBoardEvent } from '@app/_services';

@Component({
  selector: 'edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit {
  editTasksForm: FormGroup;
  addTaskSubmitted = false;
  editedTask: TaskDto;
  taskTypes: string[] = ['MATERIAL', 'CODE', 'VIDEO'];
  taskType: string = "";
  videoForm: FormGroup;
  wait = false;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private taskInfoService: TaskInfoService,
    private taskService: TaskControllerService,
    private editTaskEvent: EditTaskEvent,
    private service: UpdateTeacheBoardEvent,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.editTaskEvent.event.subscribe(() => {
      this.ngOnInit();
    });
    this.editedTask = this.taskInfoService.editedTask;
    if (this.taskInfoService.editedTask.type == 'VIDEO') {
      this.videoForm = this.formBuilder.group({
        name: new FormControl(this.taskInfoService.editedTask.name, [Validators.required, Validators.minLength(3)]),
        file: new FormControl('', [Validators.required]),
        fileSource: new FormControl('', [Validators.required])
      });
    } else {
      this.editTasksForm = this.formBuilder.group({
        name: [this.taskInfoService.editedTask.name, Validators.required],
        content: [this.taskInfoService.editedTask.content, Validators.required],
      });
    }
    this.taskType = this.taskInfoService.editedTask.type.toString();
  }

  editTask() {
    this.wait = true;
    this.addTaskSubmitted = true;
    if (this.editTasksForm.invalid) {
      return;
    }

    this.taskService
      .updateTask({
        id: this.editedTask.id,
        body: {
          id: this.editedTask.id,
          name: this.editTasksForm.get('name').value,
          content: this.editTasksForm.get('content').value,
          courseId: this.editedTask.courseId
        }
      })
      .pipe()
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/teacher/task']);
            this.wait = false;
          });
        },
      });

    this.service.event.emit(null);
  }

  cancel() {
    this.service.event.emit(null);
  }

  editTaskVideo() {
    this.wait = true;
    const formData = new FormData();
    formData.append('name', this.videoForm.get('name').value);
    formData.append('file', this.videoForm.get('fileSource').value);
    this.http.put(`http://172.16.0.221:8070/api/v1/tasks/video/${this.taskInfoService.editedTask.id}`, formData)
      .subscribe(res => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/teacher/task']);
          this.wait = false;
        });
      })
  }

  get contentEdit() {
    return this.editTasksForm.controls.content as FormControl;
  }

  get getEditTasksForm() {
    return this.editTasksForm.controls;
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
