import { Ticket } from "./clases/ticket.js"
import { Persona } from "./clases/persona.js"
import { Carrito } from "./clases/carrito.js";
import { CarritoUI } from "./carritoUI.js";

export class CarritoController {
    constructor(nombreUsuario) {
        this.carrito = Carrito.crearDesdeLocalStorage(nombreUsuario);
        this.vista = new CarritoUI(this.carrito, () => this.confirmarCompra());
    }

    confirmarCompra() {
        const nombreUsuario = localStorage.getItem("nombreUsuario");
        if (!nombreUsuario) {
            alert("Debe iniciar sesión antes de confirmar la compra.");
            return;
        }

        const persona = new Persona(Date.now(), nombreUsuario);
        const ticket = Ticket.generar(this.carrito, persona);
        ticket.guardar();
        this.carrito.vaciar();
        window.location.href = "ticket.html";
    }
}

