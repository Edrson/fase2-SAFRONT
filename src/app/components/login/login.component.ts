import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiciosService } from '../../services/servicios.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { Router } from '@angular/router';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    constructor(
        private servicio: ServiciosService,
        private carrito_service: CarritoService,
        private sesion_service: SesionService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    loginForm = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });

    Login() {
        // TODO: Use EventEmitter with form 
        //alert(this.loginForm.value)
        console.log(this.loginForm.value);
        const data = {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        };

        this.servicio.loguearUsuario(data.email, data.password).subscribe(
            (res: any) => {
                console.log(res);

                if (res.statusCode == 200) {
                   // alert(res.message);
                    if (res.login.correct) {

                        //localStorage.setItem('logged_user_data', JSON.stringify(res.data[0]));
                        localStorage.setItem('logged_user_mail', data.email);
                        localStorage.setItem('logged_user_type', res.login.userType);
                        this.router.navigate(['/perfil']);
                        this.carrito_service.crearCarrito();
                    }

                } else {
                    alert(res.message);

                }

            },

            err => {
                console.error(err)
                alert(err.error)
                this.router.navigate(['/registro/']); //prueba.
            }
        );
    }

}
