// import { Injectable, NgZone } from '@angular/core';
// import { LoadingController, AlertController, Alert } from "ionic-angular";

// declare var firebase;
// declare var google;
// /*
//   Generated class for the HubsProvider provider.

//   See https://angular.io/guide/dependency-injection for more info on providers
//   and Angular DI.
// */
// @Injectable()
// export class HubsProvider {
//   //variables
//   stayLoggedIn

//   //array
//   orgArray = new Array();
//   orgNames = new Array();
//   orgProfile = new Array();
//   getprog = new Array();
//   getallhub = new Array();
//   userProg = new Array();
//   getAllOrg = new Array();
//   constructor(public ngzone: NgZone, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
//     console.log('Hello HubsProvider Provider');
//   }



//   //check authstate
//   checkOrgAuthState() {
//     return new Promise((resolve, reject) => {
//       this.ngzone.run(() => {
//         firebase.auth().onAuthStateChanged((user) => {
//           if (user != null) {
//             this.stayLoggedIn = 1
//           }
//           else {
//             this.stayLoggedIn = 0
//           }
//           resolve(this.stayLoggedIn)
//         })
//       })
//     })
//   }


//   //forgotpassword
//   forgetPassword(email) {
//     return new Promise((resolve, reject) => {
//       firebase.auth().sendPasswordResetEmail(email).then(() => {
//         resolve();
//       }, (error) => {
//         reject(error)
//       })

//     })

//   }
//   // login method
//   SignIn(email, password) {
//     return new Promise((resolve, reject) => {
//       firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
//         let user = firebase.auth().currentUser;
//         firebase.database().ref("Users/" + "App_Users/" + user.uid).on('value', (data: any) => {
//           if (data.val() != undefined) {
//             console.log('user on app');
//             firebase.auth().signOut();
//             reject('')
//           }
//           else {
//             resolve('')
//           }
//         });
//       }, Error => {
//         reject(Error)
//       })
//     })
//   }

//   // Register Method
//   signUp(email, password) {
//     return new Promise((resolve, reject) => {
//       this.ngzone.run(() => {
//         return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
//           console.log(newUser)
//           var user = firebase.auth().currentUser
//           console.log(user)
//           firebase.database().ref("Users/" + "Cms_Users/" + user.uid).set({
//             email: email,
//           })
//           resolve();
//         }).catch((error) => {
//           console.log(error);
//         })
//       })
//     })
//   }




//   //logout method
//   logout() {
//     return new Promise((resolve, reject) => {
//       this.ngzone.run(() => {
//         firebase.auth().signOut();
//         resolve()
//       });
//     })
//   }


//   //Add organization
//   addOrganisation(email, lat, long, region, cell, category, Orgname, background, address, wifi, freeWifi, wifiRange, website) {
//     var user = firebase.auth().currentUser;
//     return new Promise((resolve, reject) => {
//       firebase
//         .database()
//         .ref("Organizations/" + user.uid)
//         .set({
//           name: Orgname,
//           email: email,
//           contact: cell,
//           category: category,
//           background: background,
//           long: long,
//           lat: lat,
//           wifi: wifi,
//           freeWifi: freeWifi,
//           website: website,
//           wifiRange: wifiRange,
//           region: region,
//           downloadurl: "assets/download.png",
//           downloadurlLogo: "assets/download.png",
//           address: address,
//         });
//       resolve()
//     })
//   }

//   getUserProfile(userName,contact,Postion,postiondesc,userImage){
//     var user = firebase.auth().currentUser;
//     return new Promise((resolve, reject) => {
//       firebase
//         .database()
//         .ref("UserProfileForOrg/" + user.uid)
//         .set({
//           userName: userName,
//           userContract: contact,
//           userPosition: Postion,
//           userPostiondesc:postiondesc,
//           userImage:userImage
      
//         });
//       resolve()
//     })

    
//   }

  


//   getACurentloggedInOrganizations() {
//     return new Promise((resolve, reject) => {
//       this.ngzone.run(() => {
//         var user = firebase.auth().currentUser;
//         firebase.database().ref("Organizations/" + user.uid).on("value", (data: any) => {
//           if (data.val() != null) {
//             // this.orgArray.length = 0;
//             // this.orgNames.length = 0;
//             let displayDetails = data.val();
//             console.log(displayDetails)
//             let keys = Object.keys(displayDetails);
//             console.log(keys)
//               // var k = keys[0];
//               let orgObject = {
//                 address: displayDetails.address,
//                 background: displayDetails.background,
//                 category: displayDetails.category,
//                 contact: displayDetails.contact,
//                 downloadurl: displayDetails.downloadurl,
//                 downloadurlLogo: displayDetails.downloadurlLogo,
//                 email: displayDetails.email,
//                 freeWifi: displayDetails.freeWifi,
//                 name: displayDetails.name,
//                 lat: displayDetails.lat,
//                 long: displayDetails.long,
//                 region: displayDetails.region,
//                 website: displayDetails.website,
//                 wifi: displayDetails.wifi,
//                 wifiRange: displayDetails.wifiRange,
            
