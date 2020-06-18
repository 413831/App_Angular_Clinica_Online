import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import {ApplicationModule } from '@angular/core'; 
import { HttpClientModule } from '@angular/common/http';
import { RECAPTCHA_SETTINGS, RecaptchaSettings,RecaptchaModule } from 'ng-recaptcha';
import { HighchartsChartModule } from 'highcharts-angular';

import { environment } from '../environments/environment';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Firebase
import { AngularFireAuthModule } from '@angular/fire/auth/';
import { AngularFireModule } from '@angular/fire';


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
import {MatRippleModule, MatNativeDateModule} from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';

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
import { DialogMedicoComponent } from './componentes/dialog-medico/dialog-medico.component';
import { DetallePacienteComponent } from './componentes/detalle-paciente/detalle-paciente.component';
import { BuscadorMedicoComponent } from './componentes/buscador-medico/buscador-medico.component';
import { MenuComponent } from './pages/menu/menu.component';
import { DialogComponent } from './componentes/dialog/dialog.component';
import { ModificarPacienteComponent } from './componentes/modificar-paciente/modificar-paciente.component';
import { ModificarMedicoComponent } from './componentes/modificar-medico/modificar-medico.component';
import { DetalleAdministradorComponent } from './componentes/detalle-administrador/detalle-administrador.component';
import { DetalleMedicoComponent } from './componentes/detalle-medico/detalle-medico.component';
import { AltaAdminComponent } from './componentes/alta-admin/alta-admin.component';
import { DialogPacienteComponent } from './componentes/dialog-paciente/dialog-paciente.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { ToolbarComponent } from './componentes/shared/toolbar/toolbar.component';
import { ModificarTurnoComponent } from './componentes/modificar-turno/modificar-turno.component';
import { InfoTurnoComponent } from './componentes/info-turno/info-turno.component';
import { DialogExtrasComponent } from './componentes/dialog-extras/dialog-extras.component';
import { ListadoTurnosComponent } from './componentes/listado-turnos/listado-turnos.component';
import { AltaHistoriaComponent } from './componentes/alta-historia/alta-historia.component';
import { DialogDatoComponent } from './componentes/dialog-dato/dialog-dato.component';
import { InformesComponent } from './pages/informes/informes.component';
import { AuthService } from './servicios/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { SecureInnerPagesGuard } from './auth/secure-inner-pages.guard';
import { NotificacionComponent } from './componentes/notificacion/notificacion.component';

// Pipes
import { BooleanoPipe } from './pipes/booleano.pipe';
import { FechaPipe } from './pipes/fecha.pipe';
import { DiasPipe } from './pipes/dias.pipe';
import { DiaAtencionPipe } from './pipes/dia-atencion.pipe';
import { DetalleEncuestaComponent } from './componentes/detalle-encuesta/detalle-encuesta.component';
import { GraficoAreaComponent } from './componentes/widgets/grafico-area/grafico-area.component';
import { GraficoColumnasComponent } from './componentes/widgets/grafico-columnas/grafico-columnas.component';
import { GraficoLineasComponent } from './componentes/widgets/grafico-lineas/grafico-lineas.component';
import { GraficoTortaComponent } from './componentes/widgets/grafico-torta/grafico-torta.component';
import { GraficoBarrasComponent } from './componentes/widgets/grafico-barras/grafico-barras.component';
import { HistoriaComponent } from './pages/historia/historia.component';
import { SanitizadorPipe } from './pipes/sanitizador.pipe';

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
    DialogMedicoComponent,
    DetallePacienteComponent,
    BuscadorMedicoComponent,
    MenuComponent,
    DialogComponent,
    ModificarPacienteComponent,
    ModificarMedicoComponent,
    DetalleAdministradorComponent,
    DetalleMedicoComponent,
    AltaAdminComponent,
    DialogPacienteComponent,
    EncuestaComponent,
    DiaAtencionPipe,
    ToolbarComponent,
    DiasPipe,
    ModificarTurnoComponent,
    InfoTurnoComponent,
    DialogExtrasComponent,
    ListadoTurnosComponent,
    BooleanoPipe,
    AltaHistoriaComponent,
    FechaPipe,
    DialogDatoComponent,
    InformesComponent,
    NotificacionComponent,
    DetalleEncuestaComponent,
    GraficoAreaComponent,
    GraficoColumnasComponent,
    GraficoLineasComponent,
    GraficoTortaComponent,
    GraficoBarrasComponent,
    HistoriaComponent,
    SanitizadorPipe,
  ],
  imports: [
    ApplicationModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
    MatNativeDateModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatMenuModule,
    RecaptchaModule,
    HighchartsChartModule,
    AgmCoreModule.forRoot({
      apiKey: environment.agmKey
    }), 
  ],
  providers: [
    MatDatepickerModule, 
    AuthService, 
    AuthGuard, 
    SecureInnerPagesGuard,
    {provide: MatDialogRef,
    useValue: {}},
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: environment.captchaKey } as RecaptchaSettings,
    },
  ],   
  bootstrap: [AppComponent]
})
export class AppModule { }
