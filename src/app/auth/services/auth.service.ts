import { Injectable } from '@angular/core';

import { first } from 'rxjs/operators';

import { auth } from 'firebase/app';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User;
  constructor(public afAuth: AngularFireAuth) { }

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
}
