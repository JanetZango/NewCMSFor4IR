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
  userImage;
  progname;

  constructor(public navCtrl: NavController, public hubs: HubsProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.getallorg();
    this.getallhubs();
    this.displayProfile();
    this.getallAvailableOrg();
    
    this.hubs.getCurrentLocation(this.lat, this.long).then((radius: any) => {
    })
  }
  storeOrgNames(names) {
    this.orgNames = names;
    console.log(this.orgNames);
  }

  displayProfile(){
    this.hubs.geOrgtUser().then((data:any)=>{
      this.userName = data.userName
      this.userImage = data.userImage
      this.userPosition = data.userPosition
      this.userPostiondesc = data.userPostiondesc
      this.userContract = data.userContract
      console.log(this.userName)
  
    })
  }


  // getallorg() {
  //   this.hubs.getACurentloggedInOrganizations().then((data: any) => {
  //     this.getOrgArry = data
  //     console.log(this.getOrgArry)
  //     var names = this.hubs.getOrgNames()
  //     this.storeOrgNames(names)
  //     this.name = this.getOrgArry[0].name
  //     this.address = this.getOrgArry[0].address
  //     this.lat = this.getOrgArry[0].lat;
  //     this.background = this.getOrgArry[0].background
  //     this.category = this.getOrgArry[0].category;
  //     this.downloadurl = this.getOrgArry[0].downloadurl;
  //     this.downloadurlLogo = this.getOrgArry[0].downloadurlLogo;
  //     this.wifi = this.getOrgArry[0].wifi;
  //     this.long = this.getOrgArry[0].long;
  //     this.email = this.getOrgArry[0].email;
  //     this.contact = this.getOrgArry[0].contact
  //     this.key = this.getOrgArry[0].id
  //   })
  // }

  getallAvailableOrg(){
    this.hubs.getAllOrganizations().then((data:any)=>{
      this.displayAllORG = data
      console.log(this.displayAllORG)
    })
  }

  getallhubs(){
    this.hubs.getallhubs().then((data:any)=>{
      console.log(data)
      this.displayAllhubs = data
     console.log(this.displayAllhubs)
    })
  }


  ngOnInit() {
    this.initMap();
    this.getallhubs();


    this.hubs.displayOnMAP().then((data:any) => {
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

  insertuserprofile(event: any) {
    this.d = 1;
    let opts = document.getElementsByClassName('options') as HTMLCollectionOf<HTMLElement>;
    if (this.d == 1) {
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.userImage = event.target.result;
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
  servArray =  new Array();
  showServicesPage() {
    this.servArray = [];
    for (var x = 0; x  < this.displayOrg.length; x++){
      if (this.displayOrg[x].category == "service"){
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

 

  progArray =  new Array();
  showProgrammesPage() {
    this.progArray = [];
    for (var x = 0; x  < this.displayOrg.length; x++){
      if (this.displayOrg[x].category == "programmes"){
        this.progArray.push(this.displayOrg[x]);
        console.log(this.progArray)
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
  // jobsArry =  new Array();
  // showJobsPage() {
  //   this.jobsArry = [];
  //   for (var x = 0; x  < this.displayOrg.length; x++){
  //     if (this.displayOrg[x].category == "jobs"){
  //       this.jobsArry.push(this.displayOrg[x]);
  //     }
  //   }
  //   var theMap = document.getElementById("pg1").style.display = "none";
  //   var theServices = document.getElementById("pg2").style.display = "none";
  //   var theProgs = document.getElementById("pg3").style.display = "none";
  //   var theJobs = document.getElementById("pg4").style.display = "block";
  //   var theJobs = document.getElementById("pg5").style.display = "none";

  //   var btn1 = document.getElementById("btn1").style.background = "rgba(0, 0, 0, 0)";
  //   var btn1 = document.getElementById("btn2").style.background = "rgba(0, 0, 0, 0)";
  //   var btn1 = document.getElementById("btn3").style.background = "rgba(0, 0, 0, 0)";
  //   var btn1 = document.getElementById("btn4").style.background = "rgba(255, 255, 255, 0.1)";
  //   var btn1 = document.getElementById("btn5").style.background = "rgba(0, 0, 0, 0)";
  //   var settingsUpdate = document.getElementById("org-list-view");
  //   settingsUpdate.style.display = "none";
     
  // }
  // wifrArry =  new Array();
  // showwifiPage() {
  //   this.wifrArry = [];
  //   for (var x = 0; x  < this.displayOrg.length; x++){
  //     if (this.displayOrg[x].category == "wifi"){
  //       this.wifrArry.push(this.displayOrg[x]);
  //     }
  //   }
  //   var theMap = document.getElementById("pg1").style.display = "none";
  //   var theServices = document.getElementById("pg2").style.display = "none";
  //   var theProgs = document.getElementById("pg3").style.display = "none";
  //   var theJobs = document.getElementById("pg4").style.display = "none";
  //   var theJobs = document.getElementById("pg5").style.display = "block";

  //   var btn1 = document.getElementById("btn1").style.background = "rgba(0, 0, 0, 0)";
  //   var btn1 = document.getElementById("btn2").style.background = "rgba(0, 0, 0, 0)";
  //   var btn1 = document.getElementById("btn3").style.background = "rgba(0, 0, 0, 0)";
  //   var btn1 = document.getElementById("btn4").style.background = "rgba(0, 0, 0, 0)";
  //   var btn1 = document.getElementById("btn5").style.background = "rgba(255, 255, 255, 0.1)";
    
  //   var settingsUpdate = document.getElementById("org-list-view");
  //   settingsUpdate.style.display = "none";
     
  // }

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

  add(type){
    this.navCtrl.push(AddOrganizationPage, {type:type})
  }



  // getItems(ev: any) {
  //   console.log(`hi serach`);
    
  //   let searchlist = document.getElementsByClassName('searchitem') as HTMLCollectionOf<HTMLElement>;
  //     //searchlist[0].style.display = 'block';
  //     //this.search = 'search'
  //   // Reset items back to all of the items
  //   this.initializeItems();
  //   // set val to the value of the searchbar
  //   const val = ev.target.value;
  //   // if the value is an empty string don't filter the items
  //   if (val && val.trim() != '') {
  //     this.items = this.items.filter((item) => {
  //       return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //     })
  //     let searchlist = document.getElementsByClassName('searchitem') as HTMLCollectionOf<HTMLElement>;
  //     //searchlist[0].style.display = 'block';
  //   }
  // }
  // initializeItems() {
  //   this.items = [

  //   'Acceptance','Action','Adversity','Anger','Authenticity','Boundaries','Choice','Compassion','Competitveness','Courage','Customer-relations-management','Decisiveness','Delayed-gratification','Depression',
  //   'Detachment','Dream-big','Emotional-intelligence','Enemy','Enthusiasm','Ethics','Excellence','Fear','Freedom','Giving','Gratitude','Growth','Happiness','Hard-work','Health','Humility','Inner-power',
  //   'Innovation','Intuition','Learning','Love', 'Life','Morality','Obstacles','Passion','Patience','Perseverance','Positivity','Power','Purpose','Regrets','Relationships','Risk-taking','Self discovery',
  //   'Service','Small-steps','Spiritual-intelligence','Temper','Think big','Thoughts','Time','Truth','Vision','Wealth',
  //   ];
  // }


  //markers for the map
  // markers() {
  //   console.log(this.displayAllhubs);
  //   for (let index = 0; index < this.displayAllhubs.length; index++) {
  //     var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'
  //     let showMultipleMarker = new google.maps.Marker({
  //       map: this.map,
  //       icon: this.icon,
  //       title: this.displayAllhubs[index].name,
  //       size: { width: 5, height: 5 },
  //       position: { lat: parseFloat(this.displayAllhubs[index].lat), lng: parseFloat(this.displayAllhubs[index].long) },
  //       label: name,
  //       zoom: 15,
  //       styles: this.mapStyles

  //     });
  //     let infowindow = new google.maps.InfoWindow({
  //       content:
  //       '<div style="width: 400px; transition: 300ms;"><b>' +
  //       this.displayAllhubs[index].name +
  //       '</b><div style="display: flex; padding-top: 10px;">' +
  //       '<img style="height: 100px; width: 100px; object-fit: cober; border-radius: 50px;" src=' +
  //       this.displayAllhubs[index].img +
  //       ">" +
  //       '<div style="padding-left: 10px;padding-right: 10px">' +
  //       this.displayAllhubs[index].background +
  //       "</div><br>" +



  //       "</div>"
  //     });
  //     showMultipleMarker.addListener('click', () => {
  //       this.map.setZoom(14);
  //       this.map.setCenter(showMultipleMarker.getPosition());
  //       infowindow.open(showMultipleMarker.get(this.map), showMultipleMarker);


  //     });

  //   }
  // }



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

  //  deleteProg(indx,key){
  //     const confirm = this.alertCtrl.create({
  //     message: 'Do you agree to delete this program?',
  //     buttons: [
  //       {
  //         text: 'Disagree',
  //         handler: () => {
  //           console.log('Disagree clicked');
  //         }
  //       },
  //       {
  //         text: 'Agree',
  //         handler: () => {
  //           this.displayOrg.splice(indx,1);
  //           this.hubs.removeProg(key);
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present();
  //  }

  //  applOpen;
  //  applClose;
  //  start;
  //  end;
  //  progbackground;
  //  progname2;
  //  contact2;
  //  img2;
  //  progKey;
   
   
  //  editprogram(i){
  //    this.applOpen = i.openDate;
  //    this.applClose = i.closeDate;
  //    this.start = i.progStartDate;
  //    this.end = i.progEndDate;

  //    this.progbackground = i.background
  //    this.progname2 = i .name;
  //    this.contact2 = i.address;
  //    this.img2 = i.img
  //    this.progKey = i.key
     


  //   var settingsUpdate = document.getElementById("program-overlay");
  //   settingsUpdate.style.display = "block";
  //   settingsUpdate.style.display = "flex";
  //  }

  //  updateOrg() {
  //   this.cancelSettings();
  //   this.hubs.update( this.applOpen ,  this.applClose,this.start ,  this.end ,this.progname2, this.img2, this.contact, this.progbackground,this.progKey).then((data) => {
  //     this.getallorg();
  //   });
  //   const alert = this.alertCtrl.create({
  //     subTitle: 'Your Information has been updated',
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }



   cancelprogramm() {
    
    var settingsUpdate = document.getElementById("program-overlay");
    settingsUpdate.style.display = "none";
  }

  // editservice(){
  //   console.log(`hi`);
    
  //  var settingsUpdate = document.getElementById("service-overlay");
  //  settingsUpdate.style.display = "block";
  //  settingsUpdate.style.display = "flex";
  // }
  cancelservice() {
   
   var settingsUpdate = document.getElementById("service-overlay");
   settingsUpdate.style.display = "none";
 }

//  editjob(){
//   console.log(`hi`);
  
//  var settingsUpdate = document.getElementById("job-overlay");
//  settingsUpdate.style.display = "block";
//  settingsUpdate.style.display = "flex";
// }
canceljob() {
 
 var settingsUpdate = document.getElementById("job-overlay");
 settingsUpdate.style.display = "none";
}
editwifi(){
  console.log(`hi`);
  
 var settingsUpdate = document.getElementById("wifi-overlay");
 settingsUpdate.style.display = "block";
 settingsUpdate.style.display = "flex";
}
cancelwifi() {
 
 var settingsUpdate = document.getElementById("wifi-overlay");
 settingsUpdate.style.display = "none";
}
editprofile(){
 var settingsUpdate = document.getElementById("profile-overlay");
 settingsUpdate.style.display = "block";
 settingsUpdate.style.display = "flex";
}
cancelprofile() {
 var settingsUpdate = document.getElementById("profile-overlay");
 settingsUpdate.style.display = "none";
}

updateorgProfile(){
  this.cancelSettings();
  this.hubs.updateOrg(this.contact,this.downloadurlLogo,this.name,this.background).then((data)=>{
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

updateUserprofile(){
  this.cancelSettings();
  this.hubs.updateUserProfile(this.userContract,this.userImage,this.userName,this.userPosition,this.userPostiondesc).then((data)=>{
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

markersList =  new Array();
infoWindowList =  new Array()
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
    this.markersList.push(showMultipleMarker)
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
    this.infoWindowList.push(infowindow)
    showMultipleMarker.addListener('click', () => {
      for (var i = 0; i < this.infoWindowList.length; i++){
        this.infoWindowList[i].close()
      }
      this.map.setZoom(14);
      this.map.setCenter(showMultipleMarker.getPosition());
      infowindow.open(showMultipleMarker.get(this.map), showMultipleMarker);
    });
  }
}


getItems(ev: any) {
  console.log(`hi serach`);
  for (var i = 0; i < this.infoWindowList.length; i++){
    this.infoWindowList[i].close()
  }
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
  else{
    this.items = []
  }
}
initializeItems() {
  this.items=  this.orgNames
}
getallorg() {
  this.hubs.getACurentloggedInOrganizations().then((data: any) => {
    this.getOrgArry = data
    console.log(this.getOrgArry)
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
hideJobs(i){
  this.hubs.hideProg(i);
}
hideServ(i){
  this.hubs.hideProg(i);
}
hideWifi(i){
  this.hubs.hideProg(i);
}
jobsArry =  new Array();
showJobsPage() {
  this.jobsArry = [];
  for (var x = 0; x  < this.displayOrg.length; x++){
    if (this.displayOrg[x].category == "jobs"){
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
wifrArry =  new Array();
showwifiPage() {
  this.wifrArry = [];
  for (var x = 0; x  < this.displayOrg.length; x++){
    if (this.displayOrg[x].category == "wifi"){
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


deleteJob(indx,key){
  const confirm = this.alertCtrl.create({
  message: 'Do you agree to delete this Job?',
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
        this.jobsArry.splice(indx,1);
        this.hubs.removeProg(key);
      }
    }
  ]
});
confirm.present();
}
 deleteSer(indx,key){
  const confirm = this.alertCtrl.create({
  message: 'Do you agree to delete this Service?',
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
        this.servArray.splice(indx,1);
        this.hubs.removeProg(key);
      }
    }
  ]
});
confirm.present();
}
 deleteProg(indx,key){
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
        this.progArray.splice(indx,1);
        this.hubs.removeProg(key);
      }
    }
  ]
});
confirm.present();
}
 insertpicx(event: any) {
  this.d = 1;
  let opts = document.getElementsByClassName('options') as HTMLCollectionOf<HTMLElement>;
  if (this.d == 1) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.img22 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
applOpen;
applClose;
start;
end;
progbackground;
pr;
contact2;
img22;
progKey;
progEmail;
servImg
editprogram(i){
  console.log(i)
  this.applOpen = i.openDate;
  this.applClose = i.closeDate;
  this.start = i.progStartDate;
  this.end = i.progEndDate;
 this.progEmail = i.email;
  this.progbackground = i.background
  this.pr = i.name;
  this.contact2 = i.address;
  this.img22 = i.img
  this.progKey = i.key
  
 var settingsUpdate = document.getElementById("program-overlay");
 settingsUpdate.style.display = "block";
 settingsUpdate.style.display = "flex";
}
insertpic2222(event: any) {
  this.d = 1;
  if (this.d == 1) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.servImg = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }

  }
}
editservice() {
  this.cancelSettings();
  this.hubs.update( this.applOpen ,  this.applClose,this.start ,  this.end ,this.pr, this.img22, this.contact2, this.progbackground,this.progKey).then((data) => {
    this.getallorg();
  });
  const alert = this.alertCtrl.create({
    subTitle: 'Your Information has been updated',
    buttons: ['OK']
  });
  alert.present();
  this.cancelprogramm();
  this.showMapPage()
}

insertpicj(event: any) {
this.d = 1;
if (this.d == 1) {
  if (event.target.files && event.target.files[0]) {
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.Jimg = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }
}
}
jName;
jAddrs;
jConta;
jdesc;
jstart;
jend;
jAppS;
jAppE;
Jimg;
jKey;

editjob(x){

 this.jName = this.jobsArry[x].name
 this. jAddrs = this.jobsArry[x].address
 this.jConta = this.jobsArry[x].contacts
 this.jdesc = this.jobsArry[x].background
 this.jstart = this.jobsArry[x].progStartDate
 this.jend = this.jobsArry[x].progEndDate
 this.jAppS = this.jobsArry[x].openDate;
 this.jAppE = this.jobsArry[x].closeDate;
 this.Jimg = this.jobsArry[x].img;
 this.jKey = this.jobsArry[x].key

var settingsUpdate = document.getElementById("job-overlay");
settingsUpdate.style.display = "block";
settingsUpdate.style.display = "flex";
}
updateOrg33(){
  this.cancelSettings();
  this.hubs.updatejob( this.jName,  this. jAddrs ,  this.jConta,  this.jdesc,  this.jstart,  this.jend,  this.jAppS ,  this.jAppE, this.Jimg,this.jKey).then((data) => {
    this.getallorg();
  });
  const alert = this.alertCtrl.create({
    subTitle: 'Your Information has been updated',
    buttons: ['OK']
  });
  alert.present();
  this.canceljob();
  this.showMapPage()
}
hideProg(i){
  this.hubs.hideProg(i);
}
servAdd;
//servImg;
servContact;
servEmail = 'library@gmail.com';
servDesc;
servKey;
//   editservice(x){
//     this.servAdd = this.servArray[x].address;
//     this.servImg =this.servArray[x].img
//     this.servContact =  this.servArray[x].contacts;
//     this.servDesc = this.servArray[x].desc;
//     this.servKey =  this.servArray[x].key
    
//    var settingsUpdate = document.getElementById("service-overlay");
//    settingsUpdate.style.display = "block";
//    settingsUpdate.style.display = "flex";
//   }








  updateOrg2() {
    this.cancelSettings();
    this.hubs.updateService(    this.servContact,  this.servImg,  this.servDesc ,      this.servAdd,this.servKey ).then((data) => {
      this.getallorg();
    });
    const alert = this.alertCtrl.create({
      subTitle: 'Your Information has been updated',
      buttons: ['OK']
    });
    alert.present();
    this.cancelservice();
    this.showMapPage()
  }

  itemName;
  openMarkerInfo(selectedName){
    for (var i = 0; i < this.infoWindowList.length; i++){
      this.infoWindowList[i].close()
    }
    this.items = [];
    this.itemName = selectedName
    for (var x = 0; x < this.markersList.length; x++){
      if (this.markersList[x].title == selectedName){
        console.log(this.markersList[x])
        // let temp = new google.maps.InfoWindow
        let tempMarker = this.markersList[x];
        let temp = this.infoWindowList[x];
        this.map.setZoom(14);
        this.map.setCenter(tempMarker.getPosition());
        temp.open(tempMarker.get(this.map), tempMarker)
        break;
      }
    }
  }

//   hideProg(key){
//     firebase.database().ref("4IRHubs/" + key).update({
//       status: 'hidden'
//     })
//   }
//  //updateOrganization
//  update(applstart,applend,start,end,name2,downloadurlLogo,contact,background,key) {
//   console.log(name2);
//   return new Promise((pass, fail) => {
//     this.ngzone.run(() => {
//       firebase.database().ref("4IRHubs/" + key).update({
//         progName: end,
//         img: downloadurlLogo,
//         address : contact,
//         background:background,
//         openDate : applstart,
//         closeDate : applend,
//         progStartDate : start,
//         progEndDate : end
//       });
//       pass('');
//     })
//   })
// }
// updateService(contact,img,desc,addr, key) {
//   return new Promise((pass, fail) => {
//     this.ngzone.run(() => {
//       firebase.database().ref("4IRHubs/" + key).update({
//         desc: desc,
//         img: img,
//         contacts : contact,
//         address:addr,
//       });
//       pass('');
//     })
//   })
// }
// updateOrg(contact,downloadurlLogo,name,background) {
//   return new Promise((pass, fail) => {
//     this.ngzone.run(() => {
//       var user = firebase.auth().currentUser
//       firebase.database().ref("Organizations/" + user.uid).update({
//         contact: contact,
//         downloadurlLogo: downloadurlLogo,
//         name: name,
//         background:background,
    
//       });
//     })
//   })
// }

// addService(email,openDate, closeDate, address, serviceName, contact, desc, img,lat,long, city) {
//   return new Promise((resolve, reject) => {
//     this.ngzone.run(() => {
//       var user = firebase.auth().currentUser
//       firebase.database().ref("4IRHubs").push({
//         openDate: openDate,
//         email:email,
//         closeDate: closeDate,
//         address: address,
//         desc: desc,
//         img: img,
//         contact: contact,
//         name : serviceName,
//         lat:lat,
//         long:long,
//         city: city
//       })
//       resolve();
//     })
//   })
// }
//   addJob(name,openDate, closeDate, address, desc, benefits, jobStartdate, jobEndDate, contact, img,lat,long, city) {
//     return new Promise((resolve, reject) => {
//       this.ngzone.run(() => {
//         var user = firebase.auth().currentUser
//         firebase.database().ref("4IRHubs").push({
//           openDate: openDate,
//           category:"jobs",
//           closeDate: closeDate,
//           address: address,
//           desc: desc,
//           benefits: benefits,
//           jobStartdate: jobStartdate,
//           jobEndDate: jobEndDate,
//           img: img,
//           contact: contact,
//           name : name,
//           lat:lat,
//           long:long,
//           city: city,
//           user : user.uid
//         })
//         resolve();
//       })
//     })

//   }
//     addPrograme(openDate, closeDate, name, progType, background, benefits, desc, progStartDate, progEndDate, address, contacts, img,lat,long, city) {
//       return new Promise((resolve, reject) => {
//         this.ngzone.run(() => {
//           var user = firebase.auth().currentUser
//           firebase.database().ref("4IRHubs").push({
//             openDate: openDate,
//             category:"programmes",
//             closeDate: closeDate,
//             name: name,
//             progType: progType,
//             background: background,
//             benefits: benefits,
//             desc: desc,
//             progStartDate: progStartDate,
//             progEndDate: progEndDate,
//             address: address,
//             contacts: contacts,
//             img: img,
//             lat:lat,
//             long:long,
//             user : user.uid,
//             city: city
//           })
//           resolve();
//         })
//       })
//     }
 
//     updatejob(name,add,con,backg,start,end,applS,applE,img, key) {
//       return new Promise((pass, fail) => {
//         this.ngzone.run(() => {
//           firebase.database().ref("4IRHubs/" + key).update({
//             name: name,
//             address: add,
//             contacts: con,
//             background: backg,
//             openDate: start,
//             closeDate: end,
//             progStartDate: applS,
//             progEndDate: applE,
//             img : img,
//           });
//           pass('');
//         })
//       })
//     }
//     getACurentloggedInOrganizations() {
//       return new Promise((resolve, reject) => {
//         this.ngzone.run(() => {
//           var user = firebase.auth().currentUser;
//           firebase.database().ref("Organizations/" + user.uid).on("value", (data: any) => {
//             if (data.val() != null) {
//               // this.orgArray.length = 0;
//               // this.orgNames.length = 0;
//               let displayDetails = data.val();
//               console.log(displayDetails)
//               let keys = Object.keys(displayDetails);
//               console.log(keys)
//                 // var k = keys[0];
//                 let orgObject = {
//                   address: displayDetails.address,
//                   background: displayDetails.background,
//                   category: displayDetails.category,
//                   contact: displayDetails.contact,
//                   downloadurl: displayDetails.downloadurl,
//                   downloadurlLogo: displayDetails.downloadurlLogo,
//                   email: displayDetails.email,
//                   freeWifi: displayDetails.freeWifi,
//                   name: displayDetails.name,
//                   lat: displayDetails.lat,
//                   long: displayDetails.long,
//                   region: displayDetails.region,
//                   website: displayDetails.website,
//                   wifi: displayDetails.wifi,
//                   wifiRange: displayDetails.wifiRange,
              
//                 }
//                 console.log(orgObject)
//                 //this.storeOrgNames(displayDetails.category);
//                 this.orgArray.push(orgObject)
//                 console.log(this.orgArray)
//               }
//               resolve(this.orgArray)
//             // }
//           });
//         })
//       })
//     }

  
//     getACurentloggedInOrganizations() {
//       return new Promise((resolve, reject) => {
//         this.ngzone.run(() => {
//           var user = firebase.auth().currentUser;
//           firebase.database().ref("Organizations/" + user.uid).on("value", (data: any) => {
//             if (data.val() != null) {
//               // this.orgArray.length = 0;
//               // this.orgNames.length = 0;
//               let displayDetails = data.val();
//               console.log(displayDetails)
//               let keys = Object.keys(displayDetails);
//               console.log(keys)
//                 // var k = keys[0];
//                 let orgObject = {
//                   address: displayDetails.address,
//                   background: displayDetails.background,
//                   category: displayDetails.category,
//                   contact: displayDetails.contact,
//                   downloadurl: displayDetails.downloadurl,
//                   downloadurlLogo: displayDetails.downloadurlLogo,
//                   email: displayDetails.email,
//                   freeWifi: displayDetails.freeWifi,
//                   name: displayDetails.name,
//                   lat: displayDetails.lat,
//                   long: displayDetails.long,
//                   region: displayDetails.region,
//                   website: displayDetails.website,
//                   wifi: displayDetails.wifi,
//                   wifiRange: displayDetails.wifiRange,
              
//                 }
//                 console.log(orgObject)
//                 //this.storeOrgNames(displayDetails.category);
//                 this.orgArray.push(orgObject)
//                 console.log(this.orgArray)
//               }
//               resolve(this.orgArray)
//             // }
//           });
//         })
//       })
//     }

//     displayOnMAP() {
//       return new Promise((resolve, reject) => {
//           this.ngzone.run(() => {
//           var user = firebase.auth().currentUser.uid;
//           firebase.database().ref('4IRHubs/').on('value', (data: any) => {
//               this.getprog.length =0;
//               var UploadDetails = data.val();
//               console.log(UploadDetails);
//               var k2 = Object.keys(UploadDetails);
//               for(var i =0 ;i<k2.length;i++){
//                   var key2 = k2[i];
//                   if (UploadDetails[key2].uid == user.uid) {
//                       let obj = {
//                           img: UploadDetails[key2].img,
//                           progName: UploadDetails[key2].name,
//             uid: UploadDetails[key2].user,
//             address: UploadDetails[key2].address,
//                           background: UploadDetails[key2].background,
//             benefits: UploadDetails[key2].benefits,
//             category: UploadDetails[key2].category,
//                           closeDate: UploadDetails[key2].closeDate,
//             contacts: UploadDetails[key2].contacts,
//             desc: UploadDetails[key2].desc,
//                           name: UploadDetails[key2].name,
//             openDate: UploadDetails[key2].openDate,
//             progEndDate: UploadDetails[key2].progEndDate,
//                           progStartDate: UploadDetails[key2].progStartDate,
//             user: UploadDetails[key2].user,
//             city: UploadDetails[key2].city,
//             key : key2,
      
//           };
//           this.storeOrgNames(UploadDetails[key2].name)
//           this.cityNames(UploadDetails[key2].city)
//                       console.log(obj);
//                       this.getprog.push(obj);
//           console.log(this.getprog);
//                   }
//       }
//       resolve(this.getprog);
//           });
//       });
//       });
// }
// ogNames = new Array()
// storeOrgNames(cat) {
//   console.log(cat)
//   if (cat != undefined)
//   this.ogNames.push(cat);
// }
  
// update(applstart,applend,start,end,name2,downloadurlLogo,contact,background,key) {
//   console.log(name2);
//   return new Promise((pass, fail) => {
//     this.ngzone.run(() => {
//       firebase.database().ref("4IRHubs/" + key).update({
//         progName: end,
//         img: downloadurlLogo,
//         address : contact,
//         background:background,
//         openDate : applstart,
//         closeDate : applend,
//         progStartDate : start,
//         progEndDate : end
//       });
//       pass('');
//     })
//   })
// }
// updateService(contact,img,desc,addr, key) {
//   return new Promise((pass, fail) => {
//     this.ngzone.run(() => {
//       firebase.database().ref("4IRHubs/" + key).update({
//         desc: desc,
//         img: img,
//         contacts : contact,
//         address:addr,
//       });
//       pass('');
//     })
//   })
// }
// updateOrg(contact,downloadurlLogo,name,background) {
//   return new Promise((pass, fail) => {
//     this.ngzone.run(() => {
//       var user = firebase.auth().currentUser
//       firebase.database().ref("Organizations/" + user.uid).update({
//         contact: contact,
//         downloadurlLogo: downloadurlLogo,
//         name: name,
//         background:background,
    
//       });
//     })
//   })
// }
// getOrgNames() {
//   return this.ogNames
// }





  
  
  
  
  












}

