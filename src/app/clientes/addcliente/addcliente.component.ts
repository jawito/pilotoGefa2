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

      email: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.email]),
      telefono: new FormControl('', [Validators.required, Validators.maxLength(50)])

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
}
