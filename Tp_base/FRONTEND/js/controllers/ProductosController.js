import { ProductosView } from "../views/productosView.js"
import { Producto } from "../models/Producto.js"
import { productos } from "../api.js"

export class ProductosController{
    
    static initProductos(){
        const contenedor = document.getElementById("productos")
        
        ProductosView.mostrarProducto(contenedor, productos)
    }
}