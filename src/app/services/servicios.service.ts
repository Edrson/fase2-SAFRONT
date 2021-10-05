import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router'


@Injectable({
    providedIn: 'root'
})
export class ServiciosService {

    public URL = 'http://localhost:3000';

    constructor(private http: HttpClient, private router: Router) { }

    headers: HttpHeaders = new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    })


    /*  Registrar Usuario */
    registrarUsuario(data:any) {
        const url = this.URL + '/sa/user/add';
        var resp = this.http.post(
            url,
            data, { headers: this.headers }

        );
        //console.log("RESPUESTA:")
        //console.log(resp)
        return resp;
    }

    loguearUsuario(nickname: string, password: string) {
        const url = this.URL + '/sa/user/login';
        return this.http.post(
            url,
            {
                "_id": nickname,
                "password": password
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

    consultarCatalogo( ){
        const url = this.URL + '/sa/Catalogue';
        return this.http.get( url);
    }

    agregarProducto(data: any){
        const url = this.URL + '/sa/product/add';
        return this.http.post(url,data);
    }

    editarProducto(data: any){
        const url = this.URL + '/sa/product/update';
        return this.http.post(url,data);
    }

    eliminarProducto(data: any){
        const url = this.URL + '/sa/product/delete';
        return this.http.post(url,data);
    }

    registrarCompra(data: any){
        const url = this.URL + '/sa/product/regcompra';
        return this.http.post(url,data);
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









    
}
