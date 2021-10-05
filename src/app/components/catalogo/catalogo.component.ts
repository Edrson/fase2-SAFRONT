import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { Categoria } from 'src/app/models/categoria.model';
import { Catalogo } from 'src/app/models/catalogo.model';
import { SesionService } from 'src/app/services/sesion.service';


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html'
})
export class CatalogoComponent implements OnInit {


catalogo = new Catalogo();
Categorias = this.catalogo.categorias;

productos= new Producto();
  constructor(
    private servicio: ServiciosService,
    private carrito_service: CarritoService,
    private router: Router,
    private sesion: SesionService
) { }



  ngOnInit(): void {
    this.servicio.consultarCatalogo().subscribe(
          (res: any) => {
              console.log("CATALOGO ES:");
              console.log(res);
              if (res.statusCode == 200) {
                this.Categorias = res.data;
              } else {
                  alert(res.msj);
              }
          },

          err => {
              console.error(err)
              alert("Error")
              this.router.navigate(['/perfil/']); //prueba.
          }
      );

  }

  getCatalogo(){

      this.servicio.consultarCatalogo().subscribe(
          (res: any) => {
              console.log("CATALOGO ES:");
              console.log(res);
              if (res.statusCode == 200) {
                this.Categorias = res.data;
              } else {
                  alert(res.msj);
              }
          },

          err => {
              console.error(err)
              alert("Error")
              this.router.navigate(['/perfil/']); //prueba.
          }
      );

  
  }

  agregarACarrito(producto: Producto, nombrecategoria:string){
    producto.categoria = nombrecategoria;
    // console.log("Agregando a Carrito:");
    // console.log(producto);
    this.carrito_service.agregarProducto(producto);
  }

  compraRapida(producto: Producto, nombrecategoria:string){
    producto.categoria = nombrecategoria;
    // console.log("Agregando a Carrito:");
    // console.log(producto);
    this.carrito_service.agregarProducto(producto);
    this.router.navigate(['/carrito/'])
  }

  agregarAFavoritos(producto: Producto, nombrecategoria:string){
    producto.categoria = nombrecategoria;
    var hoy = new Date();
    var favorito ={
      usuario: this.sesion.getLoggedUserMail(),
      fecha: hoy.toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false, minute:'2-digit'}),
      producto: producto
    }
    this.servicio.agregarFavoritos(favorito);

  }

}

