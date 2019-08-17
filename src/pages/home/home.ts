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
  updateOrganization = new Array();
  getUserProfile = new Array();
  displayOrg = new Array();
  //variables
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
  icons = [
    { image: 'ios-wifi',
    name: 'Wi-Fi Hotspot '
  },
    {
      image: 'ios-briefcase',
      name: 'Jobs'
    },
    { image: 'pie' ,
    name: 'Programes'
  },
    { image: 'ios-people', 
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
  constructor(public navCtrl: NavController, public hubs: HubsProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public alertCtrl: AlertController) {

    this.getallorg();



    this.hubs.displayOnMAP().then((data:any) => {
      this.displayOrg = data
      console.log(this.displayOrg)

      // this.name = data.name
      // this.address = data.address
      // this.lat = data.lat;
      // this.background = data.background
      // this.category = data.category;
      // this.downloadurl =data.downloadurl;
      // this.downloadurlLogo = data.downloadurlLogo;
      // this.wifi = data.wifi;
      // this.long = data.long;
      // this.email = data.email;
      // this.contact = data.contact
      // this.key = data.id
      // console.log(this.name)
    })



    this.hubs.getCurrentLocation(this.lat, this.long).then((radius: any) => {
    })

    // alert(this.downloadurlLogo)
  }
  storeOrgNames(names) {
    this.orgNames = names;
    console.log(this.orgNames);
  }


  getallorg() {
    this.hubs.getAllOrganizations().then((data: any) => {
      this.getOrgArry = data
      console.log(this.getOrgArry)
      var names = this.hubs.getOrgNames()
      this.storeOrgNames(names)
    })
  }

  getallProg(){
    this.hubs.getPrograme().then((data)=>{
      console.log(data)
    })
  }


  ngOnInit() {
    this.initMap();


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

    var btn1 = document.getElementById("btn1").style.background = "rgba(255, 255, 255, 0.1)";
    var btn1 = document.getElementById("btn2").style.background = "rgba(0, 0, 0, 0)";
    var btn1 = document.getElementById("btn3").style.background = "rgba(0, 0, 0, 0)";
    var btn1 = document.getElementById("btn4").style.background = "rgba(0, 0, 0, 0)";
  }
  servArray =  new Array();
  showServicesPage() {
    this.hubs.getServices().then((data:any) =>{
      console.log(data)
      this.servArray  = data;
    })
    // this will show the services
    var theMap = document.getElementById("pg1").style.display = "none";
    var theServices = document.getElementById("pg2").style.display = "block";
    var theProgs = document.getElementById("pg3").style.display = "none";
    var theJobs = document.getElementById("pg4").style.display = "none";

    var btn1 = document.getElementById("btn1").style.background = "rgba(0, 0, 0, 0)";
    var btn1 = document.getElementById("btn2").style.background = "rgba(255, 255, 255, 0.1)";
    var btn1 = document.getElementById("btn3").style.background = "rgba(0, 0, 0, 0)";
    var btn1 = document.getElementById("btn4").style.background = "rgba(0, 0, 0, 0)";
  }

 

  progArray =  new Array();
  showProgrammesPage() {
    this.hubs.getPrograme().then((data:any) =>{
      this.progArray = data;
      console.log(data)
    })
    // this will show programmes
    var theMap = document.getElementById("pg1").style.display = "none";
    var theServices = document.getElementById("pg2").style.display = "none";
    var theProgs = document.getElementById("pg3").style.display = "block";
    var theJobs = document.getElementById("pg4").style.display = "none";

    var btn1 = document.getElementById("btn1").style.background = "rgba(0, 0, 0, 0)";
    var btn1 = document.getElementById("btn2").style.background = "rgba(0, 0, 0, 0)";
    var btn1 = document.getElementById("btn3").style.background = "rgba(255, 255, 255, 0.1)";
    var btn1 = document.getElementById("btn4").style.background = "rgba(0, 0, 0, 0)";
  }
  jobsArry =  new Array();
  showJobsPage() {
    this.hubs.getJobs().then((data:any) =>{
      this.jobsArry = data;
    })
    // this will show jobs
    var theMap = document.getElementById("pg1").style.display = "none";
    var theServices = document.getElementById("pg2").style.display = "none";
    var theProgs = document.getElementById("pg3").style.display = "none";
    var theJobs = document.getElementById("pg4").style.display = "block";

    var btn1 = document.getElementById("btn1").style.background = "rgba(0, 0, 0, 0)";
    var btn1 = document.getElementById("btn2").style.background = "rgba(0, 0, 0, 0)";
    var btn1 = document.getElementById("btn3").style.background = "rgba(0, 0, 0, 0)";
    var btn1 = document.getElementById("btn4").style.background = "rgba(255, 255, 255, 0.1)";
  }

  //show map
  initMap() {
    setTimeout(() => {
      this.hubs.getLocation(this.lat, this.long).then((data: any) => {
        this.userLocation = data;
        console.log(this.userLocation)
      })
    }, 1000);
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait...',
      duration: 15000
    });
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

  add(type){
    this.navCtrl.push(AddOrganizationPage, {type:type})
    
  }

  //markers for the map
  markers() {
    console.log(this.getOrgArry);
    for (let index = 0; index < this.getOrgArry.length; index++) {
      var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'
      let showMultipleMarker = new google.maps.Marker({
        map: this.map,
        icon: this.icon,
        title: this.getOrgArry[index].orgName,
        size: { width: 5, height: 5 },
        position: { lat: parseFloat(this.getOrgArry[index].lat), lng: parseFloat(this.getOrgArry[index].long) },
        label: name,
        zoom: 15,
        styles: this.mapStyles

      });
      let infowindow = new google.maps.InfoWindow({
        content:
          '<div style="width: 400px; transition: 300ms;"><b>' +
          this.getOrgArry[index].category +
          '</b><div style="display: flex; padding-top: 10px;">' +
          '<img style="height: 100px; width: 100px; object-fit: cober; border-radius: 50px;" src=' +
          this.getOrgArry[index].downloadurlLogo +
          ">" +
          '<div style="padding-left: 10px;padding-right: 10px">' +
          this.getOrgArry[index].background +
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


  //search method
  initializeItems() {
    this.items = this.orgNames
    console.log(this.items)
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
  getItems(ev) {
    this.initializeItems();
    // set val to the value of the ev target
    var val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        console.log(val);

        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else if (val == "" || val == null) {
      this.items = [];
    }
    console.log(this.items);
  }

  updateOrg() {
    this.cancelSettings();
    // this.key
    this.hubs.update(this.name, this.downloadurlLogo, this.contact, this.background).then((data) => {
      this.getallorg();
    });
    const alert = this.alertCtrl.create({
      subTitle: 'Your Information has been updated',
      buttons: ['OK']
    });
    alert.present();
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



  animation(){
    const img = document.querySelectorAll('.anim');

  //   observer = new IntersectionObserver((entries)=>{
  //     entries.forEach(entry =>{
  //     if (entry.intersectionRation > 0) {
  //       entry.target.style.animation ='anim1 2s forwards ease-out';
  //     } else {
  //       entry.target.style.animation = 'none'
  //     }
  //   })
  // })
  // img.forEach(img =>{
  //   observer.observer(img)
  // })
   }
}
