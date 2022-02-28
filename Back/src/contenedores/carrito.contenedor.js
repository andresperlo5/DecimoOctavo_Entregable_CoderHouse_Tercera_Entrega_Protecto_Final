const mongoose = require('mongoose')
require('../config/db.mongo')
const log = require('log4js')
log.configure({
    appenders: {
        consoleLog: { type: 'console' },
        fileLog: { type: 'file', filename: 'gral.log' }
    },
    categories: {
        default: { appenders: ['consoleLog'], level: 'error' },
        file: { appenders: ['fileLog'], level: 'error' }
    }
})

const logger = log.getLogger()
class ContenedorCartMongoAtlas {
    constructor(collection, schema) {
        this.cartModel = mongoose.model(collection, schema)
    }

    async findAll() {
        try {
            const cartsAll = await this.cartModel.find()
            return cartsAll
        } catch (error) {
            logger.error(error)
            res.status(500).json(error)
        }
    }

    async findOneId(id) {
        try {
            const oneCart = await this.cartModel.findOne({ '_id': id })
            return oneCart
        } catch (error) {
             logger.error(error)
             res.status(500).json(error)
        }
    }

    async newCart(body) {
        try {
            const newCart = new this.cartModel(body);
            await newCart.save()
            return newCart
        } catch (error) {
             logger.error(error)
             res.status(500).json(error)

        }
    }

    async ModifyOneCart(id, body) {
        try {
            const modifyCart = await this.cartModel.findByIdAndUpdate({ '_id': id }, body, { new: true })
            return modifyCart
        } catch (error) {
             logger.error(error)
             res.status(500).json(error)
        }
    }

    async DeleteOneCart(id) {
        try {
            const deleteCart = await this.cartModel.findByIdAndDelete({ '_id': id })
            return deleteCart
        } catch (error) {
             logger.error(error)
             res.status(500).json(error)

        }
    }

    async SaveCart(cartEnc) {
        try {
            cartEnc.save()
            return cartEnc
        } catch (error) {
             logger.error(error)
             res.status(500).json(error)
        }
    }
}

module.exports = ContenedorCartMongoAtlas;
