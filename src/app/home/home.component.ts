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
  email:[(''), [Validators.required]]

});

//escuchar cambios de un controlador
this.emailCtrl.valueChanges.subscribe(valor=>(console.log(valor)));
// si queremos que espere un tiempo debounceTime en ms
this.emailCtrl.valueChanges.pipe(debounceTime(2000)).subscribe(valor=>(console.log('retardo '+valor, this.emailCtrl)));





  }

  ngOnInit(): void {
  }

//Metodo para obtener el valor de un input ejemplo el email
getEmail (event : Event){
  //cancelamos la funcionalidad del evento por defecto
  event.preventDefault();
  console.log(this.emailCtrl.value);
}

}
