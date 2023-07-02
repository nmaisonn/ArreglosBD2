import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from 'src/app/Entitis/Usuario';
import { AmigoService } from 'src/app/Servicios/amigo.service';

@Component({
  selector: 'app-catalogo-usuario-item',
  templateUrl: './catalogo-usuario-item.component.html',
  styleUrls: ['./catalogo-usuario-item.component.css']
})
export class CatalogoUsuarioItemComponent {
  @Output() notificar= new EventEmitter<void>();
  @Input() infoUsuario: Usuario | any;
  

  constructor(private amigoService: AmigoService) {}

  agregarAmigo() {
    let id = localStorage.getItem("idusuario");
    this.amigoService.solicitudAmistad(id, this.infoUsuario.idusuario).subscribe(res => {
      console.log(res)
      this.notificar.emit();
    });
  }
}
