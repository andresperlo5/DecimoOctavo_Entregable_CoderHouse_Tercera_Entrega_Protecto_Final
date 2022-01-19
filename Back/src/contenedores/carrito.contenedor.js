const mongoose = require('mongoose')
require('../config/db.mongo')

class ContenedorCartMongoAtlas {
    constructor(collection, schema) {
        this.cartModel = mongoose.model(collection, schema)
    }

    async findAll() {
        try {

            const cartsAll = await this.cartModel.find()
            return cartsAll
        } catch (error) {
            console.log('error', error);
        }
    }

    async findOneId(id) {
        try {

            const oneCart = await this.cartModel.findOne({ '_id': id })
            return oneCart

        } catch (error) {
            console.log('error', error);

        }
    }

    async newCart(body) {
        try {

            const newCart = new this.cartModel(body);
            await newCart.save()
            return newCart


        } catch (error) {
            console.log('error', error);

        }
    }

    async ModifyOneCart(id, body) {
        try {

            const modifyCart = await this.cartModel.findByIdAndUpdate({ '_id': id }, body, { new: true })
            return modifyCart

        } catch (error) {
            console.log('error', error);
        }
    }

    async DeleteOneCart(id) {
        try {

            const deleteCart = await this.cartModel.findByIdAndDelete({ '_id': id })
            return deleteCart

        } catch (error) {
            console.log('error', error);

        }
    }

    async SaveCart(cartEnc) {
        try {
           
            cartEnc.save()
            return cartEnc 

        } catch (error) {
            console.log('error', error);
        }
    }
}

module.exports = ContenedorCartMongoAtlas;
