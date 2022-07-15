import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take, tap } from 'rxjs/operators';
import * as moment from 'moment';

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

  title: string = 'Miembros Asociados';

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
      title: 'Nombre completo',
      class: 'user_name'
    },
    {
      field: 'email',
      title: 'Correo electrónico',
      class: 'user_email'
    },
    {
      field: 'personal_email',
      title: 'Correo electrónico personal',
      class: 'user_email'
    },
    {
      field: 'account_access',
      title: 'Acceso a cuenta',
      boolRow: (is_bool: boolean) => (is_bool ? 'Habilitado' : 'Deshabilitado'),
      class: 'user_accountaccess'
    },
    {
      field: 'initial_date',
      title: 'Miembro desde',
      dateRow: (is_date: any) => ( moment(new Date(is_date)).format('DD-MM-YYYY') ),
      class: 'user_accountaccess'
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
          label: 'Ver registro completo',
          openDialog: 'dialog',
          policies: ["admin"]
        },
        {
          id: 'update',
          icon: {
            name: 'edit',
          },
          label: 'Editar registro',
          openDialog: 'dialog',
          policies: ["admin"]
        },
        {
          id: 'delete',
          icon: {
            name: 'delete_forever',
          },
          label: 'Eliminar registro',
          policies: ["admin"]
        },
      ],
    },
    {
      field: 'type',
      title: 'Junta Directiva',
      class: 'user_type'
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
      .deleteUser(data.member_id)
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
