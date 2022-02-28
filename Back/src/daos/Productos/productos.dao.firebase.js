const  ContenedorProductosFirebase = require("../../contenedores/productos.contenedor.Firebase")
class ProductosDaosFirebase extends ContenedorProductosFirebase {
    constructor() {
        super('productos')
    }
}
module.exports = ProductosDaosFirebase;