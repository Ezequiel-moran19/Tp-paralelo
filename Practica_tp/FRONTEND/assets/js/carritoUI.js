export class CarritoUI {
    constructor(carrito, confirmarCallback) {
        this.carrito = carrito;
        this.items = carrito.items;
        this.confirmarCallback = confirmarCallback;
        this.columnasOcultas = ["id", "estado"];
    }

    mostrarCarrito() {
        const contenedor = document.getElementById("carrito");
        if (!contenedor) return;

        contenedor.innerHTML = "";

        this.crearTabla(contenedor);
        this.actualizarContador();
        this.asignarEventoConfirmar(contenedor);
    }

    crearTabla(contenedor) {
        const tabla = document.createElement("table");
        tabla.className = "tabla-carrito";

        const thead = document.createElement("thead");
        thead.appendChild(this.crearEncabezadoTabla());
        tabla.appendChild(thead);

        const tbody = document.createElement("tbody");
        tabla.appendChild(tbody);
        this.crearCuerpoTabla(tbody);

        tbody.appendChild(this.crearFilaTotal());

        contenedor.appendChild(tabla);

        this.asignarEventosEliminar();
    }

    crearEncabezadoTabla() {
        const cabecera = document.createElement("tr");

        if (!this.items.length) return cabecera;

        const columnas = Object.keys(this.items[0])
            .filter(col => !this.columnasOcultas.includes(col) && col !== "rutaImg");

        const thImg = document.createElement("th");
        thImg.textContent = "IMAGEN";
        cabecera.appendChild(thImg);

        columnas.forEach(col => {
            const th = document.createElement("th");
            th.textContent = col.toUpperCase();
            cabecera.appendChild(th);
        });

        const thAcciones = document.createElement("th");
        thAcciones.textContent = "ACCIONES";
        cabecera.appendChild(thAcciones);

        return cabecera;
    }

    crearCuerpoTabla(cuerpo) {
        this.items.forEach((item, i) => {
            const fila = document.createElement("tr");
            const tdImg = document.createElement("td");
            tdImg.appendChild(this.crearImagenCard(item));
            fila.appendChild(tdImg);

            Object.keys(item).forEach(key => {
                if (this.columnasOcultas.includes(key) || key === "rutaImg") return;

                const td = document.createElement("td");

                if (key === "precio") td.textContent = `$${item[key]}`;
                else td.textContent = item[key];

                fila.appendChild(td);
            });

            this.crearCeldasBoton(fila, i);

            cuerpo.appendChild(fila);
        });
    }

    crearImagenCard(item) {
        const img = document.createElement("img");
        img.src = item.rutaImg;
        img.alt = item.nombre;
        img.className = "img-tabla";
        return img;
    }

    crearCeldasBoton(fila, index) {
        const tdAcciones = document.createElement("td");
        const btnEliminar = this.crearBotonEliminar();
        btnEliminar.dataset.index = index;
        tdAcciones.appendChild(btnEliminar);
        fila.appendChild(tdAcciones);
    }

    crearBotonEliminar() {
        const btn = document.createElement("button");
        btn.className = "boton-eliminar";
        btn.textContent = "Eliminar";
        return btn;
    }

    asignarEventoConfirmar(contenedor) {
        const btnConfirmar = this.crearBotonConfirmar(contenedor);
        btnConfirmar.addEventListener("click", () => {
            if (this.confirmarCallback) this.confirmarCallback();
        });
    }

    crearFilaTotal() {
        const totalFila = document.createElement("tr");
        totalFila.className = "fila-total";

        const totalCols = this.items.length ? Object.keys(this.items[0]).length - this.columnasOcultas.length + 1 : 3;
        totalFila.innerHTML = `
            <td colspan="${totalCols - 2}"><strong>Total</strong></td>
            <td colspan="2"><strong>$${this.carrito.calcularTotal()}</strong></td>
        `;
        return totalFila;
    }

    crearBotonConfirmar(contenedor) {
        const btnConfirmar = document.createElement("button");
        btnConfirmar.textContent = "Confirmar compra";
        btnConfirmar.classList.add("btn-generico");
        contenedor.appendChild(btnConfirmar);
        return btnConfirmar;
    }

    asignarEventosEliminar() {
        document.querySelectorAll(".boton-eliminar").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const index = parseInt(e.target.getAttribute("data-index"));
                this.carrito.eliminar(index);
                this.items = this.carrito.items;
                this.mostrarCarrito();
            });
        });
    }

    actualizarContador() {
        const cont = document.getElementById("contador_carrito");
        if (!cont) return;

        cont.innerHTML = "";
        cont.classList.add("cont_carrito");

        const p = document.createElement("p");
        const total = this.carrito.calcularTotal();
        const cantidad = this.items.length;

        p.textContent = cantidad
            ? `🛒 ${cantidad} producto(s) - Total: $${total}`
            : `🛒 Carrito vacío (0 productos)`;

        cont.appendChild(p);
    }
}
