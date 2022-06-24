import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToasterService } from '../services/toaster/toaster.service';
import { Router } from '@angular/router';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  constructor(
    private toaster: ToasterService,
    public router: Router) {
  }

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const request = httpRequest.clone({
      setHeaders: {
        // Authorization: `Bearer ${tkn}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // const error = err.error;
          // this.toaster.openSnackBar(
          //   'danger',
          //   '',
          //   error.message
          // );
          this.router.navigate(['/sign-in']);
        }
      }
    }));
  }
}
