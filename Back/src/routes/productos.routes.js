const express = require('express')
const router = express.Router()
const controllerProducts = require('../controllers/productos.controllers')
const { GetAllProducts, GetOneProduct, CreateOneProduct, ModifyOneProduct, DeleteOneProduct } = controllerProducts
router.get('/', GetAllProducts)
router.get('/:id', GetOneProduct)
router.post('/', CreateOneProduct)
router.put('/:id', ModifyOneProduct)
router.delete('/:id', DeleteOneProduct)

module.exports = router
