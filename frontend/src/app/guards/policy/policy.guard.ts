import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class PolicyGuard implements CanActivate {
  constructor(
    public router: Router,
    private cookieService: CookieService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot
  ): Observable<boolean> {

    let sessionPolicies;
    /**if ( this.cookieService.get('sessionPolicies') ) {
      sessionPolicies = JSON.parse(this.cookieService.get('sessionPolicies'));
    } else*/ if ( this.cookieService.get('sessionData') ) {
      const sessionData = JSON.parse(this.cookieService.get('sessionData'));
      sessionPolicies = sessionData.policies;
    }
    const currentPolicies = sessionPolicies;
    const policies: Observable<any[]> = of(currentPolicies);
    return policies.pipe(map(
      (p:any[]) => {
        const appPolicy = p.filter(
          (item: any) => next.data?.policies.some( 
            (i:any) => item === i
        ));
        return appPolicy?.length ? true : false;
      }
    ));
  }
  
}
