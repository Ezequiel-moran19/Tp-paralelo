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

