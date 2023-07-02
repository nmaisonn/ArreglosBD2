import { Component,OnInit } from '@angular/core';
import { Cita } from 'src/app/Entitis/Cita';
import { CitaService } from 'src/app/Servicios/cita.service';

@Component({
  selector: 'app-citas-dashboard',
  templateUrl: './citas-dashboard.component.html',
  styleUrls: ['./citas-dashboard.component.css']
})
export class CitasDashboardComponent implements OnInit{
  citas:Cita[] | any

  constructor(private citasService:CitaService) {}
  
  ngOnInit() {
    this.loadCitas()
  }

  loadCitas() {
    let id = localStorage.getItem("idusuario")
    this.citasService.getAllCitasById(id).subscribe(res=>{
      console.log(res.msg)
      this.citas = res.msg
    })
  }
}
