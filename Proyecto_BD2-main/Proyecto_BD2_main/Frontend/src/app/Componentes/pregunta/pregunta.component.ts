import { Component, Input } from '@angular/core';
import { Pregunta } from 'src/app/Entitis/Pregunta';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent {
  @Input() pregunta: Pregunta | any;

}
