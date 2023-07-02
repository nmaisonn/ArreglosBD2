import { Component, OnInit } from '@angular/core';
import { Cita } from 'src/app/Entitis/Cita';
import { CitaService } from 'src/app/Servicios/cita.service';

@Component({
  selector: 'app-citas-dashboard-finalizadas',
  templateUrl: './citas-dashboard-finalizadas.component.html',
  styleUrls: ['./citas-dashboard-finalizadas.component.css']
})
export class CitasDashboardFinalizadasComponent implements OnInit{
  citas:Cita[] | any

  constructor(private citasService:CitaService) {}
  
  ngOnInit() {
    this.loadCitas()
  }

  loadCitas() {
    let id = localStorage.getItem("idusuario")
    this.citasService.getCitasFinalizadas(id).subscribe(res=>{
      console.log(res.msg)
      this.citas = res.msg
    })
  }
}
