const  ContenedorCarritosFirebase = require("../../contenedores/carrito.contenedor.Firebase")
class CarritosDaosFirebase extends ContenedorCarritosFirebase {
    constructor() {
        super('carritos')
    }
}
module.exports = CarritosDaosFirebase;
