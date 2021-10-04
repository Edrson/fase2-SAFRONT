import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiciosService } from '../../services/servicios.service';
import { Title } from '@angular/platform-browser';
import { Tarjeta } from 'src/app/models/tarjeta.model';
import { Router } from '@angular/router';


@Component({
    selector: 'app-registro',
    templateUrl: './registro.component.html' 
})

export class RegistroComponent implements OnInit {
    public date = new Date();

    registerForm = new FormGroup({
        name: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/[a-zA-Z0-9.]+@[a-zA-Z]+.com/)]),
        type: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        titular: new FormControl('', Validators.required),
        numero: new FormControl('', Validators.required),
        vencimiento: new FormControl('', Validators.required),
        password_confirmation: new FormControl('', Validators.required),
    });

    constructor(
        private formBuilder: FormBuilder,
        private servicios: ServiciosService,
        private titleService: Title,
        private router : Router
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle("Registro")
    }

    

    Register() {
        console.log(this.registerForm.value);
        const data = {
            email: this.registerForm.value.email,
            _id : this.registerForm.value.email,
            nombre: this.registerForm.value.name,
            apellido: this.registerForm.value.lastname,
            password: this.registerForm.value.password,
            tipo: this.registerForm.value.type,
            foto:"https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
            tarjetas:[{
                titular:this.registerForm.value.titular,
                numero: this.registerForm.value.numero,
                vencimiento: this.registerForm.value.vencimiento

            }]
        };

        this.servicios.registrarUsuario(data).subscribe(
            (res:any) => {
                console.log("EXITO");
                console.log(res);
                alert(res.message);
                this.router.navigate(['/login']);        
              },
    
              err => {
                console.log("ERRROR -") ;
                console.error(err);
                alert(err.error.message);
                //location.reload()
              }
            );
    }


}
