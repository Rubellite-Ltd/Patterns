const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
    try {
        const { customerId, apiVersion } = JSON.parse(event.body);

        if (!customerId || !apiVersion) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing required parameters: customerId and apiVersion" }),
            };
        }

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
