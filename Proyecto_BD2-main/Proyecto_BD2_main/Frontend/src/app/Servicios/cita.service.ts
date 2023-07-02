import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { computeStyles } from '@popperjs/core';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor(private http: HttpClient) { }

  private webApiUrl = 'http://localhost:8080/';

  getCitasByIdUsuario(idusuario: any) {
    let respuesta = this.http.get<any>(this.webApiUrl + 'getCitasByIdUsuario?idusuario=' + idusuario);
    return respuesta
  }

  //fechaAlta
  addCita(idusuario: number, idpublicacion: number) {
    let respuesta = this.http.post<any>(this.webApiUrl + 'addCita', { idusuario, idpublicacion })
    return respuesta
  }

  cancelCita(idusuario: number, idpublicacion: number) {
    let respuesta = this.http.post<any>(this.webApiUrl + 'cancelCita', { idusuario, idpublicacion })
    return respuesta
  }

  getAllCitasById(idUsuario: any) {
    let respuesta = this.http.get<any>(this.webApiUrl + 'getAllCitasById?idUsuario=' + idUsuario);
    return respuesta
  }

  getCitasPendientes(idUsuario: any) {
    let respuesta = this.http.get<any>(this.webApiUrl + 'getCitasPendientes?idUsuario=' + idUsuario);
    return respuesta
  }

  getCitasEnProceso(idUsuario: any) {
    let respuesta = this.http.get<any>(this.webApiUrl + 'getCitasEnProceso?idUsuario=' + idUsuario);
    return respuesta
  }

  getCitasFinalizadas(idUsuario: any) {
    let respuesta = this.http.get<any>(this.webApiUrl + 'getCitasFinalizadas?idUsuario=' + idUsuario);
    return respuesta
  }

  cancelarCita(fkidusuario: any, fkidpublicacion: any) {
    let respuesta = this.http.post<any>(this.webApiUrl + 'cancelarCita', { fkidusuario, fkidpublicacion })
    return respuesta
  }

  pasarAEnProceso(fkidusuario: any, fkidpublicacion: any) {
    let respuesta = this.http.post<any>(this.webApiUrl + 'pasarAEnProceso', { fkidusuario, fkidpublicacion })
    return respuesta
  }

  pasarAFinalizadas(fkidusuario: any, fkidpublicacion: any) {
    let respuesta = this.http.post<any>(this.webApiUrl + 'pasarAFinalizadas', { fkidusuario, fkidpublicacion })
    return respuesta
  }

  getCitasByIdSolicitor(idUsuario: any) {
    let respuesta = this.http.get<any>(this.webApiUrl + 'getCitasByIdSolicitor?idUsuario=' + idUsuario);
    return respuesta
  }
  getCalificacionCita(idusuario: any, idpublicacion: any) {
    let url = `${this.webApiUrl}getCalificacionCita?idusuario=${idusuario}&idpublicacion=${idpublicacion}`;
    let respuesta = this.http.get<any>(url);
    return respuesta;
  }
}
