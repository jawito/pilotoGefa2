import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ClientesService } from 'src/app/services/clientes.service';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-mierdatable',
  templateUrl: './mierdatable.component.html',
  styleUrls: ['./mierdatable.component.scss']
})
export class MierdatableComponent implements OnDestroy, OnInit {
   // dtOptions: DataTables.Settings = {}
   @ViewChild(DataTableDirective) dtElement: DataTableDirective;
   dtOptions: any = {};
    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    dtTrigger = new Subject();

    constructor(private clientesService: ClientesService, private router:Router) { }
    clientes: Array<any> ;

    ngOnInit(): void {
console.log("ngOnInit");
console.log(this.dtOptions);

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
        className: 'btn btn-primary',
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
   this.clientesService.getClientes().subscribe(clientes => {
    this.clientes = clientes;
    // Calling the DT trigger to manually render the table
  //  this.dtTrigger.next();
      });

    }

    ngAfterViewInit(): void {this.dtTrigger.next();}

    rerender(): void {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
         dtInstance.destroy();
         this.dtTrigger.next();     
     });
    }

    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
    console.log("ngOnDestroy");
      this.dtTrigger.unsubscribe();
    }


 
    modificar(cliente){
      console.log("modificar");
      console.log(cliente.payload.doc.id);

      this.router.navigate(['/editcliente/' +cliente.payload.doc.id ]);
    }


    delete(id,cliente){
      console.log(id);
      console.log(cliente);
      console.log($('#'+id).parent);
    //  this.table.row($('#'+id).parents('tr')).remove().draw(false);
      //   this.clientesService.deleteCliente(id)
      //   .then(
      //     res => {
      //       this.mensajes.success("El cliente " + cliente.nombre + " se ha borrado bien");
           
      //     },
      //     err => {
      //       this.mensajes.error("Error al borrar el cliente " + cliente.nombre + " " + err);
      //       console.log(err);
      //     }
      //   )
       }


}

