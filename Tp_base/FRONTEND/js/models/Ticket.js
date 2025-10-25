export class Ticket{
    constructor(id,fecha,nombreCliente,productos,total){
        this.id=id;
        this.fecha=fecha;
        this.nombreCliente=nombreCliente;
        this.productos=productos;
        this.total = total
    }
    
    static generar(carrito) {
        return new Ticket(
            Date.now(),
            new Date().toLocaleString(),
            carrito.nombreUsuario,
            [...carrito.items], 
            carrito.calcularTotal(),
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
}



