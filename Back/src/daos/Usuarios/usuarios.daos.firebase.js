const  ContenedorUsuariosFirebase = require("../../contenedores/usuarios.contenedores.Firebase")
class UsuariosDaosFirebase extends ContenedorUsuariosFirebase {
    constructor() {
        super('usuarios')
    }
}

module.exports = UsuariosDaosFirebase;