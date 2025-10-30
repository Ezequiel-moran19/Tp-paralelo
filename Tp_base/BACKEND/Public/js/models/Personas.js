export class Persona {
    constructor(idPersona, nombre) {
        this.idPersona = idPersona;
        this.nombre = nombre;
    }

    static guardarNombre(nombre) {
        sessionStorage.setItem("nombreUsuario", nombre);
    }

    static obtenerNombre() {
        return sessionStorage.getItem("nombreUsuario");
    }

    static borrarNombre() {
        sessionStorage.removeItem("nombreUsuario");
    }

    static validar(nombre) {
        return nombre.trim() !== "";
    }
}