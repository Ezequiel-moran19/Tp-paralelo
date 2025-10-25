export class Ticket{
    constructor(id,fecha,nombreCliente,productos){
        this.id=id;
        this.fecha=fecha;
        this.nombreCliente=nombreCliente;
        this.productos=productos;
        this.total = productos.reduce((acumulador, producto) => acumulador + producto.precio, 0);
    }
    


}



