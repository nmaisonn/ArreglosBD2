import { Component, OnInit } from '@angular/core'
import { Barrio } from 'src/app/Entitis/Barrio'
import { Direccion } from 'src/app/Entitis/Direccion'
import { Usuario } from 'src/app/Entitis/Usuario'
import { BarrioService } from 'src/app/Servicios/barrio.service'
import { DireccionService } from 'src/app/Servicios/direccion.service'
import { UsuarioService } from 'src/app/Servicios/usuario.service'

@Component({
  selector: 'app-editar-datos',
  templateUrl: './editar-datos.component.html',
  styleUrls: ['./editar-datos.component.css'],
})
export class EditarDatosComponent implements OnInit {
  nombre: string = ''
  apellido: string = ''
  calle: string = ''
  esquina: string = ''
  numpuerta: string = ''

  user: Usuario | any
  direccion: Direccion | any
  barrios: Barrio[] | any
  barrio: Barrio | any

  ngOnInit(): void {
    this.loadProfile()
    this.loadBarrios()
  }

  constructor(
    private userService: UsuarioService,
    private direcService: DireccionService,
    private barrioService: BarrioService,
  ) {}

  loadProfile() {
    let id = localStorage.getItem('idusuario')
    this.userService.getUsuarioById(id).subscribe((res) => {
      if (res.error) {
        console.log(res.error)
      } else {
        this.user = res.msg
        this.direcService
          .getDireccionById(this.user.fkiddireccion)
          .subscribe((res) => {
            if (res.error) {
              console.log(res.error)
            } else {
              this.direccion = res.msg
            }
          })
      }
    })
  }

  loadBarrios() {
    this.barrioService.getBarrios().subscribe((res) => {
      if (res.error) {
        console.log(res.error)
      } else {
        this.barrios = res.msg
      }
    })
  }

  update(e: any) {
    let selectedObject = {}
    this.barrios.map((res: any) => {
      if (e.target.value == res.idbarrio) {
        selectedObject = res
      }
    })
    this.barrio = selectedObject
  }

  editarDatos(
    nombre: string,
    apellido: string,
    calle: string,
    esquina: string,
    numpuerta: string,
  ) {

    this.userService
      .editUsuario(
        nombre,
        apellido,
        calle,
        esquina,
        numpuerta,
        this.user,
        this.barrio,
        this.direccion,
        localStorage.getItem("idusuario")
      )
      .subscribe((res) => {
        console.log(res.msg)
      })
  }
}
