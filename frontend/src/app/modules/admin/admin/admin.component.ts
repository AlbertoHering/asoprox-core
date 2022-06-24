import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import childrenRoutes from '../../home/navigation/childrenAdminRoutes';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  public routes = childrenRoutes;
  constructor(
    private cookieService: CookieService
  ) { }
  
  private currentUser = JSON.parse(this.cookieService.get('sessionData'))
  public admin = {
    user: this.currentUser.full_name
  };

  ngOnInit() {}

}
