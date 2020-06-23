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
    AcercaComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, AngularFireModule.initializeApp(environment.firebaseConfig), AngularFireAuthModule, RouterModule.forRoot(routes)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
