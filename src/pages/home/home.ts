import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { HubsProvider } from '../../providers/hubs/hubs'
import swal from "sweetalert";
import Swal from "sweetalert2";

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

  toggleList = "ios-arrow-back";
  icon = 'assets/imgs/wifi2.svg'
  locIcon = 'assets/imgs/loc-user.svg'
  more = "ios-arrow-down";
  dateer = "this the date";
  activeState = "disabled";
  d = 1;
  constructor(public navCtrl: NavController, public hubs: HubsProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

    this.hubs.getAllOrganizations().then((data: any) => {
      this.getOrgArry = data
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
    })

    this.hubs.getCurrentLocation(this.lat, this.long).then((radius: any) => {
    })

    // alert(this.downloadurlLogo)
  }
  storeOrgNames(names) {
    this.orgNames = names;
    console.log(this.orgNames);
  }

  ngOnInit() {
    this.initMap();

    this.hubs.retrieve().on('value', (data: any) => {
      let details = data.val();
      this.name = details.name
      this.address = details.address
      this.lat = details.lat;
      this.background = details.background
      this.category = details.category;
      this.downloadurl = details.downloadurl;
      this.downloadurlLogo = details.downloadurlLogo;
      this.wifi = details.wifi;
      this.long = details.long;
      this.email = details.email;
      this.contact = details.contact
      console.log(this.name)
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
  mm = 0;
  toggleOrgList() {
    var orgListView = document.getElementById("org-list-view");
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
  showServicesPage() {
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
  showProgrammesPage() {
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
  showJobsPage() {
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
  mySide = 0
  showSidePane() {
    var sidePane = document.getElementsByClassName("side-pane") as HTMLCollectionOf<HTMLElement>;
    if (this.mySide == 0) {
      this.mySide = 1
      sidePane[0].style.left = "0";
    }
    else {
      this.mySide = 0
      sidePane[0].style.left = "-300px";
    }


  }

  //show map
  initMap() {

    setTimeout(() => {
      this.hubs.getLocation(this.lat, this.long).then((data: any) => {
        // console.log(data);
        this.userLocation = data;
        // console.log(this.userLocation);
      })

    }, 1000);
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait...',
      duration: 15000
    });
    // loading.present();

    // console.log(this.lng)
    const options = {
      center: { lat: this.lat, lng: this.long },
      zoom: 10,
      disableDefaultUI: true,
      icon: this.icon,
      styles: this.mapStyles
    }
    var map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    // adding user marker to the map 
    var marker = new google.maps.Marker({
      map: this.map,
      zoom: 10,
      icon: this.locIcon,
      title: 'Your Location',
      position: this.map.getCenter(),
      styles: this.mapStyles
      //animation: google.maps.Animation.DROP,
    });

    // console.log();


    setTimeout(() => {
      // console.log("show markers");

      this.markers();
      // console.log("show markerzzzzzzzzzzzzzzzzzzzzzzz");
    }, 16000)
    // console.log( this.userLocation);
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


  click() {
    alert("clicked")
  }
  //markers for the map
  markers() {
    // console.log(this.orgArray);
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
          this.getOrgArry[index].downloadurl +
          ">" +
          '<div style="padding-left: 10px;padding-right: 10px">' +
          this.getOrgArry[index].background +
          "</div><br>" +
          "</div>"
      });
      showMultipleMarker.addListener('click', () => {
        this.map.setZoom(14);
        this.map.setCenter(showMultipleMarker.getPosition());
        // console.log(index);
        infowindow.open(showMultipleMarker.get(this.map), showMultipleMarker);
        // console.log(index);

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
    // settingsUpdate.style.opacity = "0";
    // setTimeout(() => {
    settingsUpdate.style.display = "none";
    // }, 510);
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
    // console.log(this.items);
  }

  updateOrg() {
    this.cancelSettings();
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait...',
      duration: 15000
    });
    loading.present()
    this.hubs.update(this.name, this.email, this.downloadurlLogo, this.address, this.contact, this.background).then((data) => {
      loading.dismiss();
    });
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
          "color": "#04592a"
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
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
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
          "color": "#dadada"
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
          "color": "#c9c9c9"
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
}
