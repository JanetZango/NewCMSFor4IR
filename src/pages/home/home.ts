import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  more = "Show More";
  dateer = "this the date";
  activeState = "disabled";
  showHide = "Hide"
  constructor(public navCtrl: NavController) {


  }

  displayOrganizatins() {

  }
  m = 0
  showMoreDetails() {
    var morebtn = document.getElementById("more");
    var detailsOrg = document.getElementById("misc");
    if(this.m == 0){
      this.m = 1;
      morebtn.style.bottom = "10px"
      detailsOrg.style.maxHeight = "100%";
      setTimeout(() => {
      detailsOrg.style.overflowY = "scroll"
      }, 600);
    this.more = "Show Less"
    }
    else{
      this.m = 0;
      morebtn.style.bottom = "10px"
      detailsOrg.style.maxHeight = "35px";
      setTimeout(() => {
      detailsOrg.style.overflowY = "hidden"
      }, 600);
    this.more = "Show More"
    }
  }
  serv = 0;
  hideService(){
    if(this.serv == 0){
      this.serv = 1;
      this.showHide = "Show"
    }else{
      this.serv = 0;
      this.showHide = "Hide"
    }
  }
  showMapPage(){
    // this will show the map
    var theMap = document.getElementById("pg1").style.display = "block";
    var theServices = document.getElementById("pg2").style.display = "none";
    var theProgs = document.getElementById("pg3").style.display = "none";
    var theJobs = document.getElementById("pg4").style.display = "none";
    var theJobs = document.getElementById("pg5").style.display = "none";

    var btn1 = document.getElementById("btn1").style.background = "whitesmoke";
    var btn1 = document.getElementById("btn2").style.background = "rgba(0, 0, 0, 0.192)";
    var btn1 = document.getElementById("btn3").style.background = "rgba(0, 0, 0, 0.192)";
    var btn1 = document.getElementById("btn4").style.background = "rgba(0, 0, 0, 0.192)";
    var btn1 = document.getElementById("btn5").style.background = "rgba(0, 0, 0, 0.192)";
  }
  showServicesPage(){
    // this will show the services
    var theMap = document.getElementById("pg1").style.display = "none";
    var theServices = document.getElementById("pg2").style.display = "block";
    var theProgs = document.getElementById("pg3").style.display = "none";
    var theJobs = document.getElementById("pg4").style.display = "none";
    var theJobs = document.getElementById("pg5").style.display = "none";

    var btn1 = document.getElementById("btn1").style.background = "rgba(0, 0, 0, 0.192)";
    var btn1 = document.getElementById("btn2").style.background = "whitesmoke";
    var btn1 = document.getElementById("btn3").style.background = "rgba(0, 0, 0, 0.192)";
    var btn1 = document.getElementById("btn4").style.background = "rgba(0, 0, 0, 0.192)";
    var btn1 = document.getElementById("btn5").style.background = "rgba(0, 0, 0, 0.192)";
  }
  showProgrammesPage(){
    // this will show programmes
    var theMap = document.getElementById("pg1").style.display = "none";
    var theServices = document.getElementById("pg2").style.display = "none";
    var theProgs = document.getElementById("pg3").style.display = "block";
    var theJobs = document.getElementById("pg4").style.display = "none";
    var theJobs = document.getElementById("pg5").style.display = "none";

    var btn1 = document.getElementById("btn1").style.background = "rgba(0, 0, 0, 0.192)";
    var btn1 = document.getElementById("btn2").style.background = "rgba(0, 0, 0, 0.192)";
    var btn1 = document.getElementById("btn3").style.background = "whitesmoke";
    var btn1 = document.getElementById("btn4").style.background = "rgba(0, 0, 0, 0.192)";
    var btn1 = document.getElementById("btn5").style.background = "rgba(0, 0, 0, 0.192)";
  }
  showJobsPage(){
    // this will show jobs
    var theMap = document.getElementById("pg1").style.display = "none";
    var theServices = document.getElementById("pg2").style.display = "none";
    var theProgs = document.getElementById("pg3").style.display = "none";
    var theJobs = document.getElementById("pg4").style.display = "block";
    var theJobs = document.getElementById("pg5").style.display = "none";

    var btn1 = document.getElementById("btn1").style.background = "rgba(0, 0, 0, 0.192)";
    var btn1 = document.getElementById("btn2").style.background = "rgba(0, 0, 0, 0.192)";
    var btn1 = document.getElementById("btn3").style.background = "rgba(0, 0, 0, 0.192)";
    var btn1 = document.getElementById("btn4").style.background = "whitesmoke";
    var btn1 = document.getElementById("btn5").style.background = "rgba(0, 0, 0, 0.192)";
  }
  showWiFiPage(){
    // this will show WiFi options
    var theMap = document.getElementById("pg1").style.display = "none";
    var theServices = document.getElementById("pg2").style.display = "none";
    var theProgs = document.getElementById("pg3").style.display = "none";
    var theJobs = document.getElementById("pg4").style.display = "none";
    var theJobs = document.getElementById("pg5").style.display = "block";

    var btn1 = document.getElementById("btn1").style.background = "rgba(0, 0, 0, 0.192)";
    var btn1 = document.getElementById("btn2").style.background = "rgba(0, 0, 0, 0.192)";
    var btn1 = document.getElementById("btn3").style.background = "rgba(0, 0, 0, 0.192)";
    var btn1 = document.getElementById("btn4").style.background = "rgba(0, 0, 0, 0.192)";
    var btn1 = document.getElementById("btn5").style.background = "whitesmoke";
  }
}
