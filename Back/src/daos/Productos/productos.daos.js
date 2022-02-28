const ContenedorProductosMongoAtlas = require('../../contenedores/productos.contenedor')
const SchemaProducts = require('../../models/productos.models')
class ProductosDAOMongoDB extends ContenedorProductosMongoAtlas {
    constructor() {
        super('product', SchemaProducts)
    }
}
module.exports = ProductosDAOMongoDB;
