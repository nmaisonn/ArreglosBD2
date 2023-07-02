import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { Usuario } from 'src/app/Entitis/Usuario';
import { PublicacionService } from 'src/app/Servicios/publicacion.service';

@Component({
  selector: 'app-catalogo-usuarios',
  templateUrl: './catalogo-usuarios.component.html',
  styleUrls: ['./catalogo-usuarios.component.css']
})
export class CatalogoUsuariosComponent {
  usuarios: Usuario[] = [];
  idAmigos: any[] = [];
  filtro:string=""

  constructor(private usuarioService: UsuarioService,private publicacionesService: PublicacionService) { }


  ngOnInit() {
    this.getUsuarios();
  }

  buscar(){
    console.log(this.filtro)
    console.log(this.usuarios)
    let id = localStorage.getItem("idusuario")
    this.publicacionesService.buscarUsuarios(this.filtro,id).subscribe(res=>{
      this.usuarios = res.msg
      console.log(this.usuarios)
    })
  }

  getUsuarios(): void {
    let id = localStorage.getItem("idusuario");
    this.usuarioService.getUsuariosNoAmigos(id).subscribe(res => {
      console.log(res)
      this.usuarios = res.msg
    });
  }

  onNotificado(){
    this.getUsuarios();
  }

}

