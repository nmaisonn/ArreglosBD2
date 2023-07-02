import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { LoginService } from 'src/app/Servicios/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  ci: string = ''
  pass: string = ''

  constructor(private loginService: LoginService, private router: Router) {}

  loginUser(ci: string, pass: string) {
    this.loginService.loginUser(ci, pass).subscribe((res) => {
      console.log(res.token)
      console.log(res.idusuario)
      localStorage.setItem("token",res.token)
      localStorage.setItem("idusuario",res.idusuario)
      this.router.navigate(["/home"])
    },(err)=>{
      console.log("ERROR")
    })
  }

  ngOnInit(): void {}
}
