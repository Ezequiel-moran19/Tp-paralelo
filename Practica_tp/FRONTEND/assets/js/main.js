// main.js adaptado para productos con paginación y modo oscuro 
import { Persona } from "./clases/persona.js";
import { Producto } from "./clases/producto.js";
import { productos } from "./lista-productos.js";
import { Carrito } from "./clases/carrito.js";
import { CarritoController } from "./CarritoController.js";
import { Ticket } from "./clases/ticket.js";

const productosPorPagina = 6;
let paginaActual = 1;
let categoriaFiltrada = null;

function mostrarProductosPagina() {
    Producto.mostrarProductos(productos, "productos", categoriaFiltrada, paginaActual, productosPorPagina);

    const nombreUsuario = localStorage.getItem("nombreUsuario");
    const carrito = Carrito.crearDesdeLocalStorage(nombreUsuario);

    document.querySelectorAll(".agregar-carrito").forEach(btn => {
        const id = parseInt(btn.dataset.id);
        const producto = productos.find(p => p.id === id);
        btn.addEventListener("click", () => {
            carrito.agregar(producto);
            alert("Se agregó al carrito correctamente");
        });
    });

    const saludo = document.getElementById("saludo");
    if (nombreUsuario && saludo) saludo.textContent = `¡Bienvenido, ${nombreUsuario}!`;
}

function cambiarPagina(delta) {
    const listaFiltrada = Producto.filtrarActivos(productos, categoriaFiltrada);
    const totalPaginas = Math.ceil(listaFiltrada.length / productosPorPagina);
    paginaActual = Math.min(Math.max(1, paginaActual + delta), totalPaginas);
    mostrarProductosPagina();
}

function filtrarPorCategoria(categoria) {
    categoriaFiltrada = categoria;
    paginaActual = 1;
    mostrarProductosPagina();
}

function mostrarBotonCerrarSesionProductos() {
    const nav = document.querySelector("nav");
    if (!nav) return;

    let btnCerrar = document.getElementById("cerrar_sesion");
    if (!btnCerrar) {
        btnCerrar = document.createElement("button");
        btnCerrar.id = "cerrar_sesion";
        btnCerrar.classList.add("btn-generico");
        btnCerrar.textContent = "Cerrar sesión";
        nav.appendChild(btnCerrar);
    }
    btnCerrar.onclick = () => Persona.cerrarSesion();
}

function mostrarCarritoGuardado() {
    const nombreUsuario = localStorage.getItem("nombreUsuario");
    const carritoController = new CarritoController(nombreUsuario);
    carritoController.vista.mostrarCarrito();
}

function inicializarModoOscuro() {
    const body = document.body;
    const btnDark = document.getElementById("modo");
    if (!btnDark) return;
    const icon = btnDark.querySelector("i");

    const valor = localStorage.getItem("modo") === "true";
    body.classList.toggle("dark", valor);
    actualizarIcono(icon, valor);

    btnDark.addEventListener("click", () => {
        const modo = body.classList.toggle("dark");
        localStorage.setItem("modo", modo);
        actualizarIcono(icon, modo);
    });
}

function actualizarIcono(icono, modo) {
    if (modo) {
        icono.classList.remove("fa-sun");
        icono.classList.add("fa-moon");
    } else {
        icono.classList.remove("fa-moon");
        icono.classList.add("fa-sun");
    }
}

function initPersona() {
    if (document.getElementById("persona")) {
        Persona.crearFormulario();
    }
}

function initProductos() {
    if (document.getElementById("productos")) {
        mostrarProductosPagina();
        document.getElementById("anterior").addEventListener("click", () => cambiarPagina(-1));
        document.getElementById("siguiente").addEventListener("click", () => cambiarPagina(1));
        document.getElementById("filtro-todos")?.addEventListener("click", () => filtrarPorCategoria(null));
        document.getElementById("filtro-cítricos")?.addEventListener("click", () => filtrarPorCategoria("Cítricos"));
        document.getElementById("filtro-otraFruta")?.addEventListener("click", () => filtrarPorCategoria("Otras frutas"));
    }
}

function initPCarrito() {
    if (document.getElementById("carrito")) {
        mostrarCarritoGuardado();
    }
}

function initTicket() {
    if (document.getElementById("ticketContainer")) {
        Ticket.mostrarUltimo(); 
    }
}

function init() {
    initPersona();
    initProductos();
    initPCarrito();
    initTicket();
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarBotonCerrarSesionProductos();
    inicializarModoOscuro();
    init();
});
