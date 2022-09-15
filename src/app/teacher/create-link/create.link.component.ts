import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TaskControllerService } from '@app/api/services/task-controller.service';
import { TaskLink } from '@app/_models/course';
import { ChangeCourseLinksService, TaskInfoService, UpdateTeacheBoardEvent } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'create-link',
  templateUrl: './create.link.component.html',
  styleUrls: ['./create.link.component.less'],
})
export class CreateLinkComponent implements OnInit {
  createLinkForm: FormGroup;
  createLinkSubmitted = false;
  linkTypeNames: TaskLink[];
  materialTypes: string[] = ['LINK', 'FILE'];
  materialType: string;
  videoForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  wait = false;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private taskInfoService: TaskInfoService,
    private taskLinkService: TaskControllerService,
    private changeCourseLinksService: ChangeCourseLinksService,
    private service: UpdateTeacheBoardEvent,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.createLinkForm = this.formBuilder.group({
      createName: ['', [Validators.required]],
      createLinkUrl: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
    });
  }

  onCreate() {
    this.createLinkSubmitted = true;

    if (this.createLinkForm.invalid) {
      return;
    }

    this.taskLinkService
      .createTaskLinks({
        id: this.taskInfoService.editedLinksTask.id,
        body: {
          name: this.createLinkForm.get('createName').value,
          content: this.createLinkForm.get('createLinkUrl').value,
          type: "LINK"
        }
      })
      .pipe(first())
      .subscribe({
        next: () => {
          this.createLinkForm.get('createName').setValue("")
          this.createLinkForm.get('createLinkUrl').setValue("")
          this.changeCourseLinksService.event.emit(null);
        },
        error: (error) => {
          this.createLinkForm
            .get('createCourseName')
            .setErrors({ dublicate: 'a' });
        },
      });
  }


  addFile() {
    this.wait = true;
    const formData = new FormData();
    formData.append('name', this.videoForm.get('name').value);
    formData.append('file', this.videoForm.get('fileSource').value);
    this.http.post(`http://172.16.0.221:8070/api/v1/tasks/${this.taskInfoService.editedLinksTask.id}/file`, formData)
      .subscribe(res => {
        this.createLinkForm.get('createName').setValue("")
        this.createLinkForm.get('createLinkUrl').setValue("")
        this.changeCourseLinksService.event.emit(null);
        this.wait = false;
      })
  }

  cancel() {
    this.service.event.emit(null);
  }

  get getCreateLinkForm() {
    return this.createLinkForm.controls;
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
