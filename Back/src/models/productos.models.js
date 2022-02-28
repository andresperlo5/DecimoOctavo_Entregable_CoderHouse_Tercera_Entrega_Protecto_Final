const { Schema } = require('mongoose')
const ProductSchema = new Schema({
    nombre: {
        type: String,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    foto:{
        type: String,
        trim: true
    },
    precio: {
        type: Number,
        trim: true
    },
    stock: {
        type: Number,
        trim: true
    },
    timestamp: {
        type: String,
        trim: true
    },
    codigo: {
        type: String,
        trim: true
    }
})
module.exports = ProductSchema
