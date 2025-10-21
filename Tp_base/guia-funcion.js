// 1️⃣ MODELOS
// Persona

// Propiedades:

// nombre → nombre del usuario que ingresa al autoservicio.

// Funciones:

validarNombre() //→ verifica que el nombre no esté vacío o tenga caracteres inválidos.

toJSON() //→ devuelve un objeto JSON con los datos de la persona (útil para guardar o enviar al backend).

// Uso:

// Cada cliente que entra crea un Carrito.

// Se almacena su nombre para mostrarlo en el ticket.

// Producto

// Propiedades:

// id, nombre, descripcion, precio, stock, categoria, imagen, activo.

// Funciones:

isAvailable() //→ devuelve true si activo es true y stock > 0.

toJSON() //→ objeto JSON del producto para renderizarlo en la vista o enviarlo al backend.

// Uso:

// Representa los productos que el cliente puede comprar.

// Se usa para renderizar la lista en la pantalla de productos y calcular totales en el carrito.

// CarritoItem

// Propiedades:

// productoId, nombre, precioUnit, cantidad, subtotal.

// Funciones:

aumentar(cantidad) //→ suma unidades al item.

disminuir(cantidad) //→ resta unidades al item.

actualizarCantidad(cantidad) //→ cambia cantidad exacta.

calcularSubtotal() //→ calcula precioUnit * cantidad.

// Uso:

// Representa un producto agregado al carrito.

// Permite modificar la cantidad antes de confirmar la compra.

// Carrito

// Propiedades:

// items → lista de CarritoItem.

// claveStorage → clave para guardar el carrito en localStorage.

// Funciones:

agregarProducto(p, cantidad) //→ agrega un producto al carrito.

eliminarProducto(id) //→ elimina un item del carrito.

cambiarCantidad(id, cantidad) //→ cambia la cantidad de un item.

obtenerTotal() //→ devuelve el total de la compra.

vaciar()// → limpia todos los items.

persistir()// → guarda carrito en localStorage.

recuperar() //→ carga carrito de localStorage.

// Uso:

// Centraliza toda la gestión del carrito del cliente.

// Permite persistir datos aunque se recargue la página.

// TicketItem

// Propiedades:

// productoId, nombre, precioUnit, cantidad, subtotal.

// Uso:

// Es un snapshot del CarritoItem al momento de generar un ticket.

// Permite mantener un registro histórico de la compra.

// Ticket

// Propiedades:

// idTicket, personaNombre, items (TicketItem[*]), fecha, total, empresaNombre.

// Funciones:

generarDesdeCarrito(c /*:Carrito*/, p/*:Persona*/) //→ convierte el carrito en un ticket.

toJSON() //→ devuelve los datos en JSON.

descargarPDF() //→ genera un PDF para que el usuario lo guarde.

// Uso:

// Representa la compra final.

// Se muestra al usuario y se puede descargar.

// 2️⃣ CONTROLADORES
// ProductosController

// Funciones:

getProductosActivos() //→ devuelve solo los productos activos.

getById(id) //→ obtiene un producto específico por ID.

getPage(pagina) //→ devuelve productos paginados.

buscar(nombre) //→ busca productos por nombre o palabra clave.

// Uso:

// Se encarga de toda la lógica de filtrado y paginación de productos.

// La vista solo recibe la lista ya filtrada.

// CarritoController

// Funciones:

agregarProducto(p, cantidad) //→ agrega producto al carrito.

eliminarProducto(id) //→ elimina producto del carrito.

cambiarCantidad(id, cantidad) //→ actualiza cantidad de un item.

obtenerCarrito() //→ devuelve el carrito actual.

// Uso:

// Intermedia entre la vista y el modelo Carrito.

// Mantiene todo el flujo del carrito centralizado.

// TicketController

// Funciones:

generarDesdeCarrito(c, p) //→ crea un ticket desde el carrito y la persona.

descargarPDF(ticket) //→ genera el PDF para el usuario.

// Uso:

// La vista solo pide el ticket, el controller hace toda la lógica de creación y exportación.

// 3️⃣ VISTAS
// productosView

// Funciones:

