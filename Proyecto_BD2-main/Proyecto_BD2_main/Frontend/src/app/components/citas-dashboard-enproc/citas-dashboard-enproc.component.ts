import { Component, OnInit } from '@angular/core';
import { Cita } from 'src/app/Entitis/Cita';
import { CitaService } from 'src/app/Servicios/cita.service';

@Component({
  selector: 'app-citas-dashboard-enproc',
  templateUrl: './citas-dashboard-enproc.component.html',
  styleUrls: ['./citas-dashboard-enproc.component.css']
})
export class CitasDashboardEnprocComponent implements OnInit{
  citas:Cita[] | any

  constructor(private citasService:CitaService) {}
  
  ngOnInit() {
    this.loadCitas()
  }

  loadCitas() {
    let id = localStorage.getItem("idusuario")
    this.citasService.getCitasEnProceso(id).subscribe(res=>{
      console.log(res.msg)
      this.citas = res.msg
    })
  }

  finalizarCita(cita:any){
    console.log(cita)
    this.citasService.pasarAFinalizadas(cita.fkidusuario,cita.fkidpublicacion).subscribe(res=>{
      console.log(res.msg)
    })
  }

  cancelarCita(cita:any) {
    this.citasService.cancelarCita(cita.fkidusuario,cita.fkidpublicacion).subscribe(res=>{
      console.log(res.msg)
    })
  }
}
