import { Component } from '@angular/core';
import { Amigo } from 'src/app/Entitis/Amigo';
import { Cita } from 'src/app/Entitis/Cita';
import { Usuario } from 'src/app/Entitis/Usuario';
import { SolicitudAmistad } from 'src/app/Entitis/solicitud-amistad';
import { AmigoService } from 'src/app/Servicios/amigo.service';
import { CitaService } from 'src/app/Servicios/cita.service';
import { DireccionService } from 'src/app/Servicios/direccion.service';
import { PublicacionService } from 'src/app/Servicios/publicacion.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-catalogo-solicitudes',
  templateUrl: './catalogo-solicitudes.component.html',
  styleUrls: ['./catalogo-solicitudes.component.css']
})
export class CatalogoSolicitudesComponent {
  amigos: Amigo[] = [];
  solicitudesCitas: Cita[] = [];
  idUsuarioLogueado = localStorage.getItem("idusuario");

  constructor(private amigosService: AmigoService, private usuarioService: UsuarioService, private citasService: CitaService, private publicacionService: PublicacionService, private direccionService: DireccionService) { }

  ngOnInit() {
    this.getCitasByIdUsuario();
    this.getAmigosByIdUsuario();
  }

  getAmigosByIdUsuario() {
    this.amigosService.getAmigosByIdUsuario(this.idUsuarioLogueado).subscribe(res => {
      this.amigos = res.msg;
      console.log(this.amigos);
    })
  }

  onSolicitudesActualizadas() {
    this.getAmigosByIdUsuario();
  }

  onCitaAvisada() {
    this.getCitasByIdUsuario();
  }

  getCitasByIdUsuario() {
    this.citasService.getCitasByIdUsuario(this.idUsuarioLogueado).subscribe(res => {
      this.solicitudesCitas = res.msg;
    })
  }


}
