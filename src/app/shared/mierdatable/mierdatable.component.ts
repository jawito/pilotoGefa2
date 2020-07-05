import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ClientesService } from 'src/app/services/clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mierdatable',
  templateUrl: './mierdatable.component.html',
  styleUrls: ['./mierdatable.component.scss']
})
export class MierdatableComponent implements OnDestroy, OnInit {

   // dtOptions: DataTables.Settings = {}
   dtOptions: any = {};
    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    dtTrigger = new Subject();

    constructor(private clientesService: ClientesService, private router:Router) { }
    clientes ;

    ngOnInit(): void {

       this.dtOptions = {
         pagingType: 'full_numbers',
         pageLength: 10,
         language:{


            searchPlaceholder: "Buscar...",

          url:"//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
        },
  // Declare the use of the extension in the dom parameter
           responsive:true,
            // Declare the use of the extension in the dom parameter
      dom: 'B<"border border-bottom-0"f>rtip' ,
      // Configure the buttons
      buttons: [
        { extend: 'colvis',
        className: 'btn',
        text: '<button class="btn btn-primary"><i class="fas fa-eye"></i>  Ver Campos </button>' },

      {   extend: 'print',
          className: 'btn',
            text: '<button class="btn btn-warning"><i class="fas fa-print"></i>  Imprimir </button>' },


      { extend: 'excel',
      className: 'btn',
      text: '<button class="btn btn-success"><i class="fas fa-file-excel"></i>  Excel </button>' },
     {

        className: 'btn',
        text: '<button class="btn btn-info"><i class="far fa-address-card"></i> Añadir </button>',
        key: '1',
        action: (e, dt, node, config) => this.router.navigate(['/addcliente'])
      }


    ]

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
