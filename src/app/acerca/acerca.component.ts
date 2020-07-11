import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import { now } from 'jquery';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.scss']
})
export class AcercaComponent implements OnInit {

  constructor() { }

  numFactura=234;
  ngOnInit(): void {
    var fecha = new Date();
    console.log(fecha.getDate());
    console.log(fecha.getMonth());
    let fechaStr= fecha.getFullYear()+''+fecha.getMonth()+1 +''+ fecha.getDay();
   

    window.document.title= fechaStr +  '_Factura_' +this.numFactura;
  //  window.print();
  }

  @ViewChild('content') content: ElementRef
  public exportarPdf() {
    let doc = new jsPDF('p', 'pt', 'a4');
    let specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }

    };
    let content=this.content.nativeElement;
    doc.fromHTML(content.innerHTML,15,15,{
      'width':590,
      'elementHandlers':specialElementHandlers

      });
    doc.save('prueba.pdf');
  }


  public print()
 {
    $("#pdf").hide();
    window.print();  
    $("#pdf").show();
  }
}