import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth/auth.guard';
import { PolicyGuard } from './guards/policy/policy.guard';
import { AdminComponent } from './modules/admin/admin/admin.component';
import { StatementComponent } from './modules/admin/statement/statement.component';
import { HomeComponent } from './modules/home/home/home.component';
import { LayoutComponent } from './modules/home/layout/layout.component';

const routes: Routes = [
  {
    path: 'sign-in',
    loadChildren: () => import('./modules/auth/auth.module').then(
      (m) => m.AuthModule
    )
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'maintenance',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/maintenance/maintenance.module').then(
            (m) => m.MaintenanceModule
          ),
      },
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'admin',
        component: AdminComponent,
      },
      {
        path: 'statement',
        component: StatementComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
