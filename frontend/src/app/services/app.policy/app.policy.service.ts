import { CookieService } from 'ngx-cookie-service';
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

export interface appPolicy {};

@Injectable()
export class AppPolicyService {

  constructor(
    private cookieService: CookieService
  ) { }

  public policies(): Observable<any[]> {
    let sessionPolicies = [];
    /**if ( this.cookieService.get('sessionPolicies') ) {
      sessionPolicies = JSON.parse(this.cookieService.get('sessionPolicies'));
    } else*/ if ( this.cookieService.get('sessionData') ) {
      const sessionData = JSON.parse(this.cookieService.get('sessionData'));
      sessionPolicies = sessionData.policies;
    }
    const currentPolicies = sessionPolicies;
    return of(currentPolicies);
  }

}
