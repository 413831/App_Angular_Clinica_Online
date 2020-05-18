import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../environments/environment';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Material
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRippleModule} from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';


// Componentes
import { AppComponent } from './app.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { AboutComponent } from './componentes/about/about.component';
import { NavbarComponent } from './componentes/shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetalleTurnoComponent } from './componentes/detalle-turno/detalle-turno.component';
import { FooterComponent } from './componentes/shared/footer/footer.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { TurnosComponent } from './pages/turnos/turnos.component';
import { CartillaComponent } from './pages/cartilla/cartilla.component';
import { ListadoMedicosComponent } from './componentes/listado-medicos/listado-medicos.component';
import { ListadoPacientesComponent } from './componentes/listado-pacientes/listado-pacientes.component';
import { AltaMedicoComponent } from './componentes/alta-medico/alta-medico.component';
import { AltaPacienteComponent } from './componentes/alta-paciente/alta-paciente.component';
import { AltaTurnoComponent } from './componentes/alta-turno/alta-turno.component';
import { MenuPacienteComponent } from './componentes/menu-paciente/menu-paciente.component';
import { MenuMedicoComponent } from './componentes/menu-medico/menu-medico.component';
import { MenuAdministradorComponent } from './componentes/menu-administrador/menu-administrador.component';
import { DetalleMedicoComponent } from './componentes/detalle-medico/detalle-medico.component';
import { DetallePacienteComponent } from './componentes/detalle-paciente/detalle-paciente.component';
import { BuscadorMedicoComponent } from './componentes/buscador-medico/buscador-medico.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    AboutComponent,
    NavbarComponent,
    HomeComponent,
    DetalleTurnoComponent,
    FooterComponent,
    ContactoComponent,
    TurnosComponent,
    CartillaComponent,
    ListadoMedicosComponent,
    ListadoPacientesComponent,
    AltaMedicoComponent,
    AltaPacienteComponent,
    AltaTurnoComponent,
    MenuPacienteComponent,
    MenuMedicoComponent,
    MenuAdministradorComponent,
    DetalleMedicoComponent,
    DetallePacienteComponent,
    BuscadorMedicoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatListModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatGridListModule,
    MatCardModule,
    MatExpansionModule,
    MatStepperModule,
    MatCheckboxModule,
    MatRippleModule,
    MatToolbarModule,
    MatDialogModule,
    AgmCoreModule.forRoot({
      apiKey: environment.agmKey
    }),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
