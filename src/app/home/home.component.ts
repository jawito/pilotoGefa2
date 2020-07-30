import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ClientesService } from '../services/clientes.service';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  fileToUpload: File = null;

  formGrupo: FormGroup;
  //Los campos del formularaio se declaran como formControls
  emailCtrl = new FormControl('', [Validators.required, Validators.minLength(4)]);
  constructor(private formbuilder: FormBuilder, private clienteService: ClientesService) {
    //Para crear un formGroup:
    this.formGrupo = formbuilder.group({
      name: [(''), [Validators.required]],
      telefono: [(''), [Validators.required, Validators.max(999999999999), Validators.min(100000000)]]

    });

    //escuchar cambios de un controlador
    this.emailCtrl.valueChanges.subscribe(valor => (console.log(valor)));
    // si queremos que espere un tiempo debounceTime en ms
    this.emailCtrl.valueChanges.pipe(debounceTime(2000)).subscribe(valor => (console.log('retardo ' + valor, this.emailCtrl)));

    this.formGrupo.valueChanges.pipe(debounceTime(1000)).subscribe(valor => (console.log(valor)));



  }

  ngOnInit(): void {
  }

  //Metodo para obtener el valor de un input ejemplo el email
  getEmail(event: Event) {
    //cancelamos la funcionalidad del evento por defecto
    event.preventDefault();
    console.log(this.emailCtrl.value);
  }

  onSave(event: Event) {
    //cancelamos la funcionalidad del evento por defecto
    event.preventDefault();
    console.log(this.formGrupo.value);

  }
  //getters
  get nameField() {
    return this.formGrupo.get('name');
  }

  get telefonoField() {
    return this.formGrupo.get('telefono');
  }
  get nameValid() {
    //devuelve true si el campo name esta tocado y es valido
    return this.nameField.touched && this.nameField.valid;
  }
  get nameInValid() {
    //devuelve true si el campo name esta tocado y es invalido
    return this.nameField.touched && this.nameField.invalid;
  }

  get telefonoValid() {

    return this.telefonoField.touched && this.telefonoField.valid;
  }
  get telefonoInValid() {

    return this.telefonoField.touched && this.telefonoField.invalid;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log("handleFileInput");
    console.log(this.fileToUpload);
    console.log(files);
    // if (files && files.length > 0) {
    //   let file: File = files.item(0);
    //   this.fileToUpload = files.item(0);
    //   console.log(file.name);
    //   console.log(file.size);
    //   console.log(file.type);
    //   let reader: FileReader = new FileReader();
    //   reader.readAsText(file);
    //   reader.onload = (e) => {
    //     let txt: string = reader.result as string;
    //     var json = JSON.parse(txt);
    //     console.log('texto', txt);
    //     console.log('jason', json);
    //     for (let i in json) {
    //       console.log(json[i]);
    //       try {
    //         this.clienteService.createPruebaCliente(json[i]);
    //         console.log("cliente creado o eso parece");
    //       } catch (error) {
    //         console.log(error);
    //       }

    //     }
    //   }
    // }


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


  uploadDocument() {
    if (this.fileToUpload) {
      console.log(this.fileToUpload.name);
      console.log(this.fileToUpload.size);
      console.log(this.fileToUpload.type);
      let reader: FileReader = new FileReader();
      reader.readAsText(this.fileToUpload);
      reader.onload = (e) => {
        let txt: string = reader.result as string;
        var json = JSON.parse(txt);
        console.log('texto', txt);
        console.log('jason', json);
        for (let i in json) {
          console.log(json[i]);
          try {
            this.clienteService.createPruebaCliente(json[i]);
            console.log("cliente creado o eso parece");
          } catch (error) {
            console.log(error);
          }

        }
      }
    }
  }

}
