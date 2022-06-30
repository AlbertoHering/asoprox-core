
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndividualStatementFormComponent } from './components/individualstatements/individualstatements-form/individualstatement-form.component';
import { IndividualStatementsActionsComponent } from './components/individualstatements/individualstatements-actions/individualstatements-actions.component';
import { IndividualStatementsComponent } from './components/individualstatements/individualstatements.component';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { UsersActionsComponent } from './components/users/users-actions/users-actions.component';
import { UsersComponent } from './components/users/users.component';
import { StatementFormComponent } from './components/statements/statements-form/statement-form.component';
import { StatementsActionsComponent } from './components/statements/statements-actions/statements-actions.component';
import { StatementsComponent } from './components/statements/statements.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    IndividualStatementFormComponent,
    IndividualStatementsActionsComponent,
    IndividualStatementsComponent,
    UsersComponent, 
    UserFormComponent, 
    UsersActionsComponent,
    StatementFormComponent,
    StatementsActionsComponent,
    StatementsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaintenanceRoutingModule
  ],
})
export class MaintenanceModule { }
