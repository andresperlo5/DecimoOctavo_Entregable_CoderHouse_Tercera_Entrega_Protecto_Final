const { carritosDao, productosDao, usuariosDao } = require('../daos/index')
const sendNodeMailCart = require('../middlewars/nodemailerCart')
const twlio = require('twilio')

const acountID = process.env.TWILIO_ACOUNT_ID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = twlio(acountID, authToken)

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

exports.GetAllCarts = async (req, res) => {
    try {
        const cartsAll = await carritosDao.findAll()
        res.json({ cartsAll })
    } catch (error) {
        logger.error(error)
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.GetOneCart = async (req, res) => {
    try {
        const id = req.params.id
        const oneCart = await carritosDao.findOneId(id)
        res.json({ oneCart })
    } catch (error) {
        logger.error(error)
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.newCart = async (req, res) => {
    try {
        const newCats = await carritosDao.newCart(req.body)
        res.json({ newCats })
    } catch (error) {
        logger.error(error)
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.ModifyOneCart = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const modCart = await carritosDao.ModifyOneCart(id, body)
        res.json({ modCart })
    } catch (error) {
        logger.error(error)
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.DeleteOneCartAndProducts = async (req, res) => {
    try {
        const id = req.params.id
        const deleteCart = await carritosDao.DeleteOneCart(id)
        res.json({ msg: 'eliminado' })
    } catch (error) {
        logger.error(error)
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.addProductinTheCart = async (req, res) => {
    try {
        const idCart = req.params.id
        const idProd = req.params.idProd
        const cartEnc = await carritosDao.findOneId(idCart)
        const prodEnc = await productosDao.findOneId(idProd)
        cartEnc.producto.push(prodEnc)
        const CartG = carritosDao.SaveCart(cartEnc, idCart, idProd)
        res.json({ CartG })
    } catch (error) {
        logger.error(error)
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.DeleteOneProductCart = async (req, res) => {
    try {
        let idCart = req.params.id
        let idProd = req.params.idProd
        const cartSearch = await carritosDao.findOneId(idCart)
        const prodSearch = await productosDao.findOneId(idProd)
        cartSearch.producto.splice(prodSearch, 1)
        const CartG = carritosDao.SaveCart(cartSearch, idCart)
        res.json(CartG)
    } catch (error) {
        logger.error(error)
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.payCart = async (req, res) => {
    try {
        const pedidoFront = req.body
        const idUser = req.params.idUser
        const oneUser = await usuariosDao.findOneId(idUser)
        const { nombre, usuario, telefono } = oneUser
        function primeraLetraDelNombreMayuscula(name) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        }
        const mailContent = {
            subject: 'Nuevo Pedido',
            nombre,
            usuario,
            pedidoFront
        }
        const msgClient = await client.messages.create({
            body: 'Tu pedido ya fue recibo y se encuentra en proceso de envio',
            from: process.env.TWILIO_NUMBER_DEFAULT,
            to: telefono
        })
        const msgAdmin = await client.messages.create({
            body: `Nuevo Pedido de ${primeraLetraDelNombreMayuscula(nombre)}. Email del usuario: ${usuario}`,
            from: process.env.TWILIO_NUMBER_DEFAULT_ADMIN,
            to: process.env.TWILIO_NUMBER_DEFAULT_WHTS
        })
        await sendNodeMailCart(mailContent)
        res.json(msgClient)
    } catch (error) {
        logger.error(error)
        res.status(500).json({ msg: 'Error', error })
    }
}