//               }
//               console.log(orgObject)
//               this.storeOrgNames(displayDetails.category);
//               this.orgArray.push(orgObject)
//               console.log(this.orgArray)
//             }
//             resolve(this.orgArray)
//           // }
//         });
//       })
//     })
//   }



//   getAllOrganizations() {
//     return new Promise((resolve, reject) => {
//       this.ngzone.run(() => {
//         var user = firebase.auth().currentUser;
//         firebase.database().ref("Organizations").on("value", (data: any) => {
//           if (data.val() != null) {
//             // this.orgArray.length = 0;
//             this.orgNames.length = 0;
//             let displayDetails = data.val();
//             console.log(displayDetails)
//             let keys = Object.keys(displayDetails);
//             console.log(keys)
//               for(var x =0; x < keys.length;x++){
//                 var k = keys[x];
//                 let orgObject = {
//                   address: displayDetails[keys[x]].address,
//                   background: displayDetails[keys[x]].background,
//                   category: displayDetails[keys[x]].category,
//                   contact: displayDetails[keys[x]].contact,
//                   downloadurl: displayDetails[keys[x]].downloadurl,
//                   downloadurlLogo: displayDetails[keys[x]].downloadurlLogo,
//                   email: displayDetails[keys[x]].email,
//                   freeWifi: displayDetails[keys[x]].freeWifi,
//                   name: displayDetails[keys[x]].name,
//                   lat: displayDetails[keys[x]].lat,
//                   long: displayDetails[keys[x]].long,
//                   region: displayDetails[keys[x]].region,
//                   website: displayDetails[keys[x]].website,
//                   wifi: displayDetails[keys[x]].wifi,
//                   wifiRange: displayDetails[keys[x]].wifiRange,
              
//                 }
//                 console.log(orgObject)
//                 this.storeOrgNames(displayDetails.category);
//                 this.getAllOrg.push(orgObject)
//                 console.log(this.getAllOrg)
//               }
//             }
//             resolve(this.getAllOrg)
//           // }
//         });
//       })
//     })
//   }



//   displayOnMAP() {
// 		return new Promise((resolve, reject) => {
// 			this.ngzone.run(() => {
// 			var user = firebase.auth().currentUser.uid;
// 			firebase.database().ref('4IRHubs/').on('value', (data: any) => {
// 				this.getprog.length =0;
// 				var UploadDetails = data.val();
// 				console.log(UploadDetails);
// 				var k2 = Object.keys(UploadDetails);
// 				for(var i =0 ;i<k2.length;i++){
// 					var key2 = k2[i];
// 					if (UploadDetails[key2].uid == user.uid) {
// 						let obj = {
// 							img: UploadDetails[key2].img,
// 							progName: UploadDetails[key2].name,
//               uid: UploadDetails[key2].user,
//               address: UploadDetails[key2].address,
// 							background: UploadDetails[key2].background,
//               benefits: UploadDetails[key2].benefits,
//               category: UploadDetails[key2].category,
// 							closeDate: UploadDetails[key2].closeDate,
//               contacts: UploadDetails[key2].contacts,
//               desc: UploadDetails[key2].desc,
// 							name: UploadDetails[key2].name,
//               openDate: UploadDetails[key2].openDate,
//               progEndDate: UploadDetails[key2].progEndDate,
// 							progStartDate: UploadDetails[key2].progStartDate,
//               user: UploadDetails[key2].user,
//               key : key2
        
// 						};
// 						console.log(obj);
// 						this.getprog.push(obj);
//             console.log(this.getprog);
           
// 					}
//         }
//         resolve(this.getprog);
// 			});

// 		});
// 		});
//   }

//   removeProg(key){
//     firebase.database().ref('4IRHubs/' + key).remove();
//   }

  
//   getallhubs() {
// 		return new Promise((resolve, reject) => {
// 			this.ngzone.run(() => {
//       var user = firebase.auth().currentUser.uid;
//       let loading = this.loadingCtrl.create({
//         spinner: 'bubbles',
//         content: 'Please wait...',
//         duration: 15000
//       });
// 			firebase.database().ref("4IRHubs").on('value', (data: any) => {
// 				this.getallhub.length =0;
// 				var UploadDetails = data.val();
// 				console.log(UploadDetails);
// 				var k2 = Object.keys(UploadDetails);
// 				for(var i =0 ;i<k2.length;i++){
// 					var key2 = k2[i];
// 						let obj = {
//               background : UploadDetails[key2].background,
//               contact : UploadDetails[key2].contact,
// 							img: UploadDetails[key2].img,
// 							name: UploadDetails[key2].name,
//               uid: UploadDetails[key2].user,
//               lat: UploadDetails[key2].lat,
//               long: UploadDetails[key2].long,
//               address: UploadDetails[key2].address,
//               openDate: UploadDetails[key2].openDate,
//               closeDate: UploadDetails[key2].closeDate,
//               progStartDate: UploadDetails[key2].progStartDate,
//               progEndDate: UploadDetails[key2].progEndDate,
//               jobEndDate: UploadDetails[key2].jobEndDate,
//               jobStartdate: UploadDetails[key2].jobStartdate,
//               key : key2
              
