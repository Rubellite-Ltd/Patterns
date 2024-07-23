const stripe = require('stripe')('sk_test_51INkUXIZflYtINDX2BJfxt3QoJ5hNV8WVZmjBAmHNHayZyPxtN9t6jVcTc774Z5mpOJVREnpddkaKSQEBrP6w14J00mxqZlddB');  // Replace with your test or live key

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { amount, currency } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
