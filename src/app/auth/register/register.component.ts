import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    password2: new FormControl('')
  });

  constructor(private auth:AuthService, private router: Router) { }

  ngOnInit(): void {
  }
 async onRegister(){
   const {email,password,password2} = this.registerForm.value;
   console.log("Formulario: ",this.registerForm.value);
   console.log("email:"+email);
   console.log("pass:"+password);
   try {
    const user= await  this.auth.register(email, password);
    if (user ){
      this.router.navigate(['home']);
    }
   } catch (error) {
     
   }
  
    
  }
}
