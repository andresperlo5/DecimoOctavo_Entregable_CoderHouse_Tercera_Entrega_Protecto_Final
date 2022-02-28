const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const toDay = new Date()
const { usuariosDao, carritosDao } = require('../daos/index')
const sendNodeMail = require('../middlewars/nodemailer')
const sendNodeMailAdmin = require('../middlewars/nodemailerAdmin')
const { validationResult } = require('express-validator')
const cloudinary = require("../utils/cloudinary");
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

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

const logger = log.getLogger('file')

passport.use('local-register', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'contrasenia',
    passReqToCallback: true
}, async (req, usuario, contrasenia, done) => {

    const user = await usuariosDao.findOneUser({ usuario })
    if (user) {
        return done({msg:'usuario no disponible'}, false)
    }

    const newUsers = await usuariosDao.newUser(req.body)

    const newCart = {
        userId: newUsers.id,
        timestamp: toDay,
        producto: []
    }

    const newCarts = await carritosDao.newCart(newCart)

    const newUser = {
        carritoID: newCarts.id,
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        edad: req.body.edad,
        telefono: req.body.telefono,
        usuario: usuario.toLowerCase(),
        admin: false,
        token: []
    }

    const salt = await bcryptjs.genSalt(10);
    newUser.contrasenia = await bcryptjs.hash(contrasenia, salt);
    const userCreate = await usuariosDao.ModifyOneUser(newUsers.id, newUser)

    const jwt_payload = {
        user: {
            id: newUsers.id,
            usuario: newUser.usuario,
            admin: newUser.admin
        }
    }

    const token = jwt.sign(jwt_payload, process.env.JWT_SECRET, { expiresIn: process.env.TIME_EXP })
    newUser.token = [token]
    let userUpdate = await usuariosDao.ModifyUserToken(newUser)
    console.log('userUpdate', userUpdate)

    function primeraLetraDelNombreMayuscula(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    const mailContent = {
        email: usuario,
        subject: 'Registro exitoso ',
        msg: '¡Hola ' + primeraLetraDelNombreMayuscula(req.body.nombre) + ' Bienvenido!',
    }

    await sendNodeMail(mailContent.email, mailContent.subject, mailContent.msg)
    //res.status(201).json({ id: newUsers.id, userData: newUser })
    done(null, { id: newUsers.id, userData: newUser })

}))

//Serializar
passport.serializeUser((user, done) => {
    done(null, user.id)
})

//Deserealizar
passport.deserializeUser((id, done) => {
    let user = userModel.findOne({ id })
    done(null, user)
})

/* exports.RegisterUser = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    try {
        const userReg = await usuariosDao.findOneUser({ usuario: req.body.usuario });
        if (userReg) return res.status(400).json({ msg: 'Usuario No Disponible' })

        const { nombre, direccion, edad, telefono, usuario, contrasenia } = req.body
        const newUsers = await usuariosDao.newUser(req.body)

        const newCart = {
            userId: newUsers.id,
            timestamp: toDay,
            producto: []
        }

        const newCarts = await carritosDao.newCart(newCart)

        const newUser = {
            carritoID: newCarts.id,
            nombre,
            direccion,
            edad,
            telefono,
            usuario: usuario.toLowerCase(),
            admin: false,
            token: []
        }

        const salt = await bcryptjs.genSalt(10);
        newUser.contrasenia = await bcryptjs.hash(contrasenia, salt);
        const userCreate = await usuariosDao.ModifyOneUser(newUsers.id, newUser)

        const jwt_payload = {
            user: {
                id: newUsers.id,
                usuario: newUser.usuario,
                admin: newUser.admin
            }
        }

        const token = jwt.sign(jwt_payload, process.env.JWT_SECRET, { expiresIn: process.env.TIME_EXP })
        newUser.token = [token]
        await usuariosDao.ModifyUserToken(newUser)

        function primeraLetraDelNombreMayuscula(name) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        }

        const mailContent = {
            email: usuario,
            subject: 'Registro exitoso ',
            msg: '¡Hola ' + primeraLetraDelNombreMayuscula(nombre) + ' Bienvenido!',
        }

        await sendNodeMail(mailContent.email, mailContent.subject, mailContent.msg)

        res.status(201).json({ id: newUsers.id, userData: newUser })

    } catch (error) {
        logger.error(error)
        res.status(500).json({ msg: 'Error', error })
    }
} */

