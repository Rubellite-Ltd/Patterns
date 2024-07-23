const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
    const { customerId, apiVersion } = JSON.parse(event.body);

    try {
        const ephemeralKey = await stripe.ephemeralKeys.create(
            { customer: customerId },
            { apiVersion }
        );

        return {
            statusCode: 200,
            body: JSON.stringify(ephemeralKey),
        };
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: err.message }),
        };
    }
};
