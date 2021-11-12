import { Component, OnInit } from '@angular/core';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html' 
})
export class NavbarComponent implements OnInit {

  constructor(private sesion: SesionService) { }

  grupo = "1";
  
  SelectGrupo(){
    this.sesion.setConnectedGroupNumber(this.grupo);
   
  }
  ngOnInit(): void {
    this.grupo = "1";
    this.sesion.setConnectedGroupNumber(this.grupo);
  }

  

}
