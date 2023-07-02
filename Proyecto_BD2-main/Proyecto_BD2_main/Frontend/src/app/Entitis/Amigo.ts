import { Usuario } from "./Usuario";

export class Amigo {
    fkIdUsuario: number = 0;
    usuario: Usuario | any;
    fkIdAmigo: number = 0;
    amigo: Usuario | any;
    fechaSolicitud: Date | null = null;
}
