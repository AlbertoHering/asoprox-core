import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { take, tap } from 'rxjs/operators';

import childrenRoutes from '../../home/navigation/childrenAdminRoutes';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  public routes = childrenRoutes;
  constructor(
    private cookieService: CookieService,
    public usersService: UsersService
  ) { }

  userData?: User;
  private currentUser = JSON.parse(this.cookieService.get('sessionData'))
  public admin = {
    user: this.currentUser.full_name,
    id: this.currentUser.id
  };

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
            this.userData = getUsersResult.data[0];
          }
        })
      )
      .subscribe();
  }

}
