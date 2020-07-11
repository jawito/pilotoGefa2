import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service';


@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent implements OnInit {

  constructor(private clientesService: ClientesService) { }

  ngOnInit() {
    this.getClientes();
  }

  clientes;


  getClientes = () => {
    return this.clientesService
      .getClientes()
      .subscribe(res => {
        (
          this.clientes = res

        )
      });
  };



  deleteOrder = (data: any) => this.clientesService.deleteCliente(data);

 // markCompleted = (data: any) => this.clientesService.updateCliente(data);

  pintaClientes(event: Event) {

    const datos = {
      nombre: "manolo",
      numero: Math.round(Math.random() * 100)
    }
        this.clientesService.createPruebaCliente(datos);

    console.log(this.clientes);
  }
}


