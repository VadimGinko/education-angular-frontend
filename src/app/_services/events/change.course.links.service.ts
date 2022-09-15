import { EventEmitter, Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class ChangeCourseLinksService {
  event: EventEmitter<any> = new EventEmitter();
}

@Injectable({ providedIn: 'root' })
export class UpdateTeacheBoardEvent {
  event: EventEmitter<any> = new EventEmitter();
}

@Injectable({ providedIn: 'root' })
export class EditTaskEvent {
  event: EventEmitter<any> = new EventEmitter();
}

@Injectable({ providedIn: 'root' })
export class SaveTaskEvent {
  event: EventEmitter<any> = new EventEmitter();
}


@Injectable({ providedIn: 'root' })
export class EditCourseEvent {
  event: EventEmitter<any> = new EventEmitter();
}

@Injectable({ providedIn: 'root' })
export class SaveCourseEvent {
  event: EventEmitter<any> = new EventEmitter();
}

@Injectable({ providedIn: 'root' })
export class RefreshEvent {
  event: EventEmitter<any> = new EventEmitter();
}
