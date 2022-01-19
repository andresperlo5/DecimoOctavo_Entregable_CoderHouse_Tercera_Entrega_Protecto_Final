const mercadopago = require('mercadopago');
const mongoose = require('mongoose')
const moment = require('moment')

exports.mercadoPagoSand = async (req, res) => {

    const saleId = new mongoose.Types.ObjectId();
    const user = res.locals.user._id
    const pago = req.body.pago

    const mercadopagoResponse = await create_preference(saleId, pago, user);

    res.json({
        my_id: saleId,
        reference_data: {
            id: mercadopagoResponse.id,
            external_reference: mercadopagoResponse.external_reference,
            init_point: mercadopagoResponse.init_point,
            sandbox_init_point: mercadopagoResponse.sandbox_init_point
        }
    })

    async function create_preference(saleId, food, user) {
        console.log('create preference');
        try {
            console.log('Sale ID: ' + saleId.toString());
            const preference = {
                auto_return: 'approved',
                // binary_mode: true,
                expires: true,
                expiration_date_from: moment().toISOString(true),
                expiration_date_to: moment().add(7, 'days').toISOString(true),
                back_urls: {
                    "success": `${process.env.FRONTEND_BASE_URL}/user/orders/${order.id}`,
                    "failure": `${process.env.FRONTEND_BASE_URL}/user/orders/${order.id}`,
                    "pending": `${process.env.FRONTEND_BASE_URL}/pending`
                },
            };
            preference.external_reference = saleId.toString();
            preference.payer = user;
            preference.items = [{
                id: food._id,
                title: food.title,
                quantity: food.quantity,
                currency_id: 'ARS',
                unit_price: food.price,
                id: order._id
            }]
            console.log('cantidad ->', food.quantity, ' precio -> ', food.price)
            console.log('items ->', preference.items)
            console.log('preference...');
            console.log(mercadopago.preferences);
            console.log('creating preference...');
            const response = await mercadopago.preferences.create(preference);
            console.log(response.body);
            return response.body;
        } catch (err) {
            console.log('ERROR');
            console.log(err);
            return null;
        }
    }
}