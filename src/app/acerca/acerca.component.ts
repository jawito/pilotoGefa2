import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.scss']
})
export class AcercaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('content') content: ElementRef
  public exportarPdf() {
    let doc = new jsPDF();
    let specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }

    };
    let content=this.content.nativeElement;
    doc.fromHTML(content.innerHTML,15,15,{
      'width':190,
      'elementHandlers':specialElementHandlers

      });
    doc.save('prueba.pdf');
  }
}
