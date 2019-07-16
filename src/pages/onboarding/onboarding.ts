import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
​
@IonicPage()
@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
})
export class OnboardingPage {
​
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
​
  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }
  

  nextpage() {
    console.log(`click`);
     let slide1 = document.getElementsByClassName('slide1') as HTMLCollectionOf<HTMLElement>;
     let slide2 = document.getElementsByClassName('slide2') as HTMLCollectionOf<HTMLElement>;
     let slide3 = document.getElementsByClassName('slide3') as HTMLCollectionOf<HTMLElement>;
     let wave = document.getElementsByClassName('wave') as HTMLCollectionOf<HTMLElement>;
   if (slide1[0].style.display == "flex" ) {
    console.log(`if`);
    slide1[0].style.display = "none"
    slide2[0].style.display = "block"
    
   } else if(slide1[0].style.display == "none"){
     console.log(`else if`);
   }
   else{
  console.log(`else`);
  slide1[0].style.display = "none"
  slide2[0].style.display = "block" 
  wave[0].style.transform = 'translate(-150px,0px)'; 
   }
  }
  nextpage2() {
    console.log(`click`);
     let slide1 = document.getElementsByClassName('slide1') as HTMLCollectionOf<HTMLElement>;
     let slide2 = document.getElementsByClassName('slide2') as HTMLCollectionOf<HTMLElement>;
     let slide3 = document.getElementsByClassName('slide3') as HTMLCollectionOf<HTMLElement>;
     let wave = document.getElementsByClassName('wave') as HTMLCollectionOf<HTMLElement>;
   if (slide2[0].style.display == "flex" ) {
    console.log(`if`);
    slide2[0].style.display = "none"
    slide3[0].style.display = "block"
    
   } else if(slide2[0].style.display == "none"){
     console.log(`else if`);
    //  slide2[0].style.display = "block" 
    //  slide3[0].style.display = "none"
    //  wave[0].style.transform = 'translate(300px,0px)'; 
   }
   else{
  console.log(`else`);
  slide2[0].style.display = "none"
  slide3[0].style.display = "block" 
  wave[0].style.transform = 'translate(-300px,0px)'; 
   }
  }
  prevpage() {
    console.log(`click`);
     let slide1 = document.getElementsByClassName('slide1') as HTMLCollectionOf<HTMLElement>;
     let slide2 = document.getElementsByClassName('slide2') as HTMLCollectionOf<HTMLElement>;
     let slide3 = document.getElementsByClassName('slide3') as HTMLCollectionOf<HTMLElement>;
     let wave = document.getElementsByClassName('wave') as HTMLCollectionOf<HTMLElement>;
   if (slide2[0].style.display == "flex" ) {
    console.log(`if`);
    slide2[0].style.display = "none"
    slide3[0].style.display = "block"
    
   } else if(slide2[0].style.display == "none"){
     console.log(`else if`);
   }
   else{
  console.log(`else`);
  slide2[0].style.display = "none"
  slide1[0].style.display = "block" 
  wave[0].style.transform = 'translate(300px,0px)'; 
   }
  }
  prevpage2() {
    console.log(`click`);
     let slide1 = document.getElementsByClassName('slide1') as HTMLCollectionOf<HTMLElement>;
     let slide2 = document.getElementsByClassName('slide2') as HTMLCollectionOf<HTMLElement>;
     let slide3 = document.getElementsByClassName('slide3') as HTMLCollectionOf<HTMLElement>;
     let wave = document.getElementsByClassName('wave') as HTMLCollectionOf<HTMLElement>;
   if (slide3[0].style.display == "flex" ) {
    console.log(`if`);
    slide2[0].style.display = "none"
    slide3[0].style.display = "block"
    
   } else if(slide2[0].style.display == "none"){
     console.log(`else if`);
     slide3[0].style.display = "none"
     slide2[0].style.display = "block" 
     wave[0].style.transform = 'translate(150px,0px)'; 
   }
   else{
  console.log(`else`);
  slide3[0].style.display = "none"
  slide2[0].style.display = "block" 
  wave[0].style.transform = 'translate(-300px,0px)'; 
   }
  }
}