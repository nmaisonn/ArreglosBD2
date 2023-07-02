import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  constructor(private http: HttpClient) {}

  private webApiUrl = 'http://localhost:8080/'

  registerUser(
    nombre: string,
    apellido: string,
    ci: string,
    fecha: Date,
    pass: string,
    barrio: number,
    calle: string,
    esquina: string,
    numpuerta: number,
  ) {
    let respuesta = this.http.post<any>(this.webApiUrl + 'register', {
      nombre,
      apellido,
      ci,
      fecha,
      pass,
      barrio,
      calle,
      esquina,
      numpuerta,
    })
    return respuesta
  }
}
