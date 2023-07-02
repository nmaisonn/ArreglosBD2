import { Direccion } from "./Direccion";
import { Habilidad } from "./Habilidad";
import { Usuario } from "./Usuario";

export class Publicacion {
    idPublicacion: number = 0;
    nombre: string = "";
    esPresencial: boolean = false;
    descripcion: string = "";
    fechaAlta: Date | null = null;
    fechaBaja: Date | null = null;
    fkIdUsuario: number = 0;
    usuario: Usuario | any;
    fkIdHabilidad: number = 0;
    habilidad: Habilidad | any;
    fkIdDireccion: number = 0;
    direccion: Direccion | any;
}