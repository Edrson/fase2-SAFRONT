import { Injectable } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Tarjeta } from '../models/tarjeta.model';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor( private servicio: ServiciosService) { }

  getLoggedUserMail():string{
   var mail = localStorage.getItem("logged_user_mail");
   if (mail) return mail
   return "";

  }

 

  getLoggedUserObject(){
    
      this.servicio.consultarUsuario(this.getLoggedUserMail()).subscribe(
          (res: any) => {
              console.log("exito");
              console.log(res);
              if (res.statusCode == 200) {
                  return res.data;
                 
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
