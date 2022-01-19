const express = require('express')
const router = express.Router()
const auth = require('../middlewars/auth')
const { check } = require('express-validator')
const upload = require("../utils/multer");
const passport = require('passport')

const controllerUsers = require('../controllers/usuarios.controllers')
const { LoginUser, RegisterUser, LogoutUser, GetAllUsers, GetOneUser, ModifyOneUser, DeleteOneUSer, ImageUpload } = controllerUsers

/* router.post('/register', [
    check('nombre', 'Campo Nombre Vacio').notEmpty(),
    check('direccion', 'Campo Direccion Vacio').notEmpty(),
    check('edad', 'Campo Edad Vacio').notEmpty(),
    check('telefono', 'Campo Telefono Vacio').notEmpty(),
    check('usuario', 'Campo Usuario Vacio').notEmpty(),
    check('contrasenia', 'Campo Contraseña Vacio').notEmpty(),
    check('contrasenia', 'La contraseña debe tener un minimo de 8 caracteres').isLength({ min: 8 })
], RegisterUser) */

router.post('/login', passport.authenticate('local-login', {}))
router.post('/register', passport.authenticate('local-register', {}))
/* router.post('/login', [
    check('usuario', 'Campo Usuario Vacio').notEmpty(),
    check('contrasenia', 'Campo Contraseña Vacio').notEmpty(),
    check('contrasenia', 'La contraseña debe tener un minimo de 8 caracteres').isLength({ min: 8 })
], LoginUser) */

router.get('/logout', auth(['true', 'false']), LogoutUser)

/* -----CRUD------ */
router.get('/', GetAllUsers)
router.get('/:id', GetOneUser)
router.put('/:id', ModifyOneUser)
router.delete('/:id', DeleteOneUSer)
/* ---------------------------------- */

/* ------Carga de imgen----- */
router.post('/:userId/upload', upload.single("image"), ImageUpload);
/* ------Carga de imgen----- */

module.exports = router;
