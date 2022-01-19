const admin = require('firebase-admin')
const { v4: uuid4 } = require('uuid')

const db = admin.firestore()

class ContenedorCarritosFirebase {
    constructor(nombreCollection) {
        this.collections = db.collection(nombreCollection)
    }

    async findAll() {

        try {

            const carts = (await this.collections.get()).docs

            const res = carts.map(prod => {
                return {
                    id: prod.id,
                    producto: prod.data().producto,
                    timestamp: prod.data().timestamp,
                    userId: prod.data().userId
                }
            })

            return res
        } catch (error) {
            console.log('error', error);
        }
    }

    async findOneId(id) {
        try {

            const oneCart = (await this.collections.doc(id).get()).data();
            return oneCart

        } catch (error) {
            console.log('error', error);
        }
    }

    async newCart(body) {
        try {

            const obj = await this.collections.add(body)
            const newCarts = {
                id: obj.id
            }

            return newCarts

        } catch (error) {
            console.log('error', error);
        }
    }

    async ModifyOneCart(id, body) {
        try {

            const modifyCart = await this.collections.doc(id).set(body);
            return modifyCart

        } catch (error) {
            console.log('error', error);
        }
    }

    async DeleteOneCart(id) {
        try {

            const delCart = await this.collections.doc(id).delete();
            return delCart

        } catch (error) {
            console.log('error', error);
        }
    }

    async SaveCart(cartEnc, idCart, idProd) {
        try {
           console.log('cartEnc', cartEnc)
           console.log('idCart', idCart)
           console.log('idProd', idProd)
           const saveCart = await this.collections.doc(idCart).set(cartEnc);
            return saveCart 

        } catch (error) {
            console.log('error', error);
        }
    }

}

module.exports = ContenedorCarritosFirebase;
