import { Component, OnInit } from '@angular/core';
import { ClientesService} from 'src/app/services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClienteInterface } from '../../model/interfaces';

@Component({
  selector: 'app-editcliente',
  templateUrl: './editcliente.component.html',
  styleUrls: ['./editcliente.component.scss']
})
export class EditclienteComponent implements OnInit {
  editClienteForm: FormGroup;
  item: ClienteInterface;
  id:string;


errores ={
  requerido :"El campo es requerido",
  dni :"CIF/DNI incorrecto",
  longitudMax50:"La longitud máxima del campo es 50",
  longitudMin9:"La longitud mínima del campo es 50",
  email:"El mail no es correcto"
}


  etiquetas_clientes = {
    nombre: "Nombre",
    razon:"Razon social",
    dni:"CIF/DNI",
    telefono1: "Teléfono",
    telefono2: "Teléfono 2",
    fax: "Fax",
    mail :"email",
    direccion: "Dirección",
    cp: "CP",
    poblacion:"Población"
     
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
      dni:  [this.item.dni ],
      razon: [this.item.razon ],
      direccion: [this.item.direccion, Validators.required ],
      cp: [this.item.cp ],
      poblacion: [this.item.poblacion ],
      provincia:[this.item.provincia ] ,
      telefono1: [this.item.telefono1 ],
      telefono2: [this.item.telefono2 ],
      fax: [this.item.fax],
      actividad: [this.item.actividad],
      email: [this.item.email, Validators.email],
      fecha_alta: [this.item.fecha_alta],
      fecha_modif: this.getCurrentDate(),
      observaciones: [this.item.observaciones]
    });
    


  }



  onSubmit(event:Event){
    event.preventDefault();
    console.log(this.id);
    console.log(this.editClienteForm.value);
    try{
      this.firebaseService.updateCliente(this.id, this.editClienteForm.value)
      .then(
        res => {
          this.mensajes.success("Cliente " + this.item.nombre + " modificado con éxito!")
          this.router.navigate(['/tabla']);
        }
      )
    }catch(error){
      this.mensajes.error("Error al modificar cliente " + error)
    }
    console.log("FIN GUARDAR CLIENTE");
    
  }

  delete(){
    this.firebaseService.deleteUser(this.id)
    .then(
      res => {
        this.router.navigate(['/tabla']);
      },
      err => {
        console.log(err);
      }
    )
  }

  cancel(){
    this.router.navigate(['/tabla']);
  }

  getCurrentDate(){
    let date = new Date();
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    if(month < 10){
      return `${day}/0${month}/${year}`;
    }else{
      return `${day}/${month}/${year}`;
    }
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

  get dniField() {
    return this.editClienteForm.get('dni');
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
    return this.editClienteForm.get('razon');
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
    return this.editClienteForm.get('direccion');
  }
  get direccionValid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.direccionField.touched && this.direccionField.valid;
  }
  get direccionInValid() {
    //devuelve true si el campo name esta tocado y es invalido
    return this.direccionField.touched && this.direccionField.invalid;
  }

  get emailField() {
    return this.editClienteForm.get('email');
  }
  get emailValid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.emailField.touched && this.emailField.valid;
  }
  get emailInValid() {
    //devuelve true si el campo name esta tocado y es invalido
    return this.emailField.touched && this.emailField.invalid;
  }

  get cpValid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.editClienteForm.get('cp').touched ;
  }
  get poblacionValid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.editClienteForm.get('poblacion').touched ;
  }
  get provinciaValid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.editClienteForm.get('provincia').touched ;
  }

  get telefono1Valid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.editClienteForm.get('telefono1').touched ;
  }
  get telefono2Valid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.editClienteForm.get('telefono2').touched ;
  }
  get actividadValid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.editClienteForm.get('actividad').touched ;
  }
  get faxValid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.editClienteForm.get('fax').touched ;
  }
  get observacionesValid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.editClienteForm.get('observaciones').touched ;
  }

  








}
