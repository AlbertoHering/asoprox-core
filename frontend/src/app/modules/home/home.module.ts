import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule as HomeRoutingModule } from './home-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NavigationHeaderComponent } from './navigation/navigation-header/navigation-header.component';
import { NavigationSidebarComponent } from './navigation/navigation-sidebar/navigation-sidebar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FooterComponent,
    HomeComponent,
    LayoutComponent,
    NavigationComponent,
    NavigationHeaderComponent,
    NavigationSidebarComponent,
  ],
  exports: [LayoutComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
