import { Producto } from "./producto.model";
import { Puja } from "./puja.model";

export class Subasta {

        _id: string ="";
        producto:Producto =new Producto;
        valor_inicial:number=0;
        fecha_hora_inicio: string ="";
        fecha_hora_fin: string ="";
        pujas: Puja[]=[];
    
}
