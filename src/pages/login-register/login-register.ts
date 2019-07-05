import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HubsProvider } from '../../providers/hubs/hubs'
import { HomePage } from '../home/home';
import { AddOrganizationPage } from '../add-organization/add-organization';


declare var firebase;
/**
 * Generated class for the LoginRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-register',
  templateUrl: 'login-register.html',
})
export class LoginRegisterPage {
  //variables
  email;
  password;
  signUpEmail;
  signUpPassword;
  message;

  constructor(public navCtrl: NavController, public navParams: NavParams , public hubs : HubsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginRegisterPage');
  }


  //signIn Method
  Login(){
   this.hubs.SignIn(this.email,this.password).then(()=>{
    this.navCtrl.setRoot(HomePage)
   }).catch((Error)=>{
     Error.message
     console.log(Error)
   })
  }

  //register Method
  regsiter(){
    console.log(this.signUpEmail,this.signUpPassword)
    this.hubs.signUp(this.signUpEmail,this.signUpPassword).then(()=>{
      this.navCtrl.setRoot(HomePage)
      this.navCtrl.push(AddOrganizationPage, { email: this.signUpEmail })
      console.log(this.signUpEmail)
    }).catch((Error) => {
      Error.message;
    })
  }
switchlogin() {
  console.log(`click`);
   let left = document.getElementsByClassName('login') as HTMLCollectionOf<HTMLElement>;
   let right = document.getElementsByClassName('signup') as HTMLCollectionOf<HTMLElement>;
   let background = document.getElementsByClassName('left') as HTMLCollectionOf<HTMLElement>;
   let covercontent = document.getElementsByClassName('cover') as HTMLCollectionOf<HTMLElement>;
 if (left[0].style.display == "flex" ) {
  console.log(`if`);
  left[0].style.display = "none"
  right[0].style.display = "block"
  
 } else if(left[0].style.display == "none"){
   console.log(`else if`);
   left[0].style.display = "block" 
   right[0].style.display = "none"
   background[0].style.backgroundColor = "#dfde80"
   covercontent[0].style.backgroundColor = "#dfde80"
 }
 else{
console.log(`else`);
left[0].style.display = "none"
right[0].style.display = "block" 
background[0].style.backgroundColor = "#abdf80"
covercontent[0].style.backgroundColor = "#abdf80"
 }
}

}
