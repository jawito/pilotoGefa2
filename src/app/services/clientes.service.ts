import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class ClientesService {
  constructor(private firestore: AngularFirestore, private afs: AngularFirestore) {}
  userCollection: AngularFirestoreCollection<any>;
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

  deleteCliente(data) {
    return this.firestore
      .collection(this.CLIENTES_TABLA)
      .doc(data.payload.doc.id)
      .delete();
  }
  getMapClientes() {
    this.userCollection = this.afs.collection<any>(this.CLIENTES_TABLA);
 return   this.collection = this.userCollection.snapshotChanges()
      .pipe(
        map(actions => actions.map(a => a.payload.doc.data()))
      );
  }



}


