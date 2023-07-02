export class SolicitudAmistad {
    nombre:string | undefined="";
    apellido:string | undefined="";
    idUsuario :number | undefined = 0;
    fechaSolicitud:Date | null = null;


    constructor(pIdUsuario:number|undefined, pNombre:string | undefined, pApellido:string | undefined, pFechaSolicitud:Date|null){
        this.idUsuario = pIdUsuario;
        this.nombre = pNombre;
        this.apellido = pApellido;
        this.fechaSolicitud = pFechaSolicitud;
    }
}
