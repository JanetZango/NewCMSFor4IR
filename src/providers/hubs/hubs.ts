
import { Injectable, NgZone } from '@angular/core';
import { LoadingController, AlertController, Alert } from "ionic-angular";

declare var firebase;
declare var google;
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

  // update(name, email, downloadurlLogo, address, contact,background) {
  //   return new Promise((pass, fail) => {
  //     this.ngzone.run(() => {
  //       var user = firebase.auth().currentUser
  //       firebase.database().ref("Organizations/" + user.uid).update({
  //         name: name,
  //         email: email,
  //         downloadurlLogo :downloadurlLogo,
  //         address: address,
  //         contact: contact ,
  //         background :background
  //       });
  //     })
  //   })
  // }

  
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


  //forgotpassword
  forgetPassword(email) {
    return new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        resolve();
      }, (error) => {
        reject(error)
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
        firebase.database().ref("Organizations").on("value", (data: any) => {
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
              console.log(this.orgArray)
            }
            resolve(this.orgArray)
            console.log(this.orgArray)
          }
        });
      })
    })
  }
//getcurrentProfile
  retrieve() {
    let userID = firebase.auth().currentUser;
    return firebase.database().ref("Organizations/" + userID.uid)
  }
  storeOrgNames(cat) {
    this.orgNames.push(cat);
  }

//updateOrganization
  // update(name, email, downloadurl, address, contact) {
  //   return new Promise((pass, fail) => {
  //     this.ngzone.run(() => {
  //       var user = firebase.auth().currentUser
  //       firebase.database().ref("Organizations/" + user.uid).update({
  //         name: name,
  //         email: email,
  //         downloadurl: downloadurl,
  //         address: address,
  //         contact: contact
  //       });
  //     })
  //   })
  // }

  //getcurrentlocation
  getCurrentLocation(lat, lng) {
    return new Promise((accpt, rej) => {
      this.createPositionRadius(lat, lng).then((data: any) => {
        accpt(data);
      })
    })

  }


  //forgotpassword
  // forgetPassword(email) {
  //   return new Promise((resolve, reject) => {
  //     firebase.auth().sendPasswordResetEmail(email).then(() => {
  //       resolve();
  //     }, (error) => {
  //       reject(error)
  //     })

  //   })

  // }

  //createradius
  createPositionRadius(latitude, longitude) {
    var leftposition, rightposition, downposition, uposititon;
    return new Promise((accpt, rej) => {
      var downlat = new String(latitude);
      var latIndex = downlat.indexOf(".");
      var down = parseInt(downlat.substr(latIndex + 1, 2)) + 6;
      var down = parseInt(downlat.substr(latIndex + 1, 2)) + 12;
      if (down >= 100) {
        if (downlat.substr(0, 1) == "-") {
          var firstDigits = parseInt(downlat.substr(0, 3)) + 1;
        }
        else {
          var firstDigits = parseInt(downlat.substr(0, 2)) - 1;
        }
        var remainder = down - 100;
        if (remainder >= 10) {
          downposition = firstDigits + "." + remainder;
        }
        else {
          downposition = firstDigits + ".0" + remainder;
        }

      } else {
        if (downlat.substr(0, 1) == "-") {
          downposition = downlat.substr(0, 3) + "." + down;
        }
        else {
          downposition = downlat.substr(0, 2) + "." + down;
        }

      }

      //up  position
      var uplat = new String(latitude);
      var latIndex = uplat.indexOf(".");
      var up = parseInt(uplat.substr(latIndex + 1, 2)) - 6;
      var up = parseInt(uplat.substr(latIndex + 1, 2)) - 12;
      if (up <= 0) {
        if (uplat.substr(0, 1) == "-") {
          var firstDigits = parseInt(uplat.substr(0, 3)) + 1;
        }
        else {
          var firstDigits = parseInt(uplat.substr(0, 2)) - 1;
        }
        var remainder = down - 100;
        if (remainder >= 10) {
          uposititon = firstDigits + "." + remainder;
        }
        else {
          uposititon = firstDigits + ".0" + remainder;
        }
      } else {
        if (uplat.substr(0, 1) == "-") {
          uposititon = uplat.substr(0, 3) + "." + up;
        }
        else {
          uposititon = uplat.substr(0, 2) + "." + up;
        }

      }
      //left position
      var leftlat = new String(longitude);
      var longIndex = leftlat.indexOf(".");
      var left = parseInt(leftlat.substr(longIndex + 1, 2)) - 6;
      var left = parseInt(leftlat.substr(longIndex + 1, 2)) - 12;
      if (left >= 100) {
        if (leftlat.substr(0, 1) == "-") {
          var firstDigits = parseInt(leftlat.substr(0, 3)) - 1;
        } else {
          var firstDigits = parseInt(leftlat.substr(0, 2)) + 1;
        }
        var remainder = left - 100;
        leftposition = firstDigits + ".0" + remainder;
      } else {
        if (leftlat.substr(0, 1) == "-") {
          var firstDigits = parseInt(leftlat.substr(0, 3)) + 1;
        }
        else {
          var firstDigits = parseInt(leftlat.substr(0, 2)) - 1;
        }

        if (left == 0) {
          var remainder = 0;
        }
        else {
          var remainder = left - 12;
        }

        leftposition = firstDigits + ".0" + remainder;

      }
      //right position
      var rightlat = new String(longitude);
      var longIndex = rightlat.indexOf(".");
      var right = parseInt(rightlat.substr(longIndex + 1, 2)) + 6;
      var right = parseInt(rightlat.substr(longIndex + 1, 2)) + 12;
      if (right >= 100) {
        if (rightlat.substr(0, 1) == "-") {
          var firstDigits = parseInt(rightlat.substr(0, 3)) - 1;
        } else {
          var firstDigits = parseInt(rightlat.substr(0, 2)) + 1;
        }
        var remainder = right - 100;
        rightposition = firstDigits + ".0" + remainder;
      } else {
        rightposition = rightlat.substr(0, 2) + "." + right;
        if (left == 0) {
          var remainder = 0;
        }
        else {
          var remainder = left - 12;
        }

        rightposition = firstDigits + ".0" + remainder;
      }
      let radius = {
        left: leftposition,
        right: rightposition,
        up: uposititon,
        down: downposition
      }
      accpt(radius);
      // down  position
    })

  }

