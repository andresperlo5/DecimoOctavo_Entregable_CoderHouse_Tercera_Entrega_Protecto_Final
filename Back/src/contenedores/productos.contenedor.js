const mongoose = require('mongoose')
require('../config/db.mongo')

class ContenedorMongoAtlas {
    constructor(collection, schema) {
        this.prodModel = mongoose.model(collection, schema)
    }

    async findAll() {
        try {

            const productsAll = await this.prodModel.find()
            return productsAll
            
        } catch (error) {
            console.log('error', error)
        }
    }

    async findOneId(id) {
        try {

            const oneProduct = await this.prodModel.findOne({ '_id': id })
            return oneProduct

        } catch (error) {
            console.log('error', error)

        }
    }

    async newProduct(body) {
        try {

            const newProduct = new this.prodModel(body);
            await newProduct.save()

            return newProduct

        } catch (error) {
            console.log('error', error)

        }
    }

    async ModifyOneProduct(id, body) {
        try {

            const modifyProd = await this.prodModel.findByIdAndUpdate({ '_id': id }, body, { new: true })
            return modifyProd

        } catch (error) {
            console.log('error', error)

        }
    }

    async DeleteOneProduct(id) {
        try {

            const deleteProd = await this.prodModel.findByIdAndDelete({ '_id': id })
            return deleteProd

        } catch (error) {
            console.log('error', error)

        }
    }
}

module.exports = ContenedorMongoAtlas;
