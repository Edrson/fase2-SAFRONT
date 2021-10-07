import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { ServiciosService } from 'src/app/services/servicios.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { SesionService } from 'src/app/services/sesion.service';
import { Favorito } from 'src/app/models/favorito.model';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

  constructor(private servicio_carrito:CarritoService, private servicios:ServiciosService, private sesion:SesionService ) { }

  ListaFavoritos :Favorito[] = [];

  ngOnInit(): void {
  this.consultarFavoritos();
    
  }

  agregarACarrito(producto: Producto){
   
    // console.log("Agregando a Carrito:");
    // console.log(producto);
    this.servicio_carrito.agregarProducto(producto);
  }

  consultarFavoritos(){
    this.servicios.consultarFavoritos(this.sesion.getLoggedUserMail()).subscribe(
           
      (res: any) => {
        
          console.log(res);
          if (res.statusCode == 200) {
              this.ListaFavoritos = res.data;

          } else {
              alert(res.msj);
          }

      },

      err => {
          console.error(err)
          alert("Error")
          //this.router.navigate(['/registro/']); //prueba.
      }
  );
  }

  producto_seleccionado:Producto =new Producto();
  onSelect(producto:Producto){ 
    this.producto_seleccionado = producto;
  }

}
