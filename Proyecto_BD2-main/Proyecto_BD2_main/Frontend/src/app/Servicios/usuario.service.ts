import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../Entitis/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  private webApiUrl = 'http://localhost:8080/';


  getUsuarioById(idusuario: any) {
    let respuesta = this.http.get<any>(this.webApiUrl + 'getUsuarioById?idusuario=' + idusuario);
    return respuesta
  }

  getNullUsuarioById(idusuario: any) {
    let respuesta = this.http.get<any>(this.webApiUrl + 'getNullUsuarioById?idusuario=' + idusuario);
    return respuesta
  }

  getUsuariosNoAmigos(idusuario: any) {
    let respuesta = this.http.get<any>(this.webApiUrl + 'getUsuariosNoAmigos?idusuario=' + idusuario);
    return respuesta
  }

  editUsuario(nombre: string, apellido: string, calle: string, esquina: string, numpuerta: string,usuario:Usuario,barrio:any,direccion:any,idusuario:any){
    let respuesta = this.http.post<any>(this.webApiUrl + 'editUsuario',{nombre,apellido,calle,esquina,numpuerta,usuario,barrio,direccion,idusuario});
    return respuesta
  }
}