//getlocation
  getLocation(lat, lng) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var geocoder = new google.maps.Geocoder;
        var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };
        geocoder.geocode({ 'location': latlng }, function (results, status) {
          var address = results[0].address_components[3].short_name;
          resolve(address)
        }, 4000);

      })
    })
  }
//getname globally
  getOrgNames() {
    return this.orgNames
  }


  addPrograme(openDate, closeDate,progName,progType,progBackround,benefits,desc,progStartDate,progEndDate,address,contacts,img){
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {          
          var user = firebase.auth().currentUser
          firebase.database().ref("programmes/" + user.uid).set({
           openDate:openDate,
           closeDate:closeDate,
           progName:progName,
           progType:progType,
           progBackround:progBackround,
           benefits:benefits,
           desc:desc,
           progStartDate:progStartDate,
           progEndDate:progEndDate,
           address:address,
           contacts:contacts,
           img:img
          })
          resolve();
      })
    })
  }


  getPrograme(){
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {          
        var user = firebase.auth().currentUser;
        firebase.database().ref("programmes/" + user.uid).on("value", (data: any) => {
          if (data.val() != undefined){
            var progs = new Array();
            var details = data.val();
            var keys = Object.keys(details);
            for (var x =0; x < keys.length; x++){
              var k = keys[0];
              var progObject = {
                openDate:details[k].openDate,
                closeDate:details[k].closeDate,
                progName:details[k].progName,
                progType:details[k].progType,
                progBackround:details[k].progBackround,
                benefits:details[k].benefits,
                desc:details[k].desc,
                progStartDate:details[k].progStartDate,
                progEndDate:details[k].progEndDate,
                address:details[k].address,
                contacts:details[k].contacts,
                img:details[k].img,
              }
              progs.push(progObject)
            }
            resolve(progs);
          }
        }) 
      })
    })
  }


addJob(openDate,closeDate,address,desc,benefits,jobStartdate, jobEndDate, contact, img){
  return new Promise((resolve, reject) => {
    this.ngzone.run(() => {          
        var user = firebase.auth().currentUser
        firebase.database().ref("jobs/" + user.uid).set({
          openDate:openDate,
          closeDate:closeDate,
          address:address,
          desc:desc,
          benefits:benefits,
          jobStartdate:jobStartdate,
          jobEndDate:jobEndDate,
          img:img,
          contact:contact 
        })
        resolve();
    })
  })
}


getJobs(){
  return new Promise((resolve, reject) => {
    this.ngzone.run(() => {          
      var user = firebase.auth().currentUser;
      firebase.database().ref("jobs/" + user.uid).on("value", (data: any) => {
        if (data.val() != undefined){
          var jobs = new Array();
          var details = data.val();
          var keys = Object.keys(details);
          for (var x =0; x < keys.length; x++){
            var k = keys[0];
            var jobObject = {
              openDate:details[k].openDate,
              closeDate:details[k].closeDate,
              benefits:details[k].benefits,
              desc:details[k].desc,
              jobStartdate:details[k].jobStartdate,
              jobEndDate:details[k].jobEndDate,
              address:details[k].address,
              contacts:details[k].contacts,
              img:details[k].img,
            }
            jobs.push(jobObject)
          }
          resolve(jobs);
        }
      }) 
    })
  })
}


addService(openDate,closeDate,address,serviceName,contact,desc, img){
  return new Promise((resolve, reject) => {
    this.ngzone.run(() => {          
        var user = firebase.auth().currentUser
        firebase.database().ref("services/" + user.uid).set({
          openDate:openDate,
          closeDate:closeDate,
          address:address,
          desc:desc,
          img:img,
          contact:contact 
        })
        resolve();
    })
  })
}

getServices(){
  return new Promise((resolve, reject) => {
    this.ngzone.run(() => {          
      var user = firebase.auth().currentUser;
      firebase.database().ref("services/" + user.uid).on("value", (data: any) => {
        if (data.val() != undefined){
          var services = new Array();
          var details = data.val();
          var keys = Object.keys(details);
          for (var x =0; x < keys.length; x++){
            var k = keys[0];
            var serviceObject = {
              openDate:details[k].openDate,
              closeDate:details[k].closeDate,
              desc:details[k].desc,
              address:details[k].address,
              contacts:details[k].contacts,
              img:details[k].img,
              serviceName:details[k].serviceName
            }
            services.push(serviceObject)
          }
          resolve(services);
        }
      }) 
    })
  })
}

}
