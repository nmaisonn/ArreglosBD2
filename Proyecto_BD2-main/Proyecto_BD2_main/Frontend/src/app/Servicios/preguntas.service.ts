import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  constructor(private http: HttpClient) { }

  private webApiUrl = 'http://localhost:8080/';

  getPreguntasFrecuentes(){
    console.log("llegue al servicio")
    let respuesta = this.http.get<any>(this.webApiUrl + 'getPreguntasFrecuentes');
    console.log("SALGO DEL SERVICIO")
    return respuesta;
  }

}
