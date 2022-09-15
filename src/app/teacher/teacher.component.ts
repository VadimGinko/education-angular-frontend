import { Component } from '@angular/core';

@Component({ templateUrl: 'teacher.component.html' })
export class TeacherComponent {
    loading = false;

    constructor() { }

    ngOnInit() {
        this.loading = true;
    }
}