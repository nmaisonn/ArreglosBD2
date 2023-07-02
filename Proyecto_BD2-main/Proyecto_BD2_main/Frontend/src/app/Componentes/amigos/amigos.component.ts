import { Component } from '@angular/core';
import { AmigoService } from 'src/app/Servicios/amigo.service';
import { Usuario } from 'src/app/Entitis/Usuario';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  styleUrls: ['./amigos.component.css']
})
export class AmigosComponent {

  amigos: any[] = [];
  idAmigos: any[] = [];

  constructor(private amigoService: AmigoService, private usuarioService: UsuarioService) { }


  ngOnInit() {
    this.getAmigos();
  }

  getAmigos(): void {
    let idUsuario = localStorage.getItem("idusuario");
    this.amigoService.getAmigosByIdUser(idUsuario).subscribe(res => {
      console.log(res)

      this.idAmigos = res.msg // el res devuelve la lista amigos, que tiene idpersona y id amigo y algo mas


      this.idAmigos.forEach(amigo => {
        if (amigo.fkidusuario != idUsuario) {
          this.usuarioService.getUsuarioById(amigo.fkidusuario).subscribe(res => {
            this.amigos.push(res.msg);
          });
        }

        if (amigo.fkidamigo != idUsuario) {
          this.usuarioService.getUsuarioById(amigo.fkidamigo).subscribe(res => {
            this.amigos.push(res.msg);
            console.log(res.msg)
          });
        }

      });
    });
  }
}
