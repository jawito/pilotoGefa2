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
      name: [this.item.name, Validators.required],
      surname: [this.item.surname, Validators.required],
      age: [this.item.age, Validators.required]
    });
  }



  onSubmit(value){
    value.avatar = this.item.avatar;
    value.age = Number(value.age);
    this.firebaseService.updateUser(this.item.id, value)
    .then(
      res => {
        this.router.navigate(['/home']);
      }
    )
  }

  delete(){
    this.firebaseService.deleteUser(this.item.id)
    .then(
      res => {
        this.router.navigate(['/home']);
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
