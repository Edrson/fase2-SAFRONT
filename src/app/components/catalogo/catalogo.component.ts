import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { Categoria } from 'src/app/models/categoria.model';
import { Catalogo } from 'src/app/models/catalogo.model';


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
    private router: Router
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

}

