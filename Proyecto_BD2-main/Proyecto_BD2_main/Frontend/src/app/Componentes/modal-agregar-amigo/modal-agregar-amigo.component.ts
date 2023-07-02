import { Component, Input } from '@angular/core';
import { Usuario } from 'src/app/Entitis/Usuario';
import { AmigoService } from 'src/app/Servicios/amigo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-agregar-amigo',
  templateUrl: './modal-agregar-amigo.component.html',
  styleUrls: ['./modal-agregar-amigo.component.css']
})
export class ModalAgregarAmigoComponent {
  @Input() usuario: Usuario | any;

  constructor(private amigoService: AmigoService, private modalService: NgbModal) {

  }

  agregarAmigo() {
    let id = localStorage.getItem('idusuario');
    this.amigoService.addAmigo(Number(id), this.usuario.idAmigo).subscribe((res) => {
      console.log(res)
    });
    this.modalService.dismissAll();
  }

  open(modaAgregarAmigo: any): void {
    this.modalService.open(modaAgregarAmigo);
  }
}
