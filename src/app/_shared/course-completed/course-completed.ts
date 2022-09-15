import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as BehaviorSubject from 'rxjs/internal/BehaviorSubject';
import { first } from 'rxjs/operators';

@Component({
    selector: 'course-completed',
    templateUrl: 'course-completed.html',
  })
  export class CourseCompleted {

  }