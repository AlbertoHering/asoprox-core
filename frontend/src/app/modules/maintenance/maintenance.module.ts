
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { UsersActionsComponent } from './components/users/users-actions/users-actions.component';
import { UsersComponent } from './components/users/users.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UsersComponent, 
    UserFormComponent, 
    UsersActionsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaintenanceRoutingModule
  ],
})
export class MaintenanceModule { }
