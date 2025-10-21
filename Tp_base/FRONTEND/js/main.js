import { inicializarModoOscuro } from "./theme.js"
import { convertirHtmlPdf } from "./controllers/TicketController.js";
function initPersona() {
    if (document.getElementById("persona")) {}
}

function initProductos() {
    if (document.getElementById("productos")) {}
}

function initPCarrito() {
    if (document.getElementById("carrito")) {}
}

function initTicket() {
  const ticketContainer = document.getElementById("ticketContainer");
  if (ticketContainer) {
    const btnConfirmar = document.getElementById("btnConfirmar");
    btnConfirmar.addEventListener("click", () => convertirHtmlPdf("idPdf"));
  }
}

function init() {
    initProductos();
    initTicket() 
}

document.addEventListener("DOMContentLoaded", () => {
    inicializarModoOscuro();
    init();
});
