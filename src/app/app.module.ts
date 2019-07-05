import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HubsProvider } from '../providers/hubs/hubs';
import { LoginRegisterPage } from '../pages/login-register/login-register';
import { AddOrganizationPage } from '../pages/add-organization/add-organization';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginRegisterPage,
    AddOrganizationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginRegisterPage,
    AddOrganizationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HubsProvider,

  ]
})
export class AppModule {}