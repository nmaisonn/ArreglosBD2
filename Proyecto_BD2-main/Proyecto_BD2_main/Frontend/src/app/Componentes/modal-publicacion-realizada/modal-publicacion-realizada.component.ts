import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';
import { Publicacion } from 'src/app/Entitis/Publicacion';
import { PublicacionService } from 'src/app/Servicios/publicacion.service';
import { Cita } from 'src/app/Entitis/Cita';

@Component({
  selector: 'app-modal-publicacion-realizada',
  templateUrl: './modal-publicacion-realizada.component.html',
  styleUrls: ['./modal-publicacion-realizada.component.css']
})
export class ModalPublicacionRealizadaComponent {


  @Input() citaCompleta: Cita | any;

  @Output() deletePart = new EventEmitter<any>();
  constructor(config: NgbModalConfig, private modalService: NgbModal, private publicacionService: PublicacionService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit(): void {
  }

  open(modalDelete: any): void {
    this.modalService.open(modalDelete);
  }


  close() {
    this.modalService.dismissAll();
  }

  getColor() {
    if (this.citaCompleta.fechaFin == null)
      return "green"
    else
      return "red";
  }


}
