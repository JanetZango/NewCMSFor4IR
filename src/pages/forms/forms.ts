import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HubsProvider } from '../../providers/hubs/hubs'
import { HomePage } from '../home/home';
import swal from "sweetalert";
import Swal from "sweetalert2";
import { OnboardingPage } from '../onboarding/onboarding';
/**
 * Generated class for the FormsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;
@IonicPage()
@Component({
  selector: 'page-forms',
  templateUrl: 'forms.html',
})
export class FormsPage {
  category;
  orgName;
  orgWebsite;
  orgAdress;
  orgDescription;
  orgPhone;
  contactValidation;
  websiteValidation;
  orgAddressObject;
  offerWifi;
  wifi;
  catService;
  chooseWifiRange;
  ShowWifi: boolean = false;
  ShowChooseRange: boolean = false;
  showCoffeeShopServices;
  showlearningCenterServices;
  showinternetCafeServices;
  showLibaryServices;
  showheiServices;
  checkAddress;
  showMallServices;
  background;
  downloadurl;
  alertMessage;
  downloadurlLogo;
  email = this.navParams.get("email")
  userName;
  userSurname;
  userPosition;
  userEmail;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public hubs: HubsProvider) {
    // this.showPrompt()
    console.log(this.email)

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FormsPage');
    this.is_urlValidation("www.youtube.com");
  }
  checkWifi() {
    console.log("testing");
    console.log(this.offerWifi);
    if ("Yes" == this.offerWifi) {
      this.ShowWifi = true;
    } else {
      this.ShowWifi = false;
    }
  }
  checkWifipayment() {
    if (this.wifi == "Yes") {
      this.ShowChooseRange = true;
      this.chooseWifiRange = null;
    } else {
      this.ShowChooseRange = false;
      this.chooseWifiRange = "No"
    }
  }
  // showServices() {
  websiteV;
  is_urlValidation(str) {
    var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
      this.websiteValidation = 0
      this.websiteV = 0
      // return true;
      console.log("correct website");
    }
    else {
      this.websiteV = 1;
      this.websiteValidation = 1
      console.log("wrong website");
      //return false;
    }
  }
  errMessage


  moveToPage2() {
    this.phonenumberValidatin();
    let b = window.innerHeight;
    var progBar = document.getElementById("theDot");
    this.is_urlValidation(this.orgWebsite);
    if (this.orgName == undefined && this.orgAdress == undefined && this.orgPhone == undefined && this.orgWebsite == undefined && this.orgDescription == undefined) {
      this.alertMessage =
        "Please insert the organisation's details";
      swal(this.alertMessage);
    } else if (this.orgName == undefined) {

      this.alertMessage =
        "Please insert the organisation's name";
      swal(this.alertMessage);
    } else if (this.orgAdress == undefined) {
      this.alertMessage =
        "Please insert the organisation's address";
      swal(this.alertMessage);
    }
    else if (this.contactValidation == 1) {
      this.alertMessage ="The phone numbers you have entered is invalid, please enter a valid phone numbers  ";
      swal(this.alertMessage);
    }
    else if(this.websiteValidation == 1) {
      this.alertMessage ="The website address you have entered is invalid, please enter a valid website address ";
      swal(this.alertMessage);
    }
    else if (this.checkAddress == 1) {
      this.alertMessage ="The address you have entered is invalid, please enter a valid address ";
      swal(this.alertMessage);
    }
    else if (this.orgPhone == undefined) {
      this.alertMessage =
        "Please insert the organisation's phone numbers";
      swal(this.alertMessage);
    } else if (this.orgDescription == undefined) {
      this.alertMessage =
        "Please insert the organisation's description.";
      swal(this.alertMessage);
    } else { 
        var toSlide = document.getElementById("page1");
        toSlide.style.marginLeft = "-25%";
        progBar.style.width = "50%";
    }
  }



  phonenumberValidatin() {
    if (this.orgPhone == undefined) {

    } else {
      var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

      if (this.orgPhone.match(phoneno)) {
        console.log(this.orgPhone.match(phoneno));
        this.contactValidation = 0;
      }
      else {
        this.contactValidation = 1;
        console.log(this.orgPhone.match(phoneno));
        console.log("wrong");

      }

    }

  }

  moveToPage3() {
    var progBar = document.getElementById("theDot");
    if (this.offerWifi == "No") {
      if (this.wifi == undefined) {
        this.wifi = "No"
      } if (this.chooseWifiRange == undefined) {
        this.chooseWifiRange = "No"
      }
    }
    if (this.offerWifi != undefined) {
      if (this.wifi != undefined && this.chooseWifiRange != undefined) {
        var toSlide = document.getElementById("page1");
        toSlide.style.marginLeft = "-50%";
        // this.progressBar = this.progressBar + 25;
        progBar.style.width = "75%";
      } else {
        this.alertMessage =
        "Please complete all details.";
        swal(this.alertMessage);
      }
    }
    else {
      this.alertMessage =
      "Please choose an option.";
      swal(this.alertMessage);
    }
  }
  CatDesc
  moveToPage4() {
    var toSlide = document.getElementById("page1");
    var progBar = document.getElementById("theDot");
    var orgDescription = document.getElementById("orgDescription");
    console.log(this.category);
    if (this.CatDesc == "" || this.CatDesc == null) {
      orgDescription.style.display = "none";
    }
    if (this.category == null || this.category == undefined || this.category == " ") {
      this.alertMessage =
      "Please insert a category for the organisation.";
      swal(this.alertMessage);
    }
    else {
      toSlide.style.marginLeft = "-75%";
      progBar.style.width = "100%";
    }
  }
  backToPage3() {
    var progressBar = document.getElementById("theDot");
    var toSlide = document.getElementById("page1");
    toSlide.style.marginLeft = "-50%";
    progressBar.style.width = "75%"
  }
  backToPage2() {
    var progressBar = document.getElementById("theDot");
    var toSlide = document.getElementById("page1");
    toSlide.style.marginLeft = "-25%";
    progressBar.style.width = "50%"
  }
  backToPage1() {
    var progressBar = document.getElementById("theDot");
    var toSlide = document.getElementById("page1");
    toSlide.style.marginLeft = "0%";
    progressBar.style.width = "25%"
  }


  saveToDB() {
    console.log(this.wifi)
    let b = window.innerHeight;
    this.hubs.addOrganisation(this.email, this.orgAddressObject.lat, this.orgAddressObject.lng, this.orgAddressObject.city, this.orgPhone, this.category, this.orgName, this.orgDescription, this.orgAdress, this.wifi, this.offerWifi, this.chooseWifiRange, this.orgWebsite).then(() => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000
      });

      Toast.fire({
        type: "success",
        title: "Successfuly registered an Organization"
      });
      this.navCtrl.setRoot(OnboardingPage)
    });
  }
  getcoo(address) {
    return new Promise((accpt, rej) => {
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var arr = results[0].address_components;
          var arr2 = arr[3];
          this.latitude = results[0].geometry.location.lat();
          this.longitude = results[0].geometry.location.lng();
          let position = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
            city: arr2.long_name
          };
          accpt(position);
        }
        else {
          rej('')
        }
      })
    });
  }


  setAddress(event) {
    if (this.orgAdress != undefined) {
      this.getcoo(this.orgAdress).then((data: any) => {
        this.orgAddressObject = data;
        this.checkAddress = 0
        console.log(this.orgAddressObject);
      }, Error => {
        this.checkAddress = 1;
        console.log(this.checkAddress);
        this.alertMessage ="The address you have entered is invalid, please enter a valid address";
        swal(this.alertMessage);
      })
    }

  }

}