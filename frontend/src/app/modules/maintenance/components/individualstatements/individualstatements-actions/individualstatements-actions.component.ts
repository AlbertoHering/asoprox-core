import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take, tap, startWith, map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { APIResponse } from 'src/app/models/api-response';
import { IndividualStatement, IndividualStatementFilters } from 'src/app/models/individualstatements';
import { IndividualStatementFormComponent } from '../individualstatements-form/individualstatement-form.component';
import { UsersService } from 'src/app/services/users/users.service';
import { User, UserFilters } from 'src/app/models/user';

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
  filteredUsers?: Observable<UserFilters[]>;
  userControl = new FormControl('');

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
            this.filteredUsers = this.userControl.valueChanges.pipe(
              startWith(''),
              map((name: any) => name ? this._filterUser(name) : this.users!.slice())
            );
          }
        })
      )
      .subscribe();
  }

  openForm() {
    const dialogRef = this.dialog.open(IndividualStatementFormComponent);
    dialogRef
      .afterClosed()
      .subscribe((result: APIResponse<IndividualStatement>) =>
        this.newIndividualStatementEvent.emit(result?.data)
      );
  }

  checkMemberId() {
    if (typeof this.filters?.member_id !== 'undefined' && this.filters.member_id>0 ) {
      return true;
    }
    return false;
  }

  displayUser(data: User): string {
    return data?.full_name || '';
  }

  private _filterUser(name: string): UserFilters[] {
    const filterValue = typeof name === 'string' ? name.toLowerCase() : name;
    return this.users!.filter((option) =>
      option.full_name.toLowerCase().includes(filterValue)
    );
  }

  onChangeEvent() {
    this.filters = {
      member_id: this.userControl.value.member_id,
      full_name: ''
    };
    this.filtersEvent.emit(this.filters);
  }

  clearData() {
    this.userControl = new FormControl('');
    this.filtersEvent.emit({
      member_id: 0,
      full_name: ''
    });
    this.loadData();
  }

}

