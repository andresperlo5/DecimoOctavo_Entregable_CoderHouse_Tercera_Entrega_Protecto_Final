const jwt = require('jsonwebtoken');
const { usuariosDao } = require('../daos/index')

module.exports = (role) => async (req, res, next) => {

    try {

        const token = req.header('authorization').replace('Bearer ', '');
        console.log('token', token)
        const verificar = jwt.verify(token, process.env.JWT_SECRET);
        const userLogin = await usuariosDao.authTokenVerify({ verificar, token });
        if (!userLogin) {
            return res.status(401).json({ mensaje: 'Dentro: No Autorizado' })
        }

        res.locals.user = userLogin;
        res.locals.token = token;

        next();
    }

    catch (error) {
        console.log('error', error);
        return res.status(401).json({ mensaje: 'Deslogueado: Acceso Restringido', error: error.message })
    }
}
