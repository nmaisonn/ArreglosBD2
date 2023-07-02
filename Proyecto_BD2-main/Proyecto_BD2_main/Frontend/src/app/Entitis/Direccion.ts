import { Barrio } from "./Barrio";

export class Direccion{
    idDireccion:number = 0;
    calle:string = "";
    numero:number = 0;
    esquina:string = "";
    fkIdBarrio:number = 0;
    barrio:Barrio | any;  
}
