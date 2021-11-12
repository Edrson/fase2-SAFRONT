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

  getLoggedUserToken():string{
    var token = localStorage.getItem("logged_user_token");
    if (token) return token
    return "";
   }

  setConnectedGroupNumber(group:string){
    localStorage.setItem('connected_group_number',group);
    console.log("el grupo seleccionado es "+group);
  }

  getConnectedGroupNumber():string{
      var group_no = localStorage.getItem('connected_group_number');

      if (group_no){
          return group_no
      }
      {
          return "1"
      }
     
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