//Login PassPort
passport.use('local-login', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'contrasenia'
}, async (usuario, contrasenia, done) => {

    const userLogin = await usuariosDao.findOneUser({ usuario });
    if (!userLogin) {
        console.log('usuario y/o contrasenia incorrecta')
        return done({ msg: 'Usuario y/o Contraseña Incorrectos1' }, false)
    }

    const passCheck = await bcryptjs.compare(contrasenia, userLogin.contrasenia);
    if (!passCheck) {
        console.log('usuario y/o contrasenia incorrecta')
        return done({ msg: 'Usuario y/o Contraseña Incorrectos2' }, false)
    }

    const jwt_payload = {
        user: {
            id: userLogin.id,
            usuario: userLogin.usuario,
            admin: userLogin.admin
        }
    }

    const token = jwt.sign(jwt_payload, process.env.JWT_SECRET, { expiresIn: process.env.TIME_EXP })
    userLogin.token = [token]
    await usuariosDao.ModifyUserToken(userLogin)
    return done(null, userLogin)
}))
exports.ImageUpload = async (req, res) => {

    try {
        const id = req.params.userId
        const results = await cloudinary.uploader.upload(req.file.path);
        const fotOavatar = results.secure_url
        const userCreate = await usuariosDao.addImage(id, fotOavatar)
        const oneUser = await usuariosDao.findOneId(id)
        const { carritoID, nombre, edad, usuario, direccion, telefono, admin, foto } = oneUser

        const mailContent = {
            subject: 'Nuevo Registro',
            carritoID,
            nombre,
            direccion,
            edad,
            telefono,
            usuario,
            admin,
            foto
        }

        await sendNodeMailAdmin(mailContent)
        res.send(results.secure_url);

    } catch (error) {
        logger.error(error)
    }
}

/* exports.LoginUser = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    try {

        const { usuario, contrasenia } = req.body
        const userLogin = await usuariosDao.findOneUser({ usuario });
        console.log('userLogin', userLogin)
        if (!userLogin) {
            return res.status(400).json({ msg: 'Usuario y/o Contraseña Incorrectos1' })
        }

        const passCheck = await bcryptjs.compare(contrasenia, userLogin.contrasenia);
        if (!passCheck) {
            return res.status(400).json({ msg: 'Usuario y/o Contraseña Incorrectos2' })
        }

        const jwt_payload = {
            user: {
                id: userLogin.id,
                usuario: userLogin.usuario,
                admin: userLogin.admin
            }
        }

        const token = jwt.sign(jwt_payload, process.env.JWT_SECRET, { expiresIn: process.env.TIME_EXP })
        userLogin.token = [token]
        await usuariosDao.ModifyUserToken(userLogin)
        res.json({ userLogin })

    } catch (error) {
        logger.error(error);
        res.status(500).json({ msg: 'Error', error })
    }
} */

exports.LogoutUser = async (req, res) => {
    try {

        console.log('resLocalsControllers', res.locals.user)

        await usuariosDao.LogoutUserRes(res.locals.user)
        res.json({ mensaje: 'Deslogueo ok' })

    } catch (error) {
        logger.error(error);
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.GetAllUsers = async (req, res) => {

    try {
        const usuarios = await usuariosDao.findAll()
        res.json({ usuarios })

    } catch (error) {
        logger.error(error);
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.GetOneUser = async (req, res) => {

    try {

        const id = req.params.id
        const oneUser = await usuariosDao.findOneId(id)

        res.json({ oneUser })

    } catch (error) {
        logger.error(error);
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.ModifyOneUser = async (req, res) => {

    try {

        const id = req.params.id
        const body = req.body

        const modUser = await usuariosDao.ModifyOneUser(id, body)
        res.json({ modUser })

    } catch (error) {
        logger.error(error);
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.DeleteOneUSer = async (req, res) => {

    try {
        const id = req.params.id
        const userSearch = await usuariosDao.findOneId(id)
        let idCart = await userSearch.carritoID
        let cartSearch = await carritosDao.findOneId(idCart)

        if (cartSearch.producto.length !== 0) {

            cartSearch.producto.splice(0, cartSearch.producto.length)
            cartSearch.save()

            cartSearch = await carritosDao.DeleteOneCart(idCart)
            const deleteUser = await usuariosDao.DeleteOneUser(id)

            res.json('eliminado')
        } else {

            cartSearch = await carritosDao.DeleteOneCart(idCart)
            const deleteUser = await usuariosDao.DeleteOneUser(id)

            res.json('eliminado')
        }

    } catch (error) {
        logger.error(error);
        res.status(500).json({ msg: 'Error', error })
    }
}
