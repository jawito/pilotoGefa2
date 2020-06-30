import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-mierdatable',
  templateUrl: './mierdatable.component.html',
  styleUrls: ['./mierdatable.component.scss']
})
export class MierdatableComponent implements OnDestroy, OnInit {

    dtOptions: DataTables.Settings =
      {
        pagingType: 'full_numbers',
        pageLength: 10
      }
  
    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    dtTrigger = new Subject();
  
    constructor(private clientesService: ClientesService) { }
    clientes ;
  
    ngOnInit(): void {
       this.dtOptions = {
         pagingType: 'full_numbers',
         pageLength: 10
  
       }
   this.clientesService.getMapClientes().subscribe(clientes => {
    this.clientes = clientes;
    // Calling the DT trigger to manually render the table
    this.dtTrigger.next();
      });
  
    }
  
  
  
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
  

}
export class ClientePr {
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
