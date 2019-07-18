import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HubsProvider } from '../../providers/hubs/hubs'
import { HomePage } from '../home/home';
import { AddOrganizationPage } from '../add-organization/add-organization';
import swal from "sweetalert";
import Swal from "sweetalert2";
import { FormsPage } from '../forms/forms';
import { OnboardingPage } from '../onboarding/onboarding';

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
  alertMessage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public hubs: HubsProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginRegisterPage');
  }


  //signIn Method
  Login() {
    console.log(this.email);
    let b = window.innerHeight;

    if (
      this.email == "" ||
      (this.email == undefined && this.password == "") ||
      this.password == undefined
    ) {
      this.alertMessage =
        "Please insert your email address and password to sign in.";

      swal(this.alertMessage);
    } else if (this.email == "" || this.email == undefined) {
      this.alertMessage = "Please insert your email address";

      swal(this.alertMessage);
    } else if (this.password == "" || this.password == undefined) {
      this.alertMessage = "Please insert your password";

      swal(this.alertMessage);
    } else {
      Swal.fire({
        title: "Loading",
        html: this.alertMessage,
        // timer: 4000,
        onBeforeOpen: () => {
          Swal.showLoading();
        }
      }).then(result => { });
      this.alertMessage = "Signing in...";
      if (this.email != "" && this.email != "") {
        this.hubs.SignIn(this.email, this.password).then(() => {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: "success",
            title: "Signed in successfully"
          });
          this.navCtrl.setRoot(HomePage)
        }).catch((Error) => {
          if (
            Error.message ==
            "There is no user record corresponding to this identifier. The user may have been deleted."
          ) {
            this.alertMessage =
              "We do not have a record of this email address, please check your email address or sign up and get started...";
            Swal.hideLoading();
          } else if (
            Error.message ==
            "The password is invalid or the user does not have a password."
          ) {
            this.alertMessage =
              "Please ensure that your password is correct.";
            Swal.hideLoading();
          } else if (
            Error.message == "The email address is badly formatted."
          ) {
            this.alertMessage =
              "Please check if your email address is correct, something's not right.";
            Swal.hideLoading();
          } else {
            "Please check if your email address or password is correct, something's not right.";
            Swal.hideLoading();
          }
          swal(this.alertMessage);
          Swal.close();
        })
      } else {
        const alert = this.alertCtrl.create({
          cssClass: "myAlert",
          title: '',
          subTitle: 'Please enter your email and password ',
          buttons: ['OK']
        });
        alert.present();
      }
    }
  }


  //forgotpassword
  forgotpassword(PlaceObject: object) {
    let b = window.innerHeight;
    return new Promise((resolve, reject) => {
    if (this.email == null || this.email == undefined) {
        const alert = this.alertCtrl.create({
          cssClass: "myAlert",
          title: 'Forgot your password?',
          message: "We just need your registered email address to reset your password.",
          inputs: [
            {
              name: 'email',
              type: 'email',
              placeholder: 'Your email address'
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Send',
              handler: data => {
                this.hubs.forgetPassword(data.email).then(() => {
                  this.alertMessage ="Please check your email to reset your password";
                  swal(this.alertMessage);
                }, Error => {
                  this.alertMessage = Error.message;
                  swal(this.alertMessage);
                  resolve()
                });
              }
            }
          ],
        });
        alert.present();
      }
      else if (this.email != null || this.email != undefined) {
        firebase.auth().sendPasswordResetEmail(this.email).then(() => {
          this.alertMessage ="We've sent you and email with a reset link, go to your email to recover your account."
          swal(this.alertMessage);
          resolve()
        }, Error => {
          if (
            Error.message ==
            "There is no user record corresponding to this identifier. The user may have been deleted."
          ) {
            this.alertMessage =
              "We do not have a record of this email address, please check your email address or sign up and get started...";
            Swal.hideLoading();
          } else if (
            Error.message ==
            "The password is invalid or the user does not have a password."
          ) {
            this.alertMessage =
              "Please ensure that your password is correct.";
            Swal.hideLoading();
          } else if (
            Error.message == "The email address is badly formatted."
          ) {
            this.alertMessage =
              "Please check if your email address is correct, something's not right.";
            Swal.hideLoading();
          } else {
            "Please check if your email address or password is correct, something's not right.";
            Swal.hideLoading();
          }
          swal(this.alertMessage);
          Swal.close();
        });
      }
    
    }).catch((Error) => {
      if (
        Error.message ==
        "There is no user record corresponding to this identifier. The user may have been deleted."
      ) {
        this.alertMessage =
          "We do not have a record of this email address, please check your email address or sign up and get started...";
        Swal.hideLoading();
      } else if (
        Error.message ==
        "The password is invalid or the user does not have a password."
      ) {
        this.alertMessage =
          "Please ensure that your password is correct.";
        Swal.hideLoading();
      } else if (
        Error.message == "The email address is badly formatted."
      ) {
        this.alertMessage =
          "Please check if your email address is correct, something's not right.";
        Swal.hideLoading();
      } else {
        "Please check if your email address or password is correct, something's not right.";
        Swal.hideLoading();
      }
      swal(this.alertMessage);
      Swal.close();
    })
  }


  //register Method
  regsiter() {
    console.log(this.signUpEmail);
    let b = window.innerHeight;

    if (
      this.signUpEmail == "" ||
      (this.signUpEmail == undefined && this.signUpPassword == "") ||
      this.signUpPassword == undefined
    ) {
      this.alertMessage =
        "Please insert your email address and password to sign up.";

      swal(this.alertMessage);
    } else if (this.signUpEmail == "" || this.signUpEmail == undefined) {
      this.alertMessage = "Please insert your email address";

      swal(this.alertMessage);
    } else if (this.signUpPassword == "" || this.signUpPassword == undefined) {
      this.alertMessage = "Please insert your password";

      swal(this.alertMessage);
    } else {
      Swal.fire({
        title: "Loading",
        html: this.alertMessage,
        // timer: 4000,
        onBeforeOpen: () => {
          Swal.showLoading();
        }
      }).then(result => { });
      this.alertMessage = "Signing up...";
    if (this.signUpEmail != "" && this.signUpPassword != "") {
      this.hubs.signUp(this.signUpEmail, this.signUpPassword).then(() => {
        this.navCtrl.push(FormsPage, { email: this.signUpEmail })
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: "success",
          title: "Signed up successfully"
        });
        // this.navCtrl.setRoot(HomePage)
      }).catch((Error) => {
        if (
          Error.message ==
          "There is no user record corresponding to this identifier. The user may have been deleted."
        ) {
          this.alertMessage =
            "We do not have a record of this email address, please check your email address or sign up and get started...";
          Swal.hideLoading();
        } else if (
          Error.message ==
          "The password is invalid or the user does not have a password."
        ) {
          this.alertMessage =
            "Please ensure that your password is correct.";
          Swal.hideLoading();
        } else if (
          Error.message == "The email address is badly formatted."
        ) {
          this.alertMessage =
            "Please check if your email address is correct, something's not right.";
          Swal.hideLoading();
        } else {
          "Please check if your email address or password is correct, something's not right.";
          Swal.hideLoading();
          //  this.alertMessage = Error.message;
        }

        swal(this.alertMessage);
        Swal.close();
      })
    } else {
      const alert = this.alertCtrl.create({
        cssClass: "myAlert",
        title: '',
        subTitle: 'Please enter your email and password ',
        buttons: ['OK']
      });
      alert.present();
    }
  }
}
  switchlogin() {

    console.log(`click`);
    let left = document.getElementsByClassName('login') as HTMLCollectionOf<HTMLElement>;
    let right = document.getElementsByClassName('signup') as HTMLCollectionOf<HTMLElement>;
    let background = document.getElementsByClassName('left') as HTMLCollectionOf<HTMLElement>;
    let covercontent = document.getElementsByClassName('cover') as HTMLCollectionOf<HTMLElement>;
    if (left[0].style.display == "flex") {
      console.log(`if`);
      left[0].style.display = "none"
      right[0].style.display = "block"

    } else if (left[0].style.display == "none") {
      console.log(`else if`);
      left[0].style.display = "block"
      right[0].style.display = "none"
      //  background[0].style.backgroundColor = "#dfde80"
      //  covercontent[0].style.backgroundColor = "#dfde80"
    }
    else {
      console.log(`else`);
      left[0].style.display = "none"
      right[0].style.display = "block"
      // background[0].style.backgroundColor = "#abdf80"
      // covercontent[0].style.backgroundColor = "#abdf80"
    }
  }
  logohide() {
    console.log(`click`);

  }
}