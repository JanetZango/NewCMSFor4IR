import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {


  }

  displayOrganizatins() {

  }
  m = 0
  showMoreDetails() {
    var detailsOrg = document.getElementById("misc");
    if(this.m == 0){
      this.m = 1;
      detailsOrg.style.maxHeight = "1000px"
    }
    else{
      this.m = 0;
      detailsOrg.style.maxHeight = "35px"
    }
  }
}
