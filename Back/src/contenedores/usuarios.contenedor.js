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
class ContenedorUsersMongoAtlas {
    constructor(collection, schema) {
        this.userModel = mongoose.model(collection, schema)
    }

    async findAll() {
        try {
            const userAll = await this.userModel.find()
            return userAll
        } catch (error) {
            logger.error(error)
            res.status(500).json(error)
        }
    }

    async findOneId(id) {
        try {
            const oneUser = await this.userModel.findOne({ '_id': id })
            return oneUser

        } catch (error) {
            logger.error(error)
            res.status(500).json(error)
        }
    }

    async findOneUser(user) {
        try {
            let { usuario } = user
            const oneUser = await this.userModel.findOne({ usuario })
            return oneUser
        } catch (error) {
            logger.error(error)
            res.status(500).json(error)
        }
    }

    async newUser(body) {
        try {
            const newUser = new this.userModel(body);
            await newUser.save()
            return newUser

        } catch (error) {
            logger.error(error)
            res.status(500).json(error)
        }
    }

    async ModifyOneUser(id, body) {
        try {
            const modifyUser = await this.userModel.findByIdAndUpdate({ '_id': id }, body, { new: true })
            return modifyUser

        } catch (error) {
            logger.error(error)
            res.status(500).json(error)
        }
    }


    async ModifyUserToken(user) {
        try {
            const userToken = await this.userModel.updateOne({ usuario: user.usuario }, user)
            return userToken

        } catch (error) {
            logger.error(error)
            res.status(500).json(error)
        }
    }

    async DeleteOneUser(id) {
        try {
            const deleteUser = await this.userModel.findByIdAndDelete({ '_id': id })
            return deleteUser

        } catch (error) {
            logger.error(error)
            res.status(500).json(error)
        }
    }

    async authTokenVerify(verifToken) {
        try {
            const { verificar, token } = verifToken
            const userLogin = await this.userModel.findOne({ _id: verificar.user.id, token: token });
            return userLogin
        } catch (error) {
            logger.error(error)
            res.status(500).json(error)
        }
    }

    async LogoutUserRes(resLocalUser) {
        try {
            const LogUs = await this.userModel.updateOne({ _id: resLocalUser.id }, { $set: { token: [] } })
            return LogUs
        } catch (error) {
            logger.error(error)
            res.status(500).json(error)
        }
    }

    async addImage(id, fotOavatar) {
        try {
            await this.userModel.findByIdAndUpdate(id, { foto: fotOavatar }, { new: true })
        } catch (error) {
            logger.error(error)
            res.status(500).json(error)
        }
    }
}

module.exports = ContenedorUsersMongoAtlas;
