export class Producto {
    constructor(id, nombre, precio, rutaImg, categoria, activo = true) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.rutaImg = rutaImg;
        this.categoria = categoria;
        this.activo = activo;
    }

    createHtmlElement() {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <img src="${this.rutaImg}" alt="${this.nombre}" class="card-img">
            <div class="card-body">
                <h2 class="card-title">${this.nombre}</h2>
                <p class="card-text">Precio: $${this.precio}</p>
                <p class="card-category">Categoría: ${this.categoria}</p>
                <button class="btn-agregar agregar-carrito" data-id="${this.id}">
                    Agregar al carrito
                </button>
            </div>
        `;
        return div;
    }

    static filtrarActivos(productos, categoria = null) {
        let lista = productos.filter(p => p.activo);
        if (categoria) lista = lista.filter(p => p.categoria === categoria);
        return lista;
    }

    static paginar(productos, pagina, porPagina) {
        const inicio = (pagina - 1) * porPagina;
        return productos.slice(inicio, inicio + porPagina);
    }

    static mostrarProductos(productos, contenedorId = "productos", categoria = null, pagina = 1, porPagina = 6) {
        const contenedor = document.getElementById(contenedorId);
        if (!contenedor) return;

        const listaFiltrada = Producto.filtrarActivos(productos, categoria);
        const productosPagina = Producto.paginar(listaFiltrada, pagina, porPagina);

        contenedor.innerHTML = "";
        contenedor.className = "card-contenedor";

        productosPagina.forEach(p => {
            const producto = new Producto(p.id, p.nombre, p.precio, p.rutaImg, p.categoria, p.activo);
            const div = producto.createHtmlElement();
            contenedor.appendChild(div);
        });

        // Retorna la cantidad de productos filtrados (por si se quiere usar después)
        return listaFiltrada.length;
    }
}
