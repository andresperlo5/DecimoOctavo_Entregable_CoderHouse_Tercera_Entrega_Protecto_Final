const jwt = require('jsonwebtoken');
const { usuariosDao } = require('../daos/index')

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

module.exports = (role) => async (req, res, next) => {
    try {
        const token = req.header('authorization').replace('Bearer ', '');
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
        logger.error(error)
        return res.status(401).json({ mensaje: 'Deslogueado: Acceso Restringido', error: error.message })
    }
}
