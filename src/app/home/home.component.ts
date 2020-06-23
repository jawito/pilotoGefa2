import { Component, OnInit } from '@angular/core';
import { FormControl, Validators , FormBuilder, FormGroup} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formGrupo : FormGroup;
  //Los campos del formularaio se declaran como formControls
  emailCtrl = new FormControl('',[Validators.required, Validators.minLength(4)]);
  constructor(private formbuilder :FormBuilder) { 
//Para crear un formGroup:
this.formGrupo = formbuilder.group({
  name:[(''), [Validators.required]],
  telefono:[(''), [Validators.required,Validators.max(999999999999),Validators.min(100000000)]]

});

//escuchar cambios de un controlador
this.emailCtrl.valueChanges.subscribe(valor=>(console.log(valor)));
// si queremos que espere un tiempo debounceTime en ms
this.emailCtrl.valueChanges.pipe(debounceTime(2000)).subscribe(valor=>(console.log('retardo '+valor, this.emailCtrl)));

this.formGrupo.valueChanges.pipe(debounceTime(1000)).subscribe(valor=>(console.log(valor)));



  }

  ngOnInit(): void {
  }

//Metodo para obtener el valor de un input ejemplo el email
getEmail (event : Event){
  //cancelamos la funcionalidad del evento por defecto
  event.preventDefault();
  console.log(this.emailCtrl.value);
}

onSave (event : Event){
  //cancelamos la funcionalidad del evento por defecto
  event.preventDefault();
  console.log(this.formGrupo.value);
  
}
//getters
get nameField (){
return this.formGrupo.get('name');
}

get telefonoField (){
  return this.formGrupo.get('telefono');
  }
get nameValid(){
  //devuelve true si el campo name esta tocado y es valido
  return this.nameField.touched && this.nameField.valid;
}
get nameInValid(){
  //devuelve true si el campo name esta tocado y es invalido
  return this.nameField.touched && this.nameField.invalid;
}

get telefonoValid(){
  
  return this.telefonoField.touched && this.telefonoField.valid;
}
get telefonoInValid(){
  
  return this.telefonoField.touched && this.telefonoField.invalid;
}



}
