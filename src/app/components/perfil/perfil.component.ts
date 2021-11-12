import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { Tarjeta } from 'src/app/models/tarjeta.model';
import { Categoria } from 'src/app/models/categoria.model';
import { Subasta } from 'src/app/models/subasta.model';
import { Compra } from 'src/app/models/compra.model';
import { Venta } from 'src/app/models/venta.model';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html'
})

export class PerfilComponent implements OnInit {

    constructor(
        private servicio: ServiciosService,
        private router: Router,
        private sesion: SesionService
    ) {

        
     }

    mail = localStorage.getItem("logged_user_mail");
    tarjetas: Tarjeta[] = [];
    EsCliente = true;
    Nombre = "";
    Apellido = "";
    Foto = "";
    Correo = "";
    Tipo = ""
    Tarjetas: any[] = [];
   
    productosProveedor: Producto[] = [];
    categoriasProveedor: Categoria[] = [];
    ListaSubastas: Subasta[]=[];
    ListaCompras: Compra[]=[];
    ListaVentas: Venta[]=[];
    total_ventas: number=0;
    unidades_ventas: number=0;

    time = {hour: 13, minute: 30};

    selected_product:Producto = new Producto();
    new_product :Producto = new Producto();

  
    ngOnInit(): void {
        this.getProfile();
        this.getProducts();
        this.getSubastasProveedor();
        this.getComprasCliente();
        this.getVentasProveedor();
        console.log("Es Cliente: "+this.EsCliente);
    }

    
    getProfile() {
        this.servicio.consultarUsuario(this.mail!).subscribe(
            (res: any) => {
                console.log(res);
                if (res.statusCode == 200) {

                    console.log(res.statusCode)
                    this.Nombre = res.data.nombre;
                    console.log(this.Nombre);
                    this.Apellido = res.data.apellido;
                    this.Foto = res.data.foto;
                    this.Correo = res.data._id;
                    this.Tarjetas = res.data.tarjetas;

                    if (res.data.tipo == "C") {
                        this.Tipo = "Cliente"
                        this.EsCliente= true;
                    } else if (res.data.tipo == "P") {
                        this.Tipo = "Proveedor"
                        this.EsCliente = false;
                    }
                    else if (res.data.tipo == "A") {
                    this.Tipo = "Administrador"
                    this.EsCliente = false;
                    }
                } else {
                    alert(res.msj);
                }

            },

            err => {
                console.error(err)
                //alert("Error")
                this.router.navigate(['/registro/']); //prueba.
            }
        );

    }

    getProducts() {
        console.log("consultar Productos Proveedor");
        this.servicio.consultarProductosProveedor(this.mail!).subscribe(
            
            (res: any) => {
               
                console.log(res);
                if (res.statusCode == 200) {
                   var categorias = res.data;
                   console.log(categorias);
                   this.categoriasProveedor = categorias;
                   this.categoriasProveedor.forEach(element => {
                       var producto =element.producto;
                       producto.categoria=element._id;
                       this.productosProveedor= this.productosProveedor.concat(producto);
                   });
                } else {
                    alert(res.msj);
                }
            },

            err => {
                console.error(err)
                //alert("Error")
                this.router.navigate(['/perfil/']); //prueba.
            }
        );

    }

    addProduct(){
        console.log("AGREGANDO:");
        this.new_product.proveedor = this.mail!;
        console.log(this.new_product);

        this.servicio.agregarProducto(this.new_product, this.sesion.getConnectedGroupNumber(),this.sesion.getLoggedUserToken()).subscribe(
            (res: any) => {
              
                console.log(res);
                if (res.statusCode == 200) {
                    console.log("exito");
                    alert(res.message)

                } else {
                    alert(res.msj);
                }

            },

            err => {
                console.error(err)
                //alert("Error")
                //this.router.navigate(['/registro/']); //prueba.
            }
        );


        
    }

    editProduct(){
        console.log("EDITADO:");
        console.log(this.selected_product);
        this.servicio.editarProducto(this.selected_product).subscribe(
            (res: any) => {
              
                console.log(res);
                if (res.statusCode == 200) {
                    console.log("exito");

                } else {
                    alert(res.msj);
                }

            },

            err => {
                console.error(err)
                //alert("Error")
                //this.router.navigate(['/registro/']); //prueba.
            }
        );
    }

