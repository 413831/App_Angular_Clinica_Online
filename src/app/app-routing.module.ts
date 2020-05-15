import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './componentes/about/about.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { CartillaComponent } from './pages/cartilla/cartilla.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { TurnosComponent } from './pages/turnos/turnos.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'login', component: LoginComponent},
  { path: 'cartilla', component: CartillaComponent},
  { path: 'contacto', component: ContactoComponent},
  { path: 'turnos', component: TurnosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
