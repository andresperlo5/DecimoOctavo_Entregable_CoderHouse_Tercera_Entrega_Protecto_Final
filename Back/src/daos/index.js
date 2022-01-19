let productosDao
let carritosDao
let usuariosDao

let url = 'mongodb'

switch (url) {
    case 'mongodb':
        const ProductosDao = require('../daos/Productos/productos.daos')
        const CarritosDao = require('../daos/Carritos/carritos.daos')
        const UsuariosDao = require('../daos/Usuarios/usuarios.daos')

        productosDao = new ProductosDao()
        carritosDao = new CarritosDao()
        usuariosDao = new UsuariosDao()

        break;
    case 'firebase':

        const UsuariosDaoFirebase = require('../daos/Usuarios/usuarios.daos.firebase')
        const CarritosDaoFirebase = require('../daos/Carritos/carritos.dao.firebase')
        const ProductosDaoFirebase = require('../daos/Productos/productos.dao.firebase')

        usuariosDao = new UsuariosDaoFirebase()
        carritosDao = new CarritosDaoFirebase()
        productosDao = new ProductosDaoFirebase()

        break
    default:
        break;
}

module.exports = { productosDao, carritosDao, usuariosDao }