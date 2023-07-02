import { Component, OnInit } from '@angular/core';
import { Publicacion } from 'src/app/Entitis/Publicacion';
import { Input } from '@angular/core';
import { Cita } from 'src/app/Entitis/Cita';
import { Usuario } from 'src/app/Entitis/Usuario';
import { Habilidad } from 'src/app/Entitis/Habilidad';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { PublicacionService } from 'src/app/Servicios/publicacion.service';
import { HabiliadadService } from 'src/app/Servicios/habiliadad.service';

@Component({
  selector: 'app-publicaciones-realizadas',
  templateUrl: './publicaciones-realizadas.component.html',
  styleUrls: ['./publicaciones-realizadas.component.css']
})
export class PublicacionesRealizadasComponent implements OnInit{
  @Input() cita: Cita | any;
  usuario:Usuario | any;
  publicacion:Publicacion | any;
  habilidad:Habilidad | any;

  constructor(private usuarioSerivce:UsuarioService, private publicacionService:PublicacionService, private habilidadService:HabiliadadService){}


  ngOnInit(): void {
    console.log("Entro a la cita:")
    console.log(this.cita)

    this.usuarioSerivce.getNullUsuarioById(this.cita.fkidusuario).subscribe(res =>{
      this.usuario=  res.msg;
      console.log("Me trajo al usuario")
      console.log(this.usuario)
    })
    this.publicacionService.getNullPublicacionById(this.cita.fkidpublicacion).subscribe(res =>{
      this.publicacion = res.msg;
      console.log("Me trajo al publicacion")
      console.log(this.publicacion)
      this.habilidadService.getNullHabilidadById(this.publicacion.fkidhabilidad).subscribe(res =>{
        this.habilidad = res.msg;
        console.log("Me trajo al habilidad")
        console.log(this.habilidad)
      })
    })
  }
  getColor() {
    if (this.cita.fechaFin == null)
      return "red"
    else
      return "green";
  }
}
