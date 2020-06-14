import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public message='';
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')

  });


  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

async onLogin(){
console.log('Form: ',this.loginForm.value );
const {email,password} =this.loginForm.value;
try {
  const user =   await this.auth.login(email,password);
console.log("user", user);
if (user){
  this.router.navigate(['/home']);
}
} catch (error) {
  console.log("Error en login", error);
  
}



}

}
