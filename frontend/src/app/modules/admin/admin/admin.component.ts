import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { take, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

import childrenRoutes from '../../home/navigation/childrenAdminRoutes';
import { APIResponse } from 'src/app/models/api-response';
import { User, UserFilters } from 'src/app/models/user';
import { UserFormComponent } from 'src/app/modules/maintenance/components/users/user-form/user-form.component';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  @Output() updateEvent = new EventEmitter<User>();

  public routes = childrenRoutes;
  constructor(
    private cookieService: CookieService,
    public usersService: UsersService,
    public dialog: MatDialog
  ) { }

  userData?: User;
  initialDate?: string = '';
  private currentUser = JSON.parse(this.cookieService.get('sessionData'))
  public admin = {
    user: this.currentUser.full_name,
    id: this.currentUser.id
  };

  title: string = `Perfil de Miembro Asociado: ${this.admin.user}`;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.usersService
      .getUser(this.admin.id)
      .pipe(
        take(1),
        tap((getUsersResult: any) => {
          if ( getUsersResult.success && !!getUsersResult ) {
            const result = getUsersResult.data[0];
            this.initialDate = moment(new Date(result?.initial_date)).locale("es").format('DD [de] MMMM [de] YYYY');
            this.userData = result;
          }
        })
      )
      .subscribe();
  }

  openForm() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: {
        id: this.admin.id,
        user_edit: true,
        ...this.userData
      },
    });

    dialogRef
      .afterClosed()
      .subscribe((event: any) => {
        this.loadData();
      });
  }

}