render(lista) //→ muestra los productos en la pantalla.

actualizarPaginacion() //→ cambia la página mostrada.

// Uso:

// Recibe los productos desde el controller y los dibuja en HTML.

// carritoView

// Funciones:

render(c) //→ muestra todos los items del carrito.

mostrarTotal() //→ calcula y muestra el total de la compra.

mostrarConfirmacion()// → lanza modal de confirmación antes de finalizar la compra.

// ticketView

// Funciones:

render(t) //→ muestra los datos del ticket en pantalla.

mostrarBotonSalir() //→ permite reiniciar la aplicación y volver a la pantalla de bienvenida.

// utilsView

// Funciones:

mostrarModal(texto, callback) //→ muestra modales de confirmación.

mostrarAlerta(msg) //→ muestra alertas rápidas.

// Uso:

// Herramientas reutilizables por todas las vistas para interactuar con el usuario.

// Para organizar tu desarrollo:

// Empieza por modelos (Persona, Producto, Carrito, Ticket) con sus funciones básicas.

// Luego crea los controladores que manejen la lógica de cada modelo.

// Finalmente arma las vistas, que solo se encargan de mostrar datos y capturar eventos.

// Usa utilsView para alertas y confirmaciones, así evitas duplicar código.
// ' ======================
// ' === CLASES MODELO ===
// ' =======================

// class Persona {
//   - nombre : string
//   --
//   + validarNombre() : boolean
//   + toJSON() : Object
// }

// class Producto {
//   - id : number
//   - nombre : string
//   - descripcion : string
//   - precio : number
//   - stock : number
//   - categoria : string
//   - imagen : string
//   - activo : boolean
//   --
//   + isAvailable() : boolean
//   + toJSON() : Object
// }

// class CarritoItem {
//   - productoId : number
//   - nombre : string
//   - precioUnit : number
//   - cantidad : number
//   - subtotal : number
//   --
//   + aumentar(cantidad:int)
//   + disminuir(cantidad:int)
//   + actualizarCantidad(cantidad:int)
//   + calcularSubtotal() : number
// }

// class Carrito {
//   - items : CarritoItem[*]
//   - claveStorage : string
//   --
//   + agregarProducto(p:Producto, cantidad:int)
//   + eliminarProducto(id:number)
//   + cambiarCantidad(id:number, cantidad:int)
//   + obtenerTotal() : number
//   + vaciar() : void
//   + persistir() : void
//   + recuperar() : void
// }

// class TicketItem {
//   - productoId : number
//   - nombre : string
//   - precioUnit : number
//   - cantidad : number
//   - subtotal : number
// }

// class Ticket {
//   - idTicket : string
//   - personaNombre : string
//   - items : TicketItem[*]
//   - fecha : string
//   - total : number
//   - empresaNombre : string
//   --
//   + generarDesdeCarrito(c:Carrito, p:Persona)
//   + toJSON()
//   + descargarPDF()
// }

//' ===========================
//' === CONTROLADORES / VIEWS ==
//' ===========================

// class ProductosController {
//   + getProductosActivos() : Producto[*]
//   + getById(id:number) : Producto
//   + getPage(pagina:int) : Producto[*]
//   + buscar(nombre:string) : Producto[*]
// }

// class CarritoController {
//   + agregarProducto(p:Producto, cantidad:int)
//   + eliminarProducto(id:number)
//   + cambiarCantidad(id:number, cantidad:int)
//   + obtenerCarrito() : Carrito
// }

// class TicketController {
//   + generarDesdeCarrito(c:Carrito, p:Persona) : Ticket
//   + descargarPDF(ticket:Ticket)
// }

// class productosView {
//   + render(lista:Producto[*])
//   + actualizarPaginacion()
// }

// class carritoView {
//   + render(c:Carrito)
//   + mostrarTotal()
//   + mostrarConfirmacion()
// }

// class ticketView {
//   + render(t:Ticket)
//   + mostrarBotonSalir()
// }

// class utilsView {
//   + mostrarModal(texto:string, callback:Function)
//   + mostrarAlerta(msg:string)
// }

// npm i html2pdf