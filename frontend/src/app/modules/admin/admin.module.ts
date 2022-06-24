
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { FooterComponent } from '../home/footer/footer.component';
import { LayoutComponent } from '../home/layout/layout.component';
import { NavigationComponent } from '../home/navigation/navigation.component';
import { NavigationHeaderComponent } from '../home/navigation/navigation-header/navigation-header.component';
import { NavigationSidebarComponent } from '../home/navigation/navigation-sidebar/navigation-sidebar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FooterComponent,
    AdminComponent,
    LayoutComponent,
    NavigationComponent,
    NavigationHeaderComponent,
    NavigationSidebarComponent,
  ],
  exports: [LayoutComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule { }
