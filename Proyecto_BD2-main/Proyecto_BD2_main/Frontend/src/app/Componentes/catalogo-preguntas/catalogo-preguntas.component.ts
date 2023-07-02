import { Component } from '@angular/core';
import { Pregunta } from 'src/app/Entitis/Pregunta';
import { PreguntasService } from 'src/app/Servicios/preguntas.service';

@Component({
  selector: 'app-catalogo-preguntas',
  templateUrl: './catalogo-preguntas.component.html',
  styleUrls: ['./catalogo-preguntas.component.css']
})
export class CatalogoPreguntasComponent {

  preguntasFrecuentes : Pregunta[] | any;

  constructor(private preguntaService: PreguntasService) { }


  ngOnInit(){
    this.getPreguntasFrecuentes();
  }

  getPreguntasFrecuentes() : void{
    this.preguntaService.getPreguntasFrecuentes().subscribe(res =>{
      this.preguntasFrecuentes = res.msg
    })
  }
}
