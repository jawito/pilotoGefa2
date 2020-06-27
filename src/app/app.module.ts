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
import { AngularFireDatabaseModule } from '@angular/fire/database';


// componentes
import { FacturasComponent } from './facturas/facturas.component';
import { AcercaComponent } from './acerca/acerca.component';
import { ClientListComponent } from './clientes/client-list/client-list.component';
import { ClientComponent } from './clientes/client/client.component';

//servicio
import {ClientService} from './services/client.service'

const routes : Routes = [
  {path: 'clientes', component: ClientesComponent },
  {path: 'facturas', component: FacturasComponent },
  {path: 'acerca', component: AcercaComponent },


]


@NgModule({
  declarations: [
    AppComponent    ,
    NavbarComponent,
    ClientesComponent,
    FacturasComponent,
    AcercaComponent,
    ClientListComponent,
    ClientComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule, AngularFireModule.initializeApp(environment.firebaseConfig), AngularFireAuthModule, RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    ClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
