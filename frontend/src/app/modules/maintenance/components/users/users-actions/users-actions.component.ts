import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { APIResponse } from 'src/app/models/api-response';
import { User, UserFilters } from 'src/app/models/user';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-users-actions',
  templateUrl: './users-actions.component.html',
  styleUrls: ['./users-actions.component.scss'],
})
export class UsersActionsComponent implements OnInit {

  @Output() filtersEvent = new EventEmitter<UserFilters>();
  @Output() newUserEvent = new EventEmitter<User>();

  filters: UserFilters = {
    full_name: '',
  };

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() { }

  clearData() {
    this.filters.full_name = '';
    this.applyFilters();
  }

  openForm() {
    const dialogRef = this.dialog.open(UserFormComponent);

    dialogRef
      .afterClosed()
      .subscribe((result: APIResponse<User>) =>
        this.newUserEvent.emit(result.data)
      );
  }

  applyFilters() {
    this.filtersEvent.emit(this.filters);
  }
}
