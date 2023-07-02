import { Direccion } from "./Direccion";
import { Publicacion } from "./Publicacion";
import { Usuario } from "./Usuario";

export class Cita {
	fkIdUsuario: number = 0;
	usuario: Usuario | any;
	fkIdPublicacion: number = 0;
	publicacion: Publicacion | any;
	fkIdDireccion: number = 0;
	direccion: Direccion | any;
	fechaSolicitada: Date | null = null;
	fechaSolicitud: Date | null = null;
	fechaAlta: Date | null = null;
	fechaBaja: Date | null = null;
	fechaInicio: Date | null = null;
	fechaFin: Date | null = null;


	cita(pFkIdUsuario: number, pFkIdPublicacion: number, pFkIdDireccion: number, pFechaSolicitada: Date | null) {
		this.fkIdUsuario = pFkIdUsuario;
		this.fkIdPublicacion = pFkIdPublicacion;
		this.fkIdDireccion = pFkIdDireccion;
		this.fechaSolicitada = pFechaSolicitada;
	}
}