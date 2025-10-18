export class Ticket {
    constructor(idTicket, idPersona, productos, total, fechaHora) {
        this.idTicket = idTicket;
        this.idPersona = idPersona;
        this.productos = productos;
        this.total = total;
        this.fechaHora = fechaHora;
    }
    static generar(carrito, persona) {
        return new Ticket(
            Date.now(),
            persona.idPersona,
            [...carrito.items], 
            carrito.calcularTotal(),
            new Date().toLocaleString()
        );
    }

    guardar() {
        const tickets = Ticket.obtenerTodos();
        tickets.push(this);
        localStorage.setItem("tickets", JSON.stringify(tickets));
        localStorage.setItem("ultimoTicket", this.idTicket);
    }

    static obtenerTodos() {
        return JSON.parse(localStorage.getItem("tickets")) || [];
    }
    mostrarResumen() {
        const detalle = document.createElement("div");
        detalle.classList.add("ticket");

        const productosHTML = this.productos
            .map(p => `<li>${p.nombre} - $${p.precio}</li>`)
            .join("");

        detalle.innerHTML = `
            <h2>Ticket #${this.idTicket}</h2>
            <p><strong>ID Persona:</strong> ${this.idPersona}</p>
            <p><strong>Fecha:</strong> ${this.fechaHora}</p>
            <ul>${productosHTML}</ul>
            <p><strong>Total:</strong> $${this.total}</p>
        `;
        return detalle;
    }

    static mostrarUltimo(containerId = "ticketContainer") {
        const container = document.getElementById(containerId);
        if (!container) return;

        const tickets = Ticket.obtenerTodos();
        const idTicket = localStorage.getItem("ultimoTicket");
        const ticketEncontrado = tickets.find(t => t.idTicket === Number(idTicket));
        container.innerHTML = "";

        if (ticketEncontrado) {
            const ticket = new Ticket(
                ticketEncontrado.idTicket,
                ticketEncontrado.idPersona,
                ticketEncontrado.productos,
                ticketEncontrado.total,
                ticketEncontrado.fechaHora
            );
            container.appendChild(ticket.mostrarResumen());
        } else {
            container.innerHTML = "<h2>No hay ticket disponible para mostrar.</h2>";
        }
    }
}
