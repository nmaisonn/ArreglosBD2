import { Component } from '@angular/core';
import { Barrio } from 'src/app/Entitis/Barrio';
import { BarrioService } from 'src/app/Servicios/barrio.service';
import { RegistroService } from 'src/app/Servicios/registro.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  barrios: Barrio[] | any
  barrio: Barrio | any
  calle: string = ''
  esquina: string = ''
  numpuerta: number | any

  fecha: Date | any
  nombre: string = ''
  apellido: string = ''
  ci: string = ''
  pass: string = ''

  constructor(private barrioService: BarrioService, private registroService: RegistroService) { }

  ngOnInit() {
    this.loadBarrios()
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

  registerUser(
    nombre: string,
    apellido: string,
    ci: string,
    fecha: Date,
    pass: string,
    calle: string,
    esquina: string,
    numpuerta: number,
  ) {
    console.log(this.barrio)
    if (!nombre || !apellido || !ci || !fecha || !pass || !calle || !esquina || !numpuerta || !this.barrio){
      console.log("NO TE REGISTRAS")
      return
    }
    this.registroService.registerUser(nombre, apellido, ci, fecha, pass, this.barrio, calle, esquina, numpuerta).subscribe((res) => {
      console.log(res.msg)
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
}
