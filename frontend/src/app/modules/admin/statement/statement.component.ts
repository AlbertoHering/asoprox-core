import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { take, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

import childrenRoutes from '../../home/navigation/childrenRoutes';
import { APIResponse } from 'src/app/models/api-response';
import { User, UserFilters } from 'src/app/models/user';
import { UserFormComponent } from 'src/app/modules/maintenance/components/users/user-form/user-form.component';
import { UsersService } from 'src/app/services/users/users.service';
import { IndividualStatementsService } from 'src/app/services/individualstatements/individualstatements.service';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss'],
})
export class StatementComponent implements OnInit {

  public routes = childrenRoutes;
  constructor(
    private cookieService: CookieService,
    public usersService: UsersService,
    public individualstatementsService: IndividualStatementsService
  ) { }

  userData?: User;
  initialDate?: string = '';
  private currentUser = JSON.parse(this.cookieService.get('sessionData'))
  public statement = {
    user: this.currentUser.full_name,
    id: this.currentUser.id
  };

  ngOnInit() {
    this.loadData();
  }

  loadData() {
  }

}
