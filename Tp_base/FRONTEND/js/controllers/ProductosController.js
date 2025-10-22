import { ProductosView } from "../views/productosView.js";
import { productos } from "../api.js";

export class ProductosController {
    static initProductos() {
        const contenedor = document.getElementById("productos");
        ProductosView.mostrarProducto(contenedor, productos);

        contenedor.addEventListener("click", (e) => {
            e.preventDefault();

            if (e.target && e.target.classList.contains("btnAgregar")) {
                const card = e.target.closest(".card");
                const nombre = card.querySelector(".card-title").textContent.replace("Nombre: ", "");
                e.target.style.display = "none";

                const existingContenedor = card.querySelector("div.mt-2");
                if (existingContenedor) existingContenedor.remove();

                const btnSumar = ProductosView.crearBotonSumar();
                const contador = ProductosView.renderContador();
                const btnRestar = ProductosView.crearBotonRestar();

                const contenedorBtn = document.createElement("div");
                contenedorBtn.classList.add("d-flex", "justify-content-center", "align-items-center", "mt-2");
                contenedorBtn.append(btnRestar, contador, btnSumar);

                card.querySelector(".card-body").appendChild(contenedorBtn);

                const producto = productos.find(p => p.nombre === nombre);

                ProductosView.agregarEventosCard(card, producto);
            }
        });
    }
}
