import { Component, OnInit } from '@angular/core';
import { ClientesService, ClientePr } from 'src/app/services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CastExpr } from '@angular/compiler';
import { now } from 'jquery';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editcliente',
  templateUrl: './editcliente.component.html',
  styleUrls: ['./editcliente.component.scss']
})
export class EditclienteComponent implements OnInit {
  editClienteForm: FormGroup;
  item: ClientePr;
  id:string;


errores ={
  requerido :"El campo es requerido",
  longitudMax50:"La longitud máxima del campo es 50",
  email:"El mail no es correcto"
}


  etiquetas_clientes = {
    nombre: "Nombre",
    razon:"Razon social"
     
 };

  constructor(
    public firebaseService: ClientesService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router, private mensajes:ToastrService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.id=data.payload.id;
        this.item= data.payload.data();
        this.createForm();
      }
    })
  }

  createForm() {
    this.editClienteForm = this.fb.group({
      nombre: [this.item.nombre, Validators.required],
      dni:  [this.item.DNI ],
      razon: [this.item.DNI ],
      direccion: [this.item.direccion ],
      cp: [this.item.cp ],
      poblacion: [this.item.poblacion ],
      provincia:[this.item.provincia ]      ,
      pais: [this.item.pais],
      telefono1: [this.item.telefono1 ],
      telefono2: [this.item.telefono2 ],
      fax: [this.item.fax],
      actividad: [this.item.actividad],
      email: [this.item.email],
      fecha_alta: [this.item.fecha_alta],
      fecha_modif: String(now),
      observaciones: [this.item.observaciones]
    });
    


  }



  onSubmit(event:Event){
    
    try{
      this.firebaseService.updateCliente(this.id, this.item)
      .then(
        res => {
          this.mensajes.success("Cliente " + this.item.nombre + " modificado con éxito!")
      //    this.router.navigate(['/clientes']);
        }
      )
    }catch(error){
      this.mensajes.error("Error al modificar cliente " + error)
    }
    
  }

  delete(){
    this.firebaseService.deleteUser(this.id)
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
    this.router.navigate(['/clientes']);
  }

  get nombreField() {
    return this.editClienteForm.get('nombre');
  }
  get nombreValid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.nombreField.touched && this.nombreField.valid;
  }
  get nombreInValid() {
    //devuelve true si el campo name esta tocado y es invalido
    return this.nombreField.touched && this.nombreField.invalid;
  }

}
