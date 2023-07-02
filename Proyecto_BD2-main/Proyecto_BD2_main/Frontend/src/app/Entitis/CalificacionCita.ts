import { Usuario } from "./Usuario";
import { Publicacion } from "./Publicacion";

export class CalificacionCita {
    fkIdUsuario: number = 0;
    //usuario: Usuario | any;
    fkIdPublicacion: number = 0;
    //publicacion: Publicacion | any;
    fkIdCalificacion: number = 0;
    comentario: string = '';
}