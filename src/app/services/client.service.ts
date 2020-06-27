import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireDatabaseModule} from '@angular/fire/database'
import {Client} from '../models/client'


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientList: AngularFireList<any>;
  //almacena temporalmente el campo elegido
  selectClient: Client = new Client();

  constructor(private firebase: AngularFireDatabase) { }


  getClient(){

    return this.clientList = this.firebase.list('clients')
  }

  insertClient(client: Client){

    this.clientList.push({
      name: client.name,
      direction: client.direccion,
      cp: client.cp,
      telefono: client.telefono
    });
  }

  updateClient(client: Client){

    this.clientList.update(client.$key, {
      name: client.name,
      direction: client.direccion,
      cp: client.cp,
      telefono: client.telefono
    });
  }
  deleteCliente($key: string){

    this.clientList.remove($key);
  }
}
