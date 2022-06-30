import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AppPolicyService } from './services/app.policy/app.policy.service';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth/auth.service';
import { AdminModule } from './modules/admin/admin.module';
import { HomeModule } from './modules/home/home.module';
import { SharedModule } from './modules/shared/shared.module';
import { ToasterService } from './services/toaster/toaster.service';
import { UsersService } from './services/users/users.service';
import { UtilService } from './services/util/util.service';

import {
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';
import { MyHttpInterceptor } from './interceptor/my-http-interceptor';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'db73ca40-f9fd-48e8-a4ba-b3bb9db546dd',
      redirectUri: 'http://localhost:5000',
    },
  });
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    AdminModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HomeModule,
    HttpClientModule,
    SharedModule,    
  ],
  exports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true },
    AppPolicyService,
    AuthService,
    MsalService,
    ToasterService,
    UsersService,
    UtilService,
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
