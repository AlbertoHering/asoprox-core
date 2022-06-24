import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { APIResponse } from 'src/app/models/api-response';
import { serverPath } from 'src/app/common/global';
import { User } from 'src/app/models/user';

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

  getUsersByProject(project_id: number): Observable<APIResponse<Array<User>>> {
    if (typeof project_id === 'undefined') {
      project_id = 0;
    }
    const projectServicePath = this.usersServicePath + 'project/';
    const url = `${serverPath}${projectServicePath}${project_id}`;
    return this.http.get<APIResponse<Array<User>>>(url);
  }

  getAllManagers(project_id: number): Observable<APIResponse<Array<User>>> {
    if (typeof project_id === 'undefined') {
      project_id = 0;
    }
    const managersServicePath = this.usersServicePath + 'managers/';
    const url = `${serverPath}${managersServicePath}${project_id}`;
    return this.http.get<APIResponse<Array<User>>>(url);
  }

  getReporters(): Observable<APIResponse<Array<User>>> {
    const managersServicePath = this.usersServicePath + 'reporters/';
    const url = serverPath + managersServicePath;
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
}