// 						};
// 						console.log(obj);
// 						this.getallhub.push(obj);
//             console.log(this.getallhub);		
//             loading.dismiss();
//         }
//         resolve(this.getallhub);
// 			});
		
// 		});
// 		});
//   }

//   geOrgtUser() {
// 		return new Promise((resolve, reject) => {
// 			this.ngzone.run(() => {
// 			var user = firebase.auth().currentUser.uid;
// 			firebase.database().ref("UserProfileForOrg/" + user).on('value', (data: any) => {
//        var details = data.val();
//        console.log(details)
//       resolve(details);
// 			});
		
// 		});
// 		});
//   }




//   //getcurrentProfile
//   retrieve() {
//     let userID = firebase.auth().currentUser;
//     return firebase.database().ref("Organizations/" + userID.uid)
//   }
//   storeOrgNames(cat) {
//     this.orgNames.push(cat);
//   }

//  hideProg(key){
//     firebase.database().ref("4IRHubs/" + key).update({
//       status: 'hidden'
//     })
//   }

//   //updateOrganization
//   update(applstart,applend,start,end,name,downloadurlLogo,contact,background,key) {
//     return new Promise((pass, fail) => {
//       this.ngzone.run(() => {
//         var user = firebase.auth().currentUser
//         firebase.database().ref("4IRHubs/" + key).update({
//           progName: name,
//           downloadurlLogo: downloadurlLogo,
//           contact: contact,
//           background:background,
//           openDate : applstart,
//           closeDate : applend,
//           progStartDate : start,
//           progEndDate : end

//         });
//       })
//     })
//   }


//   updateOrg(contact,downloadurlLogo,name,background) {
//     return new Promise((pass, fail) => {
//       this.ngzone.run(() => {
//         var user = firebase.auth().currentUser
//         firebase.database().ref("Organizations/" + user.uid).update({
//           contact: contact,
//           downloadurlLogo: downloadurlLogo,
//           name: name,
//           background:background,
      

//         });
//       })
//     })
//   }

  
//   updateUserProfile(userContract,userImage,userName,userPosition,userPostiondesc) {
//     return new Promise((pass, fail) => {
//       this.ngzone.run(() => {
//         var user = firebase.auth().currentUser
//         firebase.database().ref("UserProfileForOrg/" + user.uid).update({
//           userContract: userContract,
//           userImage: userImage,
//           userName: userName,
//           userPosition:userPosition,
//           userPostiondesc:userPostiondesc
//         });
//       })
//     })
//   }


//   //getcurrentlocation
//   getCurrentLocation(lat, lng) {
//     return new Promise((accpt, rej) => {
//       this.createPositionRadius(lat, lng).then((data: any) => {
//         accpt(data);
//       })
//     })

//   }



//   //createradius
//   createPositionRadius(latitude, longitude) {
//     var leftposition, rightposition, downposition, uposititon;
//     return new Promise((accpt, rej) => {
//       var downlat = new String(latitude);
//       var latIndex = downlat.indexOf(".");
//       var down = parseInt(downlat.substr(latIndex + 1, 2)) + 6;
//       var down = parseInt(downlat.substr(latIndex + 1, 2)) + 12;
//       if (down >= 100) {
//         if (downlat.substr(0, 1) == "-") {
//           var firstDigits = parseInt(downlat.substr(0, 3)) + 1;
//         }
//         else {
//           var firstDigits = parseInt(downlat.substr(0, 2)) - 1;
//         }
//         var remainder = down - 100;
//         if (remainder >= 10) {
//           downposition = firstDigits + "." + remainder;
//         }
//         else {
//           downposition = firstDigits + ".0" + remainder;
//         }

//       } else {
//         if (downlat.substr(0, 1) == "-") {
//           downposition = downlat.substr(0, 3) + "." + down;
//         }
//         else {
//           downposition = downlat.substr(0, 2) + "." + down;
//         }

//       }

//       //up  position
//       var uplat = new String(latitude);
//       var latIndex = uplat.indexOf(".");
//       var up = parseInt(uplat.substr(latIndex + 1, 2)) - 6;
//       var up = parseInt(uplat.substr(latIndex + 1, 2)) - 12;
//       if (up <= 0) {
//         if (uplat.substr(0, 1) == "-") {
//           var firstDigits = parseInt(uplat.substr(0, 3)) + 1;
//         }
//         else {
//           var firstDigits = parseInt(uplat.substr(0, 2)) - 1;
//         }
//         var remainder = down - 100;
//         if (remainder >= 10) {
//           uposititon = firstDigits + "." + remainder;
//         }
//         else {
//           uposititon = firstDigits + ".0" + remainder;
//         }
//       } else {
//         if (uplat.substr(0, 1) == "-") {
//           uposititon = uplat.substr(0, 3) + "." + up;
//         }
//         else {
//           uposititon = uplat.substr(0, 2) + "." + up;
//         }

