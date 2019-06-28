import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HubsProvider } from '../../providers/hubs/hubs'
import { HomePage } from '../home/home';


//global variables
declare var google;
declare var firebase;
/**
 * Generated class for the AddOrganizationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-organization',
  templateUrl: 'add-organization.html',
})
export class AddOrganizationPage {
  //variables
  orgAddressObject;
  orgPhone;
  category;
  orgName;
  orgWebsite;
  orgDescription;
  orgAdress;
  catService;
  offerWifi;
  chooseWifiRange;
  wifi;
  checkAddress;
  progressBar = 25;
  d = 1;
  downloadurl;
  downloadurlLogo;
  HeiServices;





  //imageDefaultPics
  urlCover = "../../assets/imgs/Map Template/default-cover.jpg";
  urlLogo = "../../assets/imgs/Dp.jpg";

  //boolean
  ShowWifi: boolean = false;
  ShowChooseRange: boolean = false;
  showOther: boolean = false;
  showheiServices: boolean = false;
  showLibaryServices: boolean = false;
  showinternetCafeServices: boolean = false;
  showlearningCenterServices: boolean = false;
  showMallServices: boolean = false;
  showCoffeeShopServices: boolean = false;
  showWebsiteHintInfo: boolean = false;
  showPhoneHint: boolean = false;
  showRegistionOrgs: boolean = false;
  showRegistionProgs: boolean = false;
  showApplicationLink: boolean = false;

  showProgramBenefits: boolean = false;
  showAdditionalBenefits: boolean = false;
  showEligibleCriteria: boolean = false;
  showProgramIntroduction: boolean = false;
  showObjective: boolean = false;

  showProgramcategory: boolean = true;
  hideRegisterAs: boolean = true;


 ///navparams
 email = this.navParams.get("email");
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public hubs: HubsProvider, public ngzone: NgZone, public alertCtrl: AlertController) {
  console.log(this.email)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddOrganizationPage');
  }

  //Add org Method
  saveToDB() {
    if (this.offerWifi == "No") {
      if (this.wifi == undefined) {
        this.wifi = "No"
      } if (this.chooseWifiRange == undefined) {
        this.chooseWifiRange = "No"
      }

    }

    if (this.offerWifi != undefined) {
      if (this.wifi != undefined && this.chooseWifiRange != undefined) {
        this.progressBar = this.progressBar + 25;
      } else {
        // this.alert("Please complete all details")
      }

    }
    if (this.offerWifi == "No") {
      if (this.wifi == undefined) {
        this.wifi = "No"
      } if (this.chooseWifiRange == undefined) {
        this.chooseWifiRange = "No"
      }

    }
    if (this.offerWifi != undefined) {
      if (this.wifi != undefined && this.chooseWifiRange != undefined) {
        this.progressBar = this.progressBar + 25;
      } else {
        // this.alert("Please complete all details")
      }
    }
    else {

      // this.alert("Please complete all details")
    }
    this.hubs.addOrganisation(this.email, this.orgAddressObject.lat, this.orgAddressObject.lng, this.orgAddressObject.city, this.orgPhone, this.category, this.orgName, this.orgDescription, this.orgAdress, this.offerWifi, this.wifi, this.chooseWifiRange, this.orgWebsite).then(() => {
      console.log("added ");
      this.navCtrl.push(HomePage);


    
      

    })
  }

  //getaddress
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

  //getCoordinates
  getcoo(address) {
    return new Promise((accpt, rej) => {
      this.ngzone.run(() => {
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
            console.log(position)
          }
          else {
            rej('')
          }
        });
      });
    });
  }

  //check wifi state
  checkWifi() {
    console.log("testing");
    console.log(this.offerWifi);

    if ("Yes" == this.offerWifi) {
      this.ShowWifi = true;
    } else {
      this.ShowWifi = false;
    }

  }
  //check wifi payment
  checkWifipayment() {
    if (this.wifi == "Yes") {
      this.ShowChooseRange = true
    } else {
      this.ShowChooseRange = false
    }
  }



  showServices() {

    console.log(this.category);
    if (this.category == "3D Printer") {
      this.showheiServices = true;
      // 
      this.showLibaryServices = false;
      this.showinternetCafeServices = false;
      this.showlearningCenterServices = false;
      this.showMallServices = false;
      this.catService = this.HeiServices;
      this.showOther = false;

    } else if (this.category == "Laser Cutter") {
      this.showLibaryServices = true;
      this.showheiServices = false;
      this.showheiServices = false;
      this.showinternetCafeServices = false;
      this.showlearningCenterServices = false;
      this.showMallServices = false;
      this.showOther = false;
    } else if (this.category == "Screen Printer") {
      this.showinternetCafeServices = true;
      this.showLibaryServices = false;
      this.showheiServices = false;
      this.showheiServices = false;
      this.showlearningCenterServices = false;
      this.showMallServices = false;
      this.showOther = false;

    } else if (this.category == "Heat Press Machine") {
      this.showlearningCenterServices = true;
      this.showinternetCafeServices = false;
      this.showLibaryServices = false;
      this.showheiServices = false;
      this.showheiServices = false;
      this.showMallServices = false;
      this.showOther = false;

    } else if (this.category == "flexographic") {
      this.showMallServices = true;
      this.showlearningCenterServices = false;
      this.showinternetCafeServices = false;
      this.showLibaryServices = false;
      this.showheiServices = false;
      this.showheiServices = false;
      this.showOther = false;

    } else if (this.category == "Traning") {
      this.showCoffeeShopServices = true;
      this.showlearningCenterServices = false;
      this.showinternetCafeServices = false;
      this.showLibaryServices = false;
      this.showheiServices = false;
      this.showheiServices = false;
      this.showMallServices = false;
      this.showOther = false;
    }
    // } else if (this.category == "Other") {
    //   this.showCoffeeShopServices = false;
    //   this.showlearningCenterServices = false;
    //   this.showinternetCafeServices = false;
    //   this.showLibaryServices = false;
    //   this.showheiServices = false;
    //   this.showheiServices = false;
    //   this.showMallServices = false;
    //   this.showOther = true;
    // }


  }




}
