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
    const existente = this.items.find(p => p.id === producto.id);
    if (existente) {
      const nuevaCantidad = existente.cantidad + (producto.cantidad || 1);
      if (nuevaCantidad > existente.stock) return false;
      existente.cantidad = nuevaCantidad;
      existente.subtotal = existente.cantidad * existente.precio;
    } else {
      this.items.push({
        ...producto,
        cantidad: producto.cantidad || 1,
        subtotal: producto.precio
      });
    }
    this.guardar();
    return true;
  }

  eliminar(index) {
    this.items.splice(index, 1);
    this.guardar();
  }

  vaciar() {
    this.items = [];
    this.guardar();
  }

  calcularTotal() {
    return this.items.reduce((acc, p) => acc + p.subtotal, 0);
  }
}
