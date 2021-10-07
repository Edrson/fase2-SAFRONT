import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { SubastaComponent } from './components/subasta/subasta.component';
import { PujaComponent } from './components/puja/puja.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';

const routes: Routes = [

    {
        path: 'registro',
        component: RegistroComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'perfil',
        component: PerfilComponent
    },
    {
        path: 'catalogo',
        component: CatalogoComponent
    },
    {
        path: 'carrito',
        component: CarritoComponent
    },
    {
        path: 'subasta',
        component: SubastaComponent
    },
    {
        path: 'favoritos',
        component: FavoritosComponent
    },
    {
        path: 'subasta/:id',
        component: PujaComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
