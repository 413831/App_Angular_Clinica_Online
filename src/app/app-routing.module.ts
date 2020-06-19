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
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { AltaHistoriaComponent } from './componentes/alta-historia/alta-historia.component';
import { AuthGuard } from './auth/auth.guard';
import { SecureInnerPagesGuard } from './auth/secure-inner-pages.guard';
import { InformesComponent } from './pages/informes/informes.component';
import { HistoriaComponent } from './pages/historia/historia.component';


const routes: Routes = [
  { path: '', component: HomeComponent, data: {animation: 'Home'} },
  { path: 'home', component: HomeComponent, data: {animation: 'Home'} },
  { path: 'registro', component: RegistroComponent, data: {animation: 'Registro'}},
  { path: 'login', component: LoginComponent,data: {animation: 'Login'}},
  { path: 'cartilla', component: CartillaComponent, data: {animation: 'Cartilla'}},
  { path: 'contacto', component: ContactoComponent, data: {animation: 'Contacto'}},
  { path: 'menu', component: MenuComponent, canActivate : [AuthGuard],data: {animation: 'Menu'}},
  { path: 'turnos', component: TurnosComponent, canActivate : [AuthGuard],data: {animation: 'Turnos'}},
  { path: 'alta-turno/:horarios/:dias', component: AltaTurnoComponent, canActivate : [AuthGuard], data: {animation: 'Turno'}},
  { path: 'alta-admin', component: AltaAdminComponent},
  { path: 'modificar-turno', component: ModificarTurnoComponent, canActivate : [AuthGuard], data: {animation: 'Detalle-turno'}},
  { path: 'encuesta', component: EncuestaComponent, canActivate : [AuthGuard],data: {animation: 'Encuesta'}},
  { path: 'alta-historia', component: AltaHistoriaComponent, canActivate : [AuthGuard], data: {animation: 'Historia'}},
  { path: 'historia/:paciente', component: HistoriaComponent, canActivate : [AuthGuard], data: {animation: 'Historia'}},
  { path: 'informes', canActivate : [AuthGuard], component: InformesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
