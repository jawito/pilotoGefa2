import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CanEditGuard implements CanActivate {
  
  constructor(private auth: AuthService, private router: Router, private toastr: ToastrService) { }



  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // If the user is not logged in we'll send them back to the home page
    console.log('Islogged', this.auth.isLogged());
    
    if (!this.auth.isLogged()) {
      this.toastr.warning("No estás logueado, no puedes acceder");
      
      console.log('No estás logueado');
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}


///



