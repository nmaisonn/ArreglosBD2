import { Component } from '@angular/core';
import { Habilidad } from 'src/app/Entitis/Habilidad';
import { Publicacion } from 'src/app/Entitis/Publicacion';
import { PublicacionService } from 'src/app/Servicios/publicacion.service';
import { HabiliadadService } from 'src/app/Servicios/habiliadad.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { Direccion } from 'src/app/Entitis/Direccion';
import { DireccionService } from 'src/app/Servicios/direccion.service';
import { Cita } from 'src/app/Entitis/Cita';
import { CitaService } from 'src/app/Servicios/cita.service';
import { BarrioService } from 'src/app/Servicios/barrio.service';
import { Barrio } from 'src/app/Entitis/Barrio';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent {
  //xUsuario = new Usuario("Nicolas", "Maisonnave", "51368035", new Date(2000, 8, 25));

  xHabilidad = new Habilidad();
  citasRealizadas: Cita[] = [];
  citasRecibidas: Cita[] = [];
  prueba: any[] = [];
  prueba2: any[] = []
  pruebaPubli: Publicacion | any;
  pruebaDir: any;
  pruebaBar: any;
  pruebaHab: any;

  constructor(private publicacionesService: PublicacionService, private habilidadService: HabiliadadService,
    private usuarioService: UsuarioService, private direccionService: DireccionService, private citasService: CitaService, private barrioService: BarrioService) { }
  
    ngOnInit() {
    this.getPublicacionesRealizadasById();
    this.getPublicacionesRecibidasById();
  }


  getPublicacionesRecibidasById(): void {
    let id = localStorage.getItem('idusuario');
    this.publicacionesService.getPublicacionesRecibidasById(id).subscribe(res => {
      this.citasRecibidas = res.msg
    });
  }

  getPublicacionesRealizadasById(): void {
    let id = localStorage.getItem('idusuario');
    this.citasService.getCitasByIdSolicitor(id).subscribe(res => {
      this.citasRealizadas = res.msg;
      console.log("Devolucion de publicaciones realizadas")
      console.log(this.citasRealizadas)
    });
  }

  llegoActualizacion():void{
    this.getPublicacionesRecibidasById();
  }
}


