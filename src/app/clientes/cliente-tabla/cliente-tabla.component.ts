import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { ClientesService, ClientePr } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-cliente-tabla',
  templateUrl: './cliente-tabla.component.html',
  styleUrls: ['./cliente-tabla.component.scss']
})


export class ClienteTablaComponent implements OnInit {

  constructor (private clienteService: ClientesService){}
  displayedColumns: string[] = ['nombre', 'dni', 'razon', 'direccion', 
        'poblacion', 'provincia','telefono1', 'email','actividad'];
  dataSource = new MatTableDataSource();
  clientes = new Array<ClientePr>();
  busqueda:string;

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
  this.clienteService.getMapClientes().subscribe(res=>{
    console.log("res",res);
     this.dataSource.data = res;
  })
//   this.clienteService.getMapClientes().subscribe(res=>{
//     console.log("res",res);
//     this.clientes = res;
//  })
//   console.log("clientes",this.clientes);
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}



