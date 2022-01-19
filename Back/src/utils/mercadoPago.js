const mongoose = require('mongoose');
const mercadopago = require('mercadopago');

exports.merPago = async (req, res) => {
  try {
    let paymentInfo = null;
    const query = req.query;
    if (query.payment_id) {
      paymentInfo = await get_payment_by_id(query.payment_id);
    } else if (mongoose.Types.ObjectId.isValid(query.my_id)) {
      paymentInfo = await get_payment_by_external_id(query.my_id);
    }
    res.json({
      payment_data: {
        id: paymentInfo.id,
        external_reference: paymentInfo.external_reference,
        status: paymentInfo.status,
        transaction_amount: paymentInfo.transaction_amount
      }
    });
  } catch (error) {
    console.log('ERROR');
    console.log(error);
  }
}
async function get_payment_by_id(payment_id) {
  // redirected page query params
  // collection_id
  // external_reference
  // preference_id
  console.log('get payment info');
  try {
    console.log('payment...');
    console.log(mercadopago.payment);
    console.log('getting payment info...');
    // by ID (collection_id in redirected page)
    const response = await mercadopago.payment.get(payment_id); // or findById
    console.log(response.body);
    return response.body;
  } catch (err) {
    console.log('ERROR');
    console.log(err);
    return null;
  }
}
async function get_payment_by_external_id(external_reference) {
  // redirected page query params
  // collection_id
  // external_reference
  // preference_id
  console.log('get payment info');
  try {
    console.log('payment...');
    console.log(mercadopago.payment);
    console.log('getting payment info...');
    // by external_reference
    const filters = {
      site_id: 'MLA',
      external_reference
    };
    const response = await mercadopago.payment.search({
      qs: filters
    });
    console.log('response exeternal ->', response);
    console.log('body external ->',response.body.results[0]);
    return response.body.results[0];
  } catch (err) {
    console.log('ERROR');
    console.log(err);
    return null;
  }
}