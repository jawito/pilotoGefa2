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


}
