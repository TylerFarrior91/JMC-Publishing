const express = require('express');
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.post('/charge', async (req, res) => {
    try {
        const { amount, currency, source } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method: source,
            confirmation_method: 'manual',
            confirm: true,
        });

        return res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
