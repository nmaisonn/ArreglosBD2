import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolcititudCitaService {
  
  constructor(private http: HttpClient) { }

  private webApiUrl = 'http://localhost:8080/';


  addSolicitudCita(idusuario: any, idpublicacion:number, iddireccion:number | undefined, fechaSolicitada :Date | null) {
    let respuesta = this.http.post<any>(this.webApiUrl + 'addSolicitudCita', { idusuario, idpublicacion,iddireccion,fechaSolicitada})
    return respuesta
  }
}
