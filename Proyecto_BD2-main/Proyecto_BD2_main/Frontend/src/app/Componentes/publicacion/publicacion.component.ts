import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Direccion } from 'src/app/Entitis/Direccion';
import { Habilidad } from 'src/app/Entitis/Habilidad';
import { Pregunta } from 'src/app/Entitis/Pregunta';
import { Publicacion } from 'src/app/Entitis/Publicacion';
import { Usuario } from 'src/app/Entitis/Usuario';
import { DireccionService } from 'src/app/Servicios/direccion.service';
import { HabiliadadService } from 'src/app/Servicios/habiliadad.service';
import { PublicacionService } from 'src/app/Servicios/publicacion.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';


@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent {
  @Input() publicacion: Publicacion | any;
  @Output() publicacionEliminada = new EventEmitter<void>();
  @Output() pubAgregada = new EventEmitter<void>();
  

  habilidad: Habilidad | any;
  usuario: Usuario | any = null;
  direccion: Direccion | any = null;

  idUsuarioLogueado = localStorage.getItem("idusuario");
  
  constructor(private publicacionService:PublicacionService,private habilidadService:HabiliadadService,private usuarioService:UsuarioService,private direccionService:DireccionService) { }


  ngOnInit(){
    this.habilidadService.getHabilidadById(this.publicacion.fkidhabilidad).subscribe(res =>{
      this.habilidad = res.msg;
      console.log("HABILIDAD")
      console.log(res.msg)
    });
    this.usuarioService.getUsuarioById(this.publicacion.fkidusuario).subscribe(res =>{
      this.usuario = res.msg
      this.usuario.idusuario = this.publicacion.fkidusuario;
    })
    this.direccionService.getDireccionById(this.publicacion.fkiddireccion).subscribe(res =>{
      this.direccion = res.msg
      console.log("DIRECCION")
      console.log(this.direccion)
    })
  }

  getColor() {
    if (this.publicacion.espresencial)
      return "green"
    else
      return "red";
  }

  deletePublicacion() {
    this.publicacionService.deletePublicacion(this.publicacion.idpublicacion).subscribe(res => {
      console.log(res)
      if(res.error){
      const alertElement = document.createElement('div');
        alertElement.className = 'alert alert-danger';
        alertElement.textContent = 'Hubo un error a la hora de eliminar la publicacion';
        document.body.appendChild(alertElement);
        setTimeout(() => {
          alertElement.remove();
        }, 3000);
      } 
      else{
        this.publicacionEliminada.emit()
        const alertElement = document.createElement('div');
        alertElement.className = 'alert alert-danger';
        alertElement.textContent = 'Publicacion eliminada con exito';
        document.body.appendChild(alertElement);
        setTimeout(() => {
          alertElement.remove();
        }, 3000);
      } 
    }); 
  }

  onPublicacionAgregada(){
    this.pubAgregada.emit();
  }
}






