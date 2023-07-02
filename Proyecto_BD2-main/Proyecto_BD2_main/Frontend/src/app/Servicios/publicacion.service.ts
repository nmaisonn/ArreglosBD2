import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  constructor(private http: HttpClient) { }

  private webApiUrl = 'http://localhost:8080/';


  buscar(filtro: string) {
    let respuesta = this.http.get<any>(this.webApiUrl + 'getPublisFiltradas?filtro=' + filtro);
    return respuesta
  }

  getPublicaciones() {
    let respuesta = this.http.get<any>(this.webApiUrl + 'getPublicaciones');
    return respuesta
  }

  getPublicacionesDashboard(idusuario:any) {
    let respuesta = this.http.get<any>(this.webApiUrl + 'getPublicacionesDashboard?idusuario=' + idusuario);
    return respuesta
  }

  addPublicacion(titulo: string, descripcion: string, presencial: boolean | null, idDireccion: number, idHabilidad: number, idUsuario: any) {
    let respuesta = this.http.post<any>(this.webApiUrl + 'addPublicacion', { titulo, descripcion, presencial, idDireccion, idHabilidad, idUsuario })
    return respuesta
  }

  deletePublicacion(idPublicacion: number) {
    let respuesta = this.http.post<any>(this.webApiUrl + 'deletePublicacion', { idPublicacion })
    return respuesta
  }


  getPublicacionesRealizadasById(idusuario: any) {
    let respuesta = this.http.get<any>(this.webApiUrl + 'getPublicacionesRealizadas?idusuario=' + idusuario);
    return respuesta
  }



  getPublicacionesRecibidasById(idusuario: any) {
    let respuesta = this.http.get<any>(this.webApiUrl + 'getPublicacionesRecibidas?idusuario=' + idusuario);
    return respuesta
  }



  ratePublicacionRecibida(idusuario: number, idpublicacion: number, rate: number, comentario: string) {
    console.log(comentario)
    let respuesta = this.http.post<any>(this.webApiUrl + 'ratePublicacionRecibida', { idusuario, idpublicacion, rate, comentario });
    return respuesta
  }

  getPublicacionById(idPublicacion: number) {
    let respuesta = this.http.get<any>(this.webApiUrl + 'getPublicacionById?idPublicacion=' + idPublicacion);
    return respuesta
  }

  getNullPublicacionById(idPublicacion: number) {
    let respuesta = this.http.get<any>(this.webApiUrl + 'getNullPublicacionById?idPublicacion=' + idPublicacion);
    return respuesta
  }

  getPublicacionesByUserId(idusuario: any) {
    let respuesta = this.http.get<any>(this.webApiUrl + "getPublicacionesById?idusuario=" + idusuario);
    return respuesta
  }

  buscarUsuarios(filtro:string,id:any) {
    let respuesta = this.http.get<any>(this.webApiUrl + 'getUsuariosFiltrados?filtro=' + filtro+"&idusuario="+id);
    return respuesta
  }
}
