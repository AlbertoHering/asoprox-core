import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take, tap } from 'rxjs/operators';

import { APIResponse } from 'src/app/models/api-response';
import { IndividualStatement, IndividualStatementFilters } from 'src/app/models/individualstatements';
import { IndividualStatementFormComponent } from '../individualstatements-form/individualstatement-form.component';
import { UsersService } from 'src/app/services/users/users.service';
import { UserFilters } from 'src/app/models/user';

@Component({
  selector: 'app-individualstatements-actions',
  templateUrl: './individualstatements-actions.component.html',
  styleUrls: ['./individualstatements-actions.component.scss'],
})
export class IndividualStatementsActionsComponent implements OnInit {
public is = IndividualStatementFormComponent;
  @Output() filtersEvent = new EventEmitter<IndividualStatementFilters>();
  @Output() newIndividualStatementEvent = new EventEmitter<IndividualStatement>();

  filters: IndividualStatementFilters = {
    member_id: 0,
    full_name: '',
  };

  constructor(
    public dialog: MatDialog,
    public usersService: UsersService,
  ) { }
  
  users?: Array<UserFilters>;
  filteredUsers?:Array<UserFilters>;

  ngOnInit() {
    this.loadData();
   }

   loadData() {
    this.usersService
      .getUsers()
      .pipe(
        take(1),
        tap((getUsersResult) => {
          if (getUsersResult.success) {
            this.users = getUsersResult.data;
            this.filteredUsers = getUsersResult.data;
          }
        })
      )
      .subscribe();
  }

  clearData() { }

  openForm() {
    const dialogRef = this.dialog.open(IndividualStatementFormComponent);

    dialogRef
      .afterClosed()
      .subscribe((result: APIResponse<IndividualStatement>) =>
        this.newIndividualStatementEvent.emit(result.data)
      );
  }

  applyFilters() {
    if (typeof this.filteredUsers !== 'undefined') {
      this.filters = {
        member_id: +this.filteredUsers,
        full_name: ''
      };
      this.filtersEvent.emit(this.filters);
    }
  }
}

