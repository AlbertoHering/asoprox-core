import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { APIResponse } from 'src/app/models/api-response';
import { UserLogin } from 'src/app/models/user';
import { serverPath } from 'src/app/common/global';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  authServicePath = 'security';

  login(userLogin: UserLogin): Observable<APIResponse<UserLogin>> {
    const url = `${serverPath}${this.authServicePath}/login`;
    return this.http.post<APIResponse<UserLogin>>(url, userLogin);
  }

  logout(): Observable<APIResponse<any>> {
    const url = `${serverPath}${this.authServicePath}/logout`;
    return this.http.get<APIResponse<any>>(url);
  }

  checkUserAuthentication(): Observable<APIResponse<undefined>> {
    const url = `${serverPath}${this.authServicePath}/authenticated`;
    return this.http.get<APIResponse<undefined>>(url);
  }
}
