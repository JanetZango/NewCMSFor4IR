import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HubsProvider } from '../../providers/hubs/hubs'
import { HomePage } from '../home/home';
import swal from "sweetalert";
import Swal from "sweetalert2";

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
  // first slider varables
  orgName;
  orgAdress;
  // progAddress;
  orgPhone;

  orgWebsite;
  orgDescription;
  category;
  jobAddress;
  ShowWifi: boolean = false;
  ShowChooseRange: boolean = false;
  // Second  slider varables
  wifi;
  offerWifi;
  chooseWifiRange;

  // hide services
  showheiServices: boolean = false;
  showLibaryServices: boolean = false;
  showinternetCafeServices: boolean = false;
  showlearningCenterServices: boolean = false;
  showMallServices: boolean = false;
  showCoffeeShopServices: boolean = false;
  showWebsiteHintInfo: boolean = false
  websiteValidation;
  applicationLink;
  promPhone;
  twitter;
  facebook;
  programService;
  serviceArrayTemp = []
  showPhoneHint: boolean = false;

  heiServices = [{ title: "Testing & Analytical", description: " Services include material testing and behaviour analysis, as well as quality tests. These can be R&D or routine jobs according to existing standards or client's specifications, using readily available high-end software and equipment." },


  { title: "Rapid Prototyping and Manufacturing", description: 'model with regard to the indicated functional aspects of a product. The manufacturing is not limited to batch/pilot manufacturing of models, but can include either contract machining or manufacturing, based on the clients drawings or specifications' },
  { title: "Consultation, Technology Audit and Feasibility Study", description: 'Consultation includes search and technology brokerage services, finding the know-how as a diagnostic service, assessment or consultancy. This is usually the first part of any project to identify the potential for improvement and the required interventions. This involves the searching and sourcing of technology from outside the Universities of Technology, generally from firms, engineering consultants; brokering as well as possibly managing technology transfers to SME' },
  { title: "Process or Product Improvement", description: 'Productivity, workflow and quality all improve production facilities and products by applying standard procedures and methods. In many cases, this would also involve testing and analytical services to make the product conform to required specifications on new market demands and regulations' },
  { title: "Applied Development, Engineering and Design", description: 'This involves the application of engineering processes from CAD to CAM now CA ,including scaled production based on the know-how from Technology Stations, needing professional engineering and design skills as well as identification and sourcing of technology or equipment. These services lead to demand driven projects that can be funded by various funding Agencies' },

  ]
  libraryService = [{ title: "Research", description: " involves the step-by-step process used to gather information in order to write a paper, create a presentation, or complete a project. ... They describe, analyze, and/or evaluate information found in primary sources" },
  { title: "Training", description: '"The latest information and communication technology (ICT) developments, including data curation, digital preservation, data management planning, institutional repositories, social media, online learning, publishing, e-books and mobile technology offer wonderful new opportunities in the delivery of information services and the way libraries are managed. Librarianship forms the basis of specialization and diverse career opportunities including document management, knowledge management, childrens librarianship, research librarianship and electronic resources management"' }


  ]

  learningCenterService = [{ title: "Skill Development", description: " is the process of (1) identifying your skill gaps, and (2) developing and honing these skills. It is important because your skills determine your ability to execute your plans with success. ... In goal achievement, your skills are your tools." }
    , { title: "Training", description: "Training is a program that helps people learn specific knowledge or skills to improve performance in their current roles. Development is more expansive and focuses on people growth and future performance, rather than an immediate job role" },
  { title: "EnterpreneurShip Programme", description: "The Entrepreneurship Development Programme is aimed at creating a conducive environment for young entrepreneurs to access relevant entrepreneurship skills, knowledge, values and attitudes for their businesses." }
  ]

  mallServices = [{ title: "Internet ", description: "Wanting to share your Mall of Africa experience with your friends and family on social media? Needing to send a business email in the midst of shopping? Not a problem! You can surf the internet for free wherever you are at Mall of Africa." },
  { title: "Training ", description: "Training is a program that helps people learn specific knowledge or skills to improve performance in their current roles. Development is more expansive and focuses on people growth and future performance, rather than an immediate job role" }

  ]

  internetCafeServices = [{ title: "Internet", description: "s a place that offers customers hi-speed internet access, other computer services and variety of PC games. It deals with internet time that a customer buys and it can be sold per hour or minute and sometimes longer" },
  { title: " Printing", description: 'Managed print services (MPS) is the provision and oversight of business document output needs by an external service provider. ... The next step is typically a partial or complete replacement of existing hardware, including printers, faxes, scanners, photocopiers and multifunction (MFP) devices.' }
    , { title: "fax", description: "an exact copy of a document made by electronic scanning and transmitted as data by telecommunications links." }

  ]


  allServices = [{ title: "Testing & Analystical", description: " Services include material testing and behaviour analysis, as well as quality tests. These can be R&D or routine jobs according to existing standards or client's specifications, using readily available high-end software and equipment." },
  { title: "Rapid Prototyping and Manufacturing", description: 'model with regard to the indicated functional aspects of a product. The manufacturing is not limited to batch/pilot manufacturing of models, but can include either contract machining or manufacturing, based on the clients drawings or specifications' },
  { title: "Consultation, Technology Audit and Feasibility Study", description: 'Consultation includes search and technology brokerage services, finding the know-how as a diagnostic service, assessment or consultancy. This is usually the first part of any project to identify the potential for improvement and the required interventions. This involves the searching and sourcing of technology from outside the Universities of Technology, generally from firms, engineering consultants; brokering as well as possibly managing technology transfers to SME' },

  { title: "Skill Development", description: " is the process of (1) identifying your skill gaps, and (2) developing and honing these skills. It is important because your skills determine your ability to execute your plans with success. ... In goal achievement, your skills are your tools." },
  { title: "Enterpreneurship Programme", description: "The Entrepreneurship Development Programme is aimed at creating a conducive environment for young entrepreneurs to access relevant entrepreneurship skills, knowledge, values and attitudes for their businesses." },
  { title: "Training ", description: "Training is a program that helps people learn specific knowledge or skills to improve performance in their current roles. Development is more expansive and focuses on people growth and future performance, rather than an immediate job role" },
  { title: "Applied Development, Engineering and Design", description: 'This involves the application of engineering processes from CAD to CAM now CA ,including scaled production based on the know-how from Technology Stations, needing professional engineering and design skills as well as identification and sourcing of technology or equipment. These services lead to demand driven projects that can be funded by various funding Agencies' },
  { tittle: "Internet", description: "provider is a company that provides access to the Internet. Most ISPs require you to subscribe in order to use their services, but there are ways to connect to the Internet for free" },

  { title: "Printing", description: 'Managed print services (MPS) is the provision and oversight of business document output needs by an external service provider. ... The next step is typically a partial or complete replacement of existing hardware, including printers, faxes, scanners, photocopiers and multifunction (MFP) devices.' }
  ]





  coffeeshopServices = [{ title: "Internet", description: "Offering internet to customers" }]
  // email varaiable 
  email = this.navParams.get("email");
  //EnterpreneurShip Programme
  // cat services 
  HeiServices;
  LibaryServices;
  internetCafeService;
  learningCenterServices;
  mallService;
  checkAddress;
  checkAddressjob
  checkAddressserv;
  // General varable
  orgAddressObject;
  catService = []

  Heitrack;

  progressBar = 25

  contactValidation;
  contactValidationjob;
  contactValidationserv;
  program;
  showRegistionOrgs: boolean = false;
  showRegistionProgs: boolean = false;

  // program variables 
  promName;
  openApplicationDate;
  closeApplicationDate;
  programStartDate;
  programCloseDate;
  programType;
  other;

  Programcategory;
  ProgramIntroduction;
  objectives;
  targetAudience;
  programDescription;

  programServicez;
  programBenefits;
  programAdditionalBenefits;
  EligibleCriteria;
  promAddress;
  Programemail;

  showApplicationLink: boolean = false;


  showProgramBenefits: boolean = false;
  showJobs: boolean = false;
  showWifiAccess: boolean = false;
  showAdditionalBenefits: boolean = false;
  showEligibleCriteria: boolean = false;
  showProgramIntroduction: boolean = false;
  showObjective: boolean = false;


  hideRegisterAs: boolean = true;
  trackopenAplication;
  trackcloseApplication;
  trackopenProgram;
  trackcloseProgram;

  programContactValidation;

  showOther: boolean = false;
  showProgramcategory: boolean = true;

  pushid = this.navParams.get('pushid')
  type: string = this.navParams.get('type');
  alertMessage;
  sphone

  constructor(public navCtrl: NavController, public navParams: NavParams, public hubs: HubsProvider, public ngzone: NgZone, public alertCtrl: AlertController) {
    console.log(this.email)
    console.log(this.type)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddOrganizationPage');
    this.is_urlValidation("www.youtube.com");
  }
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
  err
  ionViewDidEnter() {
    var x = document.getElementById(this.type).style.display = 'flex';
    console.log(x);
    // var x = document.getElementById("Programmes").style.display = 'flex';
    // console.log(x);
    // var x = document.getElementById("Services").style.display = 'flex';
    // console.log(x);
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
    this.hubs.addOrganisation(this.email, this.orgAddressObject.lat, this.orgAddressObject.lng, this.orgAddressObject.city, this.orgPhone, this.category, this.orgName, this.orgDescription, this.progAddress, this.offerWifi, this.wifi, this.chooseWifiRange, this.orgWebsite).then(() => {
      console.log("added ");
      this.navCtrl.push(HomePage);
    })
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

  jobName;
  jobType;
  odate;
  cdate;
  req;
  res;
  add;
  link;
  cell;
  mail;


  addJob() {
    this.hubs.addJob(this.jobName, this.odate, this.cdate, this.jobAddress, this.res, '', this.odate, this.cdate, this.jobType, this.downloadurl3, this.orgAddressObject.lat, this.orgAddressObject.lng).then(() => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000
      });

      Toast.fire({
        type: "success",
        title: "Your Advert was succesfullt added"
      });
      this.navCtrl.pop();
    })
  }

  sname;
  sabout;
  sadd;
  semail;
  // sphone;

  adds() {
    this.hubs.addService('', '', '', this.sadd, this.sname, this.sphone, this.sabout, this.downloadurl6, this.orgAddressObject.lat, this.orgAddressObject.lng).then(() => {
      // alert('service added');
      this.navCtrl.pop()
    })
  }
  downloadurl5 = "../../assets/imgs/Cover Image.jpg";
  insert6(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.downloadurl5 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }

  }


  downloadurl6 = "../../assets/imgs/Cover Image.jpg";
  insert7(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.downloadurl6 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }

  }



  downloadurl3 = "../../assets/imgs/Cover Image.jpg";
  insert(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.downloadurl3 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }

  }

  downloadurl4 = "../../assets/imgs/Cover Image.jpg";
  insert2(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.downloadurl4 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }

  }

  showServices() {

    console.log(this.category);
    if (this.category == "3D Printer") {
      this.showheiServices = true;
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

  }

  RegistrationType() {
    alert(this.program)
    var thePlaceholder = document.getElementById("placeholderDiv");
    if (this.program == "Organisation") {
      this.showRegistionOrgs = true;
      this.hideRegisterAs = false
      thePlaceholder.style.display = "none"
    } else if (this.program == "Programme") {
      this.showRegistionProgs = true;
      this.hideRegisterAs = false
      thePlaceholder.style.display = "none"
    }
    else if (this.program == "Jobs") {
      this.showJobs = true;
      this.hideRegisterAs = false
      thePlaceholder.style.display = "none"
    }
    else if (this.program == "WiFi Access") {

      this.showWifiAccess = true;
    }
  }


  downloadurl = "../../assets/imgs/Cover Image.jpg";
  insertpic(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.downloadurl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }

  }

  downloadurl2 = "../../assets/imgs/Logo Image.jpg";
  insertpic2(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.downloadurl2 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }

  }


  //getaddress
  setAddress(event) {
    if (this.progAddress != undefined) {
      this.getcoo(this.progAddress).then((data: any) => {
        this.orgAddressObject = data;
        this.checkAddress = 0
      }, Error => {
        this.checkAddress = 1;
        this.alertMessage = "The address you have entered is invalid, please enter a valid address";
        swal(this.alertMessage);
      })
    }
  }

  //jobs
  setAddressJobs(event) {
    if (this.jobAddress != undefined) {
      this.getcoo(this.jobAddress).then((data: any) => {
        this.orgAddressObject = data;
        this.checkAddressjob = 0
      }, Error => {
        this.checkAddressjob = 1;
        this.alertMessage = "The address you have entered is invalid, please enter a valid address";
        swal(this.alertMessage);
      })
    }
  }

  //jobs
  setAddressservices(event) {
    if (this.sadd != undefined) {
      this.getcoo(this.sadd).then((data: any) => {
        this.orgAddressObject = data;
        this.checkAddressserv = 0
      }, Error => {
        this.checkAddressserv = 1;
        this.alertMessage = "The address you have entered is invalid, please enter a valid address";
        swal(this.alertMessage);
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


  ///validations for programmesdB
  phonenumberValidatin() {
    if (this.progPhone == undefined) {
    } else {
      var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
      if (this.progPhone.match(phoneno)) {
        console.log(this.progPhone.match(phoneno));
        this.contactValidation = 0;
      }
      else {
        this.contactValidation = 1;
        console.log(this.progPhone.match(phoneno));
        console.log("wrong");

      }

    }

  }

  ///validation for jobs
  phonenumberValidatinjob() {
    if (this.cell == undefined) {
    } else {
      var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

      if (this.cell.match(phoneno)) {
        console.log(this.cell.match(phoneno));
        this.contactValidationjob = 0;
      }
      else {
        this.contactValidationjob = 1;
        console.log(this.cell.match(phoneno));
        console.log("wrong");
      }

    }



    //VALIDATIONS FOR services

  }


  phonenumberValidatinservice() {
    if (this.sphone == undefined) {
    } else {
      var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
      if (this.sphone.match(phoneno)) {
        console.log(this.sphone.match(phoneno));
        this.checkAddressserv = 0;
      }
      else {
        this.checkAddressserv = 1;
        console.log(this.sphone.match(phoneno));
        console.log("wrong");

      }

    }



    //VALIDATIONS FOR services

  }


  addProg() {
    let b = window.innerHeight;
    this.hubs.addPrograme(this.progApplicationOpen, this.progApplicationClose, this.progName, this.progOptions, this.progbackground, this.progBenfits, this.progDescription, this.progStartDate, this.progEndDate, this.progAddress, this.progPhone, this.downloadurl, this.orgAddressObject.lat, this.orgAddressObject.lng).then(() => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000
      });

      Toast.fire({
        type: "success",
        title: "Your programme was succesfully added"
      });
      this.navCtrl.push(HomePage);
    })
  }

  click() {
    alert("clicked")
  }
  progName;
  progOptions;
  progbackground;
  progDescription;
  toPage2Progs() {
    let b = window.innerHeight;
    if (this.progName == undefined && this.progbackground == undefined && this.progDescription == undefined && this.progOptions == undefined) {
      this.alertMessage =
        "Please insert the programme's details";
      swal(this.alertMessage);
    }
    else if (this.progName == null || this.progName == "") {
      this.alertMessage = "Please enter the name of the programme ";
      swal(this.alertMessage);
    }
    else if (this.progbackground == null || this.progbackground == "") {
      this.alertMessage = " Please insert the programme's background";
      swal(this.alertMessage);
    }
    else if (this.progDescription == null || this.progDescription == "") {
      this.alertMessage = "Please insert the organisation's description";
      swal(this.alertMessage);
    }
    else if (this.progOptions == null || this.progOptions == "") {
      this.alertMessage = "Please enter the correct email address ";
      swal(this.alertMessage);
    }
    else {
      var pager = document.getElementsByClassName("pageProgrammes") as HTMLCollectionOf<HTMLElement>;
      pager[0].style.marginLeft = "-25%";
      var thebar = document.getElementById("barSlide");
      thebar.style.width = "50%"
    }
  }
  progBenfits;
  progAddress;
  progPhone;
  progEmail;
  toPage3Progs() {
    this.phonenumberValidatin();
    let b = window.innerHeight;
    if (this.progBenfits == undefined && this.progBenfits == undefined && this.progPhone == undefined && this.progEmail == undefined) {
      this.alertMessage =
        "Please insert the organisation's details";
      swal(this.alertMessage);
    }
    else if (this.progBenfits == null || this.progBenfits == "") {
      this.alertMessage = "Please enter th name of the programme ";
      swal(this.alertMessage);
    }
    else if (this.progBenfits == null || this.progAddress == "") {
      this.alertMessage = "Please insert the programme's address";
      swal(this.alertMessage);
    }
    else if (this.progPhone == null || this.progPhone == "") {
      this.alertMessage = "Please insert the programme's phone numbers";
      swal(this.alertMessage);
    }
    else if (this.progEmail == null || this.progEmail == "" || this.progEmail == undefined) {
      this.alertMessage = "Please enter th email address of the programme ";
      swal(this.alertMessage);
    }
    else if (this.contactValidation == 1) {
      this.alertMessage = "The phone numbers you have entered is invalid, please enter a valid phone numbers  ";
      swal(this.alertMessage);
    }
    else if (this.checkAddress == 1) {
      this.alertMessage = "The address you have entered is invalid, please enter a valid address ";
      swal(this.alertMessage);
    }
    else {
      var pager = document.getElementsByClassName("pageProgrammes") as HTMLCollectionOf<HTMLElement>;
      pager[0].style.marginLeft = "-50%"
      var thebar = document.getElementById("barSlide");
      thebar.style.width = "75%"
    }
  }



  progApplicationOpen;
  progApplicationClose;
  progStartDate;
  progEndDate;
  progLink;
  toPage4Progs() {
    let b = window.innerHeight;
    this.is_urlValidation(this.progLink);
    if (this.progApplicationOpen == undefined && this.progApplicationClose == undefined && this.progStartDate == undefined && this.progEndDate == undefined && this.progLink == undefined) {
      this.alertMessage =
        "Please insert the programmes's details";
      swal(this.alertMessage);
    }
    else if (this.progApplicationOpen == null || this.progApplicationOpen == "") {
      this.alertMessage = "Please select the opening date of the programme";
      swal(this.alertMessage);
    }
    else if (this.progApplicationClose == null || this.progApplicationClose == "") {
      this.alertMessage = "Please select the closing date of the programme ";
      swal(this.alertMessage);
    }
    else if (this.progStartDate == null || this.progStartDate == "") {
      this.alertMessage = "Please select the start date of the programme";
      swal(this.alertMessage);
    }
    else if (this.progEndDate == null || this.progEndDate == "") {
      this.alertMessage = "Please select the end date of the programme";
      swal(this.alertMessage);
    }
    else if (this.progLink == null || this.progLink == "") {
      this.alertMessage = "The website address you have entered is invalid, please enter a valid programme link";
      swal(this.alertMessage);
    }
    else if (this.websiteValidation == 1) {
      this.alertMessage = "The website address you have entered is invalid, please enter a valid website address ";
      swal(this.alertMessage);
    }

    else {
      var pager = document.getElementsByClassName("pageProgrammes") as HTMLCollectionOf<HTMLElement>;
      pager[0].style.marginLeft = "-75%"
      var thebar = document.getElementById("barSlide");
      thebar.style.width = "100%"
    }
  }
  backToPage3Progs() {
    var pager = document.getElementsByClassName("pageProgrammes") as HTMLCollectionOf<HTMLElement>;
    pager[0].style.marginLeft = "-50%";
    var thebar = document.getElementById("barSlide");
    thebar.style.width = "75%"
  }
  backToPage2Progs() {
    var pager = document.getElementsByClassName("pageProgrammes") as HTMLCollectionOf<HTMLElement>;
    pager[0].style.marginLeft = "-25%";
    var thebar = document.getElementById("barSlide");
    thebar.style.width = "50%"
  }
  backToPage1Progs() {
    var pager = document.getElementsByClassName("pageProgrammes") as HTMLCollectionOf<HTMLElement>;
    pager[0].style.marginLeft = "0";
    var thebar = document.getElementById("barSlide");
    thebar.style.width = "25%"
  }









  toPage2Services() {
    let b = window.innerHeight;
    if (this.sname == undefined && this.sabout == undefined) {
      this.alertMessage =
        "Please insert the service's details";
      swal(this.alertMessage);
    }
    else if (this.sname == null || this.sname == "") {
      this.alertMessage = "Please type the service name";
      swal(this.alertMessage);
    }
    else if (this.sabout == null || this.sabout == "") {
      this.alertMessage = "Tell us about your service";
      swal(this.alertMessage);
    }
    else {
      var pager = document.getElementsByClassName("pageServices") as HTMLCollectionOf<HTMLElement>;
      var thebar = document.getElementById("barSlide");
      thebar.style.width = "50%"
      pager[0].style.marginLeft = "-25%";
    }

  }
  toPage3Services() {
    let b = window.innerHeight;
    this.phonenumberValidatinservice();
    if (this.semail == undefined && this.sphone == undefined) {
      this.alertMessage =
        "Please insert the service's details";
      swal(this.alertMessage);
    }
    else if (this.sadd == null || this.sadd == "") {
      this.alertMessage = "Please type the address of the serviceS";
      swal(this.alertMessage);
    }
    else if (this.semail == null || this.semail == "") {
      this.alertMessage = "Tell us about your service";
      swal(this.alertMessage);
    }
    else if (this.sphone == null || this.sphone == "") {
      this.alertMessage = "please enter contact deatils";
      swal(this.alertMessage);
    }
    else if (this.contactValidation == 1) {
      this.alertMessage = "The phone numbers you have entered is invalid, please enter a valid phone numbers  ";
      swal(this.alertMessage);
    }
    else if (this.checkAddressserv == 1) {
      this.alertMessage = "The address you have entered is invalid, please enter a valid address ";
      swal(this.alertMessage);
    }
    else {
      var pager = document.getElementsByClassName("pageServices") as HTMLCollectionOf<HTMLElement>;
      pager[0].style.marginLeft = "-50%"
      var thebar = document.getElementById("barSlide");
      thebar.style.width = "75%"
    }

  }
  toPage4Services() {
    var pager = document.getElementsByClassName("pageServices") as HTMLCollectionOf<HTMLElement>;
    pager[0].style.marginLeft = "-75%"
    var thebar = document.getElementById("barSlide");
    thebar.style.width = "100%"
  }
  backToPage3Services() {
    var pager = document.getElementsByClassName("pageServices") as HTMLCollectionOf<HTMLElement>;
    pager[0].style.marginLeft = "-50%";
    var thebar = document.getElementById("barSlide");
    thebar.style.width = "75%"
  }
  backToPage2Services() {
    var pager = document.getElementsByClassName("pageServices") as HTMLCollectionOf<HTMLElement>;
    pager[0].style.marginLeft = "-25%";
    var thebar = document.getElementById("barSlide");
    thebar.style.width = "50%"
  }
  backToPage1Services() {
    var pager = document.getElementsByClassName("pageServices") as HTMLCollectionOf<HTMLElement>;
    pager[0].style.marginLeft = "0";
    var thebar = document.getElementById("barSlide");
    thebar.style.width = "25%"
  }

  WiFiAvailability;
  freeOrPaidWiFi;
  priceWiFi;
  toPage2WiFi() {
    let b = window.innerHeight;
    if (this.WiFiAvailability == undefined) {
      this.alertMessage =
        "Please select the type of wifi";
      swal(this.alertMessage);
    }
    else if (this.WiFiAvailability == "Yes") {
      var pager = document.getElementsByClassName("pageWifi") as HTMLCollectionOf<HTMLElement>;
      pager[0].style.marginLeft = "-25%"
      var thebar = document.getElementById("barSlide");
      thebar.style.width = "50%"

    }
    else if (this.WiFiAvailability == "No") {
      var pager = document.getElementsByClassName("pageWifi") as HTMLCollectionOf<HTMLElement>;
      pager[0].style.marginLeft = "-75%"
      var thebar = document.getElementById("barSlide");
      thebar.style.width = "100%";
      this.freeOrPaidWiFi = "Unavailable";
      this.priceWiFi = "Unavailable"
    }
  }
  toPage3WiFi() {
    let b = window.innerHeight;
    if (this.freeOrPaidWiFi == undefined) {
      this.alertMessage =
        "Please select what type is it";
      swal(this.alertMessage);
    }
    else if (this.freeOrPaidWiFi == "Free") {
      var pager = document.getElementsByClassName("pageWifi") as HTMLCollectionOf<HTMLElement>;
      pager[0].style.marginLeft = "-75%"
      var thebar = document.getElementById("barSlide");
      thebar.style.width = "100%";
    }
    else if (this.freeOrPaidWiFi == "Paid") {
      var pager = document.getElementsByClassName("pageWifi") as HTMLCollectionOf<HTMLElement>;
      pager[0].style.marginLeft = "-50%"
      var thebar = document.getElementById("barSlide");
      thebar.style.width = "75%"
    }
    else if (this.freeOrPaidWiFi == "" || this.freeOrPaidWiFi == null || this.freeOrPaidWiFi == undefined) {

      const alert = this.alertCtrl.create({
        title: 'Choose One Option',
        subTitle: "Please choose one of the options provided.",
        buttons: ['OK']
      });
      alert.present();
    }
  }
  toPage4WiFi() {
    if (this.priceWiFi == "" || this.priceWiFi == null || this.priceWiFi == undefined) {
      this.alertMessage =
        "Please select the price ";
      swal(this.alertMessage);
    }
    else {
      var pager = document.getElementsByClassName("pageWifi") as HTMLCollectionOf<HTMLElement>;
      pager[0].style.marginLeft = "-75%"
      var thebar = document.getElementById("barSlide");
      thebar.style.width = "100%";
    }
  }
  backToPage1WiFi() {
    var pager = document.getElementsByClassName("pageWifi") as HTMLCollectionOf<HTMLElement>;
    pager[0].style.marginLeft = "0"
    var thebar = document.getElementById("barSlide");
    thebar.style.width = "25%"
  }
  backToPage2WiFi() {
    var pager = document.getElementsByClassName("pageWifi") as HTMLCollectionOf<HTMLElement>;
    pager[0].style.marginLeft = "-25%"
    var thebar = document.getElementById("barSlide");
    thebar.style.width = "50%"
  }
  backToPage3WiFi() {
    // alert(this.freeOrPaidWiFi)
    if (this.WiFiAvailability == "No") {
      this.backToPage1WiFi()
    }
    if (this.freeOrPaidWiFi == "Paid") {
      var pager = document.getElementsByClassName("pageWifi") as HTMLCollectionOf<HTMLElement>;
      pager[0].style.marginLeft = "-50%"
      var thebar = document.getElementById("barSlide");
      thebar.style.width = "75%"
    }
    else {
      if (this.freeOrPaidWiFi == "Free") {
        this.backToPage2WiFi();
      }
      else if (this.freeOrPaidWiFi == "" || this.freeOrPaidWiFi == null || this.freeOrPaidWiFi == undefined) {
        this.backToPage1WiFi()
      }
    }
  }
  showChargeWiFi: boolean = false;
  showPricing: boolean = false;
  showtext: string;
  togglePrice() {
    if (this.WiFiAvailability == "Yes") {
      this.showChargeWiFi = true
      this.showtext = "Please click next "
    }
    else if (this.WiFiAvailability == "No") {
      this.showChargeWiFi = false
      this.freeOrPaidWiFi = ""
      this.showtext = "Please click next "
    }
  }
  togglePayment() {
    if (this.freeOrPaidWiFi == "Paid") {
      this.showPricing = true
      this.showtext = "Please click next "
    }
    else if (this.freeOrPaidWiFi == "Free") {
      this.priceWiFi = "Unlimited"
      this.showPricing = false
      this.showtext = "Please click next "
    }
  }
  toggleRange() {
  }

  goBack() {
    this.navCtrl.pop()
  }

  toPage2Jobs() {
    let b = window.innerHeight;
    this.is_urlValidation(this.progLink);
    if (this.jobName == undefined && this.odate == undefined && this.cdate == undefined && this.jobType == undefined) {
      this.alertMessage =
        "Please insert the jobs's details";
      swal(this.alertMessage);
    }
    else if (this.jobName == null || this.jobName == "") {
      this.alertMessage = "Please enter the job name";
      swal(this.alertMessage);
    }
    else if (this.odate == null || this.odate == "") {
      this.alertMessage = "Please select the opening date of the job ";
      swal(this.alertMessage);
    }
    else if (this.cdate == null || this.cdate == "") {
      this.alertMessage = "Please select the close date of the job";
      swal(this.alertMessage);
    }
    else if (this.jobType == null || this.jobType == "") {
      this.alertMessage = "Please select the type of job it is";
      swal(this.alertMessage);
    }

    else {
      var pager = document.getElementsByClassName("pageJobs") as HTMLCollectionOf<HTMLElement>;
      pager[0].style.marginLeft = "-25%"
      var thebar = document.getElementById("barSlide");
      thebar.style.width = "50%"
    }

  }
  toPage3Jobs() {
    let b = window.innerHeight;
    this.phonenumberValidatinjob()
    if (this.cell == undefined && this.req == undefined && this.res == undefined && this.mail == undefined) {
      this.alertMessage =
        "Please insert the jobs's details";
      swal(this.alertMessage);
    }
    else if (this.cell == null || this.cell == "") {
      this.alertMessage = "Please enter the correct phone number";
      swal(this.alertMessage);
    }

    else if (this.req == null || this.req == "") {
      this.alertMessage = "Please enter the job requirements ";
      swal(this.alertMessage);
    }
    else if (this.res == null || this.res == "") {
      this.alertMessage = "Please select the job responsibility";
      swal(this.alertMessage);
    }
    else if (this.mail == null || this.mail == "") {
      this.alertMessage = "Please select the email addres  of the job";
      swal(this.alertMessage);
    }
    else if (this.jobAddress == null || this.jobAddress == "") {
      this.alertMessage = "Please the correct address";
      swal(this.alertMessage);
    }
    else if (this.contactValidationjob == 1) {
      this.alertMessage = "The phone numbers you have entered is invalid, please enter a valid phone numbers  ";
      swal(this.alertMessage);
    }
    else if (this.checkAddressjob == 1) {
      this.alertMessage = "The address you have entered is invalid, please enter a valid address ";
      swal(this.alertMessage);
    }
    else {
      var pager = document.getElementsByClassName("pageJobs") as HTMLCollectionOf<HTMLElement>;
      pager[0].style.marginLeft = "-50%"
      var thebar = document.getElementById("barSlide");
      thebar.style.width = "75%"
    }

  }
  toPage4Jobs() {
    this.is_urlValidation(this.link);
    if (this.websiteValidation == 1) {
      this.alertMessage = "The website address you have entered is invalid, please enter a valid website link ";
      swal(this.alertMessage);
    }
    else if (this.downloadurl2 == null || this.downloadurl2 == "") {
      this.alertMessage = "Please upload coverpage";
      swal(this.alertMessage);
    }
    else if (this.downloadurl == null || this.downloadurl == "") {
      this.alertMessage = "Please upload Logo";
      swal(this.alertMessage);
    }
    else if (this.link == null || this.link == "") {
      this.alertMessage = "Please enter the link";
      swal(this.alertMessage);
    }
    else {
      var pager = document.getElementsByClassName("pageJobs") as HTMLCollectionOf<HTMLElement>;
      pager[0].style.marginLeft = "-75%"
      var thebar = document.getElementById("barSlide");
      thebar.style.width = "100%"
    }


  }
  backToPage1Jobs() {
    var pager = document.getElementsByClassName("pageJobs") as HTMLCollectionOf<HTMLElement>;
    pager[0].style.marginLeft = "0";
    var thebar = document.getElementById("barSlide");
    thebar.style.width = "25%"
  }
  backToPage2Jobs() {
    var pager = document.getElementsByClassName("pageJobs") as HTMLCollectionOf<HTMLElement>;
    pager[0].style.marginLeft = "-25%"
    var thebar = document.getElementById("barSlide");
    thebar.style.width = "50%"
  }
  backToPage3Jobs() {
    var pager = document.getElementsByClassName("pageJobs") as HTMLCollectionOf<HTMLElement>;
    pager[0].style.marginLeft = "-50%"
    var thebar = document.getElementById("barSlide");
    thebar.style.width = "75%"
  }
}