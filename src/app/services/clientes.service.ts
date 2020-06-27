import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class ClientesService {
  constructor(private firestore: AngularFirestore) {}

  CLIENTES_TABLA="prueba";

  form = new FormGroup({
    customerName: new FormControl(""),
    orderNumber: new FormControl(""),
    coffeeOrder: new FormControl(""),
    completed: new FormControl(false)
  });

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
}


