import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take, tap } from 'rxjs/operators';

import { Column } from 'src/app/models/data-table';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { User, UserFilters } from 'src/app/models/user';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(
    public usersService: UsersService,
    public dialog: MatDialog,
    private toaster: ToasterService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  users?: Array<User>;
  filteredUsers?: Array<User>;
  columns: Column[] = [
    {
      field: 'full_name',
      title: 'Full Name',
      class: 'user_name'
    },
    {
      field: 'email',
      title: 'Email',
      class: 'user_email'
    },
    {
      field: 'personal_email',
      title: 'Personal Email',
      class: 'user_personalemail'
    },
    {
      field: 'actions',
      title: 'Actions',
      class: 'user_actions',
      actions: [
        {
          id: 'view',
          icon: {
            name: 'preview',
          },
          label: 'View User',
          openDialog: 'dialog',
          policies: ["public"]
        },
        {
          id: 'update',
          icon: {
            name: 'edit',
          },
          label: 'Edit User',
          openDialog: 'dialog',
          policies: ["public"]
        },
        {
          id: 'delete',
          icon: {
            name: 'delete_forever',
          },
          label: 'Delete User',
          policies: ["public"]
        },
      ],
    },
  ];

  loadData() {
    this.usersService
      .getAllUsers()
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

  deleteUser(data: User) {
    this.usersService
      .deleteUser(data.id)
      .pipe(
        take(1),
        tap((deleteUserResult) => {
          this.toaster.openSnackBar(
            deleteUserResult.success ? 'success' : 'danger',
            'Delete User',
            deleteUserResult.message
          );
          if (deleteUserResult.success) {
            this.loadData();
          }
        })
      )
      .subscribe();
  }

  viewUser(user: User) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: {read_only: true, ...user},
    });
    dialogRef.afterClosed().subscribe(() => this.loadData());
  }

  updateUser(user: User) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: user,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(() => this.loadData());
  }

  applyFilters(filters: UserFilters) {
    this.filteredUsers = this.users
      ?.filter((user) =>
        user.full_name
          .toLocaleLowerCase()
          .includes(filters.full_name.toLocaleLowerCase())
      );
  }

  createUser(user: User) {
    if (user) {
      this.loadData();
    }
  }
}
