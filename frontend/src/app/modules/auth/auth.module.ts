import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [SignInComponent],
  imports: [
    AuthRoutingModule,
    CommonModule,
    SharedModule,
  ]
})
export class AuthModule { }
