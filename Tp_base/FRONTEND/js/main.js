import { inicializarModoOscuro } from "./theme.js"
import { convertirHtmlPdf } from "./controllers/TicketController.js";
import { ProductosController } from "./controllers/ProductosController.js";

function initPersona() {
    if (document.getElementById("persona")) {}
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
    // initProductos();
    initTicket() 
}

document.addEventListener("DOMContentLoaded", () => {
    inicializarModoOscuro();
    ProductosController.initProductos()
    init();
});
