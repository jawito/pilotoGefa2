import { Injectable } from '@angular/core';

import { first } from 'rxjs/operators';

import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
   public user: User;
   public loggedIn = false;
   
  constructor(public afAuth: AngularFireAuth) { 
    this.loggedIn = !!sessionStorage.getItem('user');

  }

  async login(email: string, pass: string) {
    // try {
    //   const result = await this.afAuth.signInWithEmailAndPassword(email, pass);
    //   return result;
    // } catch (error) {
    //   console.log(error);
    // }
    return await this.afAuth.signInWithEmailAndPassword(email, pass);
  }
  async logout() {
    try {
      await this.afAuth.signOut();
      console.log("logout");
      sessionStorage.setItem('user','');
      this.loggedIn =false;
    } catch (error) {
      console.log(error);
    }

  }
  async register(email: string, pass: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, pass);
      return result;
    } catch (error) {
      console.log(error);
    }

  }
  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

// Set current user in your session after a successful login
setCurrentUserMail(email: string): void {
  sessionStorage.setItem('user', email);
  this.loggedIn = true;
}

// Get currently logged in user from session
getCurrentUserMail(): string | any {
  return sessionStorage.getItem('user') || undefined;
}

isLogged():boolean{
  return  this.loggedIn ;
}


}
