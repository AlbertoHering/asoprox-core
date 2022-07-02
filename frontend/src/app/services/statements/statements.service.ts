import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { APIResponse } from 'src/app/models/api-response';
import { serverPath } from 'src/app/common/global';
import { Statement } from 'src/app/models/statement';

@Injectable({
  providedIn: 'root',
})
export class StatementsService {
  constructor(private http: HttpClient) {}

  statementsServicePath = 'core/statements/';

  getAllStatements(): Observable<APIResponse<Array<Statement>>> {
    const url = serverPath + this.statementsServicePath;
    return this.http.get<APIResponse<Array<Statement>>>(url);
  }

  getStatement(statement_id: number): Observable<APIResponse<Array<Statement>>> {
    const url = `${serverPath}${this.statementsServicePath}${statement_id}`;
    return this.http.get<APIResponse<Array<Statement>>>(url);
  }

  getSummary(): Observable<APIResponse<Array<Statement>>> {
    const url = `${serverPath}${this.statementsServicePath}summary`;
    return this.http.get<APIResponse<Array<Statement>>>(url);
  }

  addStatement(statement: Statement): Observable<APIResponse<Statement>> {
    const url = serverPath + this.statementsServicePath;
    return this.http.post<APIResponse<Statement>>(url, statement);
  }

  updateStatement(statement: Statement, id: number): Observable<APIResponse<Statement>> {
    const url = `${serverPath}${this.statementsServicePath}${id}`;
    return this.http.put<APIResponse<Statement>>(url, statement);
  }

  deleteStatement(id: number): Observable<APIResponse<number>> {
    const url = `${serverPath}${this.statementsServicePath}${id}`;
    return this.http.delete<APIResponse<number>>(url);
  }

}
