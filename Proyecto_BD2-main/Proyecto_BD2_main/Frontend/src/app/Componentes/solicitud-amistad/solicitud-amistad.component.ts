import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Amigo } from 'src/app/Entitis/Amigo';
import { SolicitudAmistad } from 'src/app/Entitis/solicitud-amistad';
import { AmigoService } from 'src/app/Servicios/amigo.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-solicitud-amistad',
  templateUrl: './solicitud-amistad.component.html',
  styleUrls: ['./solicitud-amistad.component.css']
})
export class SolicitudAmistadComponent {
  @Input() amigo: Amigo | any;
  @Output() actualizar = new EventEmitter<number>(); 

  idUsuarioLogueado = localStorage.getItem('idusuario');

  constructor(private amigoService: AmigoService, private usuarioService:UsuarioService){}

  ngOnInit(){
    let idUsuario: number = this.idUsuarioLogueado ? parseInt(this.idUsuarioLogueado) : 0;
    if (this.amigo.fkidamigo == idUsuario) {
      this.usuarioService.getUsuarioById(this.amigo.fkidusuario).subscribe(res=>{
        this.amigo.amigo = res.msg
        this.amigo.amigo.idusuario = this.amigo.fkidusuario;
        console.log("AMIGO")
        console.log(this.amigo.amigo)
      });
      this.usuarioService.getUsuarioById(this.amigo.fkidamigo).subscribe(res=>{
        this.amigo.usuario = res.msg
        this.amigo.usuario.idusuario = this.amigo.fkidamigo
        console.log("USUARIO")
        console.log(this.amigo.usuario)
      });
    }
    else {
      this.usuarioService.getUsuarioById(this.amigo.fkidusuario).subscribe(res=>{
        this.amigo.usuario = res.msg
        this.amigo.usuario.idusuario = this.amigo.fkidusuario
        console.log("USUARIO")
        console.log(this.amigo.usuario)
      });
      this.usuarioService.getUsuarioById(this.amigo.fkidamigo).subscribe(res=>{
        this.amigo.amigo = res.msg
        this.amigo.amigo.idusuario = this.amigo.fkidamigo
        console.log("AMIGO")
        console.log(this.amigo.amigo)
      });
    }
  }


  addAmigo(){
    console.log("AddAmigo")
    console.log(this.amigo.amigo)
    this.amigoService.addAmigo(this.idUsuarioLogueado,this.amigo.amigo.idusuario).subscribe(res =>{
      console.log(res)
        if(res.excepcion == true){
          const alertElement = document.createElement('div');
          alertElement.className = 'alert alert-danger';
          alertElement.textContent = 'Hubo un error a la hora de añadir a tu amigo';
          document.body.appendChild(alertElement);
          setTimeout(() => {
            alertElement.remove();
          }, 3000);
        }  
        else{
          this.actualizar.emit();
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

  cancelAmigo(){
    this.amigoService.cancelAmigo(this.idUsuarioLogueado,this.amigo.amigo.idusuario).subscribe(res =>{
      console.log(res)
        if(res.excepcion == true){
          const alertElement = document.createElement('div');
          alertElement.className = 'alert alert-danger';
          alertElement.textContent = 'Hubo un error a la hora de rechazar la solicitud de amistad';
          document.body.appendChild(alertElement);
          setTimeout(() => {
            alertElement.remove();
          }, 3000);
        }  
        else{
          this.actualizar.emit();
          const alertElement = document.createElement('div');
          alertElement.className = 'alert alert-danger';
          alertElement.textContent = 'Se rechazo la solicitud de amistad con exito.';
          document.body.appendChild(alertElement);
          setTimeout(() => {
            alertElement.remove();
          }, 3000);
        }
    })
  }
}
