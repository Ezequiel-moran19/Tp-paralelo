export class ProductosView {

    static renderizaProducto(producto){
        const card = document.createElement("div")
        card.classList.add("card")
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
                    <a href="#" class="btn btn-danger boton-card align-items-center">Agregar al carrito</a>
                </div>
            </div>
        `
        return card;
    } 

    static mostrarProducto(contenedor, listaProductos){
        contenedor.innerHTML= "";
        listaProductos.forEach(element => {
            const card = ProductosView.renderizaProducto(element);
            contenedor.appendChild(card);
        });
    } 
}

// function crearImagen(src, alt) {
//   const img = document.createElement("img");
//   img.src = src;
//   img.alt = alt;
//   img.classList.add("card-img-top");
//   return img;
// }

// function crearTexto(tag, clase, contenido) {
//   const el = document.createElement(tag);
//   el.classList.add(clase);
//   el.textContent = contenido;
//   return el;
// }

// function crearBoton(texto) {
//   const btn = document.createElement("a");
//   btn.href = "#";
//   btn.className = "btn btn-danger boton-card align-items-center";
//   btn.textContent = texto;
//   return btn;
// }

// export function renderizaProducto(producto) {
//   const card = document.createElement("div");
//   card.classList.add("card");
//   card.style.width = "18rem";

//   const img = crearImagen(producto.rutaImg, producto.nombre);
//   const body = document.createElement("div");
//   body.classList.add("card-body");

//   body.append(
//     crearTexto("h5", "card-title", producto.nombre),
//     crearTexto("p", "card-text", producto.descripcion),
//     crearTexto("p", "card-text", `$${producto.precio}`),
//     crearTexto("p", "card-text", `Stock: ${producto.stock}`),
//     crearTexto("p", "card-text", `Categoría: ${producto.categoria}`),
//     crearBoton("Agregar al carrito")
//   );

//   card.append(img, body);
//   return card;
// }
