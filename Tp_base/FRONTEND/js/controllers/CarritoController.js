import { Carrito } from "../models/Carrito.js";
import { CarritoView } from "../views/carritoView.js";
import { Persona } from "../models/Personas.js";
// import { Ticket } from "../models/Ticket.js";

export class CarritoController {
  static initCarrito() {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    const carrito = new Carrito("usuario", "carrito", carritoGuardado);
    const vista = new CarritoView(carrito, () => {
      alert("Compra confirmada");
      carrito.vaciar();
      vista.mostrarCarrito();
    });

    vista.mostrarCarrito();
  }
}
