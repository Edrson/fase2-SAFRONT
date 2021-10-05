import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({
    providedIn: 'root'
})
export class CarritoService {

    constructor() { }

    crearCarrito() {
        var Carrito = {
            usuario: "",
            productos: []
        }

        localStorage.setItem("carrito", JSON.stringify(Carrito));
    }

    verificarCarrito() {
        if (!localStorage.getItem("carrito")) {
            this.crearCarrito();
        }
    }

    agregarProducto(producto: Producto) {
        console.log("agregar producto a carrito:")
        this.verificarCarrito();
        var carrito = JSON.parse(localStorage.getItem("carrito")!);

        let added = false;
        carrito['productos'].forEach(
            function (element: Producto) {
                if (element.categoria == producto.categoria && element.nombre == producto.nombre) {
                    element.unidades++;
                    added = true;
                }
            }
        );
        if (!added) {
            producto.unidades = 1;
            carrito['productos'].push(producto);

        }

        console.log(carrito);
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    getCarrito() {
        this.verificarCarrito();
        var carrito = JSON.parse(localStorage.getItem("carrito")!);
        return carrito['productos'];
    }



    cambiarCantidadProducto(producto: Producto, cantidad: number) {

        this.verificarCarrito();
        var carrito = JSON.parse(localStorage.getItem("carrito")!);


        carrito['productos'].forEach(
            function (element: Producto) {
                if (element.categoria == producto.categoria && element.nombre == producto.nombre) {
                    element.unidades += cantidad;
                    if (element.unidades == 0) {
                        const index = carrito['productos'].indexOf(element);
                        if (index > -1) {
                            carrito['productos'].splice(index, 1);
                        }
                    }

                }
            }
        );
        
        console.log(carrito);
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }




}
