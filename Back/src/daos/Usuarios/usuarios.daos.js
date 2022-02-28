const ContenedorUsuariosMongoAtlas = require('../../contenedores/usuarios.contenedor')
const SchemaUsers = require('../../models/usuarios.models')
class UsuariosDAOMongoDB extends ContenedorUsuariosMongoAtlas {
    constructor() {
        super('user', SchemaUsers)
    }
}
module.exports = UsuariosDAOMongoDB;
