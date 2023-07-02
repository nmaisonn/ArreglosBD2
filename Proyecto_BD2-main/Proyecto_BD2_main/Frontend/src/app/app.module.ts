import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarCompComponent } from './components/navbar-comp/navbar-comp.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PublicacionComponent } from './Componentes/publicacion/publicacion.component';
import { CatalogoPublicacionesComponent } from './Componentes/catalogo-publicaciones/catalogo-publicaciones.component';
import { ModalAgregarPublicacionComponent } from './Componentes/modal-agregar-publicacion/modal-agregar-publicacion.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PublicacionesRealizadasComponent } from './Componentes/publicaciones-realizadas/publicaciones-realizadas.component';
import { PublicacionesRecibidasComponent } from './Componentes/publicaciones-recibidas/publicaciones-recibidas.component';
import { AmigosComponent } from './Componentes/amigos/amigos.component';
import { AmigoItemComponent } from './Componentes/amigo-item/amigo-item.component';
import { HistorialComponent } from './Componentes/historial/historial.component';
import { ModalPublicacionRealizadaComponent } from './Componentes/modal-publicacion-realizada/modal-publicacion-realizada.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CatalogoPreguntasComponent } from './Componentes/catalogo-preguntas/catalogo-preguntas.component';
import { PreguntaComponent } from './Componentes/pregunta/pregunta.component';
import { AmigoPerfilComponent } from './Componentes/amigo-perfil/amigo-perfil.component';
import { CatalogoSolicitudesComponent } from './Componentes/catalogo-solicitudes/catalogo-solicitudes.component';
import { SolicitudServiciosComponent } from './Componentes/solicitud-servicios/solicitud-servicios.component';
import { SolicitudAmistadComponent } from './Componentes/solicitud-amistad/solicitud-amistad.component';
import { CitasDashboardComponent } from './components/citas-dashboard/citas-dashboard.component';
import { CitasDashboardPendsComponent } from './components/citas-dashboard-pends/citas-dashboard-pends.component';
import { CitasDashboardEnprocComponent } from './components/citas-dashboard-enproc/citas-dashboard-enproc.component';
import { CitasDashboardFinalizadasComponent } from './components/citas-dashboard-finalizadas/citas-dashboard-finalizadas.component';
import { ModalSolicitarCitaComponent } from './Componentes/modal-solicitar-cita/modal-solicitar-cita.component';
import { RegisterComponent } from './components/register/register.component';
import { CatalogoUsuariosComponent } from './Componentes/catalogo-usuarios/catalogo-usuarios.component';
import { CatalogoUsuarioItemComponent } from './Componentes/catalogo-usuario-item/catalogo-usuario-item.component';
import { ModalAgregarAmigoComponent } from './Componentes/modal-agregar-amigo/modal-agregar-amigo.component';
import { LoginComponent } from './components/login/login.component';
import { TokenInterceptorService } from './Servicios/token-interceptor.service';
import { EditarDatosComponent } from './components/editar-datos/editar-datos.component';
import { ModalPublicacionCitaRecibidaComponent } from './Componentes/modal-publicacion-cita-recibida/modal-publicacion-cita-recibida.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarCompComponent,
    UserProfileComponent,
    PublicacionComponent,
    CatalogoPublicacionesComponent,
    ModalAgregarPublicacionComponent,
    PublicacionesRealizadasComponent,
    PublicacionesRecibidasComponent,
    AmigosComponent,
    AmigoItemComponent,
    HistorialComponent,
    ModalPublicacionRealizadaComponent,
    CatalogoPreguntasComponent,
    PreguntaComponent,
    AmigoPerfilComponent,
    CatalogoSolicitudesComponent,
    SolicitudServiciosComponent,
    SolicitudAmistadComponent,
    CitasDashboardComponent,
    CitasDashboardPendsComponent,
    CitasDashboardEnprocComponent,
    CitasDashboardFinalizadasComponent,
    CatalogoPreguntasComponent,
    SolicitudServiciosComponent,
    SolicitudAmistadComponent,
    RegisterComponent,
    LoginComponent,
    CatalogoUsuariosComponent,
    CatalogoUsuarioItemComponent,
    ModalAgregarAmigoComponent,
    LoginComponent,
    EditarDatosComponent,
    ModalPublicacionCitaRecibidaComponent,
    ModalSolicitarCitaComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
