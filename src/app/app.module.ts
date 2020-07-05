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
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { AddclienteComponent } from './clientes/addcliente/addcliente.component';
import {MierdatableComponent} from './shared/mierdatable/mierdatable.component';
import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { ToastrModule} from 'ngx-toastr'
import { CanEditGuard } from './auth/can-edit.guard';


const routes : Routes = [
  {path: 'clientes', component: ClientesComponent, canActivate: [CanEditGuard] },
  {path: 'facturas', component: FacturasComponent, canActivate: [CanEditGuard]  },
  {path: 'acerca', component: AcercaComponent, canActivate: [CanEditGuard]  },
  {path: 'addcliente', component: AddclienteComponent, canActivate: [CanEditGuard] }


]


@NgModule({
  declarations: [
    AppComponent    ,
    NavbarComponent,
    ClientesComponent,
    FacturasComponent,
    AcercaComponent,
    ClienteListComponent,
    AddclienteComponent,
    MierdatableComponent
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
    ToastrModule.forRoot()
  ],
  providers: [AuthService,ClientesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
