import { Component } from '@angular/core';
import { Publicacion } from 'src/app/Entitis/Publicacion';
import { Input } from '@angular/core';
import { Cita } from 'src/app/Entitis/Cita';
import { CalificacionCita } from 'src/app/Entitis/CalificacionCita';
import { CitaService } from 'src/app/Servicios/cita.service';
import { getLocaleCurrencyCode } from '@angular/common';
import { Habilidad } from 'src/app/Entitis/Habilidad';
import { Usuario } from 'src/app/Entitis/Usuario';
import { HabiliadadService } from 'src/app/Servicios/habiliadad.service';
import { PublicacionService } from 'src/app/Servicios/publicacion.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-publicaciones-recibidas',
  templateUrl: './publicaciones-recibidas.component.html',
  styleUrls: ['./publicaciones-recibidas.component.css']
})
export class PublicacionesRecibidasComponent {
  @Input() cita: Cita | any;
  calificacionCita: CalificacionCita | any;
  usuario: Usuario | any;
  publicacion: Publicacion | any;
  habilidad: Habilidad | any;
  prueba: any;
  currentRate = 0;
  descripcion = '';

  constructor(private citaservice: CitaService, private usuarioSerivce: UsuarioService, private publicacionService: PublicacionService, private habilidadService: HabiliadadService, private configRating: NgbRatingConfig) { }

  ngOnInit() {
    console.log("Entro a la card de recibidas")
    console.log(this.cita);
    this.usuarioSerivce.getNullUsuarioById(this.cita.fkidusuario).subscribe(res => {
      this.usuario = res.msg;
      console.log("Me trajo al usuario")
      console.log(this.usuario)
    })
    this.publicacionService.getNullPublicacionById(this.cita.fkidpublicacion).subscribe(res => {
      this.publicacion = res.msg;
      console.log("Me trajo al publicacion")
      console.log(this.publicacion)
      this.habilidadService.getNullHabilidadById(this.publicacion.fkidhabilidad).subscribe(res => {
        this.habilidad = res.msg;
        console.log("Me trajo al habilidad")
        console.log(this.habilidad)
      })
      let id = localStorage.getItem('idusuario')
      this.citaservice.getCalificacionCita(id, this.publicacion.idpublicacion).subscribe(res => {
        this.calificacionCita = res.msg
        console.log(this.calificacionCita)

        if (this.calificacionCita) {
          this.currentRate = this.calificacionCita.fkidcalificacion;
          this.descripcion = this.calificacionCita.comentario;
          this.configRating.readonly = true;
        } else {
          this.configRating.readonly = false;
        }
      });
    })

  }

  getColor() {
    if (this.cita.fechaFin === null)
      return "red"
    else
      return "green";
  }




  guardarCalificacion() {
    let id = localStorage.getItem('idusuario');
    console.log(id, this.cita.fkidpublicacion, this.currentRate, this.descripcion)
    this.publicacionService.ratePublicacionRecibida(Number(id), this.cita.fkidpublicacion, this.currentRate, this.descripcion).subscribe((res) => {
      console.log(res)
    });
  }


}
