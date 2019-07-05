import { Component,ViewChild ,ElementRef, OnInit} from '@angular/core';
import { NavController,LoadingController, AlertController, ToastController } from 'ionic-angular';
import { HubsProvider } from '../../providers/hubs/hubs'



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
 orgNames = new Array()

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

  icon = 'assets/imgs/wifi2.svg'
  locIcon = 'assets/imgs/loc-user.svg'
  more = "Show More";
  dateer = "this the date";
  activeState = "disabled"
  constructor(public navCtrl: NavController, public hubs: HubsProvider,public loadingCtrl:LoadingController) {

    this.hubs.getAllOrganizations().then((data:any) => {
      this.getOrgArry = data
      var names = this.hubs.getOrgNames()
      this.storeOrgNames(names)
      this.name = this.getOrgArry[0].name
      this.address = this.getOrgArry[0].address
      this.lat = this.getOrgArry[0].lat;
      this.background = this.getOrgArry[0].background
      this.category= this.getOrgArry[0].category;
      this.downloadurl = this.getOrgArry[0].downloadurl;
      this.downloadurlLogo = this.getOrgArry[0].downloadurlLogo;
      this.wifi = this.getOrgArry[0].wifi;
      this.long = this.getOrgArry[0].long;
      this.email = this.getOrgArry[0].email;
      this.contact = this. getOrgArry[0].contact
    })

    this.hubs.getCurrentLocation(this.lat, this.long).then((radius: any) => {
    })
  }
  storeOrgNames(names) {
    this.orgNames = names;
    console.log(this.orgNames);
  }

  ngOnInit() {
    this.initMap();
  }

 
  
  m = 0
  showMoreDetails() {
    var detailsOrg = document.getElementById("misc");
    if (this.m == 0) {
      this.m = 1;
      detailsOrg.style.maxHeight = "1000px"
      this.more = "Show Less"
    }
    else {
      this.m = 0;
      detailsOrg.style.maxHeight = "35px"
      this.more = "Show More"
    }
  }
  showMapPage() {
    // this will show the map
    var theMap = document.getElementById("pg1").style.display = "block";
    var theServices = document.getElementById("pg2").style.display = "none";
    var theProgs = document.getElementById("pg3").style.display = "none";
    var theJobs = document.getElementById("pg4").style.display = "none";

    var btn1 = document.getElementById("btn1").style.background = "whitesmoke";
    var btn1 = document.getElementById("btn2").style.background = "rgba(0, 0, 0, 0.192)";
    var btn1 = document.getElementById("btn3").style.background = "rgba(0, 0, 0, 0.192)";
    var btn1 = document.getElementById("btn4").style.background = "rgba(0, 0, 0, 0.192)";
  }
  showServicesPage() {
    // this will show the services
    var theMap = document.getElementById("pg1").style.display = "none";
    var theServices = document.getElementById("pg2").style.display = "block";
    var theProgs = document.getElementById("pg3").style.display = "none";
    var theJobs = document.getElementById("pg4").style.display = "none";

    var btn1 = document.getElementById("btn1").style.background = "rgba(0, 0, 0, 0.192)";
    var btn1 = document.getElementById("btn2").style.background = "whitesmoke";
    var btn1 = document.getElementById("btn3").style.background = "rgba(0, 0, 0, 0.192)";
    var btn1 = document.getElementById("btn4").style.background = "rgba(0, 0, 0, 0.192)";
  }
  showProgrammesPage() {
    // this will show programmes
    var theMap = document.getElementById("pg1").style.display = "none";
    var theServices = document.getElementById("pg2").style.display = "none";
    var theProgs = document.getElementById("pg3").style.display = "block";
    var theJobs = document.getElementById("pg4").style.display = "none";

    var btn1 = document.getElementById("btn1").style.background = "rgba(0, 0, 0, 0.192)";
    var btn1 = document.getElementById("btn2").style.background = "rgba(0, 0, 0, 0.192)";
    var btn1 = document.getElementById("btn3").style.background = "whitesmoke";
    var btn1 = document.getElementById("btn4").style.background = "rgba(0, 0, 0, 0.192)";
  }
  showJobsPage() {
    // this will show jobs
    var theMap = document.getElementById("pg1").style.display = "none";
    var theServices = document.getElementById("pg2").style.display = "none";
    var theProgs = document.getElementById("pg3").style.display = "none";
    var theJobs = document.getElementById("pg4").style.display = "block";

    var btn1 = document.getElementById("btn1").style.background = "rgba(0, 0, 0, 0.192)";
    var btn1 = document.getElementById("btn2").style.background = "rgba(0, 0, 0, 0.192)";
    var btn1 = document.getElementById("btn3").style.background = "rgba(0, 0, 0, 0.192)";
    var btn1 = document.getElementById("btn4").style.background = "whitesmoke";
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
    loading.present();

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
