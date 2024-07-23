const stripe = require('stripe')('sk_test_51INkUXIZflYtINDX2BJfxt3QoJ5hNV8WVZmjBAmHNHayZyPxtN9t6jVcTc774Z5mpOJVREnpddkaKSQEBrP6w14J00mxqZlddB'); // Replace with your Stripe secret key

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: 'your_customer_id' }, // Replace with actual customer ID
      { apiVersion: '2022-08-01' } // Specify API version
    );

    return {
      statusCode: 200,
      body: JSON.stringify(ephemeralKey)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
