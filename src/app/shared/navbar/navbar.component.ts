import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public user : Observable<any> =this.authentication.afAuth.user;
  constructor(private authentication: AuthService, private router:Router) {
  }

   ngOnInit():void {
    console.log("navbar");

  }
   logout() {
    console.log("OK");
    this.authentication.logout();
    this.router.navigate(['/login']);

  }

}
