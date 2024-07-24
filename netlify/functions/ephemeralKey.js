const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  let requestBody;
  try {
    requestBody = JSON.parse(event.body);
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid request body' })
    };
  }

  try {
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: requestBody.customer_id }, // Pass the customer ID from the request body
      { apiVersion: '2022-08-01' } // Specify the API version
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
