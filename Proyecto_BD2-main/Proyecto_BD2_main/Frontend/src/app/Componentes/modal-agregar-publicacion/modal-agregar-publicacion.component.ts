import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Habilidad } from 'src/app/Entitis/Habilidad';
import { HabiliadadService } from 'src/app/Servicios/habiliadad.service';
import { PublicacionService } from 'src/app/Servicios/publicacion.service';
import { Barrio } from 'src/app/Entitis/Barrio';
import { BarrioService } from 'src/app/Servicios/barrio.service';
import { Direccion } from 'src/app/Entitis/Direccion';
import { DireccionService } from 'src/app/Servicios/direccion.service';

@Component({
  selector: 'app-modal-agregar-publicacion',
  templateUrl: './modal-agregar-publicacion.component.html',
  styleUrls: ['./modal-agregar-publicacion.component.css']
})
export class ModalAgregarPublicacionComponent {
  @Output() publicacionAgregada = new EventEmitter<void>();
  habilidades: any[]  =[];
  barrios:Barrio[] | any;
  habilidad:  any;
  barrio:Barrio | any ;

  idUsuarioLogueado = localStorage.getItem("idusuario");
  
  nombre:string = "";
  descripcion:string = "";
  presencial:boolean | null = null;
  calle:string="";
  numero:number= 0;
  esquina:string="";
  
  constructor(private modalService: NgbModal, private publicacionService:PublicacionService, private habilidadesService:HabiliadadService, private barrioService:BarrioService,private direccionService:DireccionService) { }

  open(content: any) {
    this.resetearValores()
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    this.habilidadesService.getSkillsByUserId(this.idUsuarioLogueado).subscribe(res => {
      this.habilidades = res.msg
    });
    this.barrioService.getBarrios().subscribe(res =>{
      this.barrios = res.msg;
    });

  }
  
  addPublicaciones(){
    if(this.validarCampos() == true){
      let xDireccion :Direccion | any = null;  
      this.direccionService.addDireccion(this.calle,this.numero,this.esquina,this.barrio.idbarrio).subscribe(res =>{
        if(res.error){
          const alertElement = document.createElement('div');
            alertElement.className = 'alert alert-danger';
            alertElement.textContent = 'Hubo un error a la hora de agregar la direccion';
            document.body.appendChild(alertElement);
            setTimeout(() => {
              alertElement.remove();
            }, 3000);
        } 
        else{
          if(res.msg == "Direccioin agregada con éxito!"){
            this.direccionService.getDireccion(this.calle,this.numero,this.esquina,this.barrio.idbarrio).subscribe(res =>{
              xDireccion = res.msg;
            });
          }else
          {
            xDireccion = res.msg
          }
          if(xDireccion != null){
            this.publicacionService.addPublicacion(this.nombre,this.descripcion,this.presencial,xDireccion.iddireccion,this.habilidad.idhabilidad,this.idUsuarioLogueado).subscribe(res => {
              console.log(res)
                if(res.error){
                  const alertElement = document.createElement('div');
                  alertElement.className = 'alert alert-danger';
                  alertElement.textContent = 'Hubo un error a la hora de agregar la publicacion';
                  document.body.appendChild(alertElement);
                  setTimeout(() => {
                    alertElement.remove();
                  }, 3000);
              } 
              else{
                this.publicacionAgregada.emit();
                const alertElement = document.createElement('div');
                alertElement.className = 'alert alert-danger';
                alertElement.textContent = 'Publicacion agregada con exito';
                document.body.appendChild(alertElement);
                setTimeout(() => {
                  alertElement.remove();
                }, 3000);
              } 
            }); 
          }
        } 
      });
    }
    else{
      const alertElement = document.createElement('div');
       alertElement.className = 'alert alert-danger';
      alertElement.textContent = 'No se pudo realizar la operación debido a campos vacíos';
      document.body.appendChild(alertElement);
      setTimeout(() => {
        alertElement.remove();
      }, 3000);
    }
    this.modalService.dismissAll();
  }

  validarCampos(){
    if(this.nombre == "" || this.descripcion=="" || this.presencial == null || !this.habilidad  || !this.barrio ){
      return false
    }
    return true;
  }

  resetearValores(){
    this.nombre = "";
    this.descripcion ="";
    this.presencial = false;
    this.calle = "";
    this.numero = 0;
    this.esquina = "";
  }

  update(e : any) {
    let selectedObject = {};
    this.barrios.map((res:any)=>{
     if(e.target.value == res.idbarrio){
       selectedObject = res;
     }
    });
    this.barrio = selectedObject
  }

  updateHabilidad(e: any) {
    let selectedObject = {}
    this.habilidades.map((res: any) => {
      if (e.target.value == res.idhabilidad) {
        selectedObject = res
      }
    })
    this.habilidad = selectedObject
  }
}
