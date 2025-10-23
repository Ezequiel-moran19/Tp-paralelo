export class ProductosView {

    static renderizaProducto(producto) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.width = "18rem";
        card.innerHTML = `
            <img src="${producto.rutaImg}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body">
                <h5 class="card-title">Nombre: ${producto.nombre}</h5>
                <p class="card-text">Descripcion ${producto.descripcion}</p>
                <p class="card-text">Precio: $${producto.precio}</p>
                <p class="card-text">Stock: ${producto.stock}</p>
                <p class="card-text">Categoria: ${producto.categoria}</p>
                <div class="d-flex justify-content-center">
                    <a href="#" class="btn btn-danger boton-card align-items-center btnAgregar">Agregar al carrito</a>
                </div>
            </div>
        `;
        return card;
    }

    static mostrarProducto(contenedor, listaProductos) {
        contenedor.innerHTML = "";
        listaProductos.forEach(producto => {
            const card = ProductosView.renderizaProducto(producto);
            contenedor.appendChild(card);
        });
    }

    static crearBotonSumar() {
        const btn = document.createElement("a");
        btn.href = "#";
        btn.className = "btn btn-outline-success btn-sm btn-mas";
        btn.textContent = "+";
        return btn;
    }

    static crearBotonRestar() {
        const btn = document.createElement("a");
        btn.href = "#";
        btn.className = "btn btn-outline-danger btn-sm btn-menos";
        btn.textContent = "-";
        return btn;
    }

    static renderContador() {
        const contador = document.createElement("span");
        contador.textContent = "1";
        contador.className = "fw-bold mx-2";
        return contador;
    }

    static agregarEventosCard(card, producto) {
        const btnSumar = card.querySelector(".btn-mas");
        const btnRestar = card.querySelector(".btn-menos");
        const contador = card.querySelector("span");

        btnSumar.addEventListener("click", (e) => {
            e.preventDefault();
            let valor = parseInt(contador.textContent);
            if (valor < producto.stock) {
                contador.textContent = valor + 1;
            }
        });

        btnRestar.addEventListener("click", (e) => {
            e.preventDefault();
            let valor = parseInt(contador.textContent);
            if (valor > 1) {
                contador.textContent = valor - 1;
            } else {
                const contenedorBtn = card.querySelector("div.mt-2");
                if (contenedorBtn) contenedorBtn.remove();
                card.querySelector(".btnAgregar").style.display = "block";
            }
        });
    }

    static crearContenedorBotones() {
        const btnSumar = ProductosView.crearBotonSumar();
        const contador = ProductosView.renderContador();
        const btnRestar = ProductosView.crearBotonRestar();

        const contenedorBotones = document.createElement("div");
        contenedorBotones.classList.add("d-flex", "justify-content-center", "align-items-center", "mt-2");
        contenedorBotones.append(btnRestar, contador, btnSumar);

        return contenedorBotones;
    }
}
