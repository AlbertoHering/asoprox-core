
import { AuthenticationResult } from '@azure/msal-browser';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth/auth.service';
import { UserLogin } from 'src/app/models/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  userLoginData!: UserLogin;
  isLoggedIn = false;

  constructor(
    private msalService: MsalService,
    private authService: AuthService,
    public router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    if (this.msalService.instance.getActiveAccount()) {
      this.cookieService.deleteAll();
    }
  }

  login() {
    this.msalService
      .loginPopup()
      .subscribe((response: AuthenticationResult) => {
        this.userLoginData = {
          full_name: response.account?.name || '',
          email: response.account?.username || '',
          token: response.accessToken,
        };
        this.isLoggedIn = true;
        this.inside();
      });
  }

  logout() {

    this.isLoggedIn = false;
    this.userLoginData = {
      full_name: '',
      email: '',
      token: '',
    };

    this.authService
      .logout()
      .pipe(
        take(1),
        tap((result) => {
          if (result.success) {
            this.cookieService.deleteAll();
            this.router.navigate(['/']);
          }
        })
      )
      .subscribe();
  }

  inside() {
    if (this.userLoginData.token) {
      this.authService
        .login(this.userLoginData)
        .pipe(
          take(1),
          tap((loginResult) => {
            if (loginResult.success && loginResult.data) {
              this.cookieService.set(
                'sessionData',
                JSON.stringify(loginResult.data),
                1,
              );
              this.router.navigate(['/home']);
            }
          })
        )
        .subscribe();
    }
  }
}
