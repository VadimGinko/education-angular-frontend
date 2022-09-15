import { Component } from '@angular/core';

import { User } from '@app/_models';

@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent {
  loading = false;
  users: User[];

  constructor() {}

  ngOnInit() {
    this.loading = true;
  }
}
