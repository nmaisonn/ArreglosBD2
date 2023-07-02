import { Direccion } from "./Direccion";

export class Usuario{
    idUsuario:number=0;
    nombre:string="";
    apellido:string="";
    ci:string="";
    pswd:string="";
    fechaNacimiento:Date|null = null;
    fechaDesde:Date|null = null;
    fechaHasta:Date|null = null; 
    fkIdDireccion:number=0;
    direccion:Direccion|any;
}

