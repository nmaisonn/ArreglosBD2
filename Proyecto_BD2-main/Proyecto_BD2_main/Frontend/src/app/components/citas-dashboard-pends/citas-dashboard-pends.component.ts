import { Component, OnInit } from '@angular/core';
import { Cita } from 'src/app/Entitis/Cita';
import { CitaService } from 'src/app/Servicios/cita.service';

@Component({
  selector: 'app-citas-dashboard-pends',
  templateUrl: './citas-dashboard-pends.component.html',
  styleUrls: ['./citas-dashboard-pends.component.css']
})
export class CitasDashboardPendsComponent implements OnInit{
  citas:Cita[] | any

  constructor(private citasService:CitaService) {}
  
  ngOnInit() {
    this.loadCitas()
  }

  loadCitas() {
    let id = localStorage.getItem("idusuario")
    this.citasService.getCitasPendientes(id).subscribe(res=>{
      console.log(res.msg)
      this.citas = res.msg
    })
  }

  comenzarCita(cita:any) {
    this.citasService.pasarAEnProceso(cita.fkidusuario,cita.fkidpublicacion).subscribe(res=>{
      console.log(res.msg)
    })
  }

  cancelarCita(cita:any) {
    this.citasService.cancelarCita(cita.fkidusuario,cita.fkidpublicacion).subscribe(res=>{
      console.log(res.msg)
    })
  }
}
