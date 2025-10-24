import { ProductosView } from "../views/productosView.js"; 
import { productos } from "../api.js";

export class ProductosController {
    static paginaActual = 1;
    static productosPorPagina = 6;
    static contenedor = null;
    static categoriaFiltrada = null;

    static initProductos() {
        ProductosController.contenedor = document.getElementById("productos");
        ProductosController.mostrarPagina();
        ProductosController.configurarFiltros();
        ProductosController.configurarPaginacion();
        ProductosController.configurarEventosAgregar();
    }

    static configurarFiltros() {
        const btnGuitarra = document.getElementById("filtro-guitarra");
        const btnPianos = document.getElementById("filtro-pianos");

        if (btnGuitarra) btnGuitarra.addEventListener("click", () => ProductosController.filtrarPorCategoria("Guitarra"));
        if (btnPianos) btnPianos.addEventListener("click", () => ProductosController.filtrarPorCategoria("Piano"));
    }

    static configurarPaginacion() {
        const btnSiguiente = document.getElementById("siguiente");
        const btnAnterior = document.getElementById("anterior");

        if (btnSiguiente) btnSiguiente.addEventListener("click", () => ProductosController.paginaSiguiente());
        if (btnAnterior) btnAnterior.addEventListener("click", () => ProductosController.paginaAnterior());
    }

    static configurarEventosAgregar() {
        ProductosController.contenedor.addEventListener("click", function(e) {
            if (e.target && e.target.classList.contains("btnAgregar")) {
                const card = e.target.closest(".card");
                const nombre = card.querySelector(".card-title").textContent.replace("Nombre: ", "");
                e.target.style.display = "none";

                const contenedorExistente = card.querySelector("div.mt-2");
                if (contenedorExistente) contenedorExistente.remove();

                const producto = productos.find(p => p.nombre === nombre);

                if (producto) {
                    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

                    const productoExistente = carrito.find(p => p.nombre === producto.nombre);
                    if (productoExistente) {
                        if (productoExistente.cantidad >= producto.stock) {
                            alert(`No hay más stock disponible (${producto.stock})`);
                            return;
                        }
                        productoExistente.cantidad += 1;
                        productoExistente.subtotal = productoExistente.cantidad * producto.precio;
                    } else {
                        carrito.push({
                            nombre: producto.nombre,
                            precio: producto.precio,
                            cantidad: 1,
                            subtotal: producto.precio,
                            rutaImg: producto.rutaImg,
                            stock: producto.stock 
                        });
                    }
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                    console.log("✅ Producto agregado al carrito:", carrito);
                    }

                const contenedorBotones = ProductosView.crearContenedorBotones();
                card.querySelector(".card-body").appendChild(contenedorBotones);
                ProductosView.agregarEventosCard(card, producto);
            }
        });
    }

    static mostrarPagina() {
        const inicio = (ProductosController.paginaActual - 1) * ProductosController.productosPorPagina;
        const fin = inicio + ProductosController.productosPorPagina;

        const lista = ProductosController.obtenerListaActual().slice(inicio, fin);
        ProductosView.mostrarProducto(ProductosController.contenedor, lista);
        ProductosController.actualizarIndicadorPaginas();
    }

    static mostrarTodos() {
        ProductosController.categoriaFiltrada = null;
        ProductosController.paginaActual = 1;
        ProductosController.mostrarPagina();
    }

    static paginaAnterior() {
        if (ProductosController.paginaActual > 1) {
            ProductosController.paginaActual--;
            ProductosController.mostrarPagina();
        }
    }

    static paginaSiguiente() {
        if (ProductosController.paginaActual < ProductosController.obtenerTotalPaginas()) {
            ProductosController.paginaActual++;
            ProductosController.mostrarPagina();
        }
    }

    static obtenerTotalPaginas() {
        return Math.ceil(ProductosController.obtenerListaActual().length / ProductosController.productosPorPagina);
    }

    static obtenerListaActual() {
        return ProductosController.categoriaFiltrada ? ProductosController.categoriaFiltrada : productos;
    }

    static filtrarPorCategoria(categoria) {
        ProductosController.categoriaFiltrada = productos.filter(p => p.categoria === categoria);
        ProductosController.paginaActual = 1;
        ProductosController.mostrarPagina();
    }

    static actualizarIndicadorPaginas() {
        const totalPaginas = ProductosController.obtenerTotalPaginas();
        const actual = document.getElementById("pagina-actual");
        const total = document.getElementById("total-paginas");
        if (actual && total) {
            actual.textContent = ProductosController.paginaActual;
            total.textContent = totalPaginas;
        }
    }
}