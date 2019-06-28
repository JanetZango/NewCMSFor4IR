
import { Injectable,NgZone } from '@angular/core';
import { LoadingController, AlertController, Alert } from "ionic-angular";

declare var firebase; 
/*
  Generated class for the HubsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HubsProvider {

  constructor(public ngzone:NgZone,public loadingCtrl :LoadingController,public alertCtrl:AlertController ) {
    console.log('Hello HubsProvider Provider');
  }

  // login method
  SignIn(email, password) {
    return new Promise((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() =>{
      let user = firebase.auth().currentUser;
      firebase.database().ref("Users/"+"App_Users/"+ user.uid).on('value', (data: any) => {
       if (data.val() != undefined){
         console.log('user on app');
        firebase.auth().signOut();
         reject('')
       }
       else{
         resolve('')
       }
      });
    }, Error=>{
      reject(Error)
    })
    })
  }

  // Register Method
  signUp(email, password) {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
            console.log(newUser)
          var user = firebase.auth().currentUser
          console.log(user)
          firebase.database().ref("Users/"+"Cms_Users/"+ user.uid).set({      
            email: email,     
          })
          resolve();
        }).catch((error) => {
          console.log(error);
        })
      })
    })
  }

  //Register organization method
  registerOrg(email, psswrd, lat, long, region, cell, category, Orgname, desc, service, address) {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        let loading = this.loadingCtrl.create({
          spinner: "bubbles",
          content: "Signing in....",
        });
        loading.present();
        return firebase.auth().createUserWithEmailAndPassword(email, psswrd).then(newUser => {
          var user = firebase.auth().currentUser;
          firebase
            .database()
            .ref("4IR_Hubs/" + user.uid)
            .set({
              name: Orgname,
              email: email,
              contact: cell,
              category: category,
              desc: desc,
              long: long,
              lat: lat,
              region: region,
              downloadurl: "assets/download.png",
              downloadurlLogo: "assets/download.png",
              service: [service],
              address: address,
              applied:0
            });
          var user = firebase.auth().currentUser;
          user.sendEmailVerification().then(function () {
            // Email sent.
          }).catch(function (error) {
            // An error happened.
          });
          resolve();
          setTimeout(() => {
            loading.dismiss();
          }, 100);
        })
          .catch(error => {
            loading.dismiss();
            const alert = this.alertCtrl.create({
              subTitle: error.message,
              buttons: [
                {
                  text: "OK",
                  handler: data => {
                    console.log("Cancel clicked");
                  }
                }
              ]
            });
            alert.present();
            console.log(error);
          });
      });
    });
  }



  //logout method
  logout() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        firebase.auth().signOut();
        resolve()
      });
    })
  }


  //Add organization
  
  addOrganisation(email, lat, long, region, cell, category, Orgname, background, address, wifi, freeWifi, wifiRange, website) {
    var user = firebase.auth().currentUser;
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref("Organizations/"+ user.uid)
        .set({
          name: Orgname,
          email: email,
          contact: cell,
          category: category,
          background: background,
          long: long,
          lat: lat,
          wifi: wifi,
          freeWifi: freeWifi,
          website: website,
          wifiRange: wifiRange,
          region: region,
          downloadurl: "assets/download.png",
          downloadurlLogo: "assets/download.png",
          address: address,

        });
      resolve()
    })
  }
}
