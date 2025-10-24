import { inicializarModoOscuro } from "./theme.js";
import { convertirHtmlPdf } from "./controllers/TicketController.js";
import { ProductosController } from "./controllers/ProductosController.js";
import { CarritoController } from "./controllers/CarritoController.js";
import { PersonaController } from "./controllers/PersonaController.js";

function initTicket() {
  const ticketContainer = document.getElementById("ticketContainer");
  if (ticketContainer) {
    const btnConfirmar = document.getElementById("btnConfirmar");
    btnConfirmar.addEventListener("click", () => convertirHtmlPdf("idPdf"));
  }
}
function init() {
  if (document.getElementById("productos")) {
    ProductosController.initProductos();
  }
  if (document.querySelector(".carrito")) {
    CarritoController.initCarrito();
  }
  if (document.querySelector("form") && document.getElementById("fNombre")) {
      PersonaController.init();
  }
  initTicket();
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarModoOscuro();
  init();
});

