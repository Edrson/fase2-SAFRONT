import { Tarjeta } from "./tarjeta.model";

export class Usuario {
    _id: string = "cliente@gmail.com";
    nombre: string = "";
    apellido: string = "";
    foto: string = "https://st4.depositphotos.com/29453910/37778/v/600/depositphotos_377785390-stock-illustration-hand-drawn-modern-man-avatar.jpg";
    password: string = "";
    tipo: string = "";
    tarjetas: Tarjeta[] = []


}
