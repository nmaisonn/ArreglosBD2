import { Component } from '@angular/core';
import { Barrio } from 'src/app/Entitis/Barrio';
import { Habilidad } from 'src/app/Entitis/Habilidad';
import { Publicacion } from 'src/app/Entitis/Publicacion';
import { BarrioService } from 'src/app/Servicios/barrio.service';
import { DireccionService } from 'src/app/Servicios/direccion.service';
import { HabiliadadService } from 'src/app/Servicios/habiliadad.service';
import { PublicacionService } from 'src/app/Servicios/publicacion.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-catalogo-publicaciones',
  templateUrl: './catalogo-publicaciones.component.html',
  styleUrls: ['./catalogo-publicaciones.component.css']
})
export class CatalogoPublicacionesComponent {

  publicaciones: Publicacion[] = [];

  habilidades: Habilidad[] | any
  barrios:Barrio[]|any
  habilidad: Habilidad | any
  barrio:Barrio|any

  idUsuarioLogueado = localStorage.getItem("idusuario");

  constructor(private skillService:HabiliadadService,private barrioService: BarrioService,private publicacionesService: PublicacionService, private habilidadService: HabiliadadService, private usuarioService: UsuarioService, private direccionService: DireccionService) { }
  
filtro:string=""

  ngOnInit() {
    this.getPublicaciones();
  }

  getPublicaciones(): void {
    console.log("Entro al getPublicaciones del catalogo")
    // this.publicacionesService.getPublicaciones().subscribe(res => {
    //   this.publicaciones = res.msg;
    // });    
    this.publicacionesService.getPublicacionesDashboard(this.idUsuarioLogueado).subscribe(res => {
      console.log(res.msg)
      this.publicaciones = res.msg;
    });    
  }

  buscar() {
    console.log(this.filtro)
    this.publicacionesService.buscar(this.filtro).subscribe(res=>{
      this.publicaciones = res.msg
    })
  }

  llegoActualizacion() {
    this.getPublicaciones();
  }


}
