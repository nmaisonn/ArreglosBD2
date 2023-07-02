import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Barrio } from 'src/app/Entitis/Barrio';
import { Direccion } from 'src/app/Entitis/Direccion';
import { Habilidad } from 'src/app/Entitis/Habilidad';
import { Publicacion } from 'src/app/Entitis/Publicacion';
import { Usuario } from 'src/app/Entitis/Usuario';
import { BarrioService } from 'src/app/Servicios/barrio.service';
import { DireccionService } from 'src/app/Servicios/direccion.service';
import { HabiliadadService } from 'src/app/Servicios/habiliadad.service';
import { SolcititudCitaService } from 'src/app/Servicios/solcititud-cita.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-modal-solicitar-cita',
  templateUrl: './modal-solicitar-cita.component.html',
  styleUrls: ['./modal-solicitar-cita.component.css']
})
export class ModalSolicitarCitaComponent {
  @Input() publicacion: Publicacion | any;
  idUsuarioLogueado = localStorage.getItem("idusuario");

  barrios: Barrio[] | any;
  barrio: Barrio | any;
  habilidad: Habilidad | any;
  direccion: Direccion | any;
  usuario: Usuario | any;
  fechaSolicitada : Date | null = null;
  calle: string = "";
  numero: number = 0;
  esquina: string = "";


  constructor(private modalService: NgbModal, private solicitudCitaService: SolcititudCitaService, private habilidadService: HabiliadadService, private barrioService: BarrioService, private direccionService: DireccionService, private usuarioService:UsuarioService) { }


  open(content: any) {
    console.log("Quiero abrir la modal")
    console.log(this.publicacion);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    this.barrioService.getBarrios().subscribe(res => {
      this.barrios = res.msg;
    });
    this.habilidadService.getHabilidadById(this.publicacion.fkidhabilidad).subscribe(res =>{
      this.habilidad = res.msg;
    });
    this.usuarioService.getUsuarioById(this.publicacion.fkidusuario).subscribe(res =>{
      this.usuario = res.msg
      this.usuario.idusuario = this.publicacion.fkIdUsuario;
    })
    this.direccionService.getDireccionById(this.publicacion.fkiddireccion).subscribe(res =>{
      this.direccion = res.msg
    })
    this.barrioService.getBarrioByDireccionId(this.publicacion.fkiddireccion).subscribe(res =>{
      this.barrio = res.msg
    })
  }


  addSolicitud() {
    if (this.validaciones()) {
      if (this.publicacion.espresencial==true) {
        this.direccionService.getDireccion(this.calle, this.numero, this.esquina, this.barrio.idbarrio).subscribe(res => {
          this.direccion = res;
          if (this.direccion == null) {
            this.direccionService.addDireccion(this.calle, this.numero, this.esquina, this.barrio.idbarrio).subscribe(res => {
              this.direccion = res;
            });
          }
        });
      }
      this.solicitudCitaService.addSolicitudCita(this.idUsuarioLogueado, this.publicacion.idpublicacion,this.direccion.iddireccion,this.fechaSolicitada).subscribe(res=>{
        console.log(res.msg)
        if(res.error){
        const alertElement = document.createElement('div');
          alertElement.className = 'alert alert-danger';
          alertElement.textContent = 'Hubo un error a la hora de enviar la solicitud';
          document.body.appendChild(alertElement);
          setTimeout(() => {
            alertElement.remove();
          }, 3000);
        } 
        else{
          const alertElement = document.createElement('div');
          alertElement.className = 'alert alert-danger';
          alertElement.textContent = 'Solicitud enviada con exito';
          document.body.appendChild(alertElement);
          setTimeout(() => {
            alertElement.remove();
          }, 3000);
        } 
      }); 
    }
    else {
      const alertElement = document.createElement('div');
      alertElement.className = 'alert alert-danger';
      alertElement.textContent = 'No se pudo realizar la operación debido a campos vacíos';
      document.body.appendChild(alertElement);
      setTimeout(() => {
        alertElement.remove();
      }, 3000);
    }
  }

  
  validaciones(){
    if(this.fechaSolicitada == null){
      return false;
    }
    else {
      return true;
    }
  }

  update(e: any) {
    let selectedObject = {}
    this.barrios.map((res: any) => {
      if (e.target.value == res.idbarrio) {
        selectedObject = res
      }
    })
    this.barrio = selectedObject
  }
}
