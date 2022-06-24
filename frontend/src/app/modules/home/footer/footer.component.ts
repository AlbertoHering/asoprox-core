import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';

import childrenRoutes from '../navigation/childrenAdminRoutes';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  public routes = childrenRoutes;

  constructor(
    private cookieService: CookieService
  ) {
  }
  
  private currentUser = JSON.parse(this.cookieService.get('sessionData'));
  public footer = {
    date : (moment()).format('MMM DD, YYYY'),
    user: this.currentUser.full_name
  };

  ngOnInit() {}

}
