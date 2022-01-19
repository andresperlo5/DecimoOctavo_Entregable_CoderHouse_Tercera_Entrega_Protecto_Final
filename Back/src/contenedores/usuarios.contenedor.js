const express = require('express')
const app = express()

const mongoose = require('mongoose')
require('../config/db.mongo')

const session = require('express-session')
const MongoStore = require('connect-mongo')
const opcionesMongoose = { useNewUrlParser: true, useUnifiedTopology: true }
const passport = require('passport')

app.use(session({

    store: MongoStore.create({
        mongoUrl: process.env.mongodb,
        mongoOptions: opcionesMongoose
    }),
    secret: 'DecimotercerEntregableCoderHouse2021',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 600000
    }
}))

app.use(passport.initialize())
app.use(passport.session())

class ContenedorUsersMongoAtlas {
    constructor(collection, schema) {
        this.userModel = mongoose.model(collection, schema)
    }

    async findAll() {
        try {

            const userAll = await this.userModel.find()
            return userAll

        } catch (error) {
            console.log('error', error);
        }
    }

    async findOneId(id) {
        try {

            const oneUser = await this.userModel.findOne({ '_id': id })
            return oneUser

        } catch (error) {
            console.log('error', error);
        }
    }

    async findOneUser(user) {
        try {

            let { usuario } = user
            const oneUser = await this.userModel.findOne({ usuario })
            console.log('oneUser', oneUser)

            return oneUser

        } catch (error) {
            console.log('error', error);
        }
    }

    async newUser(body) {
        try {

            const newUser = new this.userModel(body);
            await newUser.save()
            return newUser

        } catch (error) {
            console.log('error', error);
        }
    }

    async ModifyOneUser(id, body) {
        try {

            const modifyUser = await this.userModel.findByIdAndUpdate({ '_id': id }, body, { new: true })
            return modifyUser

        } catch (error) {
            console.log('error', error);
        }
    }


    async ModifyUserToken(user) {
        try {

            const userToken = await this.userModel.updateOne({ usuario: user.usuario }, user)
            return userToken

        } catch (error) {
            console.log('error', error);
        }
    }

    async DeleteOneUser(id) {
        try {

            const deleteUser = await this.userModel.findByIdAndDelete({ '_id': id })
            return deleteUser

        } catch (error) {
            console.log('error', error);
        }
    }

    async authTokenVerify(verifToken) {
        try {
            const { verificar, token } = verifToken
            const userLogin = await this.userModel.findOne({ _id: verificar.user.id, token: token });
            return userLogin

        } catch (error) {
            console.log('error', error);
        }
    }

    async LogoutUserRes(resLocalUser) {

        try {
            const LogUs = await this.userModel.updateOne({ _id: resLocalUser.id }, { $set: { token: [] } })
            return LogUs

        } catch (error) {
            console.log('error', error);
        }
    }

    async addImage(id, fotOavatar) {

        try {
            await this.userModel.findByIdAndUpdate(id, { foto: fotOavatar }, { new: true })
        } catch (error) {
            console.log('error', error)
        }
    }
}

module.exports = ContenedorUsersMongoAtlas;
