import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { ClientesService } from 'src/app/services/clientes.service';
import {SelectionModel} from '@angular/cdk/collections';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cliente-tabla',
  templateUrl: './cliente-tabla.component.html',
  styleUrls: ['./cliente-tabla.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class ClienteTablaComponent implements OnInit {

  constructor (private clienteService: ClientesService, private router:Router){}
  displayedColumns: string[] = ['nombre', 'razon', 'direccion',
        'poblacion', 'provincia'];
  labels: string[] = ['Nombre', 'Razón Social', 'Dirección',
        'Población', 'Provincia'];      
  dataSource = new MatTableDataSource();

  data:any;
  busqueda:string;
  expandedElement: ClienteTablaComponent | null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getData();
  }
  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }

getData(){
  this.clienteService.getAllClientes().subscribe(res=>{
    console.log("res",res);
     this.dataSource.data = res;
  })
   

}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  modificar (cliente){
    console.log("Modificar",cliente);
    console.log(cliente.id);

    this.router.navigate(['/editcliente/' +cliente.id ]);

  }

}



