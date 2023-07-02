import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  private webApiUrl = 'http://localhost:8080/'

  loginUser(ci: string, pass: string) {
    console.log("Llego al servicio")
    return this.http.post<any>(this.webApiUrl + 'login', {
      ci,
      pass,
    })
  }
}