//       }
//       //left position
//       var leftlat = new String(longitude);
//       var longIndex = leftlat.indexOf(".");
//       var left = parseInt(leftlat.substr(longIndex + 1, 2)) - 6;
//       var left = parseInt(leftlat.substr(longIndex + 1, 2)) - 12;
//       if (left >= 100) {
//         if (leftlat.substr(0, 1) == "-") {
//           var firstDigits = parseInt(leftlat.substr(0, 3)) - 1;
//         } else {
//           var firstDigits = parseInt(leftlat.substr(0, 2)) + 1;
//         }
//         var remainder = left - 100;
//         leftposition = firstDigits + ".0" + remainder;
//       } else {
//         if (leftlat.substr(0, 1) == "-") {
//           var firstDigits = parseInt(leftlat.substr(0, 3)) + 1;
//         }
//         else {
//           var firstDigits = parseInt(leftlat.substr(0, 2)) - 1;
//         }

//         if (left == 0) {
//           var remainder = 0;
//         }
//         else {
//           var remainder = left - 12;
//         }

//         leftposition = firstDigits + ".0" + remainder;

//       }
//       //right position
//       var rightlat = new String(longitude);
//       var longIndex = rightlat.indexOf(".");
//       var right = parseInt(rightlat.substr(longIndex + 1, 2)) + 6;
//       var right = parseInt(rightlat.substr(longIndex + 1, 2)) + 12;
//       if (right >= 100) {
//         if (rightlat.substr(0, 1) == "-") {
//           var firstDigits = parseInt(rightlat.substr(0, 3)) - 1;
//         } else {
//           var firstDigits = parseInt(rightlat.substr(0, 2)) + 1;
//         }
//         var remainder = right - 100;
//         rightposition = firstDigits + ".0" + remainder;
//       } else {
//         rightposition = rightlat.substr(0, 2) + "." + right;
//         if (left == 0) {
//           var remainder = 0;
//         }
//         else {
//           var remainder = left - 12;
//         }

//         rightposition = firstDigits + ".0" + remainder;
//       }
//       let radius = {
//         left: leftposition,
//         right: rightposition,
//         up: uposititon,
//         down: downposition
//       }
//       accpt(radius);
//       // down  position
//     })

//   }

//   //getlocation
//   getLocation(lat, lng) {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         var geocoder = new google.maps.Geocoder;
//         var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };
//         geocoder.geocode({ 'location': latlng }, function (results, status) {
//           var address = results[0].address_components[3].short_name;
//           resolve(address)
//         }, 4000);

//       })
//     })
//   }
//   //getname globally
//   getOrgNames() {
//     return this.orgNames
//   }


//   addPrograme(openDate, closeDate, name, progType, background, benefits, desc, progStartDate, progEndDate, address, contacts, img,lat,long) {
//     return new Promise((resolve, reject) => {
//       this.ngzone.run(() => {
//         var user = firebase.auth().currentUser
//         firebase.database().ref("4IRHubs").push({
//           openDate: openDate,
//           category:"programmes",
//           closeDate: closeDate,
//           name: name,
//           progType: progType,
//           background: background,
//           benefits: benefits,
//           desc: desc,
//           progStartDate: progStartDate,
//           progEndDate: progEndDate,
//           address: address,
//           contacts: contacts,
//           img: img,
//           lat:lat,
//           long:long,
//           user : user.uid
//         })
//         resolve();
//       })
//     })
//   }

  

  // addWifi(WiFiAvailability,freeOrPaidWiFi, priceWiFi,address,lat,long,name) {
  //   return new Promise((resolve, reject) => {
  //     this.ngzone.run(() => {
  //       var user = firebase.auth().currentUser
  //       firebase.database().ref("4IRHubs").push({
  //         WiFiAvailability:WiFiAvailability,
  //         address:address,
  //         category:"wifi",         
  //         freeOrPaidWiFi: freeOrPaidWiFi,
  //         priceWiFi:priceWiFi,
  //         lat:lat, 
  //         long:long,
  //         name:name,
  //         img: "assets/wifi.jpg",
  //         user : user.uid
  //       })
  //       resolve();
  //     })
  //   })
  // }



//   getPrograme() {
//     return new Promise((resolve, reject) => {
//       this.ngzone.run(() => {
//         var user = firebase.auth().currentUser;
//         firebase.database().ref("programmes/" + user.uid).on("value", (data: any) => {
//           if (data.val() != undefined) {
//             var progs = new Array();
//             var details = data.val();
//             var keys = Object.keys(details);
//             for (var x = 0; x < keys.length; x++) {
//               var k = keys[0];
//               var progObject = {
//                 openDate: details[k].openDate,
//                 closeDate: details[k].closeDate,
//                 progName: details[k].progName,
//                 progType: details[k].progType,
//                 progBackround: details[k].progBackround,
//                 benefits: details[k].benefits,
//                 desc: details[k].desc,
//                 progStartDate: details[k].progStartDate,
//                 progEndDate: details[k].progEndDate,
//                 address: details[k].address,
//                 contacts: details[k].contacts,
//                 img: details[k].img,
//               }
//               progs.push(progObject)
//             }
//             resolve(progs);
//           }
//         })
//       })
//     })
//   }


