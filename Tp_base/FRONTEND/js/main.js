import { inicializarModoOscuro } from "./theme.js"
function initPersona() {
    if (document.getElementById("persona")) {
       
    }
}

function initProductos() {
    if (document.getElementById("productos")) {
        
    }
}

function initPCarrito() {
    if (document.getElementById("carrito")) {

    }
}

function initTicket() {
    if (document.getElementById("ticketContainer")) {

    }
}

function init() {
    initProductos();
}

document.addEventListener("DOMContentLoaded", () => {
    inicializarModoOscuro();
    init();
});
