import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Habilidad } from '../Entitis/Habilidad';

@Injectable({
  providedIn: 'root'
})
export class HabiliadadService {

  constructor(private http: HttpClient) { }

  private webApiUrl = 'http://localhost:8080/';


  getHabilidadById(idHabiliadad: number) {
    let respuesta = this.http.get<any>(this.webApiUrl + 'getHabilidadById?idHabilidad=' + idHabiliadad);
    return respuesta
  }

  getNullHabilidadById(idHabiliadad: number) {
    let respuesta = this.http.get<any>(this.webApiUrl + 'getNullHabilidadById?idHabilidad=' + idHabiliadad);
    return respuesta
  }
  
  getHabilidades() {
    let respuesta = this.http.get<any>(this.webApiUrl + 'getHabilidades');
    return respuesta;
  }

  getHabilidadByName(nombre: string) {
    let respuesta = this.http.get<any>(this.webApiUrl + 'getHabilidadByName?nombre=' + nombre);
    return respuesta;
  }

  getSkillsByUserId(id: any) {
    let respuesta = this.http.get<any>(this.webApiUrl + 'getSkillsByUserId?idusuario=' + id);
    return respuesta
  }

  deleteSkillFromUser(id: any, idhabilidad: number) {
    let respuesta = this.http.post<any>(this.webApiUrl + "deleteSkillFromUser", { id, idhabilidad });
    return respuesta
  }

  addSkillToUser(id: any, idhabilidad: number) {
    let respuesta = this.http.post<any>(this.webApiUrl + "addSkillToUser", { id, idhabilidad });
    return respuesta
  }
}
