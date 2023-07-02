import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Direccion } from '../Entitis/Direccion';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  constructor(private http: HttpClient) { }

  private webApiUrl = 'http://localhost:8080/';

  getDireccion(calle: string, numero: number, esquina: string, idBarrio: number | null) {
    let url = `${this.webApiUrl}getDireccion?calle=${calle}&numero=${numero}&esquina=${esquina}&idBarrio=${idBarrio}`;
    let respuesta = this.http.get<any>(url); 
    return respuesta;
  }

  addDireccion(calle: string, numero: number, esquina: string, idBarrio: number){
    let respuesta = this.http.post<any>(this.webApiUrl + 'addDireccion', { calle, numero, esquina, idBarrio})
    return respuesta;
  }

  getDireccionById(iddirec: any) {
    let respuesta = this.http.get<any>(this.webApiUrl + 'getDirecById?iddirec='+iddirec);
    return respuesta
  }

}
