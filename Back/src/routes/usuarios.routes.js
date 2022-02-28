const express = require('express')
const router = express.Router()
const auth = require('../middlewars/auth')
const { check } = require('express-validator')
const upload = require("../utils/multer");
const passport = require('passport')
const controllerUsers = require('../controllers/usuarios.controllers')
const { LogoutUser, GetAllUsers, GetOneUser, ModifyOneUser, DeleteOneUSer, ImageUpload } = controllerUsers

router.post('/register', function (req, res, next) {
    passport.authenticate('local-register', function (err, user, info) {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(201).json(user)
        }
    })(req, res, next);
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).json({ userLogin: user })
        }
    })(req, res, next);
});

router.get('/logout', auth(['true', 'false']), LogoutUser)
/* -----CRUD------ */
router.get('/', GetAllUsers)
router.get('/:id', GetOneUser)
router.put('/:id', ModifyOneUser)
router.delete('/:id', DeleteOneUSer)
/* ------Carga de imgen----- */
router.post('/:userId/upload', upload.single("image"), ImageUpload);
/* ------Carga de imgen----- */

module.exports = router;
