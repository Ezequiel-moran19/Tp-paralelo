export class Carrito {
    constructor(nombreUsuario, clave, items = []) {
        this.nombreUsuario = nombreUsuario;
        this.clave = clave;
        this.items = items;
    }

    static crearDesdeLocalStorage(nombreUsuario) {
        const clave = `Carrito_${nombreUsuario}`;
        const items = JSON.parse(localStorage.getItem(clave)) || [];
        return new Carrito(nombreUsuario, clave, items);
    }

    guardar() {
        localStorage.setItem(this.clave, JSON.stringify(this.items));
    }

    agregar(producto) {
        this.items.push(producto);
        this.guardar();
    }

    eliminar(indice) {
        this.items.splice(indice, 1);
        this.guardar();
    }

    vaciar() {
        this.items = [];
        this.guardar();
    }

    calcularTotal() {
        return this.items.reduce((acc, p) => acc + p.precio, 0);
    }
}
