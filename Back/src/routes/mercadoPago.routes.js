const express = require('express')
const router = express.Router()
const auth = require('../middlewars/auth')

const controllerMercadoPago = require('../controllers/MercadoPagoSandBox')
const { mercadoPagoSand } = controllerMercadoPago

router.post('/', auth(['true', 'false']), mercadoPagoSand)


module.exports = router
