import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { Producto } from 'src/app/models/producto.model';
import { Tarjeta } from 'src/app/models/tarjeta.model';
import { SesionService } from 'src/app/services/sesion.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Usuario } from 'src/app/models/usuario.model';
 

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html' 
})
export class CarritoComponent implements OnInit {

  constructor( 
    private servicio_carrito: CarritoService, 
    private servicio_sesion : SesionService,
    private servicio : ServiciosService
    ) { }

  ListaProductos: Producto[] = [];
  Tarjetas: Tarjeta[] = [];
  Tarjeta_Utilizada : Tarjeta = new Tarjeta();

  ngOnInit(): void {
    this.ListaProductos = this.servicio_carrito.getCarrito();
    this.getLoggedUserCards();
    if (this.Tarjetas.length ==0){
      let tarjeta_predefinida:Tarjeta ={
        titular: "TARJETA DE REGALO",
        numero: 202100001,
        vencimiento: "11/08/2025"
      }
      this.Tarjetas.push(tarjeta_predefinida);
    }
   
  }
  Envio_Flag= "false";
  Monto:number =0;
  Envio: number=0;
  Total: number =0;

  SelectTarjetaVal="";

  producto_seleccionado:Producto =new Producto();
  onSelect(producto:Producto){ 
    this.producto_seleccionado = producto;
  }


  calcularMontos(){

    let total=0;
   this.ListaProductos.forEach(
     function(prod:Producto){
        total += prod.unidades*prod.precio;
     }
   );
    this.Monto = total;
    console.log(this.Envio_Flag);
    if(this.Envio_Flag =="true"){
      this.Envio = this.Monto*0.1;
      this.Total = this.Monto+this.Envio;
    }
   else if(this.Envio_Flag =="false"){
      this.Envio = 0;
      this.Total = this.Monto+this.Envio;
    }
  console.log("Monto: "+this.Monto);

  }
  cambiarCantidad(prod:Producto, cant:number){
    console.log("CAMBIAR CANTIDAD");
    console.log(prod);
    console.log(cant);
    this.servicio_carrito.cambiarCantidadProducto(prod,cant);
    this.ListaProductos = this.servicio_carrito.getCarrito();

  }

  eliminarProducto(prod:Producto){
    this.servicio_carrito.cambiarCantidadProducto(prod,prod.unidades*-1);
    this.ListaProductos = this.servicio_carrito.getCarrito();

  }

 
  confirmarCompra(){
   this.ListaProductos = this.servicio_carrito.getCarrito();

   var today = new Date();
   var date = today.toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false, minute:'2-digit', second:'2-digit'});
   var compra = {
     cliente: this.servicio_sesion.getLoggedUserMail(),
     tarjeta: this.SelectTarjetaVal,
     monto: this.Monto.toFixed(2).toLocaleString(),
     envio: this.Envio.toFixed(2).toLocaleString(),
     total: this.Total.toFixed(2).toLocaleString(),
     fecha: date,
     detalle: this.ListaProductos,
   }
   console.log(compra);
   
   this.servicio.registrarCompra(compra,this.servicio_sesion.getConnectedGroupNumber(),this.servicio_sesion.getLoggedUserToken()).subscribe(
    (res: any) => {
        console.log(res);

        if (res.statusCode == 200) {
          alert(res.message);
          this.servicio_carrito.crearCarrito();
          this.ListaProductos = this.servicio_carrito.getCarrito();
         
        } else {
            alert(res.message);
        }

    },

    err => {
        console.error(err)
        alert(err.error)
        // this.router.navigate(['/registro/']); //prueba.
    }
);


   // user = this.servicio_sesion.getLoggedUserObject();

  }


  getLoggedUserCards(){
    
    this.servicio.consultarUsuario(this.servicio_sesion.getLoggedUserMail()).subscribe(
        (res: any) => {
            console.log("exito");
            console.log(res);
            if (res.statusCode == 200) {
              this.Tarjetas = res.data.tarjetas;
              console.log("Tarjetas obtenidas: ");
              console.log(this.Tarjetas);
               
            } else {
                console.error("getLoggedUserObject() at session.service failed")
            }

        },

        err => {
            console.error(err);
           
        }
    );
}


  

}
