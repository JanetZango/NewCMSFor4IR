import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FormsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forms',
  templateUrl: 'forms.html',
})
export class FormsPage {


//   category;
//   orgName;
//   orgWebsite;
//   orgAdress;
//   orgDescription;
//   orgPhone;
//   contactValidation;
//   websiteValidation;
//   offerWifi;
//   wifi;
//   catService;
//   chooseWifiRange;
//   ShowWifi:boolean = false;
//   ShowChooseRange:boolean = false;

  
//   showCoffeeShopServices;
//   showlearningCenterServices;
//   showinternetCafeServices;
//   showLibaryServices;
//   showheiServices;
//   showMallServices;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad FormsPage');
//   }
  
//   checkWifi() {
//     console.log("testing");
//     console.log(this.offerWifi);

//     if ("Yes" == this.offerWifi) {
//       this.ShowWifi = true;
//     } else {
//       this.ShowWifi = false;
//     }

//   }
//   checkWifipayment() {
//     if (this.wifi == "Yes") {
//       this.ShowChooseRange = true
//     } else {
//       this.ShowChooseRange = false
//     }
//   }
//   showServices() {
//     console.log(this.category);
//     if (this.category == "Higher Education Institution") {
//       this.showheiServices = true;

//       this.showLibaryServices = false;
//       this.showinternetCafeServices = false;
//       this.showlearningCenterServices = false;
//       this.showMallServices = false;

//       this.catService = this.HeiServices;

//       console.log(this.catService);


//     } else if (this.category == "Library") {
//       this.showLibaryServices = true;
//       this.showheiServices = false;
//       this.showheiServices = false;
//       this.showinternetCafeServices = false;
//       this.showlearningCenterServices = false;
//       this.showMallServices = false;
//     } else if (this.category == "InterCafe") {
//       this.showinternetCafeServices = true;
//       this.showLibaryServices = false;
//       this.showheiServices = false;
//       this.showheiServices = false;
//       this.showlearningCenterServices = false;
//       this.showMallServices = false;

//     } else if (this.category == "Learning Center") {
//       this.showlearningCenterServices = true;
//       this.showinternetCafeServices = false;
//       this.showLibaryServices = false;
//       this.showheiServices = false;
//       this.showheiServices = false;

//       this.showMallServices = false;

//     } else if (this.category == "Mall") {
//       this.showMallServices = true;
//       this.showlearningCenterServices = false;
//       this.showinternetCafeServices = false;
//       this.showLibaryServices = false;
//       this.showheiServices = false;
//       this.showheiServices = false;

//     } else if (this.category == "Coffee Shop") {
//       this.showCoffeeShopServices = true
//       this.showlearningCenterServices = false;
//       this.showinternetCafeServices = false;
//       this.showLibaryServices = false;
//       this.showheiServices = false;
//       this.showheiServices = false;
//       this.showMallServices = false;

//     }


//   }

//   // alert(message) {
//   //   const alert = this.alertCtrl.create({
//   //     title: '',
//   //     subTitle: message,
//   //     buttons: ['OK']
//   //   });
//   //   alert.present();
//   }

//   websiteV;
//   is_urlValidation(str) {
//     var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
//     if (regexp.test(str)) {
//       this.websiteValidation = 0
//       this.websiteV = 0
//       // return true;
//       console.log("correct website");

//     }
//     else {
//       this.websiteV = 1;
//       this.websiteValidation = 1
//       console.log("wrong website");
//       //return false;
//     }
//   }

//   moveToPage2() {

//     // this.phonenumberValidatin();
//     var progBar = document.getElementById("theDot");
//     // this.is_urlValidation(this.orgWebsite);
//     // if (this.orgName == undefined && this.orgAdress == undefined && this.orgPhone == undefined && this.orgWebsite == undefined && this.orgDescription == undefined) {
//     //   this.alert("Please complete all details ")
//     // } else if (this.orgName == undefined) {
//     //   this.alert("Enter organisation Name ")
//     // } else if (this.orgAdress == undefined) {
//     //   this.alert("Enter Address  ")
//     // } else if (this.contactValidation == 1) {
//     //   this.alert("The phone numbers you have entered is invalid, please enter a valid phone numbers  ")
//     // } else if (this.websiteValidation == 1) {
//     //   this.alert("The website address you have entered is invalid, please enter a valid website address ")
//     // } 
//     // else if (this.checkAddress == 1) {
//     //   this.alert("The address you have entered is invalid, please enter a valid address ")
//     // }
//     // else if (this.orgPhone == undefined) {
//     // this.alert("Enter Phone numbers  ")
//     // } else if (this.orgDescription == undefined) {
//     // this.alert("Enter Phone numbers  ")

//     // } else {

//     var toSlide = document.getElementById("page1");
//     toSlide.style.marginLeft = "-25%";
//     progBar.style.width = "50%";

//   // }





// }
// moveToPage3() {


//   var progBar = document.getElementById("theDot");


//   if (this.offerWifi == "No") {
//     if (this.wifi == undefined) {
//       this.wifi = "No"
//     } if (this.chooseWifiRange == undefined) {
//       this.chooseWifiRange = "No"
//     }

//   }

//   if (this.offerWifi != undefined) {
//     if (this.wifi != undefined && this.chooseWifiRange != undefined) {
//       var toSlide = document.getElementById("page1");
//       toSlide.style.marginLeft = "-50%";
//       // this.progressBar = this.progressBar + 25;
//       progBar.style.width = "75%";
//     } else {
//       alert("Please complete all details")
//     }

//   }

//   else {

//     alert("Please complete all details")
//   }



// }


// moveToPage4() {

//   var progBar = document.getElementById("theDot");
//   if (this.category != undefined && this.catService.length != 0) {
//     console.log(this.catService);


//     var toSlide = document.getElementById("page1");
//     toSlide.style.marginLeft = "-75%";
//     // this.progressBar = this.progressBar + 25;
//     progBar.style.width = "100%";
//   } else {
//     alert("Complete all the Details ")
//   }

// }

// backToPage3() {
//   var progressBar = document.getElementById("theDot");
//   var toSlide = document.getElementById("page1");
//   toSlide.style.marginLeft = "-50%";
//   progressBar.style.width = "75%"
// }
// backToPage2() {
//   var progressBar = document.getElementById("theDot");
//   var toSlide = document.getElementById("page1");
//   toSlide.style.marginLeft = "-25%";
//   progressBar.style.width = "50%"
// }
// backToPage1() {
//   var progressBar = document.getElementById("theDot");
//   var toSlide = document.getElementById("page1");
//   toSlide.style.marginLeft = "0%";
//   progressBar.style.width = "25%"
// }

}
