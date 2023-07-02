import { Component, OnInit } from '@angular/core'
import { Barrio } from 'src/app/Entitis/Barrio'
import { Direccion } from 'src/app/Entitis/Direccion'
import { Publicacion } from 'src/app/Entitis/Publicacion'
import { Usuario } from 'src/app/Entitis/Usuario'
import { BarrioService } from 'src/app/Servicios/barrio.service'
import { DireccionService } from 'src/app/Servicios/direccion.service'
import { HabiliadadService } from 'src/app/Servicios/habiliadad.service'
import { UsuarioService } from 'src/app/Servicios/usuario.service'
import { Habilidad } from 'src/app/Entitis/Habilidad'
import { PublicacionService } from 'src/app/Servicios/publicacion.service'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: Usuario | any
  direccion: Direccion | any
  barrio: Barrio | any

  habilidadesBD: Habilidad[] | any

  habilidades: Habilidad[] | any
  habilidad: Habilidad | any
  publicaciones: Publicacion[] | any

  barrios: Barrio[] | any

  constructor(
    private skillService: HabiliadadService,
    private userService: UsuarioService,
    private direcService: DireccionService,
    private barrioService: BarrioService,
    private publicService: PublicacionService
  ) {}

  ngOnInit() {
    this.loadProfile()
    this.loadSkills()
    this.loadBDSkills()
    this.loadBarrios()
    this.loadPublis()
  }

  coso(){
    this.loadPublis()
  }

  loadPublis() {
    let id =localStorage.getItem("idusuario")
    console.log(id)
    this.publicService.getPublicacionesByUserId(id).subscribe(res=>{
      console.log(res.msg)
      this.publicaciones= res.msg
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

  loadBDSkills() {
    this.skillService.getHabilidades().subscribe((res) => {
      if (res.error) {
        console.log(res.error)
      } else {
        this.habilidadesBD = res.msg
      }
    })
  }

  loadSkills() {
    let id = localStorage.getItem('idusuario')
    this.skillService.getSkillsByUserId(id).subscribe((res) => {
      if (res.error) {
        console.log(res.error)
      } else {
        this.habilidades = res.msg
      }
    })
  }

  loadProfile() {
    let id = localStorage.getItem('idusuario')
    this.userService.getUsuarioById(id).subscribe((res) => {
      if (res.error) {
        console.log(res.error)
      } else {
        this.user = res.msg
        console.log('HOLA')
        console.log(this.user)
        console.log(res.msg)
        this.direcService
          .getDireccionById(this.user.fkiddireccion)
          .subscribe((res) => {
            if (res.error) {
              console.log(res.error)
            } else {
              this.direccion = res.msg
              this.barrioService
                .getBarrioById(this.direccion.fkidbarrio)
                .subscribe((res) => {
                  if (res.error) {
                    console.log(res.error)
                  } else {
                    this.barrio = res.msg
                    console.log('BARRIO')
                    console.log(res.msg)
                  }
                })
            }
          })
      }
    })
  }

  update(e: any) {
    let selectedObject = {}
    this.habilidadesBD.map((res: any) => {
      if (e.target.value == res.idhabilidad) {
        selectedObject = res
      }
    })
    this.habilidad = selectedObject
  }

  borrarSkill(idhabilidad: number) {
    console.log(idhabilidad)
    let id = localStorage.getItem('idusuario')
    this.skillService.deleteSkillFromUser(id, idhabilidad).subscribe((res) => {
      console.log(res.msg)
    })
  }

  agregarSkill() {
    let id = localStorage.getItem('idusuario')
    this.skillService
      .addSkillToUser(id, this.habilidad.idhabilidad)
      .subscribe((res) => {
        console.log(res.msg)
      })
  }

  removeObjectWithID(id: number) {
    const objWithIdIndex = this.user.skills.findIndex(
      (obj: any) => obj.id === id,
    )

    if (objWithIdIndex > -1) {
      this.user.skills.splice(objWithIdIndex, 1)
    }
  }
}
