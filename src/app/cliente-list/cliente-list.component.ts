import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service';
import {Cliente} from '../interfaces/cliente'

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
  fileToUpload: File = null;
  texto: string[];
  usersJson: Cliente[];
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

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log("handleFileInput");
    console.log(this.fileToUpload);
  }




  uploadDocument() {
    let fileReader = new FileReader();
    console.log(fileReader.readAsText(this.fileToUpload));

  }

  deleteOrder = (data: any) => this.clientesService.deleteCliente(data);

  markCompleted = (data: any) => this.clientesService.updateCliente(data);

  pintaClientes(event: Event) {
    this.uploadDocument();
    const datos = {
      nombre: "manolo",
      numero: Math.round(Math.random() * 100)
    }
        this.clientesService.createPruebaCliente(datos);

    console.log(this.clientes);
  }
}


