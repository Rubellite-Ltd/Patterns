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
    let ephemeralKey;

    if (requestBody.customer_id) {
      ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: requestBody.customer_id }, // Pass the customer ID from the request body
        { apiVersion: '2022-08-01' } // Specify the API version
      );
    } else if (requestBody.issuing_card_id) {
      ephemeralKey = await stripe.ephemeralKeys.create(
        { issuing_card: requestBody.issuing_card_id }, // Pass the issuing card ID from the request body
        { apiVersion: '2022-08-01' } // Specify the API version
      );
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Must provide exactly one of these parameters: customer_id, issuing_card_id' })
      };
    }

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
