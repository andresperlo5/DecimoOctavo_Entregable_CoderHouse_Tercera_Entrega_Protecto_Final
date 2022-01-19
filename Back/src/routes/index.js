const express = require('express')
const router = express.Router()

const productRouter = require('./productos.routes')
const carritoRouter = require('./carritos.routes')
const userRouter = require('./usuarios.routes')
const mercadoPago = require('./mercadoPago.routes')

router.use('/productos', productRouter)
router.use('/carritos', carritoRouter)
router.use('/usuarios', userRouter)
router.use('/mercadopago', mercadoPago)

module.exports = router
