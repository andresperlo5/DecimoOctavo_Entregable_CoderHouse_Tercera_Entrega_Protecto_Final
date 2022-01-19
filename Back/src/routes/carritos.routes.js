const express = require('express')
const router = express.Router()

const controllersCarts = require('../controllers/carritos.controllers')
const { GetAllCarts, GetOneCart, newCart, ModifyOneCart, DeleteOneProductCart, DeleteOneCartAndProducts, 
    addProductinTheCart, payCart } = controllersCarts

router.get('/', GetAllCarts)
router.get('/:id', GetOneCart)

router.post('/', newCart)
router.post('/:idCart/:idUser/payCart', payCart)
router.post('/:id/productos/:idProd', addProductinTheCart)

router.put('/:id', ModifyOneCart)

router.delete('/:id', DeleteOneCartAndProducts)
router.delete('/:id/productos/:idProd', DeleteOneProductCart)
/* ------------------------------ */



module.exports = router;