//   addJob(name,openDate, closeDate, address, desc, benefits, jobStartdate, jobEndDate, contact, img,lat,long) {
//     return new Promise((resolve, reject) => {
//       this.ngzone.run(() => {
//         var user = firebase.auth().currentUser
//         firebase.database().ref("4IRHubs").push({
//           openDate: openDate,
//           category:"jobs",
//           closeDate: closeDate,
//           address: address,
//           desc: desc,
//           benefits: benefits,
//           jobStartdate: jobStartdate,
//           jobEndDate: jobEndDate,
//           img: img,
//           contact: contact,
//           name : name,
//           lat:lat,
//           long:long,
//           user : user.uid
//         })
//         resolve();
//       })
//     })
//   }


//   getJobs() {
//     return new Promise((resolve, reject) => {
//       this.ngzone.run(() => {
//         var user = firebase.auth().currentUser;
//         firebase.database().ref("jobs/" + user.uid).on("value", (data: any) => {
//           if (data.val() != undefined) {
//             var jobs = new Array();
//             var details = data.val();
//             var keys = Object.keys(details);
//             for (var x = 0; x < keys.length; x++) {
//               var k = keys[0];
//               var jobObject = {
//                 openDate: details[k].openDate,
//                 closeDate: details[k].closeDate,
//                 benefits: details[k].benefits,
//                 desc: details[k].desc,
//                 jobStartdate: details[k].jobStartdate,
//                 jobEndDate: details[k].jobEndDate,
//                 address: details[k].address,
//                 contacts: details[k].contacts,
//                 img: details[k].img,
//                 name : details[k].name
//               }
//               jobs.push(jobObject)
//             }
//             resolve(jobs);
//           }
//         })
//       })
//     })
//   }


//   addService(email,openDate, closeDate, address, serviceName, contact, desc, img,lat,long) {
//     return new Promise((resolve, reject) => {
//       this.ngzone.run(() => {
//         var user = firebase.auth().currentUser
//         firebase.database().ref("4IRHubs").push({
//           openDate: openDate,
//           category:"service",
//           email:email,
//           closeDate: closeDate,
//           address: address,
//           desc: desc,
//           img: img,
//           contact: contact,
//           name : serviceName,
//           lat:lat,
//           long:long
//         })
//         resolve();
//       })
//     })
//   }

//   getServices() {
//     return new Promise((resolve, reject) => {
//       this.ngzone.run(() => {
//         var user = firebase.auth().currentUser;
//         firebase.database().ref("services/" + user.uid).on("value", (data: any) => {
//           if (data.val() != undefined) {
//             var services = new Array();
//             var details = data.val();
//             var keys = Object.keys(details);
//             for (var x = 0; x < keys.length; x++) {
//               var k = keys[0];
//               var serviceObject = {
//                 openDate: details[k].openDate,
//                 closeDate: details[k].closeDate,
//                 desc: details[k].desc,
//                 address: details[k].address,
//                 contacts: details[k].contact,
//                 img: details[k].img,
//                 serviceName: details[k].name,
//                 email: details[k].email
//               }
//               services.push(serviceObject)
//             }
//             resolve(services);
//           }
//         })
//       })
//     })
//   }


  
//   RemoveUploadedPicture(key) {
//     return new Promise((accpt, rej) => {
//       var user = firebase.auth().currentUser
//       console.log(key)
//       console.log(user.uid)
//       this.ngzone.run(() => {
//         firebase.database().ref("4IRHubs/" + key).remove();
//         accpt("student deleted");
//       });
//     });
//   }

