export class Persona { 
    constructor(idPersona ,nombre) {
        this.idPersona = idPersona;
        this.nombre = nombre;
    }

    static crearFormulario() {
        const contenedor = document.getElementById("persona");
        const { input, boton } = this.crearElementosFormulario();
        this.configurarEventoBoton(boton, input, contenedor);
        this.agregarAlContenedor(contenedor, input, boton);
    }

    static crearElementosFormulario() {
        const input = document.createElement("input");
        const boton = document.createElement("button");

        input.placeholder = "Ingrese su nombre";
        boton.textContent = "Ingresar";

        return { input, boton };
    }

    static configurarEventoBoton(boton, input, contenedor) {
        boton.addEventListener("click", () => {
            const nombre = input.value.trim();
            if (!this.validarNombre(nombre)) return;
            
            this.guardarNombre(nombre);
            this.mostrarSaludo(contenedor, nombre);
            this.redireccionar();
        });
    }

    static agregarAlContenedor(contenedor, input, boton) {
        contenedor.appendChild(input);
        contenedor.appendChild(boton);
    }

    static validarNombre(nombre) {
        if (nombre === "") {
            alert("Por favor, ingrese su nombre");
            return false;
        }
        return true;
    }

    static guardarNombre(nombre) {
        localStorage.setItem("nombreUsuario", nombre);
    }

    static mostrarSaludo(contenedor, nombre) {
        contenedor.textContent = `¡Hola ${nombre}!`;
    }

    static redireccionar() {
        setTimeout(() => {
            window.location.href = "productos.html";
        }, 1000);
    }

    static cerrarSesion() {
        localStorage.removeItem("nombreUsuario");
        window.location.href = "index.html";
    }
}
