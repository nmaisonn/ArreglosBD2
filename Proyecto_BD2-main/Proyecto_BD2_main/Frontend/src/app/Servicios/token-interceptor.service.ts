import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (req.url.includes('/login') || req.url.includes("/register")) {
      return next.handle(req);
   }

    let tokenAlmacenado = localStorage.getItem("token");

    let jwttoken= req.clone({
      setHeaders:  {
        Authorization: 'Bearer ' + tokenAlmacenado 
      }
    })
    return next.handle(jwttoken); 
  }
}