import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { Categoria } from 'src/app/models/categoria.model';
import { Catalogo } from 'src/app/models/catalogo.model';
import { SesionService } from 'src/app/services/sesion.service';
import { Producto2 } from 'src/app/models/producto2.model';


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html'
})
export class CatalogoComponent implements OnInit {


catalogo = new Catalogo();
Categorias = this.catalogo.categorias;

propio = true;
arrayProductos:Producto[] = [];

productos= new Producto();
  constructor(
    private servicio: ServiciosService,
    private carrito_service: CarritoService,
    private router: Router,
    private sesion: SesionService
) { }

  transformarCatalogo(productos:Producto[]):void{
   productos.forEach(element => {
     element.categoria = element.categorias[0];
     this.arrayProductos.push(element);
   });
  }


  ngOnInit(): void {
    this.servicio.consultarCatalogo(this.sesion.getConnectedGroupNumber(), this.sesion.getLoggedUserToken()).subscribe(
          (res: any) => {
              console.log("CATALOGO ES:");
              console.log(res.data);
              console.log("statuscode: "+res.statusCode)
              if (res.statusCode == 200) {
                if (this.sesion.getConnectedGroupNumber()=='1'){
                console.log("grupo1")
                this.Categorias = res.data;
                this.propio = true;
                }
                else{
                  console.log("grupo ajeno")
                this.propio = false;
                this.arrayProductos = res.data;
                console.log(this.arrayProductos);
                
                }
              } else {
                  alert(res);
                
              }
          },

          err => {
              console.error(err)
              // alert("Error")
              // this.router.navigate(['/perfil/']); //prueba.
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
    this.servicio.agregarFavoritos(favorito).subscribe(
      (res: any) => {
          console.log(res);
          if (res.statusCode == 200) {
           alert("Se agregó a tus favoritos: "+favorito.producto.nombre)
          } else {
              alert(res.msj);
          }
      },

      err => {
          console.error(err)
          alert("Error")
          this.router.navigate(['/perfil/']); //prueba.
      }
  );;

  }

}

