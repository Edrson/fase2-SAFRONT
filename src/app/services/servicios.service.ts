import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';



@Injectable({
    providedIn: 'root'
})
export class ServiciosService {


   public URL = 'http://34.125.203.249';
   public BUS_URL = 'http://34.125.203.249/sa/bus'

    // public URL = 'http://localhost:3000';
    // public BUS_URL = 'http://localhost:3000/sa/bus';

    constructor(private http: HttpClient, private router: Router) { }

    headers: HttpHeaders = new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    })


    /*  Registrar Usuario */
    registrarUsuario(data:any) {
        const url = this.BUS_URL;
        var resp = this.http.post(
            url,
            data, { headers: this.headers }

        );
        console.log("FRONT sent data:");
        console.log(data);
        console.log("FRONT reieved data:")
        console.log(resp)
        return resp;
    }

    loguearUsuario(nickname: string, password: string, grupo:string) {
        const url = this.BUS_URL;
        return this.http.post(
            url,
            {
                "_id": nickname,
                "password": password,
                "grupo": grupo,
               "servicio":2
            }, { headers: this.headers }

        );
    }

    consultarUsuario(mail:string) {
        const url = this.URL + '/sa/user/data/'+mail;
        return this.http.get( url);
    }

    consultarProductosProveedor(mail:string){
        const url = this.URL + '/sa/product/proveedor/'+mail;
        return this.http.get( url);
    }

    consultarCatalogo(grupo:string, mytoken:any){
        const url = this.BUS_URL;
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
                token: mytoken
            })
          };
        return this.http.post(url,{
            "grupo": grupo,
           "servicio":4
        },httpOptions);
    }

    agregarProducto(data: any, grupo: string, mytoken:any){
       let datos = {
            "producto": {
                precio: data.precio,
                stock: data.stock,
                nombre: data.nombre,
                descripcion: data.descripcion,
                foto: data.foto,
                proveedor: data.proveedor,
                categoria: data.categoria,
            },
            "grupo":grupo,
            "servicio":3 
        }
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
                token: mytoken
            })
          };
        const url = this.BUS_URL;
        return this.http.post(url,datos, httpOptions);
    }

    editarProducto(data: any){
        const url = this.URL + '/sa/product/update';
        return this.http.post(url,data);
    }

    eliminarProducto(data: any){
        const url = this.URL + '/sa/product/delete';
        return this.http.post(url,data);
    }

    registrarCompra(data: any, grupo:string, mytoken:any){
        const url = this.URL + '/sa/product/regcompra';
        let datos = {
            "compra": data,
            "grupo":grupo,
            "servicio":3 
        }
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
                token: mytoken
            })
          };

        return this.http.post(url,data,httpOptions);
    }

    subastarProducto(data: any){
        const url = this.URL + '/sa/product/regsubasta';
        return this.http.post(url,data);
    }
    
    consultarSubastas(){
        const url = this.URL + '/sa/product/con/subastas';
        return this.http.get(url);
    }

    consultarSubastaID(id:string){
        const url = this.URL + '/sa/product/con/subastas/'+id;
        return this.http.get(url);
    }

    consultarSubastaProv(id:string){
        const url = this.URL + '/sa/subastas/proveedor/'+id;
        return this.http.get(url);
    }

    ingresarPuja(data: any){
        const url = this.URL + '/sa/product/regpuja';
        return this.http.post(url,data);
    }

    consultarCompraCliente(idcliente:string){
        const url = this.URL + '/sa/user/compra/'+idcliente;
        return this.http.get(url);
    }

    consultarVenta(idproveedor:string){
        const url = this.URL + '/sa/user/venta/'+idproveedor;
        return this.http.get(url);
    
    }

    agregarFavoritos(data:any){
        const url = this.URL + '/sa/product/favorito';
        return this.http.post(url,data);
    }

    consultarFavoritos(idusuario:string){
        const url = this.URL + '/sa/producto/favorito/'+idusuario;
        return this.http.get(url);
    }











    
}
