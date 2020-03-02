import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { HubsProvider } from '../../providers/hubs/hubs'
import swal from "sweetalert";
import Swal from "sweetalert2";
import { log } from 'util';
import { AddOrganizationPage } from '../add-organization/add-organization';
import { animation } from '@angular/core/src/animation/dsl';

//global declaration
declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  @ViewChild('map') mapRef: ElementRef;
  //arrays
  getOrgArry = new Array();
  items = new Array()
  orgNames = new Array();
  displayAllhubs = new Array();
  updateOrganization = new Array();
  getUserProfile = new Array();
  displayOrg = new Array();
  displayuser = new Array();
  displayAllORG = new Array();
  //variables
  alertMessage;
  userPostiondesc;
  lat = -26.2620;
  name;
  address;
  background;
  category;
  contact;
  downloadurl;
  downloadurlLogo;
  email;
  freeWifi;
  region;
  website;
  long = 27.9503;
  wifi;
  wifiRange;
  userLocation: String;
  map;
  userContract;
  icons = [
    {
      image: 'ios-wifi',
      name: 'Wi-Fi Hotspot '
    },
    {
      image: 'ios-briefcase',
      name: 'Jobs'
    },
    {
      image: 'pie',
      name: 'Programes'
    },
    {
      image: 'ios-people',
      name: 'Services'
    },
  ]
  toggleList = "ios-arrow-back";
  icon = 'assets/imgs/wifi2.svg'
  locIcon = 'assets/imgs/loc-user.svg'
  more = "ios-arrow-down";
  dateer = "this the date";
  activeState = "disabled";
  userName;
  userPosition;
  userSurname;
  d = 1;
  mm = 0;
  mySide = 0
  key;
  downloadurlPic;
  userImage;
  progname;
  userImage1
  constructor(public navCtrl: NavController, public hubs: HubsProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.getallorg();
    this.getallhubs();
    this.displayProfile();
    this.getallAvailableOrg();

    this.hubs.getCurrentLocation(this.lat, this.long).then((radius: any) => {
    })

    // this.showProgrammesPage()
  }
  storeOrgNames(names) {
    this.orgNames = names;
    console.log(this.orgNames);
  }

  displayProfile() {
    this.hubs.geOrgtUser().then((data: any) => {
  
      this.userName = data.userName
      this.userImage1 = data.userImage
      this.userPosition = data.userPosition
      this.userPostiondesc = data.userPostiondesc
      this.userContract = data.userContract
      console.log(this.userName)
      console.log(data)

    })
  }


  getallorg() {
    this.hubs.getACurentloggedInOrganizations().then((data: any) => {
      this.getOrgArry = data
      console.log(this.getOrgArry)
      var names = this.hubs.getOrgNames()
      this.storeOrgNames(names)
      this.name = this.getOrgArry[0].name
      this.address = this.getOrgArry[0].address
      this.lat = this.getOrgArry[0].lat;
      this.background = this.getOrgArry[0].background
      this.category = this.getOrgArry[0].category;
      this.downloadurl = this.getOrgArry[0].downloadurl;
      this.downloadurlLogo = this.getOrgArry[0].downloadurlLogo;
      this.wifi = this.getOrgArry[0].wifi;
      this.long = this.getOrgArry[0].long;
      this.email = this.getOrgArry[0].email;
      this.contact = this.getOrgArry[0].contact
      this.key = this.getOrgArry[0].id
    })
  }

  ionViewDidLoad() {
    this.getallhubs();
    
   
  }

  getallAvailableOrg() {
    this.hubs.getAllOrganizations().then((data: any) => {
      this.displayAllORG = data
      console.log(this.displayAllORG)
    })
  }

  getallhubs() {
    this.hubs.getallhubs().then((data: any) => {
      console.log(data)
      this.displayAllhubs.length = 0;
      this.displayAllhubs = data
      console.log(this.displayAllhubs)
    })
  }


  ngOnInit() {
    this.initMap();
    this.getallhubs();
    this.getallorg();

    this.hubs.displayOnMAP().then((data: any) => {
      this.displayOrg = data
      console.log(this.displayOrg)
    })
  }

  //updateLogo
  insertpic(event: any) {
    this.d = 1;
    let opts = document.getElementsByClassName('options') as HTMLCollectionOf<HTMLElement>;
    if (this.d == 1) {
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.downloadurlLogo = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
      }

    }
  }


  insertpic2(event: any) {
    this.d = 1;
    let opts = document.getElementsByClassName('options') as HTMLCollectionOf<HTMLElement>;
    if (this.d == 1) {
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.img2 = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
      }

    }
  }

  insertpic3(event: any) {
    this.d = 1;
    let opts = document.getElementsByClassName('options') as HTMLCollectionOf<HTMLElement>;
    if (this.d == 1) {
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.img3 = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
      }

    }
  }

  
  insertpic4(event: any) {
    this.d = 1;
    let opts = document.getElementsByClassName('options') as HTMLCollectionOf<HTMLElement>;
    if (this.d == 1) {
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.img4 = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
      }

    }
  }

  
  
  insertpic5(event: any) {
    this.d = 1;
    let opts = document.getElementsByClassName('options') as HTMLCollectionOf<HTMLElement>;
    if (this.d == 1) {
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.img5 = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
      }

    }
  }


  insertuserprofile(event: any) {
    this.d = 1;
    let opts = document.getElementsByClassName('options') as HTMLCollectionOf<HTMLElement>;
    if (this.d == 1) {
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.userImage1 = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
      }

    }
  }

  logUserOut() {
    swal({
      text: "Click OK to sign out.",
      icon: "warning",
      // buttons: true,
      dangerMode: true
    }).then(leave => {
      if (leave) {
        this.hubs.logout().then(() => {
          window.location.reload();
        }, (error) => {
          // console.log(error.message);
        })
      }

    })

  }

  m = 0
  showMoreDetails() {
    var morebtn = document.getElementById("more");
    var detailsOrg = document.getElementById("misc");
    var moreInfo = document.getElementById("about-org");
    if (this.m == 0) {
      this.m = 1;
      moreInfo.style.display = "block"
      moreInfo.style.animation = "1s faderIn"
      setTimeout(() => {

        detailsOrg.style.maxHeight = "250px";
        setTimeout(() => {
          detailsOrg.style.overflowY = "scroll"
        }, 600);
        this.more = "ios-arrow-up"
      }, 100);
      // morebtn.style.bottom = "10px"
    }
    else {
      this.m = 0;
      // setTimeout(() => {

      // }, 100);
      // morebtn.style.bottom = "10px"
      detailsOrg.style.maxHeight = "0px";
      moreInfo.style.animation = "1s faderOut"
      setTimeout(() => {
        moreInfo.style.display = "none"
        detailsOrg.style.overflowY = "hidden"
      }, 600);
      this.more = "ios-arrow-down"
    }
  }
  showSidePane() {
    var sidePane = document.getElementsByClassName("side-pane") as HTMLCollectionOf<HTMLElement>;
    if (this.mySide == 0) {
      this.mySide = 1
      sidePane[0].style.left = "0";
      if (this.mm == 1) {
        this.mm = 0
        var orgListView = document.getElementById("org-list-view").style.right = "-300px";
        console.log("closing organisations list");
        this.toggleList = "ios-arrow-back"
      }

    }
    else {
      this.mySide = 0
      sidePane[0].style.left = "-300px";
    }


  }
  toggleOrgList() {
    var orgListView = document.getElementById("org-list-view");
    if (this.mySide == 1) {
      console.log("Not going to open when the side pane is open");

    }
    else if (this.mySide == 0) {
      if (this.mm == 0) {
        this.mm = 1;
        this.toggleList = "ios-arrow-forward"
        orgListView.style.right = "0"
      }
      else {
        this.mm = 0;
        this.toggleList = "ios-arrow-back"
        orgListView.style.right = "-300px"
      }
    }
  }
  showMapPage() {
    // this will show the map
    var theMap = document.getElementById("pg1").style.display = "block";
    var theServices = document.getElementById("pg2").style.display = "none";
    var theProgs = document.getElementById("pg3").style.display = "none";
    var theJobs = document.getElementById("pg4").style.display = "none";
    var theJobs = document.getElementById("pg5").style.display = "none";

    var btn1 = document.getElementById("btn1").style.background = "rgba(255, 255, 255, 0.1)";
    var btn1 = document.getElementById("btn2").style.background = "rgba(0, 0, 0, 0)";
    var btn1 = document.getElementById("btn3").style.background = "rgba(0, 0, 0, 0)";
    var btn1 = document.getElementById("btn4").style.background = "rgba(0, 0, 0, 0)";
    var btn1 = document.getElementById("btn5").style.background = "rgba(0, 0, 0, 0)";
    var settingsUpdate = document.getElementById("org-list-view");
    settingsUpdate.style.display = "block";

  }
  servArray = new Array();
  showServicesPage() {
    this.servArray = [];
    this.servArray.length =0;
    for (var x = 0; x < this.displayOrg.length; x++) {
      if (this.displayOrg[x].category == "service") {
        this.servArray.push(this.displayOrg[x]);
      }
    }
    // this will show the services
    var theMap = document.getElementById("pg1").style.display = "none";
    var theServices = document.getElementById("pg2").style.display = "block";
    var theProgs = document.getElementById("pg3").style.display = "none";
    var theJobs = document.getElementById("pg4").style.display = "none";
    var theJobs = document.getElementById("pg5").style.display = "none";

    var btn1 = document.getElementById("btn1").style.background = "rgba(0, 0, 0, 0)";
    var btn1 = document.getElementById("btn2").style.background = "rgba(255, 255, 255, 0.1)";
    var btn1 = document.getElementById("btn3").style.background = "rgba(0, 0, 0, 0)";
    var btn1 = document.getElementById("btn4").style.background = "rgba(0, 0, 0, 0)";
    var btn1 = document.getElementById("btn5").style.background = "rgba(0, 0, 0, 0)";
    var settingsUpdate = document.getElementById("org-list-view");
    settingsUpdate.style.display = "none";

  }



  progArray = new Array();
  showProgrammesPage() {
    this.progArray = [];
    this.progArray.length =0;
    for (var x = 0; x < this.displayOrg.length; x++) {
      if (this.displayOrg[x].category == "programmes") {
        this.progArray.push(this.displayOrg[x]);
        console.log(this.progArray)
        this.getallorg();
      }
    }
    // this will show programmes
    var theMap = document.getElementById("pg1").style.display = "none";
    var theServices = document.getElementById("pg2").style.display = "none";
    var theProgs = document.getElementById("pg3").style.display = "block";
    var theJobs = document.getElementById("pg4").style.display = "none";
    var theJobs = document.getElementById("pg5").style.display = "none";

    var btn1 = document.getElementById("btn1").style.background = "rgba(0, 0, 0, 0)";
    var btn1 = document.getElementById("btn2").style.background = "rgba(0, 0, 0, 0)";
    var btn1 = document.getElementById("btn3").style.background = "rgba(255, 255, 255, 0.1)";
    var btn1 = document.getElementById("btn4").style.background = "rgba(0, 0, 0, 0)";
    var btn1 = document.getElementById("btn5").style.background = "rgba(0, 0, 0, 0)";
    var settingsUpdate = document.getElementById("org-list-view");
    settingsUpdate.style.display = "none";

  }
  jobsArry = new Array();
  showJobsPage() {
    this.jobsArry = [];
    this.jobsArry.length =0;
    console.log(this.jobsArry);
    for (var x = 0; x < this.displayOrg.length; x++) {
      if (this.displayOrg[x].category == "jobs") {
        this.jobsArry.push(this.displayOrg[x]);
      }
    }
    var theMap = document.getElementById("pg1").style.display = "none";
    var theServices = document.getElementById("pg2").style.display = "none";
    var theProgs = document.getElementById("pg3").style.display = "none";
    var theJobs = document.getElementById("pg4").style.display = "block";
    var theJobs = document.getElementById("pg5").style.display = "none";

    var btn1 = document.getElementById("btn1").style.background = "rgba(0, 0, 0, 0)";
    var btn1 = document.getElementById("btn2").style.background = "rgba(0, 0, 0, 0)";
    var btn1 = document.getElementById("btn3").style.background = "rgba(0, 0, 0, 0)";
    var btn1 = document.getElementById("btn4").style.background = "rgba(255, 255, 255, 0.1)";
    var btn1 = document.getElementById("btn5").style.background = "rgba(0, 0, 0, 0)";
    var settingsUpdate = document.getElementById("org-list-view");
    settingsUpdate.style.display = "none";

  }
  wifrArry = new Array();
  showwifiPage() {
    this.wifrArry = [];
    this.wifrArry.length =0;
    for (var x = 0; x < this.displayOrg.length; x++) {
      if (this.displayOrg[x].category == "wifi") {
        this.wifrArry.push(this.displayOrg[x]);
      }
    }
    var theMap = document.getElementById("pg1").style.display = "none";
    var theServices = document.getElementById("pg2").style.display = "none";
    var theProgs = document.getElementById("pg3").style.display = "none";
    var theJobs = document.getElementById("pg4").style.display = "none";
    var theJobs = document.getElementById("pg5").style.display = "block";

    var btn1 = document.getElementById("btn1").style.background = "rgba(0, 0, 0, 0)";
    var btn1 = document.getElementById("btn2").style.background = "rgba(0, 0, 0, 0)";
    var btn1 = document.getElementById("btn3").style.background = "rgba(0, 0, 0, 0)";
    var btn1 = document.getElementById("btn4").style.background = "rgba(0, 0, 0, 0)";
    var btn1 = document.getElementById("btn5").style.background = "rgba(255, 255, 255, 0.1)";

    var settingsUpdate = document.getElementById("org-list-view");
    settingsUpdate.style.display = "none";

  }

  //show map
  initMap() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait...',
      duration: 15000
    });
    setTimeout(() => {
      this.hubs.getLocation(this.lat, this.long).then((data: any) => {
        this.userLocation = data;
        console.log(this.userLocation)
      })
    }, 1000);

    const options = {
      center: { lat: this.lat, lng: this.long },
      zoom: 10,
      disableDefaultUI: true,
      icon: this.icon,
      styles: this.mapStyles
    }
    var map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    var marker = new google.maps.Marker({
      map: this.map,
      zoom: 10,
      icon: this.locIcon,
      title: 'Your Location',
      position: this.map.getCenter(),
      styles: this.mapStyles
    });
    setTimeout(() => {
      this.markers();
    }, 16000)
    setTimeout(() => {
      var contentString = '<div id="content">' +
        '</div>' +
        this.userLocation
      '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      marker.addListener('click', function () {
        infowindow.open(map, marker);
        map.setZoom(13);
        map.setCenter(marker.getPosition());
      });
    }, 4000);


  }

  add(type) {
    this.navCtrl.push(AddOrganizationPage, { type: type })
  }



  getItems(ev: any) {
    console.log(`hi serach`);

    let searchlist = document.getElementsByClassName('searchitem') as HTMLCollectionOf<HTMLElement>;
    //searchlist[0].style.display = 'block';
    //this.search = 'search'
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the searchbar
    const val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      let searchlist = document.getElementsByClassName('searchitem') as HTMLCollectionOf<HTMLElement>;
      //searchlist[0].style.display = 'block';
    }
  }



  //markers for the map
  markers() {
    console.log(this.displayAllhubs);
    for (let index = 0; index < this.displayAllhubs.length; index++) {
      var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'
      let showMultipleMarker = new google.maps.Marker({
        map: this.map,
        icon: this.icon,
        title: this.displayAllhubs[index].name,
        size: { width: 5, height: 5 },
        position: { lat: parseFloat(this.displayAllhubs[index].lat), lng: parseFloat(this.displayAllhubs[index].long) },
        label: name,
        zoom: 15,
        styles: this.mapStyles

      });
      let infowindow = new google.maps.InfoWindow({
        content:
          '<div style="width: 400px; transition: 300ms;"><b>' +
          this.displayAllhubs[index].name +
          '</b><div style="display: flex; padding-top: 10px;">' +
          '<img style="height: 100px; width: 100px; object-fit: cober; border-radius: 50px;" src=' +
          this.displayAllhubs[index].img +
          ">" +
          '<div style="padding-left: 10px;padding-right: 10px">' +
          this.displayAllhubs[index].background +
          "</div><br>" +



          "</div>"
      });
      showMultipleMarker.addListener('click', () => {
        this.map.setZoom(14);
        this.map.setCenter(showMultipleMarker.getPosition());
        infowindow.open(showMultipleMarker.get(this.map), showMultipleMarker);


      });

    }
  }



  filterItems(val) {
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else if (val == "" || val == null) {
      this.items = [];
    }
  }

  goToSettings() {
    var settingsUpdate = document.getElementById("container-overlay");
    settingsUpdate.style.display = "block";
    settingsUpdate.style.display = "flex";
  }
  cancelSettings() {
    var settingsUpdate = document.getElementById("container-overlay");
    settingsUpdate.style.display = "none";
  }
  updateDetails() {
    this.cancelSettings()
  }






  //mapStyle
  mapStyles = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "labels.text",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural.landcover",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural.landcover",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural.landcover",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural.landcover",
      "elementType": "labels.text",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural.landcover",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural.landcover",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural.terrain",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "landscape.natural.terrain",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.attraction",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "poi.sports_complex",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "poi.sports_complex",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#93b039"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#d1e2d1"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#99e4fd"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }

  ]



  animation() {
    const img = document.querySelectorAll('.anim');
  }

  deleteProg(indx, key) {
    const confirm = this.alertCtrl.create({
      message: 'Do you agree to delete this program?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.displayOrg.splice(indx, 1);
            this.hubs.removeProg(key);
            this.getallhubs();
          }
        }
      ]
    });
    confirm.present();
  }

  deletesev(indx, key) {
    const confirm = this.alertCtrl.create({
      message: 'Do you agree to delete this program?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.displayOrg.splice(indx, 1);
            this.hubs.removesev(key);
            this.getallhubs();
          }
        }
      ]
    });
    confirm.present();
  }


  deletejobs(indx, key) {
    const confirm = this.alertCtrl.create({
      message: 'Do you agree to delete this program?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.displayOrg.splice(indx, 1);
            this.hubs.removejobs(key);
            this.getallhubs();
          }
        }
      ]
    });
    confirm.present();
  }


  
  deletewifi(indx, key) {
    const confirm = this.alertCtrl.create({
      message: 'Do you agree to delete this program?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.displayOrg.splice(indx, 1);
            this.hubs.removewifi(key);
            this.getallhubs();
          }
        }
      ]
    });
    confirm.present();
  }
  applOpen;
  applClose;
  start;
  end;
  progbackground;
  progname2;
  contact2;
  img2;
  progKey;


  editprogram(i) {
    this.applOpen = i.openDate;
    this.applClose = i.closeDate;
    this.start = i.progStartDate;
    this.end = i.progEndDate;
    this.progbackground = i.background
    this.progname2 = i.name;
    this.contact2 = i.address;
    this.img2 = i.img
    this.progKey = i.key
    

    console.log(this.progKey)
    



    var settingsUpdate = document.getElementById("program-overlay");
    settingsUpdate.style.display = "block";
    settingsUpdate.style.display = "flex";
  }

 
   img3;
   descServ;
   servKey;
   serviceName;




  editservice(i) {
     this.img3 = i.img
     this.descServ = i.desc
     this.servKey = i.key
     this.serviceName = i.name

     console.log(this.servKey)

    var settingsUpdate = document.getElementById("service-overlay");
    settingsUpdate.style.display = "block";
    settingsUpdate.style.display = "flex";
  }

 img5;
 namej;
 jobStartdate5;
 jobEndDate5;
 desc5;
 jobkey;
  editjob(i) {
    this.img5 = i.img
    this.namej = i.name
    this.jobEndDate5 = i.jobEndDate
    this.jobStartdate5 =i.jobStartdate
    this.desc5 = i.desc
    this.jobkey = i.key





    var settingsUpdate = document.getElementById("job-overlay");
    settingsUpdate.style.display = "block";
    settingsUpdate.style.display = "flex";
  }

  nameF;
  background4;
  img4;
  freeOrPaidWiFi;
  address4;
  wifikey;


  editwifi(i) {
    this.nameF = i.name
    this.background4 = i.background
    this.img4 = i.img
    this.freeOrPaidWiFi  = i.freeOrPaidWiFi
    this.address4 = i.address
    this.wifikey = i.key

    var settingsUpdate = document.getElementById("wifi-overlay");
    settingsUpdate.style.display = "block";
    settingsUpdate.style.display = "flex";
  }







  hideProg(i) {
    this.hubs.hideProg(i);
  }

  cancelprogramm() {

    var settingsUpdate = document.getElementById("program-overlay");
    settingsUpdate.style.display = "none";
  }


  cancelservice() {

    var settingsUpdate = document.getElementById("service-overlay");
    settingsUpdate.style.display = "none";
  }


  canceljob() {

    var settingsUpdate = document.getElementById("job-overlay");
    settingsUpdate.style.display = "none";
  }

  cancelwifi() {

    var settingsUpdate = document.getElementById("wifi-overlay");
    settingsUpdate.style.display = "none";
  }
  editprofile() {
    var settingsUpdate = document.getElementById("profile-overlay");
    settingsUpdate.style.display = "block";
    settingsUpdate.style.display = "flex";
  }
  cancelprofile() {
    var settingsUpdate = document.getElementById("profile-overlay");
    settingsUpdate.style.display = "none";
  }

  updateorgProfile() {
    this.cancelSettings();
    this.hubs.updateOrg(this.contact, this.downloadurlLogo, this.name, this.background).then((data) => {
      this.getallorg();
    })
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000
    });

    Toast.fire({
      type: "success",
      title: "successfully updated your organization profile"
    });
  }



  updateOrg() {
    this.cancelSettings();
    this.hubs.updateprog(this.progKey,this.progname2,this.contact2,this.progbackground, this.applOpen, this.applClose,this.start,this.end,this.img2).then((data)=>{
      this.getallorg();
    })
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000
    });

    Toast.fire({
      type: "success",
      title: "successfully updated your profile information"
    });
  }


  
  updateservice() {
    this.cancelSettings();
    this.hubs.updateserv(this.servKey,this.descServ,this.img3,this.serviceName).then((data)=>{
      console.log(data)
      this.getallorg();
    })
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000
    });

    Toast.fire({
      type: "success",
      title: "successfully updated your service information"
    });
  }


  updateWIFI() {
    this.cancelSettings();
    console.log(this.wifikey)
    this.hubs.updatewifi(this.wifikey,this.background4,this.img4,this.nameF).then((data)=>{
      console.log(data)
      this.getallorg();
    })
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000
    });

    Toast.fire({
      type: "success",
      title: "successfully updated your wifi information"
    });
  }

  updateJobs(){
    this.cancelSettings();
    console.log(this.wifikey)
    this.hubs.updatejobs(this.jobkey,this.desc5,this.img5,this.namej).then((data)=>{
      console.log(data)
      this.getallorg();
    })
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000
    });

    Toast.fire({
      type: "success",
      title: "successfully updated your job information"
    });
  }



  // more(i) {
  //   this.loclenght = []
  //   for (var x = 0; x < this.getOrgArry.length; x++) {
  //     if (i == this.getOrgArry[x].name) {
  //       this.navCtrl.push(ViewservicePage, { orgObject: this.getOrgArry[x], loginState: this.logInState });
  //       break;
  //     } else {
      
  //     }
  //   }
  // }

  updateUserprofile() {
    this.cancelSettings();
    this.hubs.updateUserProfile(this.userContract, this.userImage, this.userName, this.userPosition, this.userPostiondesc).then((data) => {
      this.getallorg();
    })
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000
    });

    Toast.fire({
      type: "success",
      title: "successfully updated your user profile"
    });
  }
  onInput(e){
    document.getElementById('results').style.display = "block"
  }
  noInput(e){
    setTimeout(() => {
      document.getElementById('results').style.display = "none";
      this.onCancel(this)
    }, 500);
  }
  onCancel(ev) {
    this.items = [];
  }
  cancelsearchresuts() {
    var settingsUpdate = document.getElementById("serachmodela-overlay");
    settingsUpdate.style.display = "none";
  }
  serachresults = []
  loclenght = []
  openMarkerInfo(i) {
    console.log(i);
    this.loclenght = []
    for (var x = 0; x < this.displayAllhubs.length; x++) {
      if (i == this.displayAllhubs[x].name) {
        //console.log(this.displayAllhubs[x]);
        this.serachresults = [this.displayAllhubs[x]]
        //console.log(this.serachresults)
        document.getElementById('serachmodela-overlay').style.display = 'block'
        //this.navCtrl.push(ViewservicePage, { orgObject: this.getOrgArry[x], loginState: this.logInState });
        break;
      } else if (i == this.displayAllhubs[x].location) {
        console.log(`location`);
        console.log(this.displayAllhubs[x].location);
        if (this.displayAllhubs[x].location) {
          this.loclenght.push(this.displayAllhubs[x].name)
          this.items = this.loclenght
          console.log(this.loclenght);
        } else {
        }
      }
    }
  }

  initializeItems() {
    this.items = this.orgNames 
  }



 
}
