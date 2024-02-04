const express = require('express');
const app = express();
const stripe = require('stripe')('inib-sbjj-mrnp-djdh-pqdz');

app.use(express.static('public'));
app.use(express.json());

app.post('/purchase', async (req, res) => {
    const { bookTitle } = req.body;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: bookTitle,
                },
                unit_amount: 2000, // Replace with the actual price in cents
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: 'https://jmc-publishing.vercel.app//success', // Redirect URL after successful payment
        cancel_url: 'https://jmc-publishing.vercel.app//cancel', // Redirect URL after canceled payment
    });

    res.json({ id: session.id });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});