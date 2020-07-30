import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {ReactiveFormsModule} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/services/auth.service';
import { ClientesComponent } from './clientes/clientes.component';
import { RouterModule, Routes} from '@angular/router';
import { FacturasComponent } from './facturas/facturas.component';
import { AcercaComponent } from './acerca/acerca.component';
import {AngularFirestoreModule} from '@angular/fire/firestore'
import { ClientesService } from './services/clientes.service';
import { AddclienteComponent } from './clientes/addcliente/addcliente.component';
import {MierdatableComponent} from './shared/mierdatable/mierdatable.component';
import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { ToastrModule} from 'ngx-toastr'
import { CanEditGuard } from './auth/can-edit.guard';
import { EditclienteComponent } from './clientes/editcliente/editcliente.component';
import { EditClienteResolver } from './clientes/editcliente/editclienteResolver';
import { ClienteTablaComponent } from './clientes/cliente-tabla/cliente-tabla.component';
import { MaterialModule } from './material/material.module';



const routes : Routes = [
  {path: 'clientes', component: ClientesComponent, canActivate: [CanEditGuard] },
  {path: 'facturas', component: FacturasComponent, canActivate: [CanEditGuard]  },
  {path: 'acerca', component: AcercaComponent, canActivate: [CanEditGuard]  },
  {path: 'tabla', component: ClienteTablaComponent, canActivate: [CanEditGuard]  },
  {path: 'editcliente/:id', component: EditclienteComponent,resolve:{data : EditClienteResolver }, canActivate: [CanEditGuard]  },
  {path: 'addcliente', component: AddclienteComponent, canActivate: [CanEditGuard] }


]


@NgModule({
  declarations: [
    AppComponent    ,
    NavbarComponent,
    ClientesComponent,
    FacturasComponent,
    AcercaComponent,
    AddclienteComponent,
    MierdatableComponent,
    EditclienteComponent,
    ClienteTablaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    DataTablesModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MaterialModule
  ],
  providers: [AuthService,ClientesService,EditClienteResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
