import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subasta } from 'src/app/models/subasta.model';
import { Puja } from 'src/app/models/puja.model';
import { SesionService } from 'src/app/services/sesion.service';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-puja',
  templateUrl: './puja.component.html',
  styleUrls: ['./puja.component.css']
})
export class PujaComponent implements OnInit {
  
  constructor(
    private route: ActivatedRoute, 
    private sesion_service: SesionService,
    private servicios: ServiciosService) { 

    
  }
  
  
  subasta!:Subasta;
  puja_max: Puja = new Puja();

  ngOnInit(): void {
  
    this.id = this.route.snapshot.paramMap.get('id');
    this.consultarSubasta(this.id);
  
    console.log("Entrando a subasta id: "+this.id);
    //LLAMAR SERVICIO PARA CONSULTAR SUBASTA
    //this.subasta = consultarSubasta();
   
    setInterval(()=>{
      this.obtenerPujaMayor();
      this.consultarSubasta(this.id);
      this.restante(this.subasta.fecha_hora_fin);
    },1000);
   
  }
   
 
  consultarSubasta(id:string){
    this.servicios.consultarSubastaID(id).subscribe(
           
      (res: any) => {
          //console.log(res);
          if (res.statusCode == 200) {
             this.subasta = res.data;
              //console.log("exito consulta subasta por id: "+id);
              //console.log(res);
  
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

  obtenerPujaMayor(){
   
    let puja_maxima:Puja = new Puja();
    this.subasta.pujas.forEach(element => {
      if (parseFloat(element.puja.toString()) > parseFloat(puja_maxima.puja.toString())){
        puja_maxima = element;
      }
    });
    this.puja_max = puja_maxima;
    this.monto_puja = parseFloat(puja_maxima.puja.toString())+10;
  }



  ingresarPuja(){
    let hoy = new Date();
    let data_puja= {
      id: this.id,
      usuario: this.sesion_service.getLoggedUserMail(),
      puja:this.monto_puja.toString(),
      fecha_hora:hoy.toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false, minute:'2-digit',second:'2-digit'}),
    }
    this.servicios.ingresarPuja(data_puja).subscribe(
           
      (res: any) => {
        
          console.log(res);
          if (res.statusCode == 200) {
              console.log("exito reg puja");

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

  days_remaining =0;
  hours_remaining = 0;
  minutes_remaining = 0;
  seconds_remaining=0;
  abierto = true;
  restante(fecha:string){
    var countDownDate = new Date(fecha).getTime();

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;
      if (distance <0){this.abierto=false;}
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.days_remaining = days;
      this.hours_remaining = hours;
      this.minutes_remaining = minutes;
      this.seconds_remaining = seconds;
  
}
  

  id:any;
  monto_puja:number=0;
  
  

}
