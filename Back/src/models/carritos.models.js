const { Schema } = require('mongoose')
const CartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    timestamp: {
        type: Date,
        trim: true
    },
    producto:{
        type: Array,
        trim: true
    }
})
module.exports = CartSchema
