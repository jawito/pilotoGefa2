import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class ClientesService {
  constructor(private firestore: AngularFirestore, private afs: AngularFirestore) {}
  userCollection: AngularFirestoreCollection<any>;
  userCollectionCast: AngularFirestoreCollection<ClientePr>;
  collection: any;
  CLIENTES_TABLA="prueba";



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
        .collection("prueba")
        .add(data)
        .then(res => {}, err => reject(err));
    });
  }

  updateCliente(data) {
    return this.firestore
      .collection(this.CLIENTES_TABLA)
      .doc(data.payload.doc.id)
      .set({ completed: true }, { merge: true });
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
    this.userCollection = this.afs.collection<any>(this.CLIENTES_TABLA);
 return   this.collection = this.userCollection.snapshotChanges()
      .pipe(
        map(actions => actions.map(a => a.payload.doc.data()))
      );
  }
  getMapClientesCast() {
    this.userCollectionCast = this.afs.collection<ClientePr>(this.CLIENTES_TABLA);
 return   this.userCollectionCast.snapshotChanges()
      .pipe(
        map(actions => actions.map(a => a.payload.doc.data()))
      );
  }
//ejemplos

getUser(userKey){
  return this.firestore.collection('users').doc(userKey).snapshotChanges();
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
  id: string;
  data: {

  nombre: string;
  DNI: string;
  razon: string;
  direccion: string;
  poblacion: string;
  provincia: string;
  cp: string;
  telefono1: string;
  telefono2: string;
  fax: string;
  email: string;
  actividad: string;
  observaciones: string;
  fecha_modif: string;
  fecha_alta: string;
  }

}

