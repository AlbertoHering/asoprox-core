import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import childrenRoutes from '../navigation/childrenAdminRoutes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public routes = childrenRoutes;
  constructor(
    private cookieService: CookieService
  ) { }
  
  private currentUser = JSON.parse(this.cookieService.get('sessionData'))
  public home = {
    user: this.currentUser.full_name
  };

  ngOnInit() {}

}
