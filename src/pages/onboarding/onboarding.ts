import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginRegisterPage } from '../login-register/login-register';
import { FormsPage } from '../forms/forms';
import { HomePage } from '../home/home';
import { HubsProvider } from '../../providers/hubs/hubs'
/**
 * Generated class for the LandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
})
export class OnboardingPage {

  Username;
  contact;
  postiondesc;
  downloadurl ="../../assets/user.png";
  Postion;
  email = this.navParams.get("email")
  constructor(public navCtrl: NavController, public navParams: NavParams,public hubs :HubsProvider ) {
    console.log(this.email)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }


  nextpage() {
    console.log(`click`);
    let slide1 = document.getElementsByClassName('slide1') as HTMLCollectionOf<HTMLElement>;
    let slide2 = document.getElementsByClassName('slide2') as HTMLCollectionOf<HTMLElement>;
    let slide3 = document.getElementsByClassName('slide3') as HTMLCollectionOf<HTMLElement>;
    let wave = document.getElementsByClassName('wave') as HTMLCollectionOf<HTMLElement>;
    if (slide1[0].style.display == "flex") {
      console.log(`if`);
      slide1[0].style.display = "none"
      slide2[0].style.display = "block"

    } else if (slide1[0].style.display == "none") {
      console.log(`else if`);
    }
    else {
      console.log(`else`);
      slide1[0].style.display = "none"
      slide2[0].style.display = "block"
      wave[0].style.transform = 'translate(-350px,0px)';
    }
  }
  nextpage2() {
    console.log(`click`);
    let slide1 = document.getElementsByClassName('slide1') as HTMLCollectionOf<HTMLElement>;
    let slide2 = document.getElementsByClassName('slide2') as HTMLCollectionOf<HTMLElement>;
    let slide3 = document.getElementsByClassName('slide3') as HTMLCollectionOf<HTMLElement>;
    let wave = document.getElementsByClassName('wave') as HTMLCollectionOf<HTMLElement>;
    if (slide2[0].style.display == "flex") {
      console.log(`if`);
      slide2[0].style.display = "none"
      slide3[0].style.display = "block"

    } else if (slide2[0].style.display == "none") {
      console.log(`else if`);
    }
    else {
      console.log(`else`);
      slide2[0].style.display = "none"
      slide3[0].style.display = "block"
      wave[0].style.transform = 'translate(-500px,0px)';
    }
  }
  prevpage() {
    console.log(`click`);
    let slide1 = document.getElementsByClassName('slide1') as HTMLCollectionOf<HTMLElement>;
    let slide2 = document.getElementsByClassName('slide2') as HTMLCollectionOf<HTMLElement>;
    let slide3 = document.getElementsByClassName('slide3') as HTMLCollectionOf<HTMLElement>;
    let wave = document.getElementsByClassName('wave') as HTMLCollectionOf<HTMLElement>;
    if (slide2[0].style.display == "flex") {
      console.log(`if`);
      slide2[0].style.display = "none"
      slide3[0].style.display = "block"

    } else if (slide2[0].style.display == "none") {
      console.log(`else if`);
    }
    else {
      console.log(`else`);
      slide2[0].style.display = "none"
      slide1[0].style.display = "block"
      wave[0].style.transform = 'translate(500px,0px)';
    }
  }
  prevpage2() {
    console.log(`click`);
    let slide1 = document.getElementsByClassName('slide1') as HTMLCollectionOf<HTMLElement>;
    let slide2 = document.getElementsByClassName('slide2') as HTMLCollectionOf<HTMLElement>;
    let slide3 = document.getElementsByClassName('slide3') as HTMLCollectionOf<HTMLElement>;
    let wave = document.getElementsByClassName('wave') as HTMLCollectionOf<HTMLElement>;
    if (slide3[0].style.display == "flex") {
      console.log(`if`);
      slide2[0].style.display = "none"
      slide3[0].style.display = "block"

    } else if (slide2[0].style.display == "none") {
      console.log(`else if`);
      slide3[0].style.display = "none"
      slide2[0].style.display = "block"
      wave[0].style.transform = 'translate(350px,0px)';
    }
    else {
      console.log(`else`);
      slide3[0].style.display = "none"
      slide2[0].style.display = "block"
      wave[0].style.transform = 'translate(-500px,0px)';
    }
  }



  // =====================================================================================================================================================================


  moveToPage1() {
    var progBar = document.getElementById("wave");
    var toSlide = document.getElementById("box-cont");
    var progDot = document.getElementById("dot2");
    var skipper = document.getElementById("skipper").style.display = "block";
    progDot.style.height = "10px"
    toSlide.style.marginLeft = "-100%";
    progBar.style.marginLeft = "-20%"


    this.hubs.getUserProfile(this.Username,this.contact,this.Postion,this.postiondesc,this.downloadurl).then((data)=>{
      console.log(data)
    })
  }
  insertpic(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
        reader.onload = (event: any) => {
          this.downloadurl = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
      }

    }


  moveToPage2() {
    var progBar = document.getElementById("wave");
    var toSlide = document.getElementById("box-cont");
    var progDot = document.getElementById("dot3");
    var skipper = document.getElementById("skipper").style.display = "block";
    progDot.style.height = "10px"
    toSlide.style.marginLeft = "-200%";
    progBar.style.marginLeft = "-30%"
  }
  moveToPage3() {
    var progBar = document.getElementById("wave");
    var toSlide = document.getElementById("box-cont");
    var progDot = document.getElementById("dot4");
    var skipper = document.getElementById("skipper").style.display = "none";
    progDot.style.height = "10px"
    toSlide.style.marginLeft = "-300%";
    progBar.style.marginLeft = "-40%"
  }
  moveToPage4() {
    var toSlide = document.getElementById("box-cont");
    var progBar = document.getElementById("wave");
    var skipper = document.getElementById("skipper").style.display = "none";
    toSlide.style.marginLeft = "-400%";
    progBar.style.marginLeft = "-50%";
    
  }
  backToPage3() {
    var progressBar = document.getElementById("wave");
    var toSlide = document.getElementById("box-cont");
    var progDot = document.getElementById("dot4");
    var skipper = document.getElementById("skipper").style.display = "block";
    toSlide.style.marginLeft = "-200%";
    progressBar.style.marginLeft = "-30%";
    progDot.style.height = "0px"
  }
  backToPage2() {
    var progressBar = document.getElementById("wave");
    var toSlide = document.getElementById("box-cont");
    var progDot = document.getElementById("dot3");
    var skipper = document.getElementById("skipper").style.display = "block";
    progDot.style.height = "0px"
    toSlide.style.marginLeft = "-100%";
    progressBar.style.marginLeft = "-20%"
  }
  backToPage1() {
    var progressBar = document.getElementById("wave");
    var toSlide = document.getElementById("box-cont");
    var progDot = document.getElementById("dot2");
    var skipper = document.getElementById("skipper").style.display = "none";
    progDot.style.height = "0px"
    toSlide.style.marginLeft = "0%";
    progressBar.style.marginLeft = "0%"
  }
  getStarted(){
    this.navCtrl.setRoot(HomePage) 
  }
}