// }


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
  orgProfile = new Array();
  getprog = new Array();
  getallhub = new Array();
  userProg = new Array();
  getAllOrg = new Array();
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

  
  updatejob(name,add,con,backg,start,end,applS,applE,img, key) {
    return new Promise((pass, fail) => {
      this.ngzone.run(() => {
        firebase.database().ref("4IRHubs/" + key).update({
          name: name,
          address: add,
          contacts: con,
          background: backg,
          openDate: start,
          closeDate: end,
          progStartDate: applS,
          progEndDate: applE,
          img : img,
        });
        pass('');
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

  getUserProfile(userName,contact,Postion,postiondesc,userImage){
    var user = firebase.auth().currentUser;
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref("UserProfileForOrg/" + user.uid)
        .set({
          userName: userName,
          userContract: contact,
          userPosition: Postion,
          userPostiondesc:postiondesc,
          userImage:userImage
      
        });
      resolve()
    })

    
  }

  


  getACurentloggedInOrganizations() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser;
        firebase.database().ref("Organizations/" + user.uid).on("value", (data: any) => {
          if (data.val() != null) {
            // this.orgArray.length = 0;
            // this.orgNames.length = 0;
            let displayDetails = data.val();
            console.log(displayDetails)
            let keys = Object.keys(displayDetails);
            console.log(keys)
              // var k = keys[0];
              let orgObject = {
                address: displayDetails.address,
                background: displayDetails.background,
                category: displayDetails.category,
                contact: displayDetails.contact,
                downloadurl: displayDetails.downloadurl,
                downloadurlLogo: displayDetails.downloadurlLogo,
                email: displayDetails.email,
                freeWifi: displayDetails.freeWifi,
                name: displayDetails.name,
                lat: displayDetails.lat,
                long: displayDetails.long,
                region: displayDetails.region,
                website: displayDetails.website,
                wifi: displayDetails.wifi,
                wifiRange: displayDetails.wifiRange,
            
              }
              console.log(orgObject)
              //this.storeOrgNames(displayDetails.category);
              this.orgArray.push(orgObject)
              console.log(this.orgArray)
            }
            resolve(this.orgArray)
          // }
        });
      })
    })
  }



  getAllOrganizations() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser;
        firebase.database().ref("Organizations").on("value", (data: any) => {
          if (data.val() != null) {
            // this.orgArray.length = 0;
            this.orgNames.length = 0;
            let displayDetails = data.val();
            console.log(displayDetails)
            let keys = Object.keys(displayDetails);
            console.log(keys)
              for(var x =0; x < keys.length;x++){
                var k = keys[x];
                let orgObject = {
                  address: displayDetails[keys[x]].address,
                  background: displayDetails[keys[x]].background,
                  category: displayDetails[keys[x]].cstoreOrgNamesategory,
                  contact: displayDetails[keys[x]].contact,
                  downloadurl: displayDetails[keys[x]].downloadurl,
                  downloadurlLogo: displayDetails[keys[x]].downloadurlLogo,
                  email: displayDetails[keys[x]].email,
                  freeWifi: displayDetails[keys[x]].freeWifi,
                  name: displayDetails[keys[x]].name,
                  lat: displayDetails[keys[x]].lat,
                  long: displayDetails[keys[x]].long,
                  region: displayDetails[keys[x]].region,
                  website: displayDetails[keys[x]].website,
                  wifi: displayDetails[keys[x]].wifi,
                  wifiRange: displayDetails[keys[x]].wifiRange,
              
                }
                console.log(orgObject)
                //this.storeOrgNames(displayDetails.category);
                this.getAllOrg.push(orgObject)
                console.log(this.getAllOrg)
              }
            }
            resolve(this.getAllOrg)
          // }
        });
      })
    })
  }


  displayOnMAP() {
		return new Promise((resolve, reject) => {
			this.ngzone.run(() => {
			var user = firebase.auth().currentUser.uid;
			firebase.database().ref('4IRHubs/').on('value', (data: any) => {
				this.getprog.length =0;
				var UploadDetails = data.val();
				console.log(UploadDetails);
				var k2 = Object.keys(UploadDetails);
				for(var i =0 ;i<k2.length;i++){
					var key2 = k2[i];
					if (UploadDetails[key2].uid == user.uid) {
						let obj = {
							img: UploadDetails[key2].img,
							progName: UploadDetails[key2].name,
              uid: UploadDetails[key2].user,
              address: UploadDetails[key2].address,
							background: UploadDetails[key2].background,
              benefits: UploadDetails[key2].benefits,
              category: UploadDetails[key2].category,
							closeDate: UploadDetails[key2].closeDate,
              contact: UploadDetails[key2].contact,
              desc: UploadDetails[key2].desc,
              name: UploadDetails[key2].name,
              openDate: UploadDetails[key2].openDate,
              progEndDate: UploadDetails[key2].progEndDate,
							progStartDate: UploadDetails[key2].progStartDate,
              user: UploadDetails[key2].user,
              city: UploadDetails[key2].location,
              key : key2,
        
            };
            this.storeOrgNames(UploadDetails[key2].name)
            this.cityNames(UploadDetails[key2].city)
						console.log(obj);
						this.getprog.push(obj);
            console.log(this.getprog);
					}
        }
        resolve(this.getprog);
			});
		});
		});
  }

  // storeCityNames =  new Array();
   cityNames(name){
  //   console.log(name);
    
  //    this.storeCityNames.push(name)
   }

  // returnCityNames(){
  //   return this.orgNames
  // }

  removeProg(key){
    firebase.database().ref('4IRHubs/' + key).remove();
  }
  removesev(key){
    firebase.database().ref('4IRHubs/' + key).remove();
  }
  removejobs(key){
    firebase.database().ref('4IRHubs/' + key).remove();
  }
  removewifi(key){
    firebase.database().ref('4IRHubs/' + key).remove();
  }
  updateprog(progKey,progname2,contact2,progbackground, applOpen,applClose,start,end,img){
    console.log(progKey)
    return new Promise((resolve, reject) => {
    firebase.database().ref("4IRHubs/" + progKey).update({
      name: progname2,
      contact: contact2,
      background:progbackground,
      openDate : applOpen,
      closeDate : applClose,
      progStartDate : start,
      progEndDate : end,
      img:img
    })
    });
  }

  updateserv(progKey,desc3,img,name){
    return new Promise((resolve, reject) => {
      firebase.database().ref("4IRHubs/" + progKey).update({
        img:img,
        desc:desc3,
        name:name
      })
      });
  }

  updatewifi(wifikey,background4,img4,nameF){
    return new Promise((resolve, reject) => {
      firebase.database().ref("4IRHubs/" + wifikey).update({
        img:img4,
        background:background4,
        name:nameF
      })
      });
  }


  updatejobs(jobkey,desc5,img5,namej){
    return new Promise((resolve, reject) => {
      firebase.database().ref("4IRHubs/" + jobkey).update({
        img:img5,
        desc:desc5,
        name:namej
      })
      });
  }
  
  getallhubs() {
		return new Promise((resolve, reject) => {
			this.ngzone.run(() => {
      var user = firebase.auth().currentUser.uid;
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Please wait...',
        duration: 15000
      });
			firebase.database().ref("4IRHubs").on('value', (data: any) => {
				this.getallhub.length =0;
				var UploadDetails = data.val();
				console.log(UploadDetails);
				var k2 = Object.keys(UploadDetails);
				for(var i =0 ;i<k2.length;i++){
					var key2 = k2[i];
						let obj = {
              background : UploadDetails[key2].background,
              contact : UploadDetails[key2].contact,
							img: UploadDetails[key2].img,
							name: UploadDetails[key2].name,
              uid: UploadDetails[key2].user,
              lat: UploadDetails[key2].lat,
              long: UploadDetails[key2].long,
              address: UploadDetails[key2].address,
              openDate: UploadDetails[key2].openDate,
              closeDate: UploadDetails[key2].closeDate,
              progStartDate: UploadDetails[key2].progStartDate,
              progEndDate: UploadDetails[key2].progEndDate,
              jobEndDate: UploadDetails[key2].jobEndDate,
              jobStartdate: UploadDetails[key2].jobStartdate,
              key : key2
              
						};
						console.log(obj);
						this.getallhub.push(obj);
            console.log(this.getallhub);		
            loading.dismiss();
        }
        resolve(this.getallhub);
			});
		
		});
		});
  }

  geOrgtUser() {
		return new Promise((resolve, reject) => {
			this.ngzone.run(() => {
			var user = firebase.auth().currentUser.uid;
			firebase.database().ref("UserProfileForOrg/" + user).on('value', (data: any) => {
       var details = data.val();
       console.log(details)
      resolve(details);
			});
		
		});
		});
  }




  //getcurrentProfile
  retrieve() {
    let userID = firebase.auth().currentUser;
    return firebase.database().ref("Organizations/" + userID.uid)
  }
  ogNames = new Array()
  storeOrgNames(cat) {
    console.log(cat)
    // if (cat != undefined)
    this.ogNames.push(cat);
  }
  returnstoreOrgNames() {
    return this.ogNames;
  }
 hideProg(key){
    firebase.database().ref("4IRHubs/" + key).update({
      status: 'hidden'
    })
  }

  //updateOrganization
  update(applstart,applend,start,end,name2,downloadurlLogo,contact,background,key) {
    console.log(name2);
    return new Promise((pass, fail) => {
      this.ngzone.run(() => {
        firebase.database().ref("4IRHubs/" + key).update({
          progName: end,
          img: downloadurlLogo,
          address : contact,
          background:background,
          openDate : applstart,
          closeDate : applend,
          progStartDate : start,
          progEndDate : end
        });
        pass('');
      })
    })
  }


  updateService(contact,img,desc,addr, key) {
    return new Promise((pass, fail) => {
      this.ngzone.run(() => {
        firebase.database().ref("4IRHubs/" + key).update({
          desc: desc,
          img: img,
          contacts : contact,
          address:addr,
        });
        pass('');
      })
    })
  }


  updateOrg(contact,downloadurlLogo,name,background) {
    return new Promise((pass, fail) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser
        firebase.database().ref("Organizations/" + user.uid).update({
          contact: contact,
          downloadurlLogo: downloadurlLogo,
          name: name,
          background:background,
        });
      })
    })
  }

  
  updateUserProfile(userContract,userImage,userName,userPosition,userPostiondesc) {
    return new Promise((pass, fail) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser
        firebase.database().ref("UserProfileForOrg/" + user.uid).update({
          userContract: userContract,
          userImage: userImage,
          userName: userName,
          userPosition:userPosition,
          userPostiondesc:userPostiondesc
        });
      })
    })
  }


  //getcurrentlocation
  getCurrentLocation(lat, lng) {
    return new Promise((accpt, rej) => {
      this.createPositionRadius(lat, lng).then((data: any) => {
        accpt(data);
      })
    })

  }



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
    return this.ogNames
  }


  addPrograme(openDate, closeDate, name, progType, background, benefits, desc, progStartDate, progEndDate, address, contact, img,lat,long, city) {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser
        firebase.database().ref("4IRHubs").push({
          openDate: openDate,
          category:"programmes",
          closeDate: closeDate,
          name: name,
          progType: progType,
          background: background,
          benefits: benefits,
          desc: desc,
          progStartDate: progStartDate,
          progEndDate: progEndDate,
          address: address,
          contact: contact,
          img: img,
          lat:lat,
          long:long,
          user : user.uid,
          city: city
        })
        resolve();
      })
    })
  }


  // addWifi(openDate, closeDate, name,img,lat,long) {
  //   return new Promise((resolve, reject) => {
  //     this.ngzone.run(() => {
  //       var user = firebase.auth().currentUser
  //       firebase.database().ref("4IRHubs").push({
  //         openDate: openDate,
  //         category:"programmes",
  //         closeDate: closeDate,
  //         name: name,     
  //         img: img,
  //         lat:lat,
  //         long:long,
  //         user : user.uid
  //       })
  //       resolve();
  //     })
  //   })
  // }
  addWifi(WiFiAvailability,freeOrPaidWiFi, priceWiFi,address,lat,long,name) {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser
        firebase.database().ref("4IRHubs").push({
          WiFiAvailability:WiFiAvailability,
          address:address,
          category:"wifi",         
          freeOrPaidWiFi: freeOrPaidWiFi,
          priceWiFi:priceWiFi,
          lat:lat, 
          long:long,
          name:name,
          img: "assets/wifi.jpg",
          user : user.uid
        })
        resolve();
      })
    })
  }


  getPrograme() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser;
        firebase.database().ref("programmes/" + user.uid).on("value", (data: any) => {
          if (data.val() != undefined) {
            var progs = new Array();
            var details = data.val();
            var keys = Object.keys(details);
            for (var x = 0; x < keys.length; x++) {
              var k = keys[0];
              var progObject = {
                openDate: details[k].openDate,
                closeDate: details[k].closeDate,
                progName: details[k].progName,
                progType: details[k].progType,
                progBackround: details[k].progBackround,
                benefits: details[k].benefits,
                desc: details[k].desc,
                progStartDate: details[k].progStartDate,
                progEndDate: details[k].progEndDate,
                address: details[k].address,
                contact: details[k].contact,
                img: details[k].img,
              }
              progs.push(progObject)
            }
            resolve(progs);
          }
        })
      })
    })
  }


  addJob(name,openDate, closeDate, address, desc, benefits, jobStartdate, jobEndDate, contact, img,lat,long, city) {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser
        firebase.database().ref("4IRHubs").push({
          openDate: openDate,
          category:"jobs",
          closeDate: closeDate,
          address: address,
          desc: desc,
          benefits: benefits,
          jobStartdate: jobStartdate,
          jobEndDate: jobEndDate,
          img: img,
          contact: contact,
          name : name,
          lat:lat,
          long:long,
          city: city,
          user : user.uid
        })
        resolve();
      })
    })
  }


  getJobs() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser;
        firebase.database().ref("jobs/" + user.uid).on("value", (data: any) => {
          if (data.val() != undefined) {
            var jobs = new Array();
            var details = data.val();
            var keys = Object.keys(details);
            for (var x = 0; x < keys.length; x++) {
              var k = keys[0];
              var jobObject = {
                openDate: details[k].openDate,
                closeDate: details[k].closeDate,
                benefits: details[k].benefits,
                desc: details[k].desc,
                jobStartdate: details[k].jobStartdate,
                jobEndDate: details[k].jobEndDate,
                address: details[k].address,
                contact: details[k].contact,
                img: details[k].img,
                name : details[k].name
              }
              jobs.push(jobObject)
            }
            resolve(jobs);
          }
        })
      })
    })
  }


  addService(email,openDate, closeDate, address, serviceName, contact, desc, img,lat,long, city) {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser
        firebase.database().ref("4IRHubs").push({
          openDate: openDate,
          email:email,
          closeDate: closeDate,
          address: address,
          desc: desc,
          img: img,
          contact: contact,
          name : serviceName,
          lat:lat,
          long:long,
          city: city
        })
        resolve();
      })
    })
  }

  getServices() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser;
        firebase.database().ref("services/" + user.uid).on("value", (data: any) => {
          if (data.val() != undefined) {
            var services = new Array();
            var details = data.val();
            var keys = Object.keys(details);
            for (var x = 0; x < keys.length; x++) {
              var k = keys[0];
              var serviceObject = {
                openDate: details[k].openDate,
                closeDate: details[k].closeDate,
                desc: details[k].desc,
                address: details[k].address,
                contact: details[k].contact,
                img: details[k].img,
                serviceName: details[k].name,
                email: details[k].email
              }
              services.push(serviceObject)
            }
            resolve(services);
          }
        })
      })
    })
  }


  
  RemoveUploadedPicture(key) {
    return new Promise((accpt, rej) => {
      var user = firebase.auth().currentUser
      console.log(key)
      console.log(user.uid)
      this.ngzone.run(() => {
        firebase.database().ref("4IRHubs/" + key).remove();
        accpt("student deleted");
      });
    });
  }

}
