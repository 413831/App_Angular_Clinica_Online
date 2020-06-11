import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(public afAuth: AngularFireAuth,
              public router: Router,  
              public ngZone: NgZone // NgZone service to remove outside scope warning
              )
  {    
    // Setting logged in user in localstorage else null
    this.afAuth.authState.subscribe(user =>
    {
      if (user) 
      {
        this.userData = user;
        localStorage.setItem('usuario', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('usuario'));
      } 
      else
      {
        localStorage.setItem('usuario', null);
        JSON.parse(localStorage.getItem('usuario'));
      }
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean
  {
    const user = JSON.parse(localStorage.getItem('usuario'));
    return (user !== null) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider)
  {

    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['menu']);
        })
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Sign out 
  SignOut()
  {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('usuario');
      this.router.navigate(['home']);
    })
  }
}
