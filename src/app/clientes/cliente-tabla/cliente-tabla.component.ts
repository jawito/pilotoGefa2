import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { ClientesService } from 'src/app/services/clientes.service';

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
  this.clienteService.getClientes().subscribe(res=>{
     this.dataSource.data = res;
  })
  console.log("datasource",this.dataSource);
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}



