import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cita } from 'src/app/Entitis/Cita';
import { CitaService } from 'src/app/Servicios/cita.service';
import { DireccionService } from 'src/app/Servicios/direccion.service';
import { PublicacionService } from 'src/app/Servicios/publicacion.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-solicitud-servicios',
  templateUrl: './solicitud-servicios.component.html',
  styleUrls: ['./solicitud-servicios.component.css']
})

export class SolicitudServiciosComponent {
  @Input() cita: Cita | any;
  @Input() flag :boolean = false;
  @Input() consulto : boolean = false;
  @Output() avisar = new EventEmitter<number>(); 

  usuarioLogueado = localStorage.getItem('idusuario');


  constructor(private citasService: CitaService,private usuarioService: UsuarioService, private publicacionService: PublicacionService, private direccionService: DireccionService){}

  ngOnInit(){
    this.usuarioService.getUsuarioById(this.cita.fkidusuario).subscribe(res =>{
      this.cita.usuario = res.msg;  
    });
    if(this.consulto){
      this.publicacionService.getPublicacionById(this.cita.fkidpublicacion).subscribe(res =>{
        this.cita.publicacion = res.msg;  
      });
    }else{
      this.publicacionService.getNullPublicacionById(this.cita.fkidpublicacion).subscribe(res =>{
        this.cita.publicacion = res.msg;  
      });
    }
    this.direccionService.getDireccionById(this.cita.fkiddireccion).subscribe(res =>{
      this.cita.direccion = res.msg;  
    });
  }

  addCita(){
    console.log("Entro al fron de addCita")
    console.log(this.cita.fkidusuario)
    console.log(this.cita.fkidpublicacion)
    this.citasService.addCita(this.cita.fkidusuario, this.cita.fkidpublicacion).subscribe(res =>{
      console.log(res)
        if(res.error){
          const alertElement = document.createElement('div');
          alertElement.className = 'alert alert-danger';
          alertElement.textContent = 'Hubo un error a la hora de aceptar la cita';
          document.body.appendChild(alertElement);
          setTimeout(() => {
            alertElement.remove();
          }, 3000);
        }  
        else{
          this.avisar.emit()
          const alertElement = document.createElement('div');
          alertElement.className = 'alert alert-danger';
          alertElement.textContent = 'Se acepto la solicitud con exito.';
          document.body.appendChild(alertElement);
          setTimeout(() => {
            alertElement.remove();
          }, 3000);
        }
    })
  }

  cancelCita(){
    this.citasService.cancelCita(this.cita.fkidusuario, this.cita.fkidpublicacion).subscribe(res =>{
      console.log(res)
        if(res.excepcion == true){
          const alertElement = document.createElement('div');
          alertElement.className = 'alert alert-danger';
          alertElement.textContent = 'Hubo un error a la hora de rechazar la solicitud';
          document.body.appendChild(alertElement);
          setTimeout(() => {
            alertElement.remove();
          }, 3000);
        }  
        else{
          this.avisar.emit();
          const alertElement = document.createElement('div');
          alertElement.className = 'alert alert-danger';
          alertElement.textContent = 'Se rechazo la solicitud con exito.';
          document.body.appendChild(alertElement);
          setTimeout(() => {
            alertElement.remove();
          }, 3000);
        }
    })
  }

}