    deleteProduct(){
        console.log("ENVIANDO A ELIMINAR:");
        console.log(this.selected_product);
     
        this.servicio.eliminarProducto(this.selected_product).subscribe(
            (res: any) => {
              
                console.log(res);
                if (res.statusCode == 200) {
                    console.log("exito al eliminar");

                } else {
                    alert(res.msj + "ERROR: No se pudo Eliminar ");
                }

            },

            err => {
                console.error(err)
                //alert("Error")
                //this.router.navigate(['/registro/']); //prueba.
            }
        );
    }

    subasta_inicio =new Date;
    subasta_fin = new Date;
    subasta_valor_inicial=0;

    formatofecha(fecha: Date){
        var cadena = fecha.getFullYear()+"-"+fecha.getMonth()+"-"+fecha.getDate()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
    }

    subastarProducto(ini:string, fin:string){
        console.log("EN SUBASTA:");
        console.log(this.selected_product);
        this.subasta_inicio = new Date(ini);
        this.subasta_fin = new Date(fin);
        let subasta = {
            producto: this.selected_product,
            valor_inicial: this.subasta_valor_inicial,
            fecha_hora_inicio : this.subasta_inicio.toLocaleString('en-CA', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false, minute:'2-digit'}).replace(",",""),
            fecha_hora_fin : this.subasta_fin.toLocaleString('en-CA', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false, minute:'2-digit'}).replace(",",""),
            pujas: []

        }
        console.log(subasta);

        this.servicio.subastarProducto(subasta).subscribe(
           
            (res: any) => {
              
                console.log(res);
                if (res.statusCode == 200) {
                    console.log("exito reg subasta");

                } else {
                    alert(res.msj);
                }

            },

            err => {
                console.error(err)
                //alert("Error")
                //this.router.navigate(['/registro/']); //prueba.
            }
        );
      
    }
   
    subastaVigente(fecha:string){
        
     let exp = new Date(fecha);
     let hoy = new Date();
     let vigente = exp.valueOf() > hoy.valueOf();
     //console.log(fecha+"/"+exp +" - es vigente: "+vigente + "|  expiracion: "+exp.valueOf()+ "hoy: "+hoy.valueOf());
     return vigente;
    }
    getSubastasProveedor() {
        console.log("consultar Productos Proveedor");
        this.servicio.consultarSubastaProv(this.mail!).subscribe(
            
            (res: any) => {
               
                console.log(res);
                if (res.statusCode == 200) {
                   this.ListaSubastas = res.data;
                     
                } else {
                    alert(res.msj);
                }
            },

            err => {
                console.error(err)
                //alert("Error")
                this.router.navigate(['/perfil/']); //prueba.
            }
        );

    }

    getComprasCliente() {
      
        this.servicio.consultarCompraCliente(this.mail!).subscribe(
            
            (res: any) => {
               
                console.log(res);
                if (res.statusCode == 200) {
                   this.ListaCompras = res.data;
                     
                } else {
                    alert(res.msj);
                }
            },

            err => {
                console.error(err)
                //alert("Error")
                this.router.navigate(['/perfil/']); //prueba.
            }
        );

    }

    getVentasProveedor() {
        
        this.servicio.consultarVenta(this.mail!).subscribe(
            
            (res: any) => {
               
                console.log(res);
                if (res.statusCode == 200) {
                this.ListaVentas = res.data;
                this.getMontosVentas();
                } else {
                    alert(res.msj);
                }
            },

            err => {
                console.error(err)
                //alert("Error")
                this.router.navigate(['/perfil/']); //prueba.
            }
        );

    }

    getMontosVentas(){
        var monto:number =0;
        var cantidad:number =0;
        this.ListaVentas.forEach(element => {
            monto += element.detalle.precio * element.detalle.unidades;
            cantidad += element.detalle.unidades;
        });
        this.total_ventas = monto;
        this.unidades_ventas = cantidad;
        console.log("tot:"+this.total_ventas+" cant:"+this.unidades_ventas)
    }


    onSelect(prod: any) {
        this.selected_product=prod;
        console.log(prod);
    }



}
