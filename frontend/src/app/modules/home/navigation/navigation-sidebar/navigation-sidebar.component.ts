import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RouteModel } from 'src/app/models/route';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navigation-sidebar',
  templateUrl: './navigation-sidebar.component.html',
  styleUrls: ['./navigation-sidebar.component.scss'],
})
export class NavigationSidebarComponent implements OnInit {
  @Input() routes: Array<RouteModel> | undefined;

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) {}

  private sessionData = JSON.parse(this.cookieService.get('sessionData'));
  public currentUsername = this.sessionData.full_name;
  public currentEmail = this.sessionData.email;

  ngOnInit() { 
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });
  }
}
