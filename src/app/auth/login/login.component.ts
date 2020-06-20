import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public message='';
   loginForm:FormGroup;

private buildForm (){
  this.loginForm = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.maxLength(50),Validators.email]),
    password: new FormControl('',[Validators.required,Validators.maxLength(50)])
  
  });
  this.loginForm.valueChanges.pipe(debounceTime(1000)).subscribe(valor => {console.log(valor)});
}


  constructor(private auth:AuthService, private router:Router) { 
    //Construimos el formulario
   this.buildForm();
  }

  ngOnInit(): void {
  }

async onLogin(event:Event){
  //para evitar que recarge a lo tonto el navedador se cancela el evento nativo
  event.preventDefault();
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
