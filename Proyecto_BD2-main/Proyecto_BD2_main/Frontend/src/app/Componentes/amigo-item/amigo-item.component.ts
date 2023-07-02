import { Component, Input } from '@angular/core';
import { Usuario } from 'src/app/Entitis/Usuario';
import { AmigoService } from 'src/app/Servicios/amigo.service';

@Component({
  selector: 'app-amigo-item',
  templateUrl: './amigo-item.component.html',
  styleUrls: ['./amigo-item.component.css']
})
export class AmigoItemComponent {
  @Input() infoAmigo: Usuario | any;

  constructor(private amigoService: AmigoService) { }

  eliminarAmigo() {
    let id = localStorage.getItem('idusuario');
    this.amigoService.deleteAmigo(Number(id), this.infoAmigo.idusuario).subscribe((res) => {
      console.log(res)
      window.location.reload()
    });
  }

}
