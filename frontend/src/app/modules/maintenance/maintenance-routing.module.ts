import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { PolicyGuard } from 'src/app/guards/policy/policy.guard';
import { UsersComponent } from './components/users/users.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceRoutingModule {}
