import { Producto } from "./producto.model";

export class Venta {

    
        _id: string ="";
        cliente: string ="";
        tarjeta: number=0;
        monto: number=0;
        envio:  number=0;
        total:  number=0;
        fecha: string ="";
        detalle: Producto = new Producto;
      


}
