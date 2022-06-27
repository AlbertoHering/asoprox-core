
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
//import { IndividualStatementFormComponent } from './components/individualstatements/individualstatements-form/individualstatement-form.component';
//import { IndividualStatementsActionsComponent } from './components/individualstatements/individualstatements-actions/individualstatements-actions.component';
//import { IndividualStatementsSummaryComponent } from './components/individualstatements/individualstatements-summary/individualstatements-summary.component';
//import { IndividualStatementsComponent } from './components/individualstatements/individualstatements.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { UsersActionsComponent } from './components/users/users-actions/users-actions.component';
import { UsersComponent } from './components/users/users.component';
import { StatementFormComponent } from './components/statements/statements-form/statement-form.component';
import { StatementsActionsComponent } from './components/statements/statements-actions/statements-actions.component';
import { StatementsComponent } from './components/statements/statements.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UsersComponent, 
    UserFormComponent, 
    UsersActionsComponent,
    StatementFormComponent,
    StatementsActionsComponent,
    StatementsComponent,
//    IndividualStatementFormComponent,
//    IndividualStatementsActionsComponent,
//    IndividualStatementsSummaryComponent,
//    IndividualStatementsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaintenanceRoutingModule
  ],
})
export class MaintenanceModule { }
