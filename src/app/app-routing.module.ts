import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './componentes/about/about.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { CartillaComponent } from './pages/cartilla/cartilla.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { TurnosComponent } from './pages/turnos/turnos.component';
import { AltaTurnoComponent } from './componentes/alta-turno/alta-turno.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AltaAdminComponent } from './componentes/alta-admin/alta-admin.component';
import { ModificarTurnoComponent } from './componentes/modificar-turno/modificar-turno.component';


const routes: Routes = [
  { path: '', component: HomeComponent, data: {animation: 'HomePage'} },
  { path: 'home', component: HomeComponent, data: {animation: 'HomePage'} },
  { path: 'registro', component: RegistroComponent},
  { path: 'login', component: LoginComponent},
  { path: 'cartilla', component: CartillaComponent},
  { path: 'contacto', component: ContactoComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'turnos', component: TurnosComponent},
  { path: 'alta-turno/:horarios/:dias', component: AltaTurnoComponent},
  { path: 'alta-admin', component: AltaAdminComponent},
  { path: 'modificar-turno', component: ModificarTurnoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
