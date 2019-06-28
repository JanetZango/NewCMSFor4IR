
import { Injectable, NgZone } from '@angular/core';
import { LoadingController, AlertController, Alert } from "ionic-angular";

declare var firebase;
/*
  Generated class for the HubsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HubsProvider {
  //variables
  stayLoggedIn

  //array
  orgArray = new Array();
  orgNames = new Array();

  constructor(public ngzone: NgZone, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    console.log('Hello HubsProvider Provider');
  }


  //check authstate
  checkOrgAuthState() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user != null) {
            this.stayLoggedIn = 1
          }
          else {
            this.stayLoggedIn = 0
          }
          resolve(this.stayLoggedIn)
        })
      })
    })
  }

  // login method
  SignIn(email, password) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        let user = firebase.auth().currentUser;
        firebase.database().ref("Users/" + "App_Users/" + user.uid).on('value', (data: any) => {
          if (data.val() != undefined) {
            console.log('user on app');
            firebase.auth().signOut();
            reject('')
          }
          else {
            resolve('')
          }
        });
      }, Error => {
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
          firebase.database().ref("Users/" + "Cms_Users/" + user.uid).set({
            email: email,
          })
          resolve();
        }).catch((error) => {
          console.log(error);
        })
      })
    })
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
        .ref("Organizations/" + user.uid)
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

  //retrieve organization
  getAllOrganizations() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser;
        firebase.database().ref("4IR_Hubs").on("value", (data: any) => {
          if (data.val() != null) {
            let details = data.val();
            let keys = Object.keys(details);
            for (var x = 0; x < keys.length; x++) {
              let orgObject = {
                address: details[keys[x]].address,
                background: details[keys[x]].background,
                category: details[keys[x]].category,
                contact: details[keys[x]].contact,
                downloadurl: details[keys[x]].downloadurl,
                downloadurlLogo: details[keys[x]].downloadurlLogo,
                email: details[keys[x]].email,
                freeWifi: details[keys[x]].freeWifi,
                name: details[keys[x]].name,
                lat: details[keys[x]].lat,
                long: details[keys[x]].long,
                id: keys[x],
                region: details[keys[x]].region,

                website: details[keys[x]].website,
                wifi: details[keys[x]].wifi,
                wifiRange: details[keys[x]].wifiRange,
              }
              this.storeOrgNames(details[keys[x]].programCategory);
              this.orgArray.push(orgObject)
            }
            resolve(this.orgArray)
          }
        });
      })
    })
  }

  storeOrgNames(cat) {
    this.orgNames.push(cat);

  }
}
