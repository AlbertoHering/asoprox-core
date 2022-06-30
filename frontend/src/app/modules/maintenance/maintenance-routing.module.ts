import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { PolicyGuard } from 'src/app/guards/policy/policy.guard';
import { UsersComponent } from './components/users/users.component';
import { IndividualStatementsComponent } from './components/individualstatements/individualstatements.component';
import { StatementsComponent } from './components/statements/statements.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'users',
        canActivate: [AuthGuard, PolicyGuard],
        data: {
          policies: ["public"]
        },
        component: UsersComponent,
      },
      {
        path: 'statements',
        canActivate: [AuthGuard, PolicyGuard],
        data: {
          policies: ["public"]
        },
        component: StatementsComponent,
      },
      {
        path: 'individualstatements',
        canActivate: [AuthGuard, PolicyGuard],
        data: {
          policies: ["public"]
        },
        component: IndividualStatementsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceRoutingModule {}
