import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BarrioService {

  constructor(private http: HttpClient) { }

  private webApiUrl = 'http://localhost:8080/';

  getBarrios(){
    let respuesta = this.http.get<any>(this.webApiUrl + 'getBarrios');
    return respuesta;
  }

  getIdBarrioByName(nombreBarrio:string){
    let respuesta = this.http.get<any>(this.webApiUrl + 'getBarrioByName?nombre='+nombreBarrio);
    return respuesta;
  }

  getBarrioById(id:any) {
    let respuesta = this.http.get<any>(this.webApiUrl + 'getBarrioById?idbarrio='+id);
    return respuesta
  }

  getBarrioByDireccionId(idDireccion:number){
    let respuesta = this.http.get<any>(this.webApiUrl + 'getBarrioByDireccionId?idDireccion='+idDireccion);
    return respuesta
  }
}
