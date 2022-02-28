const admin = require('firebase-admin')
const { v4: uuid4 } = require('uuid')
const config = require('../config/ecommerce-d064c-firebase-adminsdk-v2owy-a323d5460a.json')

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

// Create a reference to the cities collection
// const { collection, query, where } = require('@firebase/firestore');

admin.initializeApp({
    credential: admin.credential.cert(config),
    databaseURL: "http://ecommerce.firebaseio.com"
});

const db = admin.firestore()
class ContenedorUsuariosFirebase {
    constructor(nombreCollection) {
        this.collections = db.collection(nombreCollection)
    }

    async findAll() {
        try {
            const users = (await this.collections.get()).docs
            const res = users.map(user => {
                return {
                    id: user.id,
                    usuario: user.data().usuario,
                    contrasenia: user.data().contrasenia
                }
            })
            return res
        } catch (error) {
            logger.error(error)
            res.status(500).json(error)
        }
    }

    async findOneId(id) {
        try {
            const oneUser = (await this.collections.doc(id).get()).data();
            return oneUser

        } catch (error) {
            logger.error(error)
            res.status(500).json(error)
        }
    }

    async findOneUser(user) {
        try {
            const { usuario } = user
            const userRef = this.collections
            const oneUser = await userRef.where('usuario', '==', usuario).get();
            if (oneUser.empty) {
                console.log('No matching documents.');
                return;
            }
            let users;

            oneUser.forEach(doc => {
                users = doc.data()
            });
            return users
        } catch (error) {
            logger.error(error)
            res.status(500).json(error)
        }
    }

    async newUser(body) {
        try {
            const obj = await this.collections.add(body)
            const newUser = {
                id: obj.id
            }
            return newUser
        } catch (error) {
            logger.error(error)
            res.status(500).json(error)
        }
    }

    async ModifyOneUser(id, body) {
        try {
            let bodyID = Object.assign(body, { id })
            const modifyUser = await this.collections.doc(id).set(bodyID);
            return modifyUser
        } catch (error) {
            logger.error(error)
            res.status(500).json(error)
        }
    }

    async ModifyUserToken(user) {
        try {
            const { usuario } = user
            const userRef = this.collections
            const oneUser = await userRef.where('usuario', '==', usuario).get();
            if (oneUser.empty) {
                console.log('No matching documents.');
                return;
            }
            let users;
            let idUser;
            oneUser.forEach(doc => {
                users = doc.data()
                idUser = doc.id
            });
            let userUpdte = await this.collections.doc(idUser).set(user);
            return userUpdte
        } catch (error) {
            logger.error(error)
            res.status(500).json(error)
        }
    }

    async DeleteOneUser(id) {
        try {
            const deleteUser = await this.collections.doc(id).delete();
            return deleteUser
        } catch (error) {
            logger.error(error)
            res.status(500).json(error)
        }
    }

    async authTokenVerify(verifToken) {
        try {
            const { verificar } = verifToken
            const usuario = verificar.user.usuario
            const userRef = this.collections
            const oneUser = await userRef.where('usuario', '==', usuario).get();
            if (oneUser.empty) {
                console.log('No matching documents.');
                return;
            }
            let users;
            oneUser.forEach(doc => {
                users = doc.data()
            });
            return users

        } catch (error) {
            logger.error(error)
            res.status(500).json(error)
        }
    }

    async LogoutUserRes(resLocalUser) {
        try {
            const { id, carritoID, nombre, edad, usuario, contrasenia, direccion, telefono, admin, token, foto } = resLocalUser
            const LogoutUSer = {
                id,
                carritoID,
                nombre,
                edad,
                usuario,
                contrasenia,
                direccion,
                telefono,
                admin,
                foto,
                token: []
            }
            const userRef = this.collections
            const oneUser = await userRef.where('usuario', '==', usuario).get();
            if (oneUser.empty) {
                console.log('No matching documents.');
                return;
            }
            let users;
            let idUser;
            oneUser.forEach(doc => {
                users = doc.data()
                idUser = doc.id
            });
            let userupdateLogout = await this.collections.doc(idUser).set(LogoutUSer);
            return userupdateLogout
        } catch (error) {
            logger.error(error)
            res.status(500).json(error)
        }
    }

    async addImage(ids, fotOavatar) {
        try {
            const oneUser = (await this.collections.doc(ids).get()).data();
            const { id, carritoID, nombre, edad, usuario, contrasenia, direccion, telefono, admin, token } = oneUser
            const updateBodyAndImage = {
                id,
                carritoID,
                nombre,
                edad,
                usuario,
                contrasenia,
                direccion,
                telefono,
                admin,
                foto: fotOavatar,
                token
            }
            const addImage = await this.collections.doc(id).set(updateBodyAndImage);
            return addImage

        } catch (error) {
            logger.error(error)
            res.status(500).json(error)
        }
    }
}

module.exports = ContenedorUsuariosFirebase;
