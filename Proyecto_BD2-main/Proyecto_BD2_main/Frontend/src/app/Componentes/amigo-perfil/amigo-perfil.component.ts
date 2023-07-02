import { Component, Input } from '@angular/core';
import { Usuario } from 'src/app/Entitis/Usuario';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { HabiliadadService } from 'src/app/Servicios/habiliadad.service';
import { DireccionService } from 'src/app/Servicios/direccion.service';
import { BarrioService } from 'src/app/Servicios/barrio.service';
import { Direccion } from 'src/app/Entitis/Direccion';
import { Barrio } from 'src/app/Entitis/Barrio';
import { Habilidad } from 'src/app/Entitis/Habilidad';
import { Publicacion } from 'src/app/Entitis/Publicacion';
import { PublicacionService } from 'src/app/Servicios/publicacion.service';


@Component({
  selector: 'app-amigo-perfil',
  templateUrl: './amigo-perfil.component.html',
  styleUrls: ['./amigo-perfil.component.css']
})
export class AmigoPerfilComponent {
  amigo: Usuario | any;
  id: number | any;

  direccion: Direccion | any
  barrio: Barrio | any

  habilidadesBD: Habilidad[] | any
  habilidades: Habilidad[] | any
  habilidad: Habilidad | any
  publicaciones: Publicacion[] | any
  componenteOrigen: string | any;
  user: Usuario | any
  barrios: Barrio[] | any


  constructor(private route: ActivatedRoute, private usuarioService: UsuarioService,
    private skillService: HabiliadadService, private userService: UsuarioService, private direcService: DireccionService,
    private barrioService: BarrioService, private router: Router, private publicService: PublicacionService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.componenteOrigen = params.get('componenteOrigen');
    });
    this.loadProfile()
    this.loadSkills()
    this.loadBarrios()
    this.loadPublis()
  }
  loadPublis() {
    this.publicService.getPublicacionesByUserId(this.id).subscribe(res => {
      console.log(res.msg)
      this.publicaciones = res.msg
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

  loadSkills() {
    console.log(this.id)
    this.skillService.getSkillsByUserId(this.id).subscribe((res) => {
      if (res.error) {
        console.log(res.error)
      } else {
        this.habilidades = res.msg
      }
    })
  }

  loadProfile() {

    this.userService.getUsuarioById(this.id).subscribe((res) => {
      if (res.error) {
        console.log(res.error)
      } else {
        this.amigo = res.msg
        console.log("HOLA")
        console.log(this.amigo)
        console.log(res.msg)
        this.direcService
          .getDireccionById(this.amigo.fkiddireccion)
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
                    console.log("BARRIO")
                    console.log(res.msg)
                  }
                })
            }
          })
      }
    })
    console.log(this.amigo)
  }

  volver() {
    switch (this.componenteOrigen) {
      case 'componenteUsuario':
        this.router.navigate(['/usuarios']);
        break;
      case 'componenteAmigo':
        this.router.navigate(['/friends']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }
}
