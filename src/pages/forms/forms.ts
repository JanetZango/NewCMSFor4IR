import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HubsProvider } from '../../providers/hubs/hubs'
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
  orgAddressObject = new Array();
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
  downloadurlLogo;
lat;
long;
  email = this.navParams.get("email")
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,public hubs : HubsProvider) {
    this.showPrompt()
    console.log(this.email)
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
      // this.alert("Please complete all details ")
      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: "Please insert the organisation's details",
        buttons: ['OK']
      });
      alert.present();
    } else if (this.orgName == undefined) {
      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: "Please insert the organisation's name",
        buttons: ['OK']
      });
      alert.present();
      // alert("Enter organisation Name ")
    } else if (this.orgAdress == undefined) {
      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: "Please insert the organisation's address",
        buttons: ['OK']
      });
      // alert("Enter Address  ")
      alert.present();
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
      // alert("Enter Phone numbers  ")
      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: "Please insert the organisation's phone numbers",
        buttons: ['OK']
      });
      // alert("Enter Address  ")
      alert.present();
    } else if (this.orgDescription == undefined) {
      // alert("Enter Phone numbers  ")
      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: "Please insert the organisation's description.",
        buttons: ['OK']
      });
      // alert("Enter Address  ")
      alert.present();
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
        // alert("")
        const alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: "Please complete all details.",
          buttons: ['OK']
        });
        alert.present();
      }
    }
    else {
      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: "Please choose an option.",
        buttons: ['OK']
      });
      alert.present();
    }
  }
  CatDesc
  moveToPage4() {
    var toSlide = document.getElementById("page1");
    var progBar = document.getElementById("theDot");
    console.log(this.category);
    if (this.category == null || this.category == undefined || this.category == " ") {
      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: "Please insert a category for the organisation.",
        buttons: ['OK']
      });
      alert.present();
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
            // var getStarted = document.getElementById("getStarted1");
            // getStarted.style.display = "block"
            this.getStarted()
          }
        },
        {
          text: 'Continue',
          handler: data => {
            // var getStarted = document.getElementById("getStarted1");
            // getStarted.style.display = "none"

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

  saveToDB(){
    this.hubs.addOrganisation(this.email,this.orgPhone, this.category, this.background, this.lat,this.long, this.wifi,this.offerWifi,this.chooseWifiRange, this.orgWebsite,this.downloadurl,this.downloadurlLogo, this.orgAdress).then(() => {
      console.log("added ");
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
      })
    }

  }
  
}
