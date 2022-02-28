const express = require('express')
const router = express.Router()
const productRouter = require('./productos.routes')
const carritoRouter = require('./carritos.routes')
const userRouter = require('./usuarios.routes')

router.use('/productos', productRouter)
router.use('/carritos', carritoRouter)
router.use('/usuarios', userRouter)

module.exports = router
