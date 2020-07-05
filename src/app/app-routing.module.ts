import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanEditGuard } from './auth/can-edit.guard';


const routes: Routes = [
  //ruta inicial
  {path:'',
  redirectTo:'home',
  pathMatch:'full'


  },
  { path: 'home', canActivate: [CanEditGuard]  , loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }, 
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
