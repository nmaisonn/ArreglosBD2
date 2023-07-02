import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AmigoService {

  constructor(private http: HttpClient) { }

  private webApiUrl = 'http://localhost:8080/';


  getAmigosByIdUsuario(idusuario: any) {
    console.log("Llego al servicio de getAmigosByIdUsuario")
    console.log(idusuario)
    let respuesta = this.http.get<any>(this.webApiUrl + 'getAmigosByIdUsuario?idusuario=' + idusuario);
    console.log("salgo del servicio de getAmigosByIdUsuario")
    return respuesta
  }

  getAmigosByIdUser(idusuario: any) {
    let respuesta = this.http.get<any>(this.webApiUrl + 'getAmigosByIdUser?idusuario=' + idusuario);
    return respuesta
  }

  //fechaAlta
  addAmigo(idusuario: any, idamigo: number) {
    console.log("Llego al servicio de addAmigo")
    console.log(idusuario)
    console.log(idamigo)
    let respuesta = this.http.post<any>(this.webApiUrl + 'addAmigo', { idusuario, idamigo })
    console.log("salgo del servicio de addAmigo")
    return respuesta
  }

  //fechaSolicitudNull
  cancelAmigo(idusuario: any, idamigo: number) {
    console.log(idusuario)
    console.log(idamigo)
    let respuesta = this.http.post<any>(this.webApiUrl + 'cancelAmigo', { idusuario, idamigo })
    return respuesta
  }

  deleteAmigo(idusuario: number, idamigo: number) {
    console.log('aljsali')
    let respuesta = this.http.post<any>(this.webApiUrl + 'deleteAmigo', { idusuario, idamigo })
    return respuesta;
  }

  solicitudAmistad(idusuario: any, idamigo: any) {
    console.log("Servicio:")
    console.log(idusuario)
    console.log(idamigo)
    let respuesta = this.http.post<any>(this.webApiUrl + 'solicitudAmistad', { idusuario, idamigo })
    return respuesta
  }


}
