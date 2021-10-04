import { Producto } from "./producto.model";

export class Categoria {
    _id:string="";
    nombre: string = "";
    productos: Producto[]  = [];
    producto!:Producto;
}
