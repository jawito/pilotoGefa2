import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ClienteInterface } from '../model/interfaces';

@Injectable({
  providedIn: "root"
})
export class ClientesService {
  constructor(private firestore: AngularFirestore) {}
  private clientesCollection: AngularFirestoreCollection<ClienteInterface>;
  private clientes: Observable<ClienteInterface[]>;
 // private clienteDoc: AngularFirestoreDocument<ClienteInterface>;
  private cliente: Observable<ClienteInterface>;


  userCollection: AngularFirestoreCollection<any>;

  collection: any;
  CLIENTES_TABLA="prueba3";



  //Firestore CRUD actions example
  createCliente(data:any) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection(this.CLIENTES_TABLA)
        .add(data)
        .then(res => {}, err => reject(err));
    });
  }

  createPruebaCliente(data:any) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("prueba3")
        .add(data)
        .then(res => {}, err => reject(err));
    });
  }

  updateCliente(id, cliente:ClienteInterface) {
    let idCliente = cliente.id;
    console.log(cliente);
    return this.firestore.collection(this.CLIENTES_TABLA).doc(id).set(cliente);

  }


  getClientes() {
    console.log("obteniendo clientes de " +this.CLIENTES_TABLA );
    return this.firestore.collection(this.CLIENTES_TABLA).snapshotChanges();
  }

  getAllClientes() {
    this.clientesCollection = this.firestore.collection<ClienteInterface>(this.CLIENTES_TABLA);
    return this.clientes = this.clientesCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ClienteInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }


  deleteCliente(id){
    return this.firestore
      .collection(this.CLIENTES_TABLA)
      .doc(id)
      .delete();
  }
  getMapClientes() {
    this.userCollection = this.firestore.collection<any>(this.CLIENTES_TABLA);
 return   this.collection = this.userCollection.snapshotChanges()
      .pipe(
        map(actions => actions.map(a => a.payload.doc.data()))
      );
  }

//ejemplos

getUser(userKey:string){
  return this.firestore.collection(this.CLIENTES_TABLA).doc<ClienteInterface>(userKey).snapshotChanges();
}

updateUser(userKey, value){
  value.nameToSearch = value.name.toLowerCase();
  return this.firestore.collection('users').doc(userKey).set(value);
}

deleteUser(userKey){
  return this.firestore.collection('users').doc(userKey).delete();
}

getUsers(){
  return this.firestore.collection('users').snapshotChanges();
}

searchUsers(searchValue){
  return this.firestore.collection('users',ref => ref.where('nameToSearch', '>=', searchValue)
    .where('nameToSearch', '<=', searchValue + '\uf8ff'))
    .snapshotChanges()
}

searchUsersByAge(value){
  return this.firestore.collection('users',ref => ref.orderBy('age').startAt(value)).snapshotChanges();
}


createUser(value, avatar){
  return this.firestore.collection('users').add({
    name: value.name,
    nameToSearch: value.name.toLowerCase(),
    surname: value.surname,
    age: parseInt(value.age),
    avatar: avatar
  });
}
 

}


