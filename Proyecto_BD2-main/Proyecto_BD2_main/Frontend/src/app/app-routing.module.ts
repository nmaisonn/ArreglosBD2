
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UserProfileComponent } from './components/user-profile/user-profile.component'
import { CatalogoPublicacionesComponent } from './Componentes/catalogo-publicaciones/catalogo-publicaciones.component'
import { CatalogoPreguntasComponent } from './Componentes/catalogo-preguntas/catalogo-preguntas.component'
import { AmigosComponent } from './Componentes/amigos/amigos.component';
import { HistorialComponent } from './Componentes/historial/historial.component';
import { AmigoPerfilComponent } from './Componentes/amigo-perfil/amigo-perfil.component'
import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from './components/login/login.component'
import { CitasDashboardComponent } from './components/citas-dashboard/citas-dashboard.component'
import { CitasDashboardPendsComponent } from './components/citas-dashboard-pends/citas-dashboard-pends.component'
import { CitasDashboardEnprocComponent } from './components/citas-dashboard-enproc/citas-dashboard-enproc.component'
import { CitasDashboardFinalizadasComponent } from './components/citas-dashboard-finalizadas/citas-dashboard-finalizadas.component'
import { CatalogoSolicitudesComponent } from './Componentes/catalogo-solicitudes/catalogo-solicitudes.component'
import { EditarDatosComponent } from './components/editar-datos/editar-datos.component'
import { CatalogoUsuariosComponent } from './Componentes/catalogo-usuarios/catalogo-usuarios.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: CatalogoPublicacionesComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'faq', component: CatalogoPreguntasComponent },
  { path: 'friends', component: AmigosComponent },
  { path: 'history', component: HistorialComponent },
  { path: 'friendProfile/:id/:componenteOrigen', component: AmigoPerfilComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'requests', component: CatalogoSolicitudesComponent },
  { path: "citas", component: CitasDashboardComponent },
  { path: "citas/pendientes", component: CitasDashboardPendsComponent },
  { path: "citas/proceso", component: CitasDashboardEnprocComponent },
  { path: "citas/finalizadas", component: CitasDashboardFinalizadasComponent },
  { path: "editarDatos", component: EditarDatosComponent },
  { path: 'usuarios', component: CatalogoUsuariosComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
