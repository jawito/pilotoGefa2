import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ClientesService } from 'src/app/services/clientes.service';


@Component({
  selector: 'app-addcliente',
  templateUrl: './addcliente.component.html',
  styleUrls: ['./addcliente.component.scss']
})
export class AddclienteComponent implements OnInit {
  public message = '';
  addClienteForm: FormGroup;

  private buildForm() {
    this.addClienteForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      edad: new FormControl('', [Validators.required, Validators.maxLength(3)]),
      dni: new FormControl('', [Validators.required, Validators.maxLength(9), Validators.minLength(9)]),
      razon: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      direccion: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      cp: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      poblacion: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      provincia: new FormControl('valladolid', [Validators.required]),
      pais: new FormControl('España', [Validators.required, Validators.maxLength(50)]),
      telefono1: new FormControl('', [Validators.required, Validators.maxLength(9)]),
      telefono2: new FormControl('', [Validators.required, Validators.maxLength(9)]),
      fax: new FormControl('', [Validators.required, Validators.maxLength(9)]),
      actividad: new FormControl('', [Validators.required, Validators.maxLength(150)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.email]),
      fecha_alta: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      fecha_modif: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      observaciones: new FormControl('', [Validators.required, Validators.maxLength(100)]),




    });
    this.addClienteForm.valueChanges.pipe(debounceTime(1000)).subscribe(valor => { console.log(valor) });
  }


  constructor(private clientesService: ClientesService) {
    //Construimos el formulario
    this.buildForm();
  }

  ngOnInit(): void {
  }
  //
  async onAdd(event: Event) {
    //para evitar que recarge a lo tonto el navedador se cancela el evento nativo
    event.preventDefault();
    console.log('Form: ', this.addClienteForm.value);

    try {
      this.clientesService.createCliente(this.addClienteForm.value);
    } catch (error) {
      console.log(error);
    }






  }

  //getters
  get emailField() {
    return this.addClienteForm.get('email');
  }
  get emailValid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.emailField.touched && this.emailField.valid;
  }
  get emailInValid() {
    //devuelve true si el campo name esta tocado y es invalido
    return this.emailField.touched && this.emailField.invalid;
  }
  get nombreField() {
    return this.addClienteForm.get('nombre');
  }
  get nombreValid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.nombreField.touched && this.nombreField.valid;
  }
  get nombreInValid() {
    //devuelve true si el campo name esta tocado y es invalido
    return this.nombreField.touched && this.nombreField.invalid;
  }
  get edadField() {
    return this.addClienteForm.get('edad');
  }
  get edadValid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.edadField.touched && this.edadField.valid;
  }
  get edadInValid() {
    //devuelve true si el campo name esta tocado y es invalido
    return this.edadField.touched && this.edadField.invalid;
  }
  get dniField() {
    return this.addClienteForm.get('dni');
  }
  get dniValid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.dniField.touched && this.dniField.valid;
  }
  get dniInValid() {
    //devuelve true si el campo name esta tocado y es invalido
    return this.dniField.touched && this.dniField.invalid;
  }
  get razonField() {
    return this.addClienteForm.get('razon');
  }
  get razonValid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.razonField.touched && this.razonField.valid;
  }
  get razonInValid() {
    //devuelve true si el campo name esta tocado y es invalido
    return this.razonField.touched && this.razonField.invalid;
  }
  get direccionField() {
    return this.addClienteForm.get('direccion');
  }
  get direccionValid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.direccionField.touched && this.direccionField.valid;
  }
  get direccionInValid() {
    //devuelve true si el campo name esta tocado y es invalido
    return this.direccionField.touched && this.direccionField.invalid;
  }
  get cpField() {
    return this.addClienteForm.get('cp');
  }
  get cpValid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.cpField.touched && this.cpField.valid;
  }
  get cpInValid() {
    //devuelve true si el campo name esta tocado y es invalido
    return this.cpField.touched && this.cpField.invalid;
  }
  get poblacionField() {
    return this.addClienteForm.get('poblacion');
  }
  get poblacionValid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.poblacionField.touched && this.poblacionField.valid;
  }
  get poblacionInValid() {
    //devuelve true si el campo name esta tocado y es invalido
    return this.poblacionField.touched && this.poblacionField.invalid;
  }
  get provinciaField() {
    return this.addClienteForm.get('provincia');
  }
  get provinciaValid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.provinciaField.touched && this.provinciaField.valid;
  }
  get provinciaInValid() {
    //devuelve true si el campo name esta tocado y es invalido
    return this.provinciaField.touched && this.provinciaField.invalid;
  }
  get paisField() {
    return this.addClienteForm.get('pais');
  }
  get paisValid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.paisField.touched && this.paisField.valid;
  }
  get paisInValid() {
    //devuelve true si el campo name esta tocado y es invalido
    return this.paisField.touched && this.paisField.invalid;
  }
  get telefono1Field() {
    return this.addClienteForm.get('telefono1');
  }
  get telefono1Valid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.telefono1Field.touched && this.telefono1Field.valid;
  }
  get telefono1InValid() {
    //devuelve true si el campo name esta tocado y es invalido
    return this.telefono1Field.touched && this.telefono1Field.invalid;
  }
  get telefono2Field() {
    return this.addClienteForm.get('telefono2');
  }
  get telefono2Valid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.telefono2Field.touched && this.telefono2Field.valid;
  }
  get telefono2InValid() {
    //devuelve true si el campo name esta tocado y es invalido
    return this.telefono2Field.touched && this.telefono2Field.invalid;
  }
  get faxField() {
    return this.addClienteForm.get('fax');
  }
  get faxValid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.faxField.touched && this.faxField.valid;
  }
  get faxInValid() {
    //devuelve true si el campo name esta tocado y es invalido
    return this.faxField.touched && this.faxField.invalid;
  }
  get actividadField() {
    return this.addClienteForm.get('actividad');
  }
  get actividadValid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.actividadField.touched && this.actividadField.valid;
  }
  get actividadInValid() {
    //devuelve true si el campo name esta tocado y es invalido
    return this.actividadField.touched && this.actividadField.invalid;
  }
  get fecha_altaField() {
    return this.addClienteForm.get('fecha_alta');
  }
  get fecha_altaValid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.fecha_altaField.touched && this.fecha_altaField.valid;
  }
  get fecha_altaInValid() {
    //devuelve true si el campo name esta tocado y es invalido
    return this.fecha_altaField.touched && this.fecha_altaField.invalid;
  }
  get fecha_modifField() {
    return this.addClienteForm.get('fecha_modif');
  }
  get fecha_modifValid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.fecha_modifField.touched && this.fecha_modifField.valid;
  }
  get fecha_modifInValid() {
    //devuelve true si el campo name esta tocado y es invalido
    return this.fecha_modifField.touched && this.fecha_modifField.invalid;
  }
   get observacionesField() {
    return this.addClienteForm.get('observaciones');
  }
  get observacionesValid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.observacionesField.touched && this.observacionesField.valid;
  }
  get observacionesInValid() {
    //devuelve true si el campo name esta tocado y es invalido
    return this.observacionesField.touched && this.observacionesField.invalid;
  }
}
