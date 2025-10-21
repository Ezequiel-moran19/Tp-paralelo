// Carga de la librería
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

// Motivo: html2pdf.js no puede importarse directamente con import si no fue instalado con un bundler (como Webpack o Vite).
// Por eso, se usa un <script> CDN para cargarla globalmente en el navegador.
// Esto agrega la función html2pdf() al objeto global window, lo que permite usarla sin importar.

// 🔹 Exportamos la función para poder llamarla desde otros archivos JS.
// Esto permite modularizar el código y mantener la lógica separada del HTML.
export function convertirHtmlPdf(divElement) {

  // 🔹 Obtenemos el div del ticket desde el DOM usando su ID.
  // divElement es el parámetro que recibe la función; normalmente "idPdf".
  // Esto nos da acceso al contenido que queremos convertir a PDF.
  const original = document.getElementById(divElement);

  // 🔹 Clonamos completamente el div original.
  // cloneNode(true) copia todo el contenido del div, incluyendo hijos y estilos.
  // Trabajar con un clon permite modificarlo para el PDF sin alterar lo que ve el usuario.
  const clone = original.cloneNode(true);

  // 🔹 Seleccionamos todos los elementos interactivos que no queremos en el PDF.
  // Buscamos botones (<button>) y enlaces con clase "btn" (<a class="btn">).
  const botones = clone.querySelectorAll("button, a.btn");

  // 🔹 Eliminamos los botones del clon.
  // Esto garantiza que en el PDF solo aparezcan los datos del ticket.
  botones.forEach(b => {
    b.remove(); // Cada botón o enlace encontrado es eliminado del clon.
  });

  // 🔹 Seleccionamos el título dentro del clon para modificarlo.
  // Usamos querySelector con "#idTitulo", porque solo queremos cambiar el título visible.
  const titulo = clone.querySelector("#idTitulo");

  // 🔹 Cambiamos el texto del título solo en el clon.
  // Esto permite que el PDF tenga un encabezado más formal como "Resumen de Compra".
  if (titulo) {
    titulo.textContent = "Resumen de Compra";
  }

  // 🔹 Configuramos las opciones para html2pdf.
  // html2pdf es la librería que transforma HTML en PDF usando html2canvas y jsPDF.
  const opciones = {
    margin: [10, 10, 10, 10],          // Márgenes de 10mm alrededor del PDF
    filename: "comprobante.pdf",       // Nombre del archivo al descargar
    image: { type: "jpeg", quality: 0.98 }, // Formato y calidad de la imagen generada
    html2canvas: { scale: 2, useCORS: true }, // Configuración de renderizado:
                                               // scale: 2 aumenta resolución
                                               // useCORS: permite cargar imágenes externas
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" } // Formato del PDF: A4 vertical
  };

  // 🔹 Ejecutamos html2pdf con las opciones y el clon del div.
  // El flujo es:
  // 1. html2canvas convierte el clon en imagen.
  // 2. jsPDF genera un PDF con la imagen.
  // 3. .save() descarga automáticamente el archivo.
  html2pdf()
    .set(opciones)   // Aplicamos la configuración definida arriba
    .from(clone)     // Indicamos que el contenido a convertir es el clon
    .save();         // Descarga el PDF de forma automática

}

// Al hacer clic, se invoca convertirHtmlPdf("idPdf"), generando el PDF a partir del div idPdf.
function initTicket() {
  const ticketContainer = document.getElementById("ticketContainer");
  if (ticketContainer) {
    const btnConfirmar = document.getElementById("btnConfirmar");
    btnConfirmar.addEventListener("click", () => convertirHtmlPdf("idPdf"));
  }
}

//
{/* 
<div id="ticketContainer">
  <div id="idPdf">
    <!-- Contenido del ticket (datos, productos, total, etc.) -->
  </div>

  <div class="d-flex gap-3">
    <button class="btn btn-danger flex-fill" id="btnConfirmar">
      <i class="bi bi-download me-2"></i> Descargar PDF
    </button>

    <a href="./productos.html" class="btn bg-light border flex-fill">
      <i class="bi bi-house me-2"></i> Salir
    </a>
  </div>
</div>

    */}