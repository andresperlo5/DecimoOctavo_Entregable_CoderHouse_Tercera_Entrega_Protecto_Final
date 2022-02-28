const { Schema } = require('mongoose')
const UserSchema = new Schema({
    carritoID: {
        type: Schema.Types.ObjectId,
        ref: 'cart'
    },
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    direccion: {
        type: String,
        trim: true,
        required: true
    },
    edad: {
        type: Number,
        trim: true
    },
    telefono: {
        type: Number,
        trim: true,
        required: true
    },
    foto: {
        type: String,
        trim: true
    },
    usuario: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    contrasenia: {
        type: String,
        trim: true,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    token: [String]
})
module.exports = UserSchema
