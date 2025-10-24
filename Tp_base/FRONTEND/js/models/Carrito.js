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
        const itemExistente = this.items.find(p => p.nombre === producto.nombre);

        if (itemExistente) {
            const nuevaCantidad = itemExistente.cantidad + (producto.cantidad || 1);
            if (nuevaCantidad > itemExistente.stock) {
                return false; 
            }
            itemExistente.cantidad = nuevaCantidad;
            itemExistente.subtotal = itemExistente.cantidad * itemExistente.precio;
        } else {
            this.items.push({
                ...producto,
                cantidad: producto.cantidad || 1,
                subtotal: producto.precio,
                stock: producto.stock
            });
        }

        this.guardar();
        return true;
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
        return this.items.reduce((acc, p) => acc + (p.subtotal || p.precio), 0);
    }
}
