import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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


  category;
  orgName;
  orgWebsite;
  orgAdress;
  orgDescription;
  orgPhone;
  contactValidation;
  websiteValidation;
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
  showMallServices;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.showPrompt()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormsPage');
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
      this.ShowChooseRange = true
    } else {
      this.ShowChooseRange = false
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
      alert("wrong website");
      //return false;
    }
  }
  errMessage
  moveToPage2() {
    // this.phonenumberValidatin();
    var progBar = document.getElementById("theDot");
    this.is_urlValidation(this.orgWebsite);
    if (this.orgName == undefined && this.orgAdress == undefined && this.orgPhone == undefined && this.orgWebsite == undefined && this.orgDescription == undefined) {
      alert("Please complete all details ")
    } else if (this.orgName == undefined) {
      alert("Enter organisation Name ")
    } else if (this.orgAdress == undefined) {
      alert("Enter Address  ")
    }
    // else if (this.contactValidation == 1) {
    //   this.alert("The phone numbers you have entered is invalid, please enter a valid phone numbers  ")
    // } 
    // else if (this.websiteValidation == 1) {
    //   this.alert("The website address you have entered is invalid, please enter a valid website address ")
    // } 
    // else if (this.checkAddress == 1) {
    //   this.alert("The address you have entered is invalid, please enter a valid address ")
    // }
    else if (this.orgPhone == undefined) {
      alert("Enter Phone numbers  ")
    } else if (this.orgDescription == undefined) {
      alert("Enter Phone numbers  ")

    } else {

      var toSlide = document.getElementById("page1");
      toSlide.style.marginLeft = "-25%";
      progBar.style.width = "50%";

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
        alert("Please complete all details")
      }

    }

    else {

      alert("Please complete all details")
    }



  }
  CatDesc

  moveToPage4() {
    var toSlide = document.getElementById("page1");

    var progBar = document.getElementById("theDot");
    console.log(this.category);

    if (this.category == null || this.category == undefined || this.category == " ") {

      alert("Please omplete all the Details ")
    }
    else {
      toSlide.style.marginLeft = "-75%";
      progBar.style.width = "100%";
    }
    // if (this.category != undefined || this.category != " " || this.category != null || this.category != "" || this.category.length != 0) {


    // } else {
    // }

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
  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Registration',
      message: "Please fill in your personal details to get started.",
      inputs: [
        {
          name: 'userName',
          placeholder: 'First Name',
          value: "user"
        },
        {
          name: 'userSurname',
          placeholder: 'Surname'
        },
        {
          name: 'userEmail',
          placeholder: 'Email'
        },
        {
          name: 'userPosition',
          placeholder: 'Position'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
            var getStarted = document.getElementById("getStarted1");
            getStarted.style.display = "block"
            this.getStarted()
          }
        },
        {
          text: 'Continue',
          handler: data => {
            var getStarted = document.getElementById("getStarted1");
            getStarted.style.display = "none"

            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
  getStarted() {
    this.showPrompt()
  }
}
