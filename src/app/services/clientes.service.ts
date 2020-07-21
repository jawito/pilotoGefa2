import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class ClientesService {
  constructor(private firestore: AngularFirestore) {}
  userCollection: AngularFirestoreCollection<any>;
  userCollectionCast: AngularFirestoreCollection<ClientePr>;
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

  updateCliente(id,data:ClientePr) {
    console.log(id);
    console.log(data);
    return this.firestore.collection(this.CLIENTES_TABLA).doc(id).set(data);

  }

  getClientes() {
    console.log("obteniendo clientes de " +this.CLIENTES_TABLA );
    return this.firestore.collection(this.CLIENTES_TABLA).snapshotChanges();
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
  getMapClientesCast() {
    this.userCollectionCast = this.firestore.collection<ClientePr>(this.CLIENTES_TABLA);
 return   this.userCollectionCast.snapshotChanges()
      .pipe(
        map(actions => actions.map(a => a.payload.doc.data()))
      );
  }
//ejemplos

getUser(userKey:string){
  return this.firestore.collection(this.CLIENTES_TABLA).doc<ClientePr>(userKey).snapshotChanges();
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
export class ClientePr {
  actividad: string;
  codigo: number;
  cp: number;
  direccion: string;
  dni: string;
  email: string;
  fax: string;
  fecha_alta: string;
  fecha_modif: string;
  nombre: string;
  observaciones: string;
  poblacion: string;
  provincia: string;
  razon: string;
  telefono1: string;
  telefono2: string;
  pais:string;

  

}

