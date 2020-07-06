import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editcliente',
  templateUrl: './editcliente.component.html',
  styleUrls: ['./editcliente.component.scss']
})
export class EditclienteComponent implements OnInit {
  editClienteForm: FormGroup;
  item: any;

  validation_messages = {
   'name': [
     { type: 'required', message: 'Name is required.' }
   ],
   'surname': [
     { type: 'required', message: 'Surname is required.' }
   ],
   'age': [
     { type: 'required', message: 'Age is required.' },
   ]
 };

  constructor(
    public firebaseService: ClientesService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    })
  }

  createForm() {
    this.editClienteForm = this.fb.group({
      nombre: [this.item.nombre, Validators.required],
      edad:  [this.item.edad],
      dni:  [this.item.DNI ],
      razon:  [this.item.razon, Validators.required],
      direccion:  [this.item.direccion, Validators.required],
      cp:  [this.item.cp],
      poblacion:  [this.item.poblacion],
      provincia:  [this.item.provincia],
      pais: [this.item.pais, Validators.required],
      telefono1:  [this.item.telefono, Validators.required],
      telefono2:  [this.item.telefono2, Validators.required],
      fax:  [this.item.fax, Validators.required],
      actividad:  [this.item.actividad],
      email: [this.item.email],
      fecha_alta:  [this.item.fecha_alta],
      fecha_modif:  [this.item.fecha_modif],//TODO sysdate
      observaciones:  [this.item.observaciones ]
    });
    


  }



  onSubmit(value){
    this.firebaseService.updateCliente(this.item)
    .then(
      res => {
        this.router.navigate(['/clientes']);
      }
    )
  }

  delete(){
    this.firebaseService.deleteUser(this.item.id)
    .then(
      res => {
        this.router.navigate(['/clientes']);
      },
      err => {
        console.log(err);
      }
    )
  }

  cancel(){
    this.router.navigate(['/home']);
  }

}
