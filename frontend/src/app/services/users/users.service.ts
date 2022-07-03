import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { APIResponse } from 'src/app/models/api-response';
import { serverPath } from 'src/app/common/global';
import { User, UserType } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  usersServicePath = 'core/users/';

  getAllUsers(): Observable<APIResponse<Array<User>>> {
    const url = serverPath + this.usersServicePath;
    return this.http.get<APIResponse<Array<User>>>(url);
  }

  getUsers(): Observable<APIResponse<Array<User>>> {
    const url = serverPath + this.usersServicePath + 'list';
    return this.http.get<APIResponse<Array<User>>>(url);
  }

  getUser(user_id: number): Observable<APIResponse<Array<User>>> {
    const url = `${serverPath}${this.usersServicePath}${user_id}`;
    return this.http.get<APIResponse<Array<User>>>(url);
  }

  addUser(user: User): Observable<APIResponse<User>> {
    const url = serverPath + this.usersServicePath;
    return this.http.post<APIResponse<User>>(url, user);
  }

  updateUser(user: User, id: number): Observable<APIResponse<User>> {
    const url = `${serverPath}${this.usersServicePath}${id}`;
    return this.http.put<APIResponse<User>>(url, user);
  }

  deleteUser(id: number): Observable<APIResponse<number>> {
    const url = `${serverPath}${this.usersServicePath}${id}`;
    return this.http.delete<APIResponse<number>>(url);
  }

  getAdmins(): Observable<APIResponse<Array<UserType>>> {
    const url = serverPath + this.usersServicePath + 'admins';
    return this.http.get<APIResponse<Array<UserType>>>(url);
  }

}
