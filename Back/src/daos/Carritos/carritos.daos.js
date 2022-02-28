const ContenedorCarritosMongoAtlas = require('../../contenedores/carrito.contenedor')
const SchemaCats = require('../../models/carritos.models')
class CarritosDAOMongoDB extends ContenedorCarritosMongoAtlas {
    constructor() {
        super('cart', SchemaCats)
    }
}
module.exports = CarritosDAOMongoDB;