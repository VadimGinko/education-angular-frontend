import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TaskDto } from '@app/api/models/task-dto';
import { TaskResourceDto } from '@app/api/models/task-resource-dto';
import { TaskControllerService } from '@app/api/services/task-controller.service';
import { TaskResourceControllerService } from '@app/api/services/task-resource-controller.service';
import { Task, TaskLink } from '@app/_models/course';
import {
  ChangeCourseLinksService,
  TaskInfoService
} from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'edit-links',
  templateUrl: './edit-links.component.html',
  styleUrls: ['./edit-links.component.css'],
})
export class EditLinksComponent implements OnInit {
  editTasksForm: FormGroup;
  addTaskSubmitted = false;
  editedLinksTask: TaskDto;
  links: Array<TaskResourceDto>;
  displayedColumns: string[] = ['link', 'type', 'button'];

  constructor(
    private formBuilder: FormBuilder,
    private taskInfoService: TaskInfoService,
    private taskControllerService: TaskControllerService,
    private router: Router,
    private service: ChangeCourseLinksService,
    private taskLinkService: TaskResourceControllerService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.editedLinksTask = this.taskInfoService.editedLinksTask;
    if (this.editedLinksTask.links.length != 0) {
      this.links = this.editedLinksTask.links;
    }
    this.service.event.subscribe(() => {
      this.taskControllerService.getTask({ id: this.taskInfoService.editedLinksTask.id })
        .subscribe({
          next: (task) => {
            this.editedLinksTask = task;
            this.links = task.links;
          }
        });

    });
  }

  deleteLink(taskLink: TaskLink) {
    this.taskLinkService
      .removeTaskLink({ id: taskLink.id })
      .pipe(first())
      .subscribe({
        next: () => {
          this.links = this.links.filter(i => i.id != taskLink.id);
        },
      });
  }
}
