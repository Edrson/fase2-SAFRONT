import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import { Producto } from 'src/app/models/producto.model';
import { timer, interval } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subasta',
  templateUrl: './subasta.component.html',
  styleUrls: ['./subasta.component.css']
})
export class SubastaComponent implements OnInit {

  constructor(  
    private router: Router,
    private servicio: ServiciosService
    ) 
  { }

  ngOnInit(): void { 
    this.consultarSubastas();
  }

  selected_product= new Producto();
onSelect(prod: any) {
    this.selected_product=prod;
    console.log(prod);
    this.router.navigate(['/subasta/', prod._id]);
}

function(){

}

consultarSubastas(){
  this.servicio.consultarSubastas().subscribe(
           
    (res: any) => {
        console.log(res);
        if (res.statusCode == 200) {
          this.ListaSubastas = res.data;
            console.log("exito consulta lista subastas");

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

remainingTime(stringdate:string){
  console.log(stringdate);
  var fecha_fin = new Date(stringdate)
  var today = new Date;
  console.log(fecha_fin);
  var dif = fecha_fin.getDate()-today.getDate();
  console.log("dif : "+dif)
  var timeDiff = Math.abs(fecha_fin.getTime() - today.getTime()); // in miliseconds
  return timeDiff;
}

ListaSubastas  =[
  {
    _id:"61580a4def803edb8a364fde",
    producto:{
        precio:10.5,
        stock:1500,
        nombre:"Patch cord",
        descripcion:"para conexion de red",
        foto:"https://laelectronica.com.gt/image/cache/catalog/Productos/Otros/Tecnolog%C3%ADa/AB361NXT13-1-1200x1200.jpg",
        proveedor:"micorreo@hotmail.com",
        categoria:"Tecnologia"
    },
    valor_inicial:0,
    fecha_hora_inicio:"02/10/2021 01:25",
    fecha_hora_fin:"02/10/2021 01:35",
    pujas:[]
}
]

}
