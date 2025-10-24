import { Persona } from "../models/Personas.js";
import { PersonaView } from "../views/personaView.js";

export class PersonaController {
    static init() {
        const view = new PersonaView("form", "#fNombre", "#saludo");

        const nombreGuardado = Persona.obtenerNombre();
        if (nombreGuardado) {
            view.mostrarSaludo(nombreGuardado);
            view.ocultarFormulario();
            return;
        }

        view.escucharSubmit((nombre) => {
            if (!Persona.validar(nombre)) {
                view.mostrarAlerta("Por favor, ingrese su nombre");
                return;
            }

            Persona.guardarNombre(nombre);
            view.mostrarSaludo(nombre);
            view.ocultarFormulario();

            setTimeout(() => {
                window.location.href = "productos.html";
            }, 1000);
        });
    }

    static cerrarSesion() {
        Persona.borrarNombre();
        window.location.href = "bienvenida.html";
    }
}
