import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { CalificacionCita } from 'src/app/Entitis/CalificacionCita';
import { Cita } from 'src/app/Entitis/Cita';
import { PublicacionService } from 'src/app/Servicios/publicacion.service';

@Component({
  selector: 'app-modal-publicacion-cita-recibida',
  templateUrl: './modal-publicacion-cita-recibida.component.html',
  styleUrls: ['./modal-publicacion-cita-recibida.component.css']
})
export class ModalPublicacionCitaRecibidaComponent {
  currentRate = 0;
  descripcion = '';

  @Input() citaCompleta: Cita | any;
  @Input() calificacion: CalificacionCita | any;

  @Output() deletePart = new EventEmitter<any>();
  constructor(config: NgbModalConfig, private modalService: NgbModal, private publicacionService: PublicacionService, private configRating: NgbRatingConfig) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit(): void {
  }

  open(modalPublicacion: any): void {
    this.modalService.open(modalPublicacion);
    console.log(this.calificacion)
    if (this.calificacion.fkIdCalificacion != 0) {
      this.currentRate = this.calificacion.fkIdCalificacion;
      this.descripcion = this.calificacion.comentario;
      this.configRating.readonly = true;
    } else {
      this.configRating.readonly = false;
    }
  }


  guardarCalificacion() {
    let id = localStorage.getItem('idusuario');
    console.log(id, this.citaCompleta.fkIdPublicacion, this.currentRate, this.descripcion)
    this.publicacionService.ratePublicacionRecibida(Number(id), this.citaCompleta.fkIdPublicacion, this.currentRate, this.descripcion).subscribe((res) => {
      console.log(res)
    });

    //this.deletePart.emit();
    this.modalService.dismissAll();
  }

  getColor() {
    if (this.citaCompleta.fechaFin == null)
      return "green"
    else
      return "red";
  }

  close() {
    this.modalService.dismissAll();
  }

}
