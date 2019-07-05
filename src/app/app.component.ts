import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginRegisterPage } from '../pages/login-register/login-register';
import { HubsProvider } from '../providers/hubs/hubs'
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any ;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public hubs: HubsProvider) {
    platform.ready().then(() => {

      hubs.checkOrgAuthState().then((data: any) => {
        if (data == 1) {
          this.rootPage = HomePage
        }
        else {
          this.rootPage = HomePage
        }
       })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